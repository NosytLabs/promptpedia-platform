"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MEMBERSHIP_TIERS } from "@/lib/membership-tiers"
import * as toast from "@/lib/toast"

interface CheckoutButtonProps {
  tier: "PRO" | "PREMIUM" | "ENTERPRISE"
  className?: string
  text?: string
}

async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  retries = 3
) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options)
      if (response.ok) return response
      if (response.status >= 500 && i < retries - 1) {
        // Retry on server error
        await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)))
        continue
      }
      return response
    } catch (err) {
      if (i < retries - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)))
        continue
      }
      throw err
    }
  }
  throw new Error("Failed after retries")
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
    const toastId = toast.loading("Preparing checkout...")

    try {
      const response = await fetchWithRetry(`/api/checkout?tier=${tier}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || data.message || "Checkout failed")
      }

      // Redirect to Dodo Payments checkout
      if (data.data?.checkoutUrl) {
        toast.removeToast(toastId)
        window.location.href = data.data.checkoutUrl
      } else {
        throw new Error("No checkout URL provided")
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Checkout failed"
      setError(message)
      toast.removeToast(toastId)
      toast.error(message, "Checkout Error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      <Button
        onClick={handleCheckout}
        disabled={loading}
        className={className}
        size="lg"
        aria-busy={loading}
      >
        {loading ? "Preparing checkout..." : text || "Upgrade Now"}
      </Button>
      {error && (
        <Alert variant="destructive" className="text-sm">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
