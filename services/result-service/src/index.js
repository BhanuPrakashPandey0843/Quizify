const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { v4: uuid } = require("uuid");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 8087;

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use((req, res, next) => {
  const existingId = req.headers["x-correlation-id"];
  const correlationId = existingId || uuid();
  req.correlationId = correlationId;
  res.setHeader("X-Correlation-Id", correlationId);
  next();
});

app.use(
  morgan(":method :url :status - :response-time ms - cid=:req[x-correlation-id]")
);

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "result-service",
    timestamp: new Date().toISOString(),
  });
});

// Compute result using quiz answers + exam definition + violations
app.post("/results", async (req, res) => {
  const { sessionId, examId } = req.body;
  if (!sessionId || !examId) {
    return res.status(400).json({ error: "sessionId and examId required" });
  }

  try {
    const quizUrl = process.env.QUIZ_ENGINE_SERVICE_URL || "http://localhost:8084";
    const examDefUrl =
      process.env.EXAM_DEFINITION_SERVICE_URL || "http://localhost:8082";
    const violationUrl =
      process.env.VIOLATION_AUDIT_SERVICE_URL || "http://localhost:8086";

    const [answersResp, examResp, violationsResp] = await Promise.all([
      fetch(`${quizUrl}/quiz/session/${encodeURIComponent(sessionId)}/answers`),
      fetch(`${examDefUrl}/exams/${encodeURIComponent(examId)}`),
      fetch(
        `${violationUrl}/violations/session/${encodeURIComponent(sessionId)}`
      ).catch(() => null),
    ]);

    const answers = await answersResp.json();
    const exam = await examResp.json();
    const violations =
      violationsResp && violationsResp.ok
        ? await violationsResp.json()
        : { score: 0 };

    if (!exam || !exam.sections) {
      return res.status(500).json({ error: "Invalid exam definition" });
    }

    // For scoring, we need the correct answers from quiz service
    const questionsResp = await fetch(
      `${quizUrl}/quiz/${encodeURIComponent(examId)}/questions`
    );
    const questions = await questionsResp.json();

    let rawScore = 0;
    let attempted = 0;
    let correct = 0;

    questions.forEach((q) => {
      const answer = answers[q.id];
      if (!answer) {
        return;
      }
      attempted += 1;
      const original = questions.find((qq) => qq.id === q.id);
      if (!original) return;
      const isCorrect = answer.selectedIndex === original.correctIndex;
      if (isCorrect) {
        correct += 1;
        rawScore += q.marks;
      } else {
        rawScore -= exam.negativeMarking * q.marks;
      }
    });

    const violationPenalty = Math.min(violations.score || 0, 50);
    const finalScore = Math.max(rawScore - violationPenalty * 0.1, 0);

    const result = {
      sessionId,
      examId,
      rawScore,
      finalScore,
      attempted,
      correct,
      violationScore: violations.score || 0,
      createdAt: Date.now(),
    };

    return res.json(result);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Result compute error", err);
    return res.status(500).json({ error: "Failed to compute result" });
  }
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`result-service listening on port ${PORT}`);
});


