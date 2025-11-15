"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { MEMBERSHIP_TIERS, MembershipTierConfig } from "@/lib/membership-tiers"

interface CheckoutButtonProps {
  tier: "PRO" | "PREMIUM" | "ENTERPRISE"
  className?: string
  text?: string
}

export function CheckoutButton({
  tier,
  className,
  text,
}: CheckoutButtonProps) {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const tierConfig = MEMBERSHIP_TIERS[tier]

  const handleCheckout = async () => {
    if (!session?.user?.id) {
      window.location.href = "/auth/signin"
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/checkout?tier=${tier}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Checkout failed")
      }

      // Redirect to Dodo Payments checkout
      if (data.data?.checkoutUrl) {
        window.location.href = data.data.checkoutUrl
      } else {
        throw new Error("No checkout URL provided")
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Checkout failed"
      setError(message)
      console.error("Checkout error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <Button
        onClick={handleCheckout}
        disabled={loading}
        className={className}
        size="lg"
      >
        {loading ? "Processing..." : text || "Upgrade Now"}
      </Button>
      {error && (
        <p className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}
