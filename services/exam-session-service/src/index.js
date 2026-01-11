const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { v4: uuid } = require("uuid");

const app = express();
const PORT = process.env.PORT || 8083;

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

// In-memory store – for demo only
const sessions = new Map(); // sessionId -> session

// Simple user extraction from x-user-id header to avoid full auth here
function getUserId(req) {
  return req.headers["x-user-id"] || "demo-user";
}

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "exam-session-service",
    timestamp: new Date().toISOString(),
  });
});

// Start new session
app.post("/sessions", (req, res) => {
  const userId = getUserId(req);
  const { examId, durationMinutes } = req.body;

  if (!examId || !durationMinutes) {
    return res.status(400).json({ error: "examId and durationMinutes are required" });
  }

  // One active session per user per exam (simple rule)
  for (const s of sessions.values()) {
    if (s.userId === userId && s.examId === examId && s.status === "ACTIVE") {
      return res.status(409).json({ error: "Active session already exists", sessionId: s.id });
    }
  }

  const now = Date.now();
  const sessionId = uuid();
  const session = {
    id: sessionId,
    userId,
    examId,
    status: "ACTIVE",
    startedAt: now,
    endsAt: now + durationMinutes * 60 * 1000,
    lastHeartbeatAt: now,
  };
  sessions.set(sessionId, session);

  return res.status(201).json(session);
});

// Heartbeat from client to keep session alive / detect crash recovery
app.post("/sessions/:id/heartbeat", (req, res) => {
  const session = sessions.get(req.params.id);
  if (!session) {
    return res.status(404).json({ error: "Session not found" });
  }
  if (session.status !== "ACTIVE") {
    return res.status(409).json({ error: "Session is not active" });
  }

  const now = Date.now();
  session.lastHeartbeatAt = now;
  sessions.set(session.id, session);
  return res.json(session);
});

// Terminate session (manual submit or proctoring decision)
app.post("/sessions/:id/end", (req, res) => {
  const session = sessions.get(req.params.id);
  if (!session) {
    return res.status(404).json({ error: "Session not found" });
  }
  session.status = "COMPLETED";
  session.completedAt = Date.now();
  sessions.set(session.id, session);
  return res.json(session);
});

// Get session for crash recovery
app.get("/sessions/:id", (req, res) => {
  const session = sessions.get(req.params.id);
  if (!session) {
    return res.status(404).json({ error: "Session not found" });
  }
  return res.json(session);
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`exam-session-service listening on port ${PORT}`);
});


