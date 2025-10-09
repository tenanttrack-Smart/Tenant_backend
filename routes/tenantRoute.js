import express from "express";
import {
    createTenant,
    getAllTenants,
    getTenantsById,
    updateTenant,
    deleteTenant,
} from "../services/tenantService.js";

const router = express.Router();

// Create
router.post("/", async (req, res) =>{
    try{
        const tenants = await createTenant(req.body);
        res.status(201).json(tenants);

    } catch (error){
        res.status(400).json({error: error.message});
    }
});

// Get all tenants
router.get("/", async(req, res) =>{
    try{
        const tenants = await getAllTenants();
        res.status(200).json(tenants);

    }catch (error){
        res.status(500).json ({error: error.message});
    }
});

// Get Tenant ById

router.get ("/:id", async (req, res) => {
    try {
        const tenant = await getTenantsById(req.params.id);
        res.status(200).json(tenant);

    }catch(error){
        res.status(404).json({ error: error.message});
    }
})

// Updatae Tenant

router.put ("/:id", async (req, res) => {
    try {
        const tenant = await updateTenant(req.params.id, req.body);
        res.status(200).json(tenant);

    } catch (error){
        res.status(400).json({ error: error.message})
    }
});

// Delete Tenant
router.delete ("/:id", async (req, res) =>{
    try{
        const result = await deleteTenant (req.params.id);
        res.status(200).json(result);

    }catch(error){
        res.status(400).json({error: error.message});
    }
});
export default router;