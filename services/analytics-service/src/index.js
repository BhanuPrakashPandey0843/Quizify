const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { v4: uuid } = require("uuid");

const app = express();
const PORT = process.env.PORT || 8092;

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
  res.json({ status: "ok", service: "analytics-service", ts: Date.now() });
});

app.post("/analytics/event", (req, res) => {
  const { type, payload } = req.body;
  if (!type) {
    return res.status(400).json({ error: "type required" });
  }
  return res.json({ status: "accepted", id: uuid(), type, payload: payload || {} });
});

app.get("/analytics/summary", (_req, res) => {
  res.json({ users: 0, examsTaken: 0, violations: 0, accuracy: 0 });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`analytics-service listening on ${PORT}`);
});


