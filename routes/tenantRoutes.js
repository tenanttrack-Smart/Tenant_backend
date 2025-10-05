import { Router } from "express";
import {
	createTenant,
	getTenants,
	getTenantById,
	updateTenant,
	deleteTenant,
} from "../controllers/tenantController.js";

const router = Router();

// POST /api/tenants -> Create tenant
router.post("/", createTenant);

// GET /api/tenants -> List tenants
router.get("/", getTenants);

// GET /api/tenants/:id -> Get tenant by ID
router.get("/:id", getTenantById);

// PUT /api/tenants/:id -> Update tenant
router.put("/:id", updateTenant);

// DELETE /api/tenants/:id -> Delete tenant
router.delete("/:id", deleteTenant);

export default router; 