# User Profile Service

## Overview
The User Profile Service manages user details, attempt history, and eligibility status.

## Tech Stack
- **Node.js**
- **Express.js**

## API Endpoints

### GET `/profiles/:userId`
- **Response**: `{ "userId": "string", "attempts": number, "bans": number, "eligibility": "string" }`

### POST `/profiles/:userId/attempt`
- **Response**: `{ "status": "recorded", "userId": "string", "attemptId": "string" }`

### GET `/health`
- **Response**: `{ "status": "ok", "service": "user-profile-service", "ts": number }`

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
- `PORT`: Service port (default: 8098)
