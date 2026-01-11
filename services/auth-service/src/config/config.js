module.exports = {
  port: process.env.PORT || 8081,
  jwtSecret: process.env.JWT_SECRET || "dev-secret-change-in-prod",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "10m",
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d",
};
