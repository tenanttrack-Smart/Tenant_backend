import express from "express";
import {
  createReport,
  getReports,
  getReportById,
  deleteReport,
} from "../services/ReportServices.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// All routes are protected
router.use(authenticateToken);

// Create a new report
router.post("/", createReport);

// Get all reports (with optional query filters)
router.get("/", getReports);

// Get a report by ID
router.get("/:id", getReportById);

// Delete a report
router.delete("/:id", deleteReport);

export default router;
