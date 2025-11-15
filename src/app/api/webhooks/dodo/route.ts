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
        console.log(`Unhandled event type: ${event.type}`)
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
      console.warn("Subscription created without userId metadata")
      return
    }

    const tierConfig = MEMBERSHIP_TIERS[tier as keyof typeof MEMBERSHIP_TIERS]
    if (!tierConfig) {
      console.warn(`Invalid tier in subscription: ${tier}`)
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

    console.log(`Subscription created for user ${userId} on tier ${tier}`)
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
      console.warn("Subscription updated without userId metadata")
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

    console.log(`Subscription updated for user ${userId}`)
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
      console.warn("Subscription canceled without userId metadata")
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

    console.log(`Subscription canceled for user ${userId}`)
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
      console.warn("Subscription failed without userId metadata")
      return
    }

    // Mark subscription as past due
    await prisma.membership.update({
      where: { userId },
      data: {
        // Can add a status field later if needed
      },
    })

    console.log(`Subscription failed for user ${userId}`)
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
      console.log(
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
      console.log(`Invoice payment failed for user ${membership.userId}`)
      // TODO: Send email notification and retry logic
    }
  } catch (error) {
    console.error("Error handling invoice.payment_failed:", error)
  }
}
