"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, CheckCircle } from "lucide-react"
import { MEMBERSHIP_TIERS } from "@/lib/membership-tiers"

interface BillingData {
  tier: string
  currentPeriodStart?: string
  currentPeriodEnd?: string
  cancelAtPeriodEnd: boolean
  stripeSubscriptionId?: string
}

export default function BillingSettingsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [billing, setBilling] = useState<BillingData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
    } else if (status === "authenticated") {
      fetchBillingData()
    }
  }, [status, router])

  const fetchBillingData = async () => {
    try {
      const response = await fetch("/api/user/billing")
      if (response.ok) {
        const data = await response.json()
        setBilling(data)
      }
    } catch (error) {
      console.error("Failed to fetch billing data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpgrade = (tierId: string) => {
    window.location.href = `/api/checkout?tier=${tierId}`
  }

  const handleCancelSubscription = async () => {
    if (!confirm("Are you sure you want to cancel your subscription?")) return

    try {
      const response = await fetch("/api/user/subscription/cancel", {
        method: "POST",
      })

      if (response.ok) {
        fetchBillingData()
        alert("Subscription cancelled successfully")
      }
    } catch (error) {
      console.error("Failed to cancel subscription:", error)
      alert("Failed to cancel subscription")
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const currentTier = billing?.tier || "FREE"
  const currentTierConfig = MEMBERSHIP_TIERS[currentTier]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/dashboard" className="flex items-center text-blue-600 hover:text-blue-700 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Billing & Subscription</h1>
          <p className="text-gray-600 mb-8">Manage your subscription and billing details</p>

          {billing?.cancelAtPeriodEnd && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>
                Your subscription will be cancelled at the end of your billing period.
              </AlertDescription>
            </Alert>
          )}

          {/* Current Plan */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Current Plan</h2>
            <Card className="p-6 border-2 border-blue-600">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {currentTierConfig?.displayName}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {currentTierConfig?.description}
                  </p>
                  {billing?.currentPeriodEnd && (
                    <p className="text-sm text-gray-600">
                      Renews on {new Date(billing.currentPeriodEnd).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
              </div>

              {!billing?.cancelAtPeriodEnd && currentTier !== "FREE" && (
                <Button
                  onClick={handleCancelSubscription}
                  variant="outline"
                  className="mt-4 text-red-600 hover:text-red-700"
                >
                  Cancel Subscription
                </Button>
              )}
            </Card>
          </div>

          {/* Plan Features */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Your {currentTierConfig?.name} Plan Includes
            </h2>
            <ul className="space-y-3">
              {currentTierConfig?.features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Upgrade Options */}
        {currentTier !== "ENTERPRISE" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Upgrade Your Plan</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {Object.values(MEMBERSHIP_TIERS)
                .filter((tier) => tier.id !== currentTier && tier.id !== "free")
                .map((tier) => (
                  <Card key={tier.id} className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {tier.displayName}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{tier.description}</p>
                    <div className="mb-6">
                      {tier.price === 0 ? (
                        <div className="text-2xl font-bold">Free</div>
                      ) : (
                        <div>
                          <span className="text-3xl font-bold">${tier.price}</span>
                          <span className="text-gray-600">/month</span>
                        </div>
                      )}
                    </div>
                    <Button
                      onClick={() => handleUpgrade(tier.id)}
                      className="w-full"
                    >
                      Upgrade to {tier.name}
                    </Button>
                  </Card>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
