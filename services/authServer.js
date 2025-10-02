import prisma from "../lib/prisma"


export async function getAlluser(userId) {
  return await prisma.user.findMany({
    where: { userId },
  });
}


export async function getuserById(id, userId) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id,
        userId,
      },
      
    });

    if (!auth) {
      throw new Error("user not found");
    }

    return auth;
  } catch (error) {
    throw new Error(`Error retrieving task: ${error.message}`);
  }
}
