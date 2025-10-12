// services/paymentService.js
import { PrismaClient } from "@prisma/client";
import z from "zod";
const prisma = new PrismaClient();




// Create a payment
export const createPayment = async (data) => {
  return await prisma.payment.create({
    data,
  });
};

// Get all payments
export const getAllPayments = async () => {
  return await prisma.payment.findMany({
   include: {
    tenant: {
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    },
    lease: true,
    staff: {
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    },
},
  });
};

// Get payment by ID
export const getPaymentById = async (id) => {
  return await prisma.payment.findUnique({
    where: { id },
    include: {
      tenant: true,
      lease: true,
      staff: true,
    },
  });
};

// Update payment
export const updatePayment = async (id, data) => {
  return await prisma.payment.update({
    where: { id },
    data,
  });
};

// Delete payment
export const deletePayment = async (id) => {
  return await prisma.payment.delete({
    where: { id },
  });
};
