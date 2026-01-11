const { v4: uuid } = require("uuid");

const getProfile = (req, res) => {
  res.json({
    userId: req.params.userId,
    attempts: 0,
    bans: 0,
    eligibility: "ELIGIBLE",
  });
};

const recordAttempt = (req, res) => {
  res.json({ status: "recorded", userId: req.params.userId, attemptId: uuid() });
};

module.exports = {
  getProfile,
  recordAttempt,
};
