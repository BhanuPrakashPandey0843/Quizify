const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { v4: uuid } = require("uuid");

const app = express();
const PORT = process.env.PORT || 8091;

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
  res.json({ status: "ok", service: "admin-moderation-service", ts: Date.now() });
});

app.post("/admin/override", (req, res) => {
  const { sessionId, action } = req.body;
  if (!sessionId || !action) {
    return res.status(400).json({ error: "sessionId and action required" });
  }
  return res.json({ status: "applied", sessionId, action });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`admin-moderation-service listening on ${PORT}`);
});


