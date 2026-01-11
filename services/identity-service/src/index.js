const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { v4: uuid } = require("uuid");

const app = express();
const PORT = process.env.PORT || 8090;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use((req, res, next) => {
  const existingId = req.headers["x-correlation-id"];
  const correlationId = existingId || uuid();
  req.correlationId = correlationId;
  res.setHeader("X-Correlation-Id", correlationId);
  next();
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "identity-service", ts: Date.now() });
});

// Device fingerprint capture stub
app.post("/identity/fingerprint", (req, res) => {
  const { userId, deviceInfo } = req.body;
  if (!userId || !deviceInfo) {
    return res.status(400).json({ error: "userId and deviceInfo required" });
  }
  return res.json({ status: "recorded", userId, deviceId: uuid() });
});

// Simple device check stub
app.post("/identity/verify", (req, res) => {
  const { userId, deviceId } = req.body;
  if (!userId || !deviceId) {
    return res.status(400).json({ error: "userId and deviceId required" });
  }
  return res.json({ status: "verified", userId, deviceId });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`identity-service listening on ${PORT}`);
});


