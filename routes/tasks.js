const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');
const auth = require('../middlewares/auth');
const rateLimiter = require('../middlewares/rateLimiter');
const verifySignature = require('../middlewares/signatureVerification');

// router.use(auth);
// router.use(rateLimiter);
// router.use(verifySignature);

router.get('/', tasksController.getTasks);
router.get('/:id', tasksController.getTask);
router.post('/', tasksController.createTask);
router.put('/:id', tasksController.updateTask);
router.delete('/:id', tasksController.deleteTask);

module.exports = router;
