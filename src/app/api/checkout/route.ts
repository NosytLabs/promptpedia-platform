import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { apiResponse, ApiError, handleApiError } from "@/lib/api-response"
import { requireAuth } from "@/lib/api-auth"
import { MEMBERSHIP_TIERS } from "@/lib/membership-tiers"

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

    return apiResponse.success({
      message: "Stripe checkout not yet implemented",
      tier: tier,
      price: tierConfig.price,
    }, 501)
  } catch (error) {
    return handleApiError(error)
  }
}
