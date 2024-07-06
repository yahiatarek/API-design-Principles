# API-design-Principles
This Repo provides a visual summary of important aspects and best practices for the design of APIs:
1. Issue Multiple Pairs of Keys Read-only keys: Access Key ID Secret Access Key Read-write keys: Access Key ID Secret Access Key Each key is linked to an App ID.
2. Generate Signature Required elements: Request URL HTTP Method (GET, POST, PUT, DELETE) Request Content Timestamp Nonce (one-time use value to prevent replay attacks) Secret Access Key These elements are combined to generate a signature that ensures the integrity and authenticity of the request.
3. API Security Use HTTPS: To protect the data during transmission. Nonce and Timestamp: Validate the timestamp and nonce to prevent replay attacks. Set Rate Limit: Limit the number of requests a user can send in a given time period. Set IP Allow List: Restrict access to the API to specific IP addresses. Encrypt sensitive data: Protect data both in transit and in storage. Log API requests: Monitor and track API usage and abuse.
4. Send Requests Request Parameters: App ID Nonce Timestamp Signature The request is sent to the API endpoint and contains the above parameters.
5. Other Guidelines Watch for idempotency: Ensure that repeated requests do not cause different results.
API versioning: Manage changes and updates to the API without impacting existing clients. Define request/response format: Ensure consistency and predictability of API responses. Standardize HTTP status codes: Using standardized status codes to clearly communicate the request result.
