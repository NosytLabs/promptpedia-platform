import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { apiResponse, handleApiError } from "@/lib/api-response"
import { requireAuth } from "@/lib/api-auth"

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

    await prisma.membership.update({
      where: { userId: session.user.id },
      data: { cancelAtPeriodEnd: true },
    })

    return apiResponse.success({ 
      message: "Subscription scheduled for cancellation" 
    })
  } catch (error) {
    return handleApiError(error)
  }
}
