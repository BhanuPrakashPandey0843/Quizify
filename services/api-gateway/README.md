# API Gateway

## Overview
The API Gateway serves as the single entry point for the Quizify microservices architecture. It handles routing, authentication (JWT verification), and request correlation.

## Tech Stack
- **Node.js**
- **Express.js**
- **http-proxy-middleware**

## Routes
All API requests should be prefixed with `/api`.

- `/api/auth/*` -> Auth Service
- `/api/exams/*` -> Exam Definition Service
- `/api/quiz/*` -> Quiz Engine Service
- `/api/results/*` -> Result Service
- ...and more.

## Setup & Run
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the service:
   ```bash
   npm start
   ```

## Environment Variables
- `PORT`: Gateway port (default: 8080)
- `AUTH_SERVICE_URL`, `QUIZ_ENGINE_SERVICE_URL`, etc.: URLs for downstream services.
- `JWT_DEV_SECRET`: Secret for verifying tokens.
