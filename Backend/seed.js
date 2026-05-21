require("dotenv").config();
const mongoose = require("mongoose");
const Deployment = require("./src/models/deployement");
const Log = require("./src/models/log");
const SystemMetrics = require("./src/models/systemMetrices");

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for seeding...");

    await Deployment.deleteMany({});
    await Log.deleteMany({});
    await SystemMetrics.deleteMany({});

    await Deployment.create([
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
      },
      {
        serviceName: "Database Service",
        version: "v1.1.0",
        commitId: "m2n3o4p",
        environment: "production",
        status: "success",
        duration: 95,
        owner: "Karan",
        region: "us-east-1",
      },
      {
        serviceName: "Logging Service",
        version: "v0.8.2",
        commitId: "q5r6s7t",
        environment: "staging",
        status: "pending",
        duration: 0,
        owner: "Karan",
        region: "us-east-1",
      },
    ]);

    await Log.create([
      {
        level: "info",
        service: "Backend API",
        message: "Server started successfully",
        environment: "production",
      },
      {
        level: "info",
        service: "Frontend Dashboard",
        message: "Deployment pipeline triggered",
        environment: "staging",
      },
      {
        level: "warning",
        service: "Database Service",
        message: "Database response time slightly increased",
        environment: "production",
      },
      {
        level: "error",
        service: "Auth Service",
        message: "Invalid login attempt",
        environment: "development",
      },
      {
        level: "info",
        service: "Backend API",
        message: "Health check completed successfully",
        environment: "production",
      },
      {
        level: "debug",
        service: "Logging Service",
        message: "Log stream initialized",
        environment: "staging",
      },
    ]);

    await SystemMetrics.create({
  cpuUsage: 48,
  memoryUsage: 63,
  activeDeploys: 2,
  criticalErrors: 1,
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