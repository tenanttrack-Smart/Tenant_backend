import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.js";
import { authenticateToken } from "./middleware/auth.js";

import userRoutes from "./routes/users.js";
import propertyRoutes from "./routes/properties.js";

import notificationRoutes from "./routes/notificationRoutes.js";

import TenantRoute from "./routes/tenantRoute.js";
import workOrderRoutes from "./routes/workOrders.js";

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Mount API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use("/api/properties", propertyRoutes);

app.use("/api/notifications", notificationRoutes);

app.use("/api/tenants", TenantRoute);
app.use("/api/work-orders", workOrderRoutes);

// server.js
app.get("/test", (req, res) => {
  res.send("Server is working ✅");
});

// Protected route example
app.get("/api/protected", authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: "This is a protected route",
    user: req.user,
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : {},
  });
});

// 404 handler for undefined routes
app.all(/.*/, (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

export default app;
