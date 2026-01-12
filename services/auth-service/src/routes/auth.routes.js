const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.get("/health", (req, res) => {
    res.json({ status: "ok", service: "auth-service" });
});

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh", authController.refresh);

module.exports = router;
