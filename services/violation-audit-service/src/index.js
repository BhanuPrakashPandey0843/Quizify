const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { v4: uuid } = require("uuid");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 8086;

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

// In-memory violations
const violationsBySession = new Map();

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "violation-audit-service",
    timestamp: new Date().toISOString(),
  });
});

// Compute a simple severity score from proctoring events
app.post("/violations/compute", async (req, res) => {
  const { sessionId } = req.body;
  if (!sessionId) {
    return res.status(400).json({ error: "sessionId required" });
  }

  try {
    const proctorUrl =
      process.env.PROCTORING_SERVICE_URL || "http://localhost:8085";
    const resp = await fetch(
      `${proctorUrl}/proctor/session/${encodeURIComponent(sessionId)}/events`
    );
    const events = await resp.json();

    let score = 0;
    const reasons = [];

    events.forEach((e) => {
      if (e.type === "TAB_BLUR" || e.type === "VISIBILITY_HIDDEN") {
        score += 10;
        reasons.push("Left exam tab / window hidden");
      }
      if (e.type === "FULLSCREEN_EXIT") {
        score += 5;
        reasons.push("Exited fullscreen");
      }
      if (e.type === "WEBCAM_DENIED") {
        score += 20;
        reasons.push("Webcam permission denied");
      }
    });

    const record = {
      id: uuid(),
      sessionId,
      score,
      reasons,
      createdAt: Date.now(),
      autoSubmitted: score >= 30,
    };
    violationsBySession.set(sessionId, record);

    return res.json(record);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Violation compute error", err);
    return res.status(500).json({ error: "Failed to compute violations" });
  }
});

app.get("/violations/session/:sessionId", (req, res) => {
  const record = violationsBySession.get(req.params.sessionId);
  if (!record) {
    return res.status(404).json({ error: "No violations for session" });
  }
  return res.json(record);
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`violation-audit-service listening on port ${PORT}`);
});


