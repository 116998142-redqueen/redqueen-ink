// Database client singleton — with demo fallback
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | null }

// In demo mode (no DATABASE_URL), don't crash
let prisma: PrismaClient | null = null
try {
  if (process.env.DATABASE_URL) {
    prisma = globalForPrisma.prisma ?? new PrismaClient()
    if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
    console.log('Prisma connected to database')
  } else {
    console.log('No DATABASE_URL set — running in demo mode')
  }
} catch (e) {
  console.log('Database not available — running in demo mode')
}

export { prisma }
