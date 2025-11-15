import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { apiResponse, handleApiError } from "@/lib/api-response"
import { requireAuth } from "@/lib/api-auth"
import { parseJson, schemas } from "@/lib/api-validation"
import { getPaginationParams, createPaginatedResponse } from "@/lib/api-pagination"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const { skip, take } = getPaginationParams(searchParams, 50)

    const where: any = { status: "PUBLISHED" }

    if (category && category !== "all") {
      where.category = category
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" as const } },
        { content: { contains: search, mode: "insensitive" as const } },
      ]
    }

    const [posts, total] = await Promise.all([
      prisma.forumPost.findMany({
        where,
        include: {
          user: {
            select: { name: true, image: true },
          },
          _count: {
            select: { replies: true },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take,
      }),
      prisma.forumPost.count({ where }),
    ])

    const formattedPosts = posts.map((post) => ({
      ...post,
      replyCount: post._count.replies,
      _count: undefined,
    }))

    return apiResponse.success(
      createPaginatedResponse(formattedPosts, total, skip, take)
    )
  } catch (error) {
    return handleApiError(error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth(request)

    const body = await parseJson(request, schemas.forum.createPost)

    const post = await prisma.forumPost.create({
      data: {
        title: body.title,
        content: body.content,
        category: body.category || "general",
        userId: session.user.id,
        status: "PUBLISHED",
      },
    })

    return apiResponse.created(post)
  } catch (error) {
    return handleApiError(error)
  }
}
