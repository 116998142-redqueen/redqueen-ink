// Usage / Quota management
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { plans, type PlanKey } from '@/lib/stripe'

export interface UsageInfo {
  used: number
  limit: number
  remaining: number
  plan: PlanKey
  isUnlimited: boolean
}

export async function getUsage(): Promise<UsageInfo | null> {
  const session = await auth()
  if (!session?.user?.id) return null

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  })
  if (!user) return null

  const plan = (user.plan || 'free') as PlanKey
  const planConfig = plans[plan]
  const isUnlimited = planConfig.postsPerMonth === -1

  // Count posts this month
  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)

  const postsThisMonth = await prisma.post.count({
    where: {
      userId: user.id,
      createdAt: { gte: startOfMonth },
    },
  })

  return {
    used: postsThisMonth,
    limit: planConfig.postsPerMonth,
    remaining: isUnlimited ? Infinity : planConfig.postsPerMonth - postsThisMonth,
    plan,
    isUnlimited,
  }
}

export async function checkQuota(): Promise<{ allowed: boolean; usage: UsageInfo | null }> {
  const usage = await getUsage()
  if (!usage) return { allowed: false, usage: null }
  return {
    allowed: usage.isUnlimited || usage.remaining > 0,
    usage,
  }
}
