const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profile.controller");

router.get("/health", (req, res) => {
    res.json({ status: "ok", service: "user-profile-service", ts: Date.now() });
});

router.get("/:userId", profileController.getProfile);
router.post("/:userId/attempt", profileController.recordAttempt);

module.exports = router;
