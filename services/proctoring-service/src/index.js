const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { v4: uuid } = require("uuid");

const app = express();
const PORT = process.env.PORT || 8085;

app.use(express.json({ limit: "2mb" }));
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

// In-memory proctoring events by session
const eventsBySession = new Map();

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "proctoring-service",
    timestamp: new Date().toISOString(),
  });
});

// Receive client-side proctoring events (tab switch, fullscreen, webcam ok, etc.)
app.post("/proctor/events", (req, res) => {
  const { sessionId, type, payload } = req.body;
  if (!sessionId || !type) {
    return res.status(400).json({ error: "sessionId and type are required" });
  }
  const events = eventsBySession.get(sessionId) || [];
  events.push({
    id: uuid(),
    type,
    payload: payload || {},
    at: Date.now(),
  });
  eventsBySession.set(sessionId, events);

  return res.json({ status: "recorded" });
});

// List events for a session (used by violation-audit-service or admin)
app.get("/proctor/session/:sessionId/events", (req, res) => {
  const events = eventsBySession.get(req.params.sessionId) || [];
  return res.json(events);
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`proctoring-service listening on port ${PORT}`);
});


