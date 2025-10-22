'use client';

export default function PricingComparison() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      features: [
        'Up to 10 prompts',
        'Community support',
        'Basic templates',
        'Email notifications',
      ],
    },
    {
      name: 'Pro',
      price: '$19',
      period: 'per month',
      features: [
        'Unlimited prompts',
        'Priority support',
        'Advanced templates',
        'Team collaboration',
        'API access',
        'Custom integrations',
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      features: [
        'Everything in Pro',
        'Dedicated support',
        'Custom development',
        'SLA guarantee',
        'Advanced security',
        'Training & onboarding',
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {plans.map((plan, index) => (
        <div
          key={plan.name}
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
            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
            <div className="flex items-baseline justify-center mb-1">
              <span className="text-4xl font-bold">{plan.price}</span>
              {plan.price !== 'Custom' && (
                <span className="text-slate-500 ml-1">/ {plan.period}</span>
              )}
            </div>
          </div>

          <ul className="space-y-3 mb-8">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
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
            {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
          </button>
        </div>
      ))}
    </div>
  );
}
