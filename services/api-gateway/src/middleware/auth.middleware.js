const jwt = require("jsonwebtoken");
const config = require("../config/config");

const PUBLIC_ROUTES = ["/api/auth/login", "/api/auth/register", "/api/auth/refresh", "/api/auth/health"];

function authMiddleware(req, res, next) {
  if (config.skipAuth) {
    return next();
  }
  if (PUBLIC_ROUTES.includes(req.path)) {
    return next();
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid Authorization header" });
  }

  const token = authHeader.substring("Bearer ".length);

  try {
    const payload = jwt.verify(token, config.jwtSecret);

    req.user = {
      sub: payload.sub,
      role: payload.role,
      deviceId: payload.deviceId,
    };
    return next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

module.exports = authMiddleware;
