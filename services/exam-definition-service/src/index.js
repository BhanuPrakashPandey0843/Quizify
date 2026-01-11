const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { v4: uuid } = require("uuid");

const app = express();
const PORT = process.env.PORT || 8082;

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

// In-memory exam catalog for demo
const exams = [
  {
    id: "afcat-demo",
    name: "AFCAT Demo Exam",
    durationMinutes: 120,
    negativeMarking: 0.33,
    totalMarks: 300,
    sections: [
      {
        id: "sec-1",
        name: "General Awareness",
        durationMinutes: 30,
        autoLock: true,
        allowBackNavigation: false,
      },
      {
        id: "sec-2",
        name: "Verbal Ability",
        durationMinutes: 30,
        autoLock: true,
        allowBackNavigation: true,
      },
      {
        id: "sec-3",
        name: "Numerical Ability",
        durationMinutes: 30,
        autoLock: false,
        allowBackNavigation: true,
      },
      {
        id: "sec-4",
        name: "Reasoning & Military Aptitude",
        durationMinutes: 30,
        autoLock: false,
        allowBackNavigation: true,
      },
    ],
  },
];

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "exam-definition-service",
    timestamp: new Date().toISOString(),
  });
});

// List all exams
app.get("/exams", (_req, res) => {
  const minimal = exams.map((e) => ({
    id: e.id,
    name: e.name,
    durationMinutes: e.durationMinutes,
    totalMarks: e.totalMarks,
  }));
  res.json(minimal);
});

// Get full definition
app.get("/exams/:id", (req, res) => {
  const exam = exams.find((e) => e.id === req.params.id);
  if (!exam) {
    return res.status(404).json({ error: "Exam not found" });
  }
  return res.json(exam);
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`exam-definition-service listening on port ${PORT}`);
});


