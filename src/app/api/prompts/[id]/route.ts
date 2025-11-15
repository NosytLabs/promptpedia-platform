import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

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
      return NextResponse.json(
        { message: "Prompt not found" },
        { status: 404 }
      )
    }

    // Increment view count
    await prisma.prompt.update({
      where: { id: params.id },
      data: { viewCount: { increment: 1 } },
    })

    return NextResponse.json(prompt, { status: 200 })
  } catch (error) {
    console.error("Error fetching prompt:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      )
    }

    const prompt = await prisma.prompt.findUnique({
      where: { id: params.id },
    })

    if (!prompt) {
      return NextResponse.json(
        { message: "Prompt not found" },
        { status: 404 }
      )
    }

    if (prompt.userId !== session.user.id) {
      return NextResponse.json(
        { message: "Forbidden" },
        { status: 403 }
      )
    }

    const updates = await request.json()

    const updatedPrompt = await prisma.prompt.update({
      where: { id: params.id },
      data: updates,
    })

    return NextResponse.json(updatedPrompt, { status: 200 })
  } catch (error) {
    console.error("Error updating prompt:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      )
    }

    const prompt = await prisma.prompt.findUnique({
      where: { id: params.id },
    })

    if (!prompt) {
      return NextResponse.json(
        { message: "Prompt not found" },
        { status: 404 }
      )
    }

    if (prompt.userId !== session.user.id && session.user.role !== "admin") {
      return NextResponse.json(
        { message: "Forbidden" },
        { status: 403 }
      )
    }

    await prisma.prompt.delete({
      where: { id: params.id },
    })

    return NextResponse.json(
      { message: "Prompt deleted successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error deleting prompt:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
