import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get("category")
    const search = searchParams.get("search")

    const where: any = { status: "PUBLISHED" }

    if (category && category !== "all") {
      where.category = category
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { content: { contains: search, mode: "insensitive" } },
      ]
    }

    const posts = await prisma.forumPost.findMany({
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
      take: 50,
    })

    const formattedPosts = posts.map((post) => ({
      ...post,
      replyCount: post._count.replies,
      _count: undefined,
    }))

    return NextResponse.json(formattedPosts, { status: 200 })
  } catch (error) {
    console.error("Error fetching forum posts:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      )
    }

    const { title, content, category } = await request.json()

    if (!title || !content) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      )
    }

    const post = await prisma.forumPost.create({
      data: {
        title,
        content,
        category: category || "general",
        userId: session.user.id,
        status: "PUBLISHED",
      },
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error("Error creating forum post:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
