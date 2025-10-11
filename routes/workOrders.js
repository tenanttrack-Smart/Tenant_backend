import express from "express";
import {
  getAllWorkOrders,
  getWorkOrderById,
  createWorkOrder,
  updateWorkOrder,
  deleteWorkOrder,
} from "../services/workOrderService.js";

const router = express.Router();

// GET /api/work-orders?status=open&priority=urgent
router.get("/", async (req, res) => {
  try {
    const { status, priority } = req.query;
    const filters = {};

    if (status) filters.status = status;
    if (priority) filters.priority = priority;

    const orders = await getAllWorkOrders(filters);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/work-orders/:id
router.get("/:id", async (req, res) => {
  try {
    const order = await getWorkOrderById(req.params.id);
    if (!order) return res.status(404).json({ error: "Work order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/work-orders
router.post("/", async (req, res) => {
  try {
    const newOrder = await createWorkOrder(req.body);
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/work-orders/:id
router.put("/:id", async (req, res) => {
  try {
    const updated = await updateWorkOrder(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/work-orders/:id
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await deleteWorkOrder(req.params.id);
    res.json(deleted);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
