const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { v4: uuid } = require("uuid");

function createService({ name, port, registerRoutes }) {
  const app = express();

  app.use(express.json({ limit: "1mb" }));
  app.use(cors());
  app.use(helmet());

  // Correlation IDs for tracing
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

  app.get("/health", (_req, res) => {
    res.json({ status: "ok", service: name, timestamp: new Date().toISOString() });
  });

  if (typeof registerRoutes === "function") {
    registerRoutes(app);
  }

  const server = app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`${name} listening on port ${port}`);
  });

  return { app, server };
}

module.exports = {
  createService,
};


