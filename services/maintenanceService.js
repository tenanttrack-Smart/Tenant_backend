import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Create Request
export const createRequest = async (data) => {
  const { tenantId, title, description, priority } = data;
  return await prisma.maintenanceRequest.create({
    data: { tenantId, title, description, priority },
  });
};

// Get all requests by tenant
export const getRequestByTenant = async (tenantId) => {
  return await prisma.maintenanceRequest.findMany({
    where: { tenantId },
    include: {
      tenant: {
        select: {
          propertyName: true,
          unitNumber: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

// Update request
export const updateRequest = async (id, data) => {
  return await prisma.maintenanceRequest.update({
    where: { id },
    data,
  });
};

// Delete request
export const deleteRequest = async (id) => {
  return await prisma.maintenanceRequest.delete({
    where: { id },
  });
};
