import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { apiResponse, handleApiError } from "@/lib/api-response"
import { requireAuth } from "@/lib/api-auth"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const session = await requireAuth(request)

    const [prompts, forumPosts] = await Promise.all([
      prisma.prompt.findMany({
        where: { userId: session.user.id },
        select: {
          id: true,
          status: true,
          viewCount: true,
          likeCount: true,
        },
      }),
      prisma.forumPost.count({
        where: { userId: session.user.id },
      }),
    ])

    const stats = {
      promptsCreated: prompts.length,
      promptsPublished: prompts.filter((p) => p.status === "PUBLISHED").length,
      totalViews: prompts.reduce((sum, p) => sum + p.viewCount, 0),
      totalLikes: prompts.reduce((sum, p) => sum + p.likeCount, 0),
      forumPostsCount: forumPosts,
    }

    return apiResponse.success(stats)
  } catch (error) {
    return handleApiError(error)
  }
}
