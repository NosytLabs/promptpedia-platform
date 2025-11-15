import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      )
    }

    const userId = session.user.id

    const [prompts, forumPosts] = await Promise.all([
      prisma.prompt.findMany({
        where: { userId },
        select: {
          id: true,
          status: true,
          viewCount: true,
          likeCount: true,
        },
      }),
      prisma.forumPost.count({
        where: { userId },
      }),
    ])

    const stats = {
      promptsCreated: prompts.length,
      promptsPublished: prompts.filter((p) => p.status === "PUBLISHED").length,
      totalViews: prompts.reduce((sum, p) => sum + p.viewCount, 0),
      totalLikes: prompts.reduce((sum, p) => sum + p.likeCount, 0),
      forumPostsCount: forumPosts,
    }

    return NextResponse.json(stats, { status: 200 })
  } catch (error) {
    console.error("Error fetching user stats:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
