// routes/paymentRoutes.js
import express from "express";
import {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
} from "../services/paymentService.js";
import z from "zod";

const router = express.Router();


const paymentSchema = z.object({
  tenantId: z.string().min(1, "Tenant ID is required"),
  leaseId: z.string().min(1, "Lease ID is required"),
  staffId: z.string().optional(),
  amount: z.number().positive("Amount must be positive"),
  paymentMethod: z.string().optional(),
  paymentStatus: z.enum(["pending", "paid", "failed"]).default("pending"),
  notes: z.string().optional(),
});




// ✅ Create
router.post("/", async (req, res) => {
  try {
    const data = paymentSchema.parse(req.body); // Validate input
    const payment = await createPayment(data);
    res.status(201).json(payment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Read all
router.get("/", async (req, res) => {
  try {
    const payments = await getAllPayments();
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Read one
router.get("/:id", async (req, res) => {
  try {
    const payment = await getPaymentById(req.params.id);
    if (!payment) return res.status(404).json({ error: "Payment not found" });
    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Update
router.put("/:id", async (req, res) => {
  try {
    const updated = await updatePayment(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Delete
router.delete("/:id", async (req, res) => {
  try {
    await deletePayment(req.params.id);
    res.json({ message: "Payment deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
