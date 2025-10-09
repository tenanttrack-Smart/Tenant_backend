import prisma from "../lib/prisma.js";

// Create property
export const createProperty = async (data) => {
  return await prisma.property.create({ data });
};

// Get all properties
export const getAllProperties = async () => {
  return await prisma.property.findMany();
};

// Get one property by ID
export const getPropertyById = async (id) => {
  return await prisma.property.findUnique({
    where: { id: parseInt(id) },
  });
};

// Update property
export const updateProperty = async (id, data) => {
  return await prisma.property.update({
    where: { id: parseInt(id) },
    data,
  });
};

// Delete property
export const deleteProperty = async (id) => {
  return await prisma.property.delete({
    where: { id: parseInt(id) },
  });
};
