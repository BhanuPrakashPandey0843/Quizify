module.exports = {
  port: process.env.PORT || 8080,
  services: {
    auth: process.env.AUTH_SERVICE_URL || "http://localhost:8081",
    examDefinition: process.env.EXAM_DEFINITION_SERVICE_URL || "http://localhost:8082",
    examSession: process.env.EXAM_SESSION_SERVICE_URL || "http://localhost:8083",
    quizEngine: process.env.QUIZ_ENGINE_SERVICE_URL || "http://localhost:8084",
    proctoring: process.env.PROCTORING_SERVICE_URL || "http://localhost:8085",
    violationAudit: process.env.VIOLATION_AUDIT_SERVICE_URL || "http://localhost:8086",
    result: process.env.RESULT_SERVICE_URL || "http://localhost:8087",
  },
  jwtSecret: process.env.JWT_DEV_SECRET || "dev-secret-change-in-prod",
  skipAuth: process.env.SKIP_AUTH !== "false",
};
