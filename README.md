# Quizify

Quizify is a modern, interactive quiz application designed to help students learn and engage with various subjects. It features a polished React frontend and a scalable microservices-based backend.

## 🚀 Key Features

*   **Interactive UI**: Smooth animations (GSAP), smooth scrolling (Lenis), and a modern design.
*   **Microservices Architecture**: Scalable backend with separate services for Auth, Quiz Engine, User Profile, etc.
*   **Real-time Quizzes**: Take quizzes, track progress, and view results.
*   **Role-based Access**: Support for Students and Teachers.

## 🛠 Tech Stack

### Frontend
*   **React.js**
*   **Tailwind CSS**
*   **GSAP** (Animations)
*   **Lenis** (Smooth Scrolling)

### Backend
*   **Node.js / Express**
*   **Microservices Pattern**
*   **API Gateway** (Proxy & Auth)

## 📂 Project Structure

```
Quizify/
├── src/                # React Frontend
├── services/           # Backend Microservices
│   ├── api-gateway/
│   ├── auth-service/
│   ├── quiz-engine-service/
│   └── ...
├── infra/              # Infrastructure (Docker)
└── ...
```

## 🏁 Getting Started

### Prerequisites
*   Node.js (v16+)
*   npm

### Run Frontend
```bash
npm install
npm start
```
Access at `http://localhost:3000`.

### Run Backend
Navigate to each service in `services/` and run:
```bash
npm install
npm start
```
Start `api-gateway` first (Port 8080).

## 🤝 Contribution
1.  Fork the repo.
2.  Create a feature branch.
3.  Commit changes.
4.  Push and create a PR.

## 📄 License
MIT
