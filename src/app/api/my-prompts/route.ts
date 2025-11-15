import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { apiResponse, handleApiError } from "@/lib/api-response"
import { requireAuth } from "@/lib/api-auth"
import { getPaginationParams, createPaginatedResponse } from "@/lib/api-pagination"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const session = await requireAuth(request)
    const { skip, take } = getPaginationParams(request.nextUrl.searchParams, 100)

    const [prompts, total] = await Promise.all([
      prisma.prompt.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" },
        skip,
        take,
      }),
      prisma.prompt.count({
        where: { userId: session.user.id },
      }),
    ])

    return apiResponse.success(
      createPaginatedResponse(prompts, total, skip, take)
    )
  } catch (error) {
    return handleApiError(error)
  }
}
