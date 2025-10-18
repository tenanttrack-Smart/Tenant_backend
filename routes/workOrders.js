import express from "express";
import {
  getAllWorkOrders,
  getWorkOrderById,
  createWorkOrder,
  updateWorkOrder,
  deleteWorkOrder,
} from "../services/workOrderService.js";

const router = express.Router();

// GET /api/work-orders - Get all work orders with optional filtering
router.get("/", async (req, res) => {
  try {
    const { status, priority, userId } = req.query;
    const filters = {};

    if (status) filters.status = status.toLowerCase();
    if (priority) filters.priority = priority.toLowerCase();
    if (userId) filters.userId = userId;

    const orders = await getAllWorkOrders(filters);
    res.json({
      success: true,
      data: orders,
      count: orders.length
    });
  } catch (err) {
    console.error("Error fetching work orders:", err);
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
});

// GET /api/work-orders/:id - Get work order by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({ 
        success: false,
        error: "Valid work order ID is required" 
      });
    }

    const order = await getWorkOrderById(id);
    if (!order) {
      return res.status(404).json({ 
        success: false,
        error: "Work order not found" 
      });
    }
    
    res.json({
      success: true,
      data: order
    });
  } catch (err) {
    console.error("Error fetching work order:", err);
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
});

// POST /api/work-orders - Create new work order
router.post("/", async (req, res) => {
  try {
    const { userId, title, description, apartmentName, tenantName, priority, status, assignedTo } = req.body;

    // Basic validation
    if (!userId || !title || !description || !apartmentName || !tenantName || !priority || !status) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: userId, title, description, apartmentName, tenantName, priority, status"
      });
    }

    const workOrderData = {
      userId,
      title: title.trim(),
      description: description.trim(),
      apartmentName: apartmentName.trim(),
      tenantName: tenantName.trim(),
      priority: priority.trim(),
      status: status.trim(),
      assignedTo: assignedTo ? assignedTo.trim() : null
    };

    const newOrder = await createWorkOrder(workOrderData);
    res.status(201).json({
      success: true,
      data: newOrder,
      message: "Work order created successfully"
    });
  } catch (err) {
    console.error("Error creating work order:", err);
    res.status(400).json({ 
      success: false,
      error: err.message 
    });
  }
});

// PUT /api/work-orders/:id - Update work order
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({ 
        success: false,
        error: "Valid work order ID is required" 
      });
    }

    const updateData = {};
    const allowedFields = ['title', 'description', 'apartmentName', 'tenantName', 'priority', 'status', 'assignedTo'];
    
    // Only include fields that are provided and allowed
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updateData[field] = typeof req.body[field] === 'string' ? req.body[field].trim() : req.body[field];
      }
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        error: "No valid fields provided for update"
      });
    }

    const updated = await updateWorkOrder(id, updateData);
    res.json({
      success: true,
      data: updated,
      message: "Work order updated successfully"
    });
  } catch (err) {
    console.error("Error updating work order:", err);
    const statusCode = err.message.includes("not found") ? 404 : 400;
    res.status(statusCode).json({ 
      success: false,
      error: err.message 
    });
  }
});

// DELETE /api/work-orders/:id - Delete work order
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({ 
        success: false,
        error: "Valid work order ID is required" 
      });
    }

    const deleted = await deleteWorkOrder(id);
    res.json({
      success: true,
      data: deleted,
      message: "Work order deleted successfully"
    });
  } catch (err) {
    console.error("Error deleting work order:", err);
    const statusCode = err.message.includes("not found") ? 404 : 400;
    res.status(statusCode).json({ 
      success: false,
      error: err.message 
    });
  }
});

export default router;
