export interface MembershipTierConfig {
  id: string
  name: string
  displayName: string
  price: number
  billingPeriod: "month" | "year"
  description: string
  features: string[]
  customPromptsLimit: number
  forumAccessLevel: string
  supportPriority: string
  analyticsAccess: boolean
  apiAccess: boolean
  customBranding: boolean
  stripeProductId?: string
  stripePriceId?: string
}

export const MEMBERSHIP_TIERS: Record<string, MembershipTierConfig> = {
  FREE: {
    id: "free",
    name: "Free",
    displayName: "Free Plan",
    price: 0,
    billingPeriod: "month",
    description: "Perfect for getting started with prompt engineering",
    features: [
      "Browse 100+ community prompts",
      "Create up to 5 custom prompts",
      "Basic forum access",
      "Community support",
      "Tag and organize prompts",
    ],
    customPromptsLimit: 5,
    forumAccessLevel: "basic",
    supportPriority: "standard",
    analyticsAccess: false,
    apiAccess: false,
    customBranding: false,
  },
  PRO: {
    id: "pro",
    name: "Pro",
    displayName: "Pro Plan",
    price: 9.99,
    billingPeriod: "month",
    description: "For serious prompt engineers building production systems",
    features: [
      "Everything in Free",
      "Create up to 50 custom prompts",
      "Advanced forum features",
      "Priority support",
      "Prompt analytics dashboard",
      "Version history for prompts",
      "Collaborative workspaces",
      "API access (10k calls/month)",
      "Export prompts as templates",
    ],
    customPromptsLimit: 50,
    forumAccessLevel: "pro",
    supportPriority: "priority",
    analyticsAccess: true,
    apiAccess: true,
    customBranding: false,
  },
  PREMIUM: {
    id: "premium",
    name: "Premium",
    displayName: "Premium Plan",
    price: 29.99,
    billingPeriod: "month",
    description: "For teams and professionals who need advanced features",
    features: [
      "Everything in Pro",
      "Unlimited custom prompts",
      "Team collaboration tools",
      "Advanced analytics",
      "24/7 priority support",
      "API access (100k calls/month)",
      "Webhook integrations",
      "Custom branding",
      "Team member management",
      "Audit logs",
    ],
    customPromptsLimit: 999999,
    forumAccessLevel: "premium",
    supportPriority: "24/7",
    analyticsAccess: true,
    apiAccess: true,
    customBranding: true,
  },
  ENTERPRISE: {
    id: "enterprise",
    name: "Enterprise",
    displayName: "Enterprise Plan",
    price: 0, // Custom pricing
    billingPeriod: "year",
    description: "Custom solutions for large organizations",
    features: [
      "Everything in Premium",
      "Unlimited API calls",
      "Dedicated account manager",
      "Custom integrations",
      "On-premises deployment",
      "Advanced security features",
      "SSO / SAML support",
      "Custom SLA",
      "Priority feature requests",
    ],
    customPromptsLimit: 999999,
    forumAccessLevel: "enterprise",
    supportPriority: "dedicated",
    analyticsAccess: true,
    apiAccess: true,
    customBranding: true,
  },
}

export const MEMBERSHIP_TIER_VALUES = Object.keys(MEMBERSHIP_TIERS)

export function getMembershipTier(
  tierId: string
): MembershipTierConfig | undefined {
  return MEMBERSHIP_TIERS[tierId]
}

export function getMembershipTierByName(
  name: string
): MembershipTierConfig | undefined {
  return Object.values(MEMBERSHIP_TIERS).find(
    (tier) => tier.name.toLowerCase() === name.toLowerCase()
  )
}
