# Remaining Issues & Suggestions

## ⚠️ Critical Issues
1.  **In-Memory Data**: `quiz-engine-service` and others use in-memory variables. This data will be lost on restart. **Fix**: Connect to a database (MongoDB recommended).
2.  **Unrefactored Services**: Several services (e.g., `exam-definition`, `result-service`) still use the old monolithic `index.js` structure. **Fix**: Refactor them using the pattern established in `auth-service`.
3.  **Hardcoded URLs**: `api-gateway` has fallback URLs. Ensure `docker-compose` or environment variables are correctly set for production.

## 💡 UI/UX Suggestions
1.  **Loading States**: Add a global Skeleton Loader or Spinner when fetching data from the backend.
2.  **Toast Notifications**: Replace `alert()` or console logs with a Toast library (e.g., `react-hot-toast`) for user feedback on Login/Signup.
3.  **Dashboard Polish**: The `ExamDashboardPage` should be reviewed to ensure it matches the high quality of the Landing Page.

## 🔧 Infrastructure
1.  **Docker Compose**: The `infra/docker-compose.yml` should be verified to include all new services and environment variables.
2.  **CI/CD**: Set up GitHub Actions for automated testing and linting.
