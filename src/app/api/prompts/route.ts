import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { apiResponse, ApiError, handleApiError } from "@/lib/api-response"
import { requireAuth } from "@/lib/api-auth"
import { parseJson, schemas } from "@/lib/api-validation"
import { getPaginationParams, createPaginatedResponse } from "@/lib/api-pagination"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get("category")
    const technique = searchParams.get("technique")
    const search = searchParams.get("search")
    const userId = searchParams.get("userId")
    const { skip, take } = getPaginationParams(searchParams, 100)

    const where: any = { isPublic: true, status: "PUBLISHED" }

    if (category) {
      where.category = category
    }

    if (technique) {
      where.techniques = { has: technique }
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" as const } },
        { description: { contains: search, mode: "insensitive" as const } },
      ]
    }

    if (userId) {
      where.userId = userId
    }

    const [prompts, total] = await Promise.all([
      prisma.prompt.findMany({
        where,
        include: {
          user: {
            select: { name: true, image: true },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take,
      }),
      prisma.prompt.count({ where }),
    ])

    return apiResponse.success(
      createPaginatedResponse(prompts, total, skip, take)
    )
  } catch (error) {
    return handleApiError(error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth(request)

    const body = await parseJson(request, schemas.prompt.create)

    const membership = await prisma.membership.findUnique({
      where: { userId: session.user.id },
    })

    if (!membership) {
      throw new ApiError("Membership not found", 404)
    }

    const existingPromptsCount = await prisma.prompt.count({
      where: { userId: session.user.id },
    })

    if (existingPromptsCount >= membership.customPromptsLimit) {
      throw new ApiError(
        `You have reached the limit of ${membership.customPromptsLimit} custom prompts for your ${membership.tier} plan`,
        403
      )
    }

    const prompt = await prisma.prompt.create({
      data: {
        userId: session.user.id,
        title: body.title,
        description: body.description,
        promptText: body.promptText,
        category: body.category || "General",
        techniques: body.techniques || [],
        aiSystems: body.aiSystems || [],
        tags: body.tags || [],
        examples: body.examples,
        isPublic: true,
        status: "PUBLISHED",
      },
    })

    return apiResponse.created(prompt)
  } catch (error) {
    return handleApiError(error)
  }
}
