const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { v4: uuid } = require("uuid");
const config = require("./config/config");
const profileRoutes = require("./routes/profile.routes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use((req, res, next) => {
  const cid = req.headers["x-correlation-id"] || uuid();
  res.setHeader("X-Correlation-Id", cid);
  next();
});

// Routes
app.use("/profiles", profileRoutes);

// Health Check (Global)
app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "user-profile-service", ts: Date.now() });
});

app.listen(config.port, () => {
  console.log(`user-profile-service listening on ${config.port}`);
});
