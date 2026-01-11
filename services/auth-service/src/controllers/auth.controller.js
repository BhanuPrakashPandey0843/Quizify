const jwt = require("jsonwebtoken");
const config = require("../config/config");

const login = (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ error: "username is required" });
  }

  // TODO: Validate user against database/identity service in real implementation
  
  const payload = {
    sub: username,
    role: "candidate",
    deviceId: "demo-device",
  };

  const accessToken = jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
  const refreshToken = jwt.sign({ ...payload, tokenType: "refresh" }, config.jwtSecret, {
    expiresIn: config.refreshTokenExpiresIn,
  });

  return res.json({ accessToken, refreshToken, user: payload });
};

const refresh = (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({ error: "refreshToken is required" });
  }

  try {
    const decoded = jwt.verify(refreshToken, config.jwtSecret);
    if (decoded.tokenType !== "refresh") {
      throw new Error("Invalid token type");
    }

    const payload = {
      sub: decoded.sub,
      role: decoded.role || "candidate",
    };

    const accessToken = jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
    
    // Optionally rotate refresh token here
    
    return res.json({ accessToken });
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired refresh token" });
  }
};

module.exports = {
  login,
  refresh,
};
