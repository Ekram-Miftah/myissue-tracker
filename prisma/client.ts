// prisma/client.ts

import { PrismaClient } from "@prisma/client";

// This logic prevents Next.js hot-reloading from creating
// hundreds of database connections in development mode.
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Check if the global instance exists, or create a new one.
export const prisma = globalForPrisma.prisma || new PrismaClient();

// Only assign the instance to the global object in development.
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma; // Export it as the default for clean imports
