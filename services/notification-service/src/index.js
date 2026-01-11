const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { v4: uuid } = require("uuid");

const app = express();
const PORT = process.env.PORT || 8093;

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
  res.json({ status: "ok", service: "notification-service", ts: Date.now() });
});

app.post("/notifications/send", (req, res) => {
  const { userId, message } = req.body;
  if (!userId || !message) {
    return res.status(400).json({ error: "userId and message required" });
  }
  return res.json({ status: "queued", id: uuid(), userId, message });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`notification-service listening on ${PORT}`);
});


