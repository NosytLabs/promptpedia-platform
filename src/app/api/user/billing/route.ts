import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { apiResponse, handleApiError } from "@/lib/api-response"
import { requireAuth } from "@/lib/api-auth"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const session = await requireAuth(request)

    const membership = await prisma.membership.findUnique({
      where: { userId: session.user.id },
    })

    if (!membership) {
      return apiResponse.notFound("Membership not found")
    }

    return apiResponse.success({
      tier: membership.tier,
      currentPeriodStart: membership.currentPeriodStart,
      currentPeriodEnd: membership.currentPeriodEnd,
      cancelAtPeriodEnd: membership.cancelAtPeriodEnd,
      stripeSubscriptionId: membership.stripeSubscriptionId,
    })
  } catch (error) {
    return handleApiError(error)
  }
}
