const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { v4: uuid } = require("uuid");

const app = express();
const PORT = process.env.PORT || 8096;

app.use(express.json({ limit: "5mb" }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use((req, res, next) => {
  const cid = req.headers["x-correlation-id"] || uuid();
  res.setHeader("X-Correlation-Id", cid);
  next();
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "question-ai-service", ts: Date.now() });
});

app.post("/question-ai/extract", (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "text required" });
  }
  return res.json({
    jobId: uuid(),
    questions: [
      {
        id: uuid(),
        text: "Sample AI-generated question",
        options: ["A", "B", "C", "D"],
        correctIndex: 0,
        status: "NEEDS_REVIEW",
      },
    ],
  });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`question-ai-service listening on ${PORT}`);
});


