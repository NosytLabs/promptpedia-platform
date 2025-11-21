import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { apiResponse, ApiError, handleApiError } from "@/lib/api-response"
import { requireAuth } from "@/lib/api-auth"
import { parseJson, schemas } from "@/lib/api-validation"

export const dynamic = "force-dynamic"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const prompt = await prisma.prompt.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: { name: true, image: true, email: true },
        },
      },
    })

    if (!prompt) {
      return apiResponse.notFound("Prompt not found")
    }

    await prisma.prompt.update({
      where: { id: params.id },
      data: { viewCount: { increment: 1 } },
    })

    return apiResponse.success(prompt)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await requireAuth(request)

    const prompt = await prisma.prompt.findUnique({
      where: { id: params.id },
    })

    if (!prompt) {
      return apiResponse.notFound("Prompt not found")
    }

    if (prompt.userId !== session.user.id) {
      return apiResponse.forbidden()
    }

    const updates = await parseJson(request, schemas.prompt.update)

    // Handle category field - ensure it's always an array
    if (updates.category && typeof updates.category === 'string') {
      (updates as any).category = [updates.category]
    }

    const updatedPrompt = await prisma.prompt.update({
      where: { id: params.id },
      data: {
        ...updates,
        category: updates.category ? (typeof updates.category === 'string' ? [updates.category] : updates.category) : undefined,
        aiSystems: updates.aiSystems ? (typeof updates.aiSystems === 'string' ? [updates.aiSystems] : updates.aiSystems) : undefined,
      },
    })

    return apiResponse.success(updatedPrompt)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await requireAuth(request)

    const prompt = await prisma.prompt.findUnique({
      where: { id: params.id },
    })

    if (!prompt) {
      return apiResponse.notFound("Prompt not found")
    }

    if (prompt.userId !== session.user.id && session.user.role !== "admin") {
      return apiResponse.forbidden()
    }

    await prisma.prompt.delete({
      where: { id: params.id },
    })

    return apiResponse.success({ message: "Prompt deleted successfully" })
  } catch (error) {
    return handleApiError(error)
  }
}
