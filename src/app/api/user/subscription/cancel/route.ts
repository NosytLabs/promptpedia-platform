import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { apiResponse, handleApiError, ApiError } from "@/lib/api-response"
import { requireAuth } from "@/lib/api-auth"
import { cancelSubscription } from "@/lib/dodo-payments"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth(request)

    const membership = await prisma.membership.findUnique({
      where: { userId: session.user.id },
    })

    if (!membership) {
      return apiResponse.notFound("Membership not found")
    }

    // Only cancel if user has an active subscription
    if (!membership.dodoSubscriptionId) {
      throw new ApiError(
        "No active subscription to cancel",
        400
      )
    }

    // Cancel subscription with Dodo Payments
    await cancelSubscription(membership.dodoSubscriptionId)

    // Update membership record
    await prisma.membership.update({
      where: { userId: session.user.id },
      data: {
        cancelAtPeriodEnd: true,
        updatedAt: new Date(),
      },
    })

    return apiResponse.success({
      message: "Subscription canceled successfully",
      cancelAtPeriodEnd: true,
    })
  } catch (error) {
    return handleApiError(error)
  }
}
