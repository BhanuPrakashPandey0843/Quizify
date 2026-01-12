# Remaining Issues & Roadmap

## 🐛 Known Issues / Limitations
1. **Mock Data in Services:**
   - `exam-definition-service` and `quiz-engine-service` currently serve in-memory mock data. For production, integrate with a real database (MongoDB/PostgreSQL).
2. **Proctoring Enforcement:**
   - The frontend sends proctoring events (Tab Blur, Visibility Change), but the backend logic to *penalize* or *auto-submit* based on these is basic.
3. **Session Persistence:**
   - `exam-session-service` uses an in-memory Map. Restarting the service wipes active sessions. Needs Redis/Database.

## 🛠 Future Improvements
- **Database Integration:** Connect all microservices to a persistent database.
- **Admin Portal:** Create a frontend interface for Admins to CRUD exams and questions.
- **Real-time Analytics:** Use WebSockets for live proctoring monitoring.
- **Result Visualization:** Add charts/graphs for performance analysis in `ResultPage.js`.
- **Unit Testing:** Add Jest/Supertest coverage for all backend routes.

## 📝 Notes for Developers
- Ensure all services are running before starting the frontend.
- Use `api.js` for all frontend requests to ensure Auth headers are attached.
- Check `api-gateway` logs for routing issues.
