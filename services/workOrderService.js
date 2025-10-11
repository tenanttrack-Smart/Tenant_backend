import prisma from "../lib/prisma.js";

// Get all work orders (with optional filters)
export const getAllWorkOrders = async (filters = {}) => {
  return await prisma.workOrder.findMany({
    where: filters,
    orderBy: { createdAt: "desc" },
  });
};

// Get a single work order
export const getWorkOrderById = async (id) => {
  return await prisma.workOrder.findUnique({
    where: { id: parseInt(id) },
  });
};

// Create a new work order
export const createWorkOrder = async (data) => {
  return await prisma.workOrder.create({ data });
};

// Update work order (status or full update)
export const updateWorkOrder = async (id, data) => {
  return await prisma.workOrder.update({
    where: { id: parseInt(id) },
    data,
  });
};

// Delete a work order
export const deleteWorkOrder = async (id) => {
  return await prisma.workOrder.delete({
    where: { id: parseInt(id) },
  });
};
