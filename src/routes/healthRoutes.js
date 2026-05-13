const express = require("express");
const router = express.Router();

const { addMetrics, getMetrics } = require("../controller/health");

router.post("/", addMetrics);
router.get("/", getMetrics);

// real live backend health check
router.get("/status", (req, res) => {
  res.json({
    success: true,
    service: "Backend API",
    status: "online",
    timestamp: new Date(),
  });
});

module.exports = router;