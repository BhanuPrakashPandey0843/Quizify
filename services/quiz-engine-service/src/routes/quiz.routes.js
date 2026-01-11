const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quiz.controller");

router.get("/health", (req, res) => {
    res.json({ status: "ok", service: "quiz-engine-service", timestamp: new Date().toISOString() });
});

router.get("/:examId/questions", quizController.getQuestions);
router.post("/:examId/answer", quizController.submitAnswer);
router.get("/session/:sessionId/answers", quizController.getSessionAnswers);

module.exports = router;
