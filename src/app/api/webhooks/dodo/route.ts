import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifyWebhookSignature, parseWebhookEvent } from "@/lib/dodo-payments"
import { MEMBERSHIP_TIERS } from "@/lib/membership-tiers"

export const dynamic = "force-dynamic"

/**
 * Dodo Payments Webhook Handler
 * Handles subscription events from Dodo Payments
 */
export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get("x-dodo-signature") || ""
    const body = await request.text()

    // Verify webhook signature
    if (!verifyWebhookSignature(body, signature)) {
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 401 }
      )
    }

    const payload = JSON.parse(body)
    const event = parseWebhookEvent(payload)

    if (!event) {
      return NextResponse.json(
        { error: "Invalid event" },
        { status: 400 }
      )
    }

    // Handle different event types
    switch (event.type) {
      case "subscription.created":
        await handleSubscriptionCreated(event.data)
        break

      case "subscription.updated":
        await handleSubscriptionUpdated(event.data)
        break

      case "subscription.canceled":
        await handleSubscriptionCanceled(event.data)
        break

      case "subscription.failed":
        await handleSubscriptionFailed(event.data)
        break

      case "invoice.paid":
        await handleInvoicePaid(event.data)
        break

      case "invoice.payment_failed":
        await handleInvoicePaymentFailed(event.data)
        break

      default:
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    )
  }
}

/**
 * Handle subscription.created event
 */
async function handleSubscriptionCreated(data: any) {
  try {
    const userId = data.metadata?.userId
    const tier = data.metadata?.tier

    if (!userId) {
      return
    }

    const tierConfig = MEMBERSHIP_TIERS[tier as keyof typeof MEMBERSHIP_TIERS]
    if (!tierConfig) {
      return
    }

    // Update membership record
    await prisma.membership.upsert({
      where: { userId },
      create: {
        userId,
        tier: tier || "PRO",
        dodoCustomerId: data.customer_id,
        dodoSubscriptionId: data.id,
        currentPeriodStart: new Date(data.current_period_start),
        currentPeriodEnd: new Date(data.current_period_end),
        customPromptsLimit: tierConfig.customPromptsLimit,
        forumAccessLevel: tierConfig.forumAccessLevel,
        supportPriority: tierConfig.supportPriority,
        analyticsAccess: tierConfig.analyticsAccess,
        apiAccess: tierConfig.apiAccess,
        customBranding: tierConfig.customBranding,
      },
      update: {
        tier: tier || "PRO",
        dodoCustomerId: data.customer_id,
        dodoSubscriptionId: data.id,
        currentPeriodStart: new Date(data.current_period_start),
        currentPeriodEnd: new Date(data.current_period_end),
        customPromptsLimit: tierConfig.customPromptsLimit,
        forumAccessLevel: tierConfig.forumAccessLevel,
        supportPriority: tierConfig.supportPriority,
        analyticsAccess: tierConfig.analyticsAccess,
        apiAccess: tierConfig.apiAccess,
        customBranding: tierConfig.customBranding,
        cancelAtPeriodEnd: false,
      },
    })

  } catch (error) {
    console.error("Error handling subscription.created:", error)
    throw error
  }
}

/**
 * Handle subscription.updated event
 */
async function handleSubscriptionUpdated(data: any) {
  try {
    const userId = data.metadata?.userId
    const tier = data.metadata?.tier

    if (!userId) {
      return
    }

    const tierConfig = MEMBERSHIP_TIERS[tier as keyof typeof MEMBERSHIP_TIERS]

    await prisma.membership.update({
      where: { userId },
      data: {
        ...(tier && {
          tier,
          customPromptsLimit: tierConfig?.customPromptsLimit,
          forumAccessLevel: tierConfig?.forumAccessLevel,
          supportPriority: tierConfig?.supportPriority,
          analyticsAccess: tierConfig?.analyticsAccess,
          apiAccess: tierConfig?.apiAccess,
          customBranding: tierConfig?.customBranding,
        }),
        currentPeriodStart: new Date(data.current_period_start),
        currentPeriodEnd: new Date(data.current_period_end),
      },
    })

  } catch (error) {
    console.error("Error handling subscription.updated:", error)
  }
}

/**
 * Handle subscription.canceled event
 */
async function handleSubscriptionCanceled(data: any) {
  try {
    const userId = data.metadata?.userId

    if (!userId) {
      return
    }

    // Downgrade user to FREE tier
    await prisma.membership.update({
      where: { userId },
      data: {
        tier: "FREE",
        dodoSubscriptionId: null,
        cancelAtPeriodEnd: false,
        customPromptsLimit: 5,
        forumAccessLevel: "basic",
        supportPriority: "standard",
        analyticsAccess: false,
        apiAccess: false,
        customBranding: false,
      },
    })

  } catch (error) {
    console.error("Error handling subscription.canceled:", error)
  }
}

/**
 * Handle subscription.failed event
 */
async function handleSubscriptionFailed(data: any) {
  try {
    const userId = data.metadata?.userId

    if (!userId) {
      return
    }

    // Mark subscription as past due
    await prisma.membership.update({
      where: { userId },
      data: {
        // Can add a status field later if needed
      },
    })

    // TODO: Send email notification to user about failed payment
  } catch (error) {
    console.error("Error handling subscription.failed:", error)
  }
}

/**
 * Handle invoice.paid event
 */
async function handleInvoicePaid(data: any) {
  try {
    const subscriptionId = data.subscription_id
    const amount = data.amount_paid

    // Find user by subscription
    const membership = await prisma.membership.findFirst({
      where: { dodoSubscriptionId: subscriptionId },
    })

    if (membership) {
        `Invoice paid for user ${membership.userId}: $${amount / 100}`
      )
      // TODO: Update invoice/payment records if needed
    }
  } catch (error) {
    console.error("Error handling invoice.paid:", error)
  }
}

/**
 * Handle invoice.payment_failed event
 */
async function handleInvoicePaymentFailed(data: any) {
  try {
    const subscriptionId = data.subscription_id

    // Find user by subscription
    const membership = await prisma.membership.findFirst({
      where: { dodoSubscriptionId: subscriptionId },
    })

    if (membership) {
      // TODO: Send email notification and retry logic
    }
  } catch (error) {
    console.error("Error handling invoice.payment_failed:", error)
  }
}
