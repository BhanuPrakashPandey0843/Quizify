const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { v4: uuid } = require("uuid");

const app = express();
const PORT = process.env.PORT || 8097;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use((req, res, next) => {
  const cid = req.headers["x-correlation-id"] || uuid();
  res.setHeader("X-Correlation-Id", cid);
  next();
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "question-bank-service", ts: Date.now() });
});

app.post("/question-bank/store", (req, res) => {
  const { questions } = req.body;
  if (!questions || !Array.isArray(questions)) {
    return res.status(400).json({ error: "questions array required" });
  }
  return res.json({ status: "stored", count: questions.length, ids: questions.map(() => uuid()) });
});

app.get("/question-bank/:examId", (req, res) => {
  res.json({ examId: req.params.examId, questions: [] });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`question-bank-service listening on ${PORT}`);
});


