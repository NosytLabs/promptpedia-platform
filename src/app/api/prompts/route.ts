import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get("category")
    const technique = searchParams.get("technique")
    const search = searchParams.get("search")
    const userId = searchParams.get("userId")

    const where: any = { isPublic: true, status: "PUBLISHED" }

    if (category) {
      where.category = category
    }

    if (technique) {
      where.techniques = { has: technique }
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ]
    }

    if (userId) {
      where.userId = userId
    }

    const prompts = await prisma.prompt.findMany({
      where,
      include: {
        user: {
          select: { name: true, image: true },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 100,
    })

    return NextResponse.json(prompts, { status: 200 })
  } catch (error) {
    console.error("Error fetching prompts:", error)
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

    const {
      title,
      description,
      promptText,
      category,
      techniques,
      aiSystems,
      tags,
      examples,
    } = await request.json()

    if (!title || !promptText) {
      return NextResponse.json(
        { message: "Title and promptText are required" },
        { status: 400 }
      )
    }

    // Check membership limit
    const membership = await prisma.membership.findUnique({
      where: { userId: session.user.id },
    })

    if (!membership) {
      return NextResponse.json(
        { message: "Membership not found" },
        { status: 404 }
      )
    }

    const existingPromptsCount = await prisma.prompt.count({
      where: { userId: session.user.id },
    })

    if (existingPromptsCount >= membership.customPromptsLimit) {
      return NextResponse.json(
        {
          message: `You have reached the limit of ${membership.customPromptsLimit} custom prompts for your ${membership.tier} plan`,
        },
        { status: 403 }
      )
    }

    const prompt = await prisma.prompt.create({
      data: {
        userId: session.user.id,
        title,
        description,
        promptText,
        category: category || "General",
        techniques: techniques || [],
        aiSystems: aiSystems || [],
        tags: tags || [],
        examples,
        isPublic: true,
        status: "PUBLISHED",
      },
    })

    return NextResponse.json(prompt, { status: 201 })
  } catch (error) {
    console.error("Error creating prompt:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
