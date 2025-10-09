import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import * as propertyService from "../services/propertiesService.js";

const router = express.Router();

/**
 * @route POST /api/properties
 * @desc Create a new property
 */
router.post("/", authenticateToken, async (req, res) => {
  try {
    const property = await propertyService.createProperty(req.body);
    res.status(201).json({
      success: true,
      message: "Property created successfully",
      data: property,
    });
  } catch (error) {
    console.error("Error creating property:", error);
    res.status(500).json({
      success: false,
      message: "Error creating property",
      error: error.message,
    });
  }
});

/**
 * @route GET /api/properties
 * @desc Get all properties
 */
router.get("/", authenticateToken, async (req, res) => {
  try {
    const properties = await propertyService.getAllProperties();
    res.status(200).json({
      success: true,
      data: properties,
    });
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching properties",
      error: error.message,
    });
  }
});

/**
 * @route GET /api/properties/:id
 * @desc Get a single property by ID
 */
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const property = await propertyService.getPropertyById(req.params.id);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }
    res.status(200).json({
      success: true,
      data: property,
    });
  } catch (error) {
    console.error("Error fetching property:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching property",
      error: error.message,
    });
  }
});

/**
 * @route PUT /api/properties/:id
 * @desc Update a property
 */
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const updated = await propertyService.updateProperty(
      req.params.id,
      req.body
    );
    res.status(200).json({
      success: true,
      message: "Property updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("Error updating property:", error);
    res.status(500).json({
      success: false,
      message: "Error updating property",
      error: error.message,
    });
  }
});

/**
 * @route DELETE /api/properties/:id
 * @desc Delete a property
 */
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    await propertyService.deleteProperty(req.params.id);
    res.status(200).json({
      success: true,
      message: "Property deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting property:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting property",
      error: error.message,
    });
  }
});

export default router;
