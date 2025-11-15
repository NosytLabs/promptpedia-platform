/**
 * Dodo Payments Checkout Integration
 * Client-side utilities for Dodo Payments checkout
 */

interface DodoCheckoutConfig {
  publicKey: string
  tier: "PRO" | "PREMIUM" | "ENTERPRISE"
  userId: string
  userEmail: string
  userName?: string
}

/**
 * Initialize Dodo Payments checkout
 * Loads the Dodo Payments checkout script
 */
export async function initializeDodoCheckout() {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script")
    script.src = "https://checkout.dodopayments.com/checkout.min.js"
    script.async = true
    script.onload = () => resolve(true)
    script.onerror = () => reject(new Error("Failed to load Dodo Payments script"))
    document.head.appendChild(script)
  })
}

/**
 * Open Dodo Payments checkout modal
 */
export async function openDodoCheckout(config: DodoCheckoutConfig) {
  try {
    // Load checkout script if not already loaded
    if (!(window as any).Dodo) {
      await initializeDodoCheckout()
    }

    const dodo = (window as any).Dodo

    if (!dodo) {
      throw new Error("Dodo Payments not loaded")
    }

    // Open checkout modal
    dodo.checkout.open({
      publicKey: config.publicKey,
      tier: config.tier,
      customer: {
        email: config.userEmail,
        name: config.userName || "User",
      },
      metadata: {
        userId: config.userId,
        tier: config.tier,
      },
      onSuccess: (session: any) => {
        console.log("Checkout successful", session)
        // Redirect to success page
        window.location.href = "/settings/billing?success=true"
      },
      onCancel: () => {
        console.log("Checkout canceled")
      },
      onError: (error: any) => {
        console.error("Checkout error", error)
      },
    })
  } catch (error) {
    console.error("Error opening Dodo checkout:", error)
    throw error
  }
}

/**
 * Get Dodo Payments public key from environment
 */
export function getDodoPublicKey(): string {
  const key = process.env.NEXT_PUBLIC_DODO_PUBLIC_KEY
  if (!key) {
    throw new Error("NEXT_PUBLIC_DODO_PUBLIC_KEY not configured")
  }
  return key
}

/**
 * Format price for display
 */
export function formatPrice(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount)
}

/**
 * Handle checkout success
 */
export async function handleCheckoutSuccess(sessionId: string) {
  try {
    // Verify session and update user membership
    const response = await fetch(`/api/checkout/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionId }),
    })

    if (!response.ok) {
      throw new Error("Failed to verify checkout")
    }

    return await response.json()
  } catch (error) {
    console.error("Error handling checkout success:", error)
    throw error
  }
}
