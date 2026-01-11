const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { v4: uuid } = require("uuid");

const app = express();
const PORT = process.env.PORT || 8094;

app.use(express.json({ limit: "5mb" }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use((req, res, next) => {
  const cid = req.headers["x-correlation-id"] || uuid();
  res.setHeader("X-Correlation-Id", cid);
  next();
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "ocr-service", ts: Date.now() });
});

app.post("/ocr/parse", (req, res) => {
  const { images } = req.body;
  if (!images || !Array.isArray(images)) {
    return res.status(400).json({ error: "images array required" });
  }
  // Stub: return dummy text
  return res.json({
    jobId: uuid(),
    text: "Sample OCR text",
    confidence: 0.8,
  });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`ocr-service listening on ${PORT}`);
});


