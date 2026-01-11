# Quiz Engine Service

## Overview
The Quiz Engine Service handles the core logic of serving questions and recording answers during an exam session.

## Tech Stack
- **Node.js**
- **Express.js**
- **In-Memory Store** (For Demo)

## API Endpoints

### GET `/quiz/:examId/questions`
- Returns randomized questions for a given exam.

### POST `/quiz/:examId/answer`
- Submits an answer for a specific question in a session.

### GET `/quiz/session/:sessionId/answers`
- Retrieves all answers for a given session.

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
- `PORT`: Service port (default: 8084)
