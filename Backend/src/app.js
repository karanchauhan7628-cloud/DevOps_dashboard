const express = require("express");
const authRouter = require("../src/routes/auth.routes");
const deploymentRoutes = require("./routes/deployementRoutes");
const healthRoutes = require("./routes/healthRoutes");
const logRoutes = require("./routes/logRoutes");
const authMiddleware = require("./middleware/auth.middleware");
const dashboardWebhookRoutes = require("./routes/dashboardWebhookRoutes");

const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://dev-ops-dashboard-rm1ptrsdw-karan-s-projects9.vercel.app",
  "https://dev-ops-dashboard-six.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        origin.endsWith(".vercel.app")
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(cookieParser());

// Root route — confirms backend is alive (needed for Render health checks)
app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "DevOps Dashboard API is running",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/auth", authRouter);
app.use("/api/deployments", authMiddleware.authUser, deploymentRoutes);
app.use("/api/health", authMiddleware.authUser, healthRoutes);
app.use("/api/logs", authMiddleware.authUser, logRoutes);
app.use("/api/dashboard-webhooks", dashboardWebhookRoutes);

module.exports = app;
