'use client';

import { MEMBERSHIP_TIERS } from '@/lib/membership-tiers';

export default function PricingComparison() {
  // Filter to show only FREE, PRO, PREMIUM tiers
  const displayTiers = ['FREE', 'PRO', 'PREMIUM'].map(
    (tierId) => MEMBERSHIP_TIERS[tierId as keyof typeof MEMBERSHIP_TIERS]
  );

  const plans = displayTiers.map((tier) => ({
    id: tier.id,
    name: tier.name,
    displayName: tier.displayName,
    price: tier.price === 0 ? '$0' : `${tier.price}`,
    period: tier.price === 0 ? 'forever' : 'per month',
    description: tier.description,
    features: tier.features.slice(0, 6),
    popular: tier.id === 'PRO',
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {plans.map((plan) => (
        <div
          key={plan.id}
          className={`relative rounded-2xl border p-8 ${
            plan.popular
              ? 'border-blue-500 shadow-xl scale-105'
              : 'border-slate-200'
          }`}
        >
          {plan.popular && (
            <div className="absolute -top-4 left-0 right-0 flex justify-center">
              <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </span>
            </div>
          )}

          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-2">{plan.displayName}</h3>
            <p className="text-sm text-slate-600 mb-4 min-h-[40px]">{plan.description}</p>
            <div className="flex items-baseline justify-center mb-1">
              <span className="text-4xl font-bold">{plan.price}</span>
              {plan.price !== '$0' && (
                <span className="text-slate-500 ml-1">/ {plan.period}</span>
              )}
            </div>
          </div>

          <ul className="space-y-3 mb-8 min-h-[180px]">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-start text-sm">
                <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
                <span className="text-slate-700">{feature}</span>
              </li>
            ))}
          </ul>

          <button
            className={`w-full py-3 rounded-lg font-semibold transition-colors ${
              plan.popular
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
            }`}
          >
            {plan.price === '$0' ? 'Get Started' : 'Choose Plan'}
          </button>
        </div>
      ))}
    </div>
  );
}
