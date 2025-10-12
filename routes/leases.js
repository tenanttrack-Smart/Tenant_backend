// routes/leaseRoutes.js
import express from "express";
import {
  getAllLeases,
  getLeaseById,
  createLease,
  updateLease,
  deleteLease,
} from "../services/leaseService.js";

const router = express.Router();

// CRUD routes
router.get("/", getAllLeases);        // GET all leases
router.get("/:id", getLeaseById);     // GET lease by ID
router.post("/", createLease);        // CREATE lease
router.put("/:id", updateLease);      // UPDATE lease
router.delete("/:id", deleteLease);   // DELETE lease

export default router;
