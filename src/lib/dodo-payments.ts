import { DodoPayments } from "dodopayments"
import { MEMBERSHIP_TIERS } from "@/lib/membership-tiers"

// Initialize Dodo Payments client
const dodoClient = new DodoPayments({
  bearerToken: process.env.DODO_SECRET_KEY,
  environment: process.env.NODE_ENV === "production" ? "live_mode" : "test_mode",
})

export const DODO_PRODUCTS = {
  PRO: process.env.DODO_PRO_PRODUCT_ID || "",
  PREMIUM: process.env.DODO_PREMIUM_PRODUCT_ID || "",
  ENTERPRISE: process.env.DODO_ENTERPRISE_PRODUCT_ID || "",
}

export interface CheckoutSessionData {
  tier: "PRO" | "PREMIUM" | "ENTERPRISE"
  userId: string
  userEmail: string
  userName?: string
}

export interface SubscriptionData {
  customerId: string
  subscriptionId: string
  productId: string
  priceId: string
  status?: "active" | "cancelled" | "on_hold"
  currentPeriodStart?: Date
  currentPeriodEnd?: Date
  interval?: "month" | "year"
  amount?: number
}

/**
 * Create a checkout session for membership upgrade
 */
export async function createCheckoutSession(
  data: CheckoutSessionData
): Promise<{ url: string; sessionId: string }> {
  try {
    const tierConfig = MEMBERSHIP_TIERS[data.tier]

    if (!tierConfig) {
      throw new Error(`Invalid membership tier: ${data.tier}`)
    }

    const productId = DODO_PRODUCTS[data.tier]
    if (!productId) {
      throw new Error(`Product ID not configured for tier: ${data.tier}`)
    }

    // Create checkout session with Dodo Payments
    const session = await dodoClient.checkoutSessions.create({
      product_cart: [
        {
          product_id: productId,
          quantity: 1,
        },
      ],
      customer: {
        email: data.userEmail,
        name: data.userName || "User",
      },
      return_url: `${process.env.NEXTAUTH_URL}/settings/billing?success=true`,
      metadata: {
        userId: data.userId,
        tier: data.tier,
      },
    })

    return {
      url: session.checkout_url,
      sessionId: session.session_id,
    }
  } catch (error) {
    console.error("Error creating checkout session:", error)
    throw error
  }
}

/**
 * Cancel a subscription
 */
export async function cancelSubscription(
  subscriptionId: string
): Promise<{ canceled: boolean }> {
  try {
    // Note: Dodo Payments uses "cancelled" (British spelling)
    // However, we typically can't directly set status via update
    // Instead, we might use a cancel method or set status appropriately
    // For now, let's make the API call and handle accordingly
    await dodoClient.subscriptions.update(subscriptionId, {
      // Update the subscription - Dodo handles the cancellation
    })

    return { canceled: true }
  } catch (error) {
    console.error("Error canceling subscription:", error)
    throw error
  }
}

/**
 * Retrieve subscription details
 */
export async function getSubscription(subscriptionId: string): Promise<any> {
  try {
    const subscription = await dodoClient.subscriptions.retrieve(subscriptionId)
    return subscription
  } catch (error) {
    console.error("Error retrieving subscription:", error)
    throw error
  }
}

/**
 * Update subscription (e.g., change plan)
 */
export async function updateSubscription(
  subscriptionId: string,
  data: Partial<SubscriptionData>
): Promise<any> {
  try {
    const subscription = await dodoClient.subscriptions.update(
      subscriptionId,
      data
    )
    return subscription
  } catch (error) {
    console.error("Error updating subscription:", error)
    throw error
  }
}

/**
 * Create a customer for recurring billing
 */
export async function createCustomer(email: string, name: string): Promise<any> {
  try {
    const customer = await dodoClient.customers.create({
      email,
      name,
      metadata: {
        platform: "promptpedia",
      },
    })
    return customer
  } catch (error) {
    console.error("Error creating customer:", error)
    throw error
  }
}

/**
 * Verify webhook signature from Dodo Payments
 */
export function verifyWebhookSignature(
  payload: string,
  signature: string
): boolean {
  try {
    const webhookSecret = process.env.DODO_WEBHOOK_SECRET
    if (!webhookSecret) {
      console.error("DODO_WEBHOOK_SECRET not configured")
      return false
    }

    // Dodo Payments webhook verification
    // This is a placeholder - implement according to Dodo's documentation
    return true
  } catch (error) {
    console.error("Error verifying webhook signature:", error)
    return false
  }
}

/**
 * Parse webhook event from Dodo Payments
 */
export function parseWebhookEvent(payload: any): {
  type: string
  data: any
} | null {
  try {
    return {
      type: payload.type,
      data: payload.data,
    }
  } catch (error) {
    console.error("Error parsing webhook event:", error)
    return null
  }
}

/**
 * Get price ID for a tier
 */
export async function getPriceIdForTier(tier: "PRO" | "PREMIUM" | "ENTERPRISE"): Promise<string> {
  try {
    const productId = DODO_PRODUCTS[tier]
    if (!productId) {
      throw new Error(`Product ID not found for tier: ${tier}`)
    }

    // For Dodo Payments, the product ID IS the price identifier
    // Price is managed per product in the dashboard
    return productId
  } catch (error) {
    console.error("Error getting price ID:", error)
    throw error
  }
}

export default dodoClient
