import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { apiResponse, handleApiError } from "@/lib/api-response"
import { requireAuth } from "@/lib/api-auth"
import { parseJson, schemas } from "@/lib/api-validation"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const session = await requireAuth(request)

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        bio: true,
        image: true,
        createdAt: true,
      },
    })

    if (!user) {
      return apiResponse.notFound("User not found")
    }

    return apiResponse.success(user)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await requireAuth(request)

    const body = await parseJson(request, schemas.profile.update)

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: body.name,
        bio: body.bio,
      },
    })

    return apiResponse.success(user)
  } catch (error) {
    return handleApiError(error)
  }
}
