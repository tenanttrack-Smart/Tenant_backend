import { PrismaClient } from '@prisma/client'

// Create a single PrismaClient instance and reuse it
// Helps avoid exhausting database connections in dev with hot reload
const globalForPrisma = globalThis

const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
	globalForPrisma.prisma = prisma
}

export default prisma 