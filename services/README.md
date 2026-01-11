# Quizify Backend Architecture

The backend is built using a **Microservices Architecture** to ensure scalability and separation of concerns.

##  Services Overview

| Service | Port | Description |
| :--- | :--- | :--- |
| **API Gateway** | 8080 | Entry point, handles routing and authentication. |
| **Auth Service** | 8081 | User login, registration, and JWT management. |
| **Exam Definition** | 8082 | Manages exam metadata and rules. |
| **Exam Session** | 8083 | Manages active exam sessions. |
| **Quiz Engine** | 8084 | Serves questions and accepts answers. |
| **Proctoring** | 8085 | Handles proctoring logic. |
| **Violation Audit** | 8086 | Logs exam violations. |
| **Result Service** | 8087 | Computes and stores results. |
| **User Profile** | 8098 | Manages user details and history. |

##  Running the Backend

Currently, you need to run each service individually (or use Docker Compose if configured).

1.  **Start API Gateway**:
    ```bash
    cd services/api-gateway
    npm install
    npm start
    ```
2.  **Start Other Services**:
    Repeat the above for `auth-service`, `quiz-engine-service`, etc.

##  Authentication
Communication is secured via JWT. The API Gateway validates tokens before forwarding requests to protected services.

##  Structure Pattern
Each service follows a clean architecture:
*   `src/config`: Configuration and env vars.
*   `src/controllers`: Request handling logic.
*   `src/routes`: API route definitions.
*   `src/middleware`: Custom middleware.
