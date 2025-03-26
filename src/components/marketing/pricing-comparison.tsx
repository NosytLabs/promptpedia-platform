import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Icons } from '@/components/icons'
import { trackFeatureUsage } from '@/lib/analytics'

interface PricingFeature {
  name: string
  free: boolean | string
  pro: boolean | string
  enterprise: boolean | string
}

const features: PricingFeature[] = [
  {
    name: 'Prompts',
    free: '100/month',
    pro: 'Unlimited',
    enterprise: 'Unlimited',
  },
  {
    name: 'Team Members',
    free: '1',
    pro: '5',
    enterprise: 'Unlimited',
  },
  {
    name: 'Version History',
    free: '7 days',
    pro: '30 days',
    enterprise: 'Unlimited',
  },
  {
    name: 'Templates',
    free: 'Basic',
    pro: 'Advanced',
    enterprise: 'Custom',
  },
  {
    name: 'Analytics',
    free: 'Basic',
    pro: 'Advanced',
    enterprise: 'Enterprise',
  },
  {
    name: 'API Access',
    free: false,
    pro: true,
    enterprise: true,
  },
  {
    name: 'Custom Integrations',
    free: false,
    pro: false,
    enterprise: true,
  },
  {
    name: 'Priority Support',
    free: false,
    pro: true,
    enterprise: true,
  },
  {
    name: 'SSO',
    free: false,
    pro: false,
    enterprise: true,
  },
  {
    name: 'Audit Logs',
    free: false,
    pro: true,
    enterprise: true,
  },
  {
    name: 'Custom Branding',
    free: false,
    pro: false,
    enterprise: true,
  },
  {
    name: 'Training & Onboarding',
    free: false,
    pro: false,
    enterprise: true,
  },
]

export function PricingComparison() {
  const [isAnnual, setIsAnnual] = useState(true)
  const [teamSize, setTeamSize] = useState(5)

  const calculatePrice = (basePrice: number) => {
    const monthlyPrice = basePrice * teamSize
    const annualPrice = monthlyPrice * 12 * 0.8 // 20% discount for annual
    return isAnnual ? annualPrice / 12 : monthlyPrice
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2">
          <span className={!isAnnual ? 'font-semibold' : 'text-muted-foreground'}>
            Monthly
          </span>
          <Switch
            checked={isAnnual}
            onCheckedChange={(checked) => {
              setIsAnnual(checked)
              trackFeatureUsage(checked ? 'pricing_annual' : 'pricing_monthly')
            }}
          />
          <span className={isAnnual ? 'font-semibold' : 'text-muted-foreground'}>
            Annual (20% off)
          </span>
        </div>

        <div className="w-full max-w-sm">
          <label className="block text-sm font-medium mb-2">
            Team Size: {teamSize} {teamSize === 1 ? 'member' : 'members'}
          </label>
          <Slider
            value={[teamSize]}
            onValueChange={([value]) => {
              setTeamSize(value)
              trackFeatureUsage('pricing_team_size_change')
            }}
            min={1}
            max={20}
            step={1}
            className="w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="p-6 relative">
          <h3 className="text-xl font-bold mb-2">Free</h3>
          <p className="text-muted-foreground mb-4">For individuals getting started</p>
          <div className="text-3xl font-bold mb-6">$0</div>
          <Button
            className="w-full mb-6"
            onClick={() => trackFeatureUsage('pricing_free_signup')}
          >
            Get Started
          </Button>
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                {typeof feature.free === 'boolean' ? (
                  feature.free ? (
                    <Icons.check className="w-5 h-5 text-green-500" />
                  ) : (
                    <Icons.x className="w-5 h-5 text-red-500" />
                  )
                ) : (
                  <Icons.check className="w-5 h-5 text-green-500" />
                )}
                <span>
                  {feature.name}
                  {typeof feature.free === 'string' && (
                    <span className="text-muted-foreground"> - {feature.free}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6 relative border-primary">
          <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-sm rounded-bl-lg">
            Popular
          </div>
          <h3 className="text-xl font-bold mb-2">Pro</h3>
          <p className="text-muted-foreground mb-4">For growing teams</p>
          <div className="text-3xl font-bold mb-6">
            {formatPrice(calculatePrice(19))}
            <span className="text-base font-normal text-muted-foreground">
              /mo {isAnnual && 'billed annually'}
            </span>
          </div>
          <Button
            className="w-full mb-6"
            onClick={() => trackFeatureUsage('pricing_pro_signup')}
          >
            Start Free Trial
          </Button>
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                {typeof feature.pro === 'boolean' ? (
                  feature.pro ? (
                    <Icons.check className="w-5 h-5 text-green-500" />
                  ) : (
                    <Icons.x className="w-5 h-5 text-red-500" />
                  )
                ) : (
                  <Icons.check className="w-5 h-5 text-green-500" />
                )}
                <span>
                  {feature.name}
                  {typeof feature.pro === 'string' && (
                    <span className="text-muted-foreground"> - {feature.pro}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6 relative bg-primary/5">
          <h3 className="text-xl font-bold mb-2">Enterprise</h3>
          <p className="text-muted-foreground mb-4">For large organizations</p>
          <div className="text-3xl font-bold mb-6">Custom</div>
          <Button
            variant="outline"
            className="w-full mb-6"
            onClick={() => trackFeatureUsage('pricing_enterprise_contact')}
          >
            Contact Sales
          </Button>
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                {typeof feature.enterprise === 'boolean' ? (
                  feature.enterprise ? (
                    <Icons.check className="w-5 h-5 text-green-500" />
                  ) : (
                    <Icons.x className="w-5 h-5 text-red-500" />
                  )
                ) : (
                  <Icons.check className="w-5 h-5 text-green-500" />
                )}
                <span>
                  {feature.name}
                  {typeof feature.enterprise === 'string' && (
                    <span className="text-muted-foreground"> - {feature.enterprise}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="text-center">
        <p className="text-muted-foreground mb-4">
          All plans include: 24/7 support, 99.9% uptime SLA, and automatic updates
        </p>
        <Button
          variant="outline"
          onClick={() => trackFeatureUsage('pricing_compare_features')}
        >
          Compare All Features
        </Button>
      </div>
    </div>
  )
}