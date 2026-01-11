const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { v4: uuid } = require("uuid");

const app = express();
const PORT = process.env.PORT || 8095;

app.use(express.json({ limit: "10mb" }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use((req, res, next) => {
  const cid = req.headers["x-correlation-id"] || uuid();
  res.setHeader("X-Correlation-Id", cid);
  next();
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "pdf-ingestion-service", ts: Date.now() });
});

app.post("/pdf/upload", (req, res) => {
  const { filename, hash } = req.body;
  if (!filename) {
    return res.status(400).json({ error: "filename required" });
  }
  return res.json({ status: "uploaded", fileId: uuid(), filename, hash: hash || null });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`pdf-ingestion-service listening on ${PORT}`);
});


