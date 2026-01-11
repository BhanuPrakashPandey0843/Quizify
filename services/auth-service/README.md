# Auth Service

## Overview
The Auth Service handles user authentication, token generation (JWT), and token refreshing. It is a critical component for securing the Quizify application.

## Tech Stack
- **Node.js**
- **Express.js**
- **JWT (JSON Web Tokens)**

## API Endpoints

### POST `/auth/login`
- **Body**: `{ "username": "string" }`
- **Response**: `{ "accessToken": "string", "refreshToken": "string", "user": object }`

### POST `/auth/refresh`
- **Body**: `{ "refreshToken": "string" }`
- **Response**: `{ "accessToken": "string" }`

### GET `/auth/health`
- **Response**: `{ "status": "ok", "service": "auth-service" }`

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
- `PORT`: Service port (default: 8081)
- `JWT_SECRET`: Secret key for signing tokens
