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

    const membership = await prisma.membership.findUnique({
      where: { userId },
    })

    if (!membership) {
      return NextResponse.json(
        { message: "Membership not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(membership, { status: 200 })
  } catch (error) {
    console.error("Error fetching membership:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
