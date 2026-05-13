require("dotenv").config();
const mongoose = require("mongoose");
const Deployment = require("./src/models/deployement");
const Log = require("./src/models/log");
const SystemMetrics = require("./src/models/systemMetrices");

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for seeding...");

    // Clear existing data (optional, but good for a clean state)
    await Deployment.deleteMany({});
    await Log.deleteMany({});
    await SystemMetrics.deleteMany({});

    // Create Dummy Deployments
    const deployments = await Deployment.create([
      {
        serviceName: "Backend API",
        version: "v1.0.1",
        commitId: "a1b2c3d",
        environment: "production",
        status: "success",
        duration: 120,
        owner: "Karan",
        region: "us-east-1",
      },
      {
        serviceName: "Frontend Dashboard",
        version: "v1.2.0",
        commitId: "e5f6g7h",
        environment: "staging",
        status: "in-progress",
        duration: 0,
        owner: "Karan",
        region: "us-east-1",
      },
      {
        serviceName: "Auth Service",
        version: "v0.9.5",
        commitId: "i9j0k1l",
        environment: "development",
        status: "failed",
        duration: 45,
        owner: "Karan",
        region: "us-east-1",
      }
    ]);

    // Create Dummy Logs
    await Log.create([
      {
        level: "info",
        service: "Backend API",
        message: "Server started successfully",
        environment: "production",
      },
      {
        level: "error",
        service: "Auth Service",
        message: "Invalid login attempt",
        environment: "development",
      }
    ]);

    // Create Dummy Metrics
    await SystemMetrics.create({
      cpuUsage: 45,
      memoryUsage: 60,
      activeDeploys: 2,
      criticalErrors: 0,
      status: "stable",
    });

    console.log("Database seeded successfully! ✅");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed: ❌", error.message);
    process.exit(1);
  }
};

seedData();
