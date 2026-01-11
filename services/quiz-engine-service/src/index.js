const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { v4: uuid } = require("uuid");
const config = require("./config/config");
const quizRoutes = require("./routes/quiz.routes");

const app = express();

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

app.use(morgan(":method :url :status - :response-time ms - cid=:req[x-correlation-id]"));

// Routes
app.use("/quiz", quizRoutes);

// Global Health
app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "quiz-engine-service",
    timestamp: new Date().toISOString(),
  });
});

app.listen(config.port, () => {
  console.log(`Quiz Engine Service running on port ${config.port}`);
});
