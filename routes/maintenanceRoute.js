import express from "express";
import {
    createRequest,
    getRequestByTenant,
    updateRequest,
    deleteRequest
} from "../services/maintenanceService.js";

 const router = express.Router();

 // Create new Maintenance

 router.post("/", async (req, res) => {
    try {
        const request = await createRequest(req.body);
        res.status(201).json(request);

    }catch (error){
         res.status(400).json({
            error: error.message
        })
    }
 })

 // Get Request by tenant ID
router.get("/:tenantId", async (req, res) =>{
    try {
        const requests =  await getRequestByTenant(req.params.tenantId);
        res.status(200).json(requests);      

    }catch (error){
         res.status(400).json({
            error: error.message
        })
    }
})

// Update Request
router.put("/:id", async (req, res) => {
    try {
        const updated = await updateRequest(req.params.id, req.body);
        res.json(updated)

    }catch (error){
         res.status(400).json({
            error: error.message
        })
    }
})

// Delete Request

router.delete ("/:id", async (req, res) => {
    try {
        await deleteRequest(req.params.id);
        res.status(200).json({ message: "Deleted Succesfully"})

    }catch (error){
         res.status(400).json({
            error: error.message
        })
    }
})

export default router;