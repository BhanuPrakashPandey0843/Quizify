const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { v4: uuid } = require("uuid");
const config = require("./config/config");
const authMiddleware = require("./middleware/auth.middleware");
const proxyRoutes = require("./routes/proxy.routes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

// Correlation ID Middleware
app.use((req, res, next) => {
  const existingId = req.headers["x-correlation-id"];
  const correlationId = existingId || uuid();
  req.correlationId = correlationId;
  res.setHeader("X-Correlation-Id", correlationId);
  next();
});

app.use(morgan(":method :url :status - :response-time ms - cid=:req[x-correlation-id]"));

// Health Check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "api-gateway", timestamp: new Date().toISOString() });
});

// Routes
// Note: We apply authMiddleware to /api but we need to exclude public auth routes inside it or structure differently.
// The authMiddleware implementation handles exclusion of public routes.
app.use("/api", authMiddleware, proxyRoutes);

app.listen(config.port, () => {
  console.log(`API Gateway running on port ${config.port}`);
});
