
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Get all leases
export const getAllLeases = async (req, res) => {
  try {
    const leases = await prisma.lease.findMany({
      include: {
        tenant: {
          select: { id: true, name: true, email: true, role: true, createdAt: true },
        },
        landlord: {
          select: { id: true, name: true, email: true, role: true, createdAt: true },
        },
        property: true,
        payments: true,
      },
    });
    res.status(200).json(leases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single lease by ID
export const getLeaseById = async (req, res) => {
  try {
    const { id } = req.params;
    const lease = await prisma.lease.findUnique({
      where: { id },
      include: {
        tenant: {
          select: { id: true, name: true, email: true, role: true, createdAt: true },
        },
        landlord: {
          select: { id: true, name: true, email: true, role: true, createdAt: true },
        },
        property: true,
        payments: true,
      },
    });
    if (!lease) return res.status(404).json({ error: "Lease not found" });
    res.status(200).json(lease);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new lease
export const createLease = async (req, res) => {
  try {
    const {
      tenantId,
      landlordId,
      propertyId,
      startDate,
      endDate,
      rentAmount,
      paymentFrequency,
      status,
      notes,
    } = req.body;

    // Optionally, validate inputs here (Zod/Joi)

    const lease = await prisma.lease.create({
      data: {
        tenantId,
        landlordId,
        propertyId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        rentAmount,
        paymentFrequency,
        status,
        notes,
      },
    });
    res.status(201).json(lease);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing lease
export const updateLease = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    // Convert dates if they exist
    if (data.startDate) data.startDate = new Date(data.startDate);
    if (data.endDate) data.endDate = new Date(data.endDate);

    const lease = await prisma.lease.update({
      where: { id },
      data,
    });
    res.status(200).json(lease);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a lease
export const deleteLease = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.lease.delete({ where: { id } });
    res.status(200).json({ message: "Lease deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
