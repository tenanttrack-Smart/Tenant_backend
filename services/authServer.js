import prisma from "../lib/prisma.js";

// GET all users
export async function getAllUsers() {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

// GET single user by ID
export async function getUserById(id) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  if (!user) throw new Error("User not found");
  return user;
}

//  CREATE user
export async function createUser(data) {
  const { name, email, password, role } = data;

  const allowedRoles = ["TENANT", "LANDLORD", "STAFF"];
  const assignedRole = allowedRoles.includes(role) ? role : "TENANT";

  return await prisma.user.create({
    data: {
      name,
      email,
      password,
      role: assignedRole,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
}

//  UPDATE user
export async function updateUser(id, data) {
  const { name, email, role } = data;

  const allowedRoles = ["TENANT", "LANDLORD", "STAFF"];
  const assignedRole = allowedRoles.includes(role) ? role : undefined;

  return await prisma.user.update({
    where: { id },
    data: {
      name,
      email,
      ...(assignedRole && { role: assignedRole }),
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
}

//  DELETE user
export async function deleteUser(id) {
  return await prisma.user.delete({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
}
