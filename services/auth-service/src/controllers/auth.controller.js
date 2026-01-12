const jwt = require("jsonwebtoken");
const config = require("../config/config");

const register = (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: "Username, email, and password are required" });
  }

  // TODO: Save user to database/identity service
  // For now, we mock a successful registration and login

  const payload = {
    sub: username,
    email: email,
    role: "candidate",
    deviceId: "demo-device",
  };

  const accessToken = jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
  const refreshToken = jwt.sign({ ...payload, tokenType: "refresh" }, config.jwtSecret, {
    expiresIn: config.refreshTokenExpiresIn,
  });

  return res.json({ message: "Registration successful", accessToken, refreshToken, user: payload });
};

const login = (req, res) => {
  const { username } = req.body;
  // We accept username for login for now. In real app, verify password.
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
  register,
  login,
  refresh,
};
