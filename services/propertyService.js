const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllProperties = async () => {
  return await prisma.property.findMany();
};

const getPropertyById = async (id) => {
  return await prisma.property.findUnique({ where: { id } });
};

const createProperty = async (data) => {
  return await prisma.property.create({ data });
};

const updateProperty = async (id, data) => {
  return await prisma.property.update({ where: { id }, data });
};

const deleteProperty = async (id) => {
  return await prisma.property.delete({ where: { id } });
};

module.exports = {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
};
