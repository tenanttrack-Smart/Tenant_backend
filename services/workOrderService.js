import prisma from "../lib/prisma.js";

export const getAllWorkOrders = async (filters = {}) => {
  return await prisma.workOrder.findMany({
    where: filters,
    orderBy: { createdAt: "desc" },
  });
};

export const getWorkOrderById = async (id) => {
  return await prisma.workOrder.findUnique({
    where: { id: parseInt(id) },
  });
};

export const createWorkOrder = async (data) => {
  return await prisma.workOrder.create({ data });
};

export const updateWorkOrder = async (id, data) => {
  return await prisma.workOrder.update({
    where: { id: parseInt(id) },
    data,
  });
};

export const deleteWorkOrder = async (id) => {
  return await prisma.workOrder.delete({
    where: { id: parseInt(id) },
  });
};
