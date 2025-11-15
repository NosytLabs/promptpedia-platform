import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { apiResponse, ApiError, handleApiError } from "@/lib/api-response"
import { requireAuth } from "@/lib/api-auth"
import { MEMBERSHIP_TIERS } from "@/lib/membership-tiers"
import { createCheckoutSession } from "@/lib/dodo-payments"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const session = await requireAuth(request)

    const searchParams = request.nextUrl.searchParams
    const tier = searchParams.get("tier")

    if (!tier || !MEMBERSHIP_TIERS[tier as keyof typeof MEMBERSHIP_TIERS]) {
      throw new ApiError("Invalid membership tier", 400)
    }

    const tierConfig = MEMBERSHIP_TIERS[tier as keyof typeof MEMBERSHIP_TIERS]

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { membership: true },
    })

    if (!user) {
      throw new ApiError("User not found", 404)
    }

    // Check if user is already on this tier
    if (user.membership?.tier === tier) {
      throw new ApiError("You are already on this plan", 400)
    }

    // Create checkout session with Dodo Payments
    const { url, sessionId } = await createCheckoutSession({
      tier: tier as "PRO" | "PREMIUM" | "ENTERPRISE",
      userId: user.id,
      userEmail: user.email || "",
      userName: user.name || "User",
    })

    // Store checkout session for reference
    await prisma.user.update({
      where: { id: user.id },
      data: {
        // We could store sessionId in a separate table if needed
      },
    })

    return apiResponse.success(
      {
        checkoutUrl: url,
        sessionId,
        tier,
        price: tierConfig.price,
      },
      200
    )
  } catch (error) {
    return handleApiError(error)
  }
}
