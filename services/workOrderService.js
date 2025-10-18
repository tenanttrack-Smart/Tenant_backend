import prisma from "../lib/prisma.js";

export const getAllWorkOrders = async (filters = {}) => {
  try {
    return await prisma.workOrder.findMany({
      where: filters,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        }
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    throw new Error(`Failed to fetch work orders: ${error.message}`);
  }
};

export const getWorkOrderById = async (id) => {
  try {
    const workOrderId = parseInt(id);
    if (isNaN(workOrderId)) {
      throw new Error("Invalid work order ID");
    }

    return await prisma.workOrder.findUnique({
      where: { id: workOrderId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        }
      },
    });
  } catch (error) {
    throw new Error(`Failed to fetch work order: ${error.message}`);
  }
};

export const createWorkOrder = async (data) => {
  try {
    // Validate required fields
    const requiredFields = ['userId', 'title', 'description', 'apartmentName', 'tenantName', 'priority', 'status'];
    for (const field of requiredFields) {
      if (!data[field]) {
        throw new Error(`${field} is required`);
      }
    }

    // Validate priority and status values
    const validPriorities = ['low', 'medium', 'high', 'urgent'];
    const validStatuses = ['pending', 'in_progress', 'completed', 'cancelled'];
    
    if (!validPriorities.includes(data.priority.toLowerCase())) {
      throw new Error(`Invalid priority. Must be one of: ${validPriorities.join(', ')}`);
    }
    
    if (!validStatuses.includes(data.status.toLowerCase())) {
      throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: data.userId }
    });
    
    if (!user) {
      throw new Error("User not found");
    }

    return await prisma.workOrder.create({ 
      data: {
        ...data,
        priority: data.priority.toLowerCase(),
        status: data.status.toLowerCase()
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        }
      }
    });
  } catch (error) {
    throw new Error(`Failed to create work order: ${error.message}`);
  }
};

export const updateWorkOrder = async (id, data) => {
  try {
    const workOrderId = parseInt(id);
    if (isNaN(workOrderId)) {
      throw new Error("Invalid work order ID");
    }

    // Check if work order exists
    const existingWorkOrder = await prisma.workOrder.findUnique({
      where: { id: workOrderId }
    });
    
    if (!existingWorkOrder) {
      throw new Error("Work order not found");
    }

    // Validate priority and status if provided
    if (data.priority) {
      const validPriorities = ['low', 'medium', 'high', 'urgent'];
      if (!validPriorities.includes(data.priority.toLowerCase())) {
        throw new Error(`Invalid priority. Must be one of: ${validPriorities.join(', ')}`);
      }
      data.priority = data.priority.toLowerCase();
    }
    
    if (data.status) {
      const validStatuses = ['pending', 'in_progress', 'completed', 'cancelled'];
      if (!validStatuses.includes(data.status.toLowerCase())) {
        throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
      }
      data.status = data.status.toLowerCase();
    }

    return await prisma.workOrder.update({
      where: { id: workOrderId },
      data,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        }
      },
    });
  } catch (error) {
    throw new Error(`Failed to update work order: ${error.message}`);
  }
};

export const deleteWorkOrder = async (id) => {
  try {
    const workOrderId = parseInt(id);
    if (isNaN(workOrderId)) {
      throw new Error("Invalid work order ID");
    }

    // Check if work order exists
    const existingWorkOrder = await prisma.workOrder.findUnique({
      where: { id: workOrderId }
    });
    
    if (!existingWorkOrder) {
      throw new Error("Work order not found");
    }

    return await prisma.workOrder.delete({
      where: { id: workOrderId },
    });
  } catch (error) {
    throw new Error(`Failed to delete work order: ${error.message}`);
  }
};
