import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      )
    }

    const membership = await prisma.membership.findUnique({
      where: { userId: session.user.id },
    })

    if (!membership) {
      return NextResponse.json(
        { message: "Membership not found" },
        { status: 404 }
      )
    }

    // Update membership to mark as cancel at period end
    await prisma.membership.update({
      where: { userId: session.user.id },
      data: { cancelAtPeriodEnd: true },
    })

    // TODO: Call Stripe API to cancel the subscription

    return NextResponse.json(
      { message: "Subscription scheduled for cancellation" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error cancelling subscription:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
