const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const config = require("../config/config");

const router = express.Router();

const setupProxy = (path, target, rewriteKey) => {
  return createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: { [rewriteKey]: path },
    logLevel: "warn",
  });
};

// Auth routes (no auth middleware needed, handled in main app or specific routes)
router.use("/auth", setupProxy("/auth", config.services.auth, "^/api/auth"));

// Protected routes (middleware applied in index.js)
router.use("/exams", setupProxy("/exams", config.services.examDefinition, "^/api/exams"));
router.use("/sessions", setupProxy("/sessions", config.services.examSession, "^/api/sessions"));
router.use("/quiz", setupProxy("/quiz", config.services.quizEngine, "^/api/quiz"));
router.use("/proctoring", setupProxy("/proctoring", config.services.proctoring, "^/api/proctoring"));
router.use("/violations", setupProxy("/violations", config.services.violationAudit, "^/api/violations"));
router.use("/results", setupProxy("/results", config.services.result, "^/api/results"));

module.exports = router;
