// controllers/tasksController.js
const Task = require('../models/task');

// HATEOAS Links Funktion
const getTaskLinks = (taskId) => {
  return [
    { rel: 'self', method: 'GET', href: `/api/v1/tasks/${taskId}` },
    { rel: 'update', method: 'PUT', href: `/api/v1/tasks/${taskId}` },
    { rel: 'delete', method: 'DELETE', href: `/api/v1/tasks/${taskId}` }
  ];
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks.map(task => ({
      ...task.toObject(),
      links: getTaskLinks(task._id)
    })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json({
      ...task.toObject(),
      links: getTaskLinks(task._id)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const existingTask = await Task.findOne({ title: req.body.title });
    if (existingTask) {
      return res.status(409).json({ error: 'Task already exists' });
    }
    const task = new Task(req.body);
    await task.save();
    res.status(201).json({
      ...task.toObject(),
      links: getTaskLinks(task._id)
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json({
      ...task.toObject(),
      links: getTaskLinks(task._id)
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
