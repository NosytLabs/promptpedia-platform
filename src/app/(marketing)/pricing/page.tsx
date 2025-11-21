'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Loading } from '@/components/ui/loading'
import { ErrorBoundary } from '@/components/ui/error-boundary'
import { Icons } from '@/components/icons'
import { trackFeatureUsage } from '@/lib/analytics'

const PricingComparison = dynamic(() => import('@/components/marketing/pricing-comparison'), {
  loading: () => <Loading />,
})

const faqs = [
  {
    question: 'What happens after my trial ends?',
    answer: 'After your 14-day trial, you will automatically switch to our Free plan unless you choose to upgrade. We will notify you before the trial ends.',
  },
  {
    question: 'Can I change plans later?',
    answer: 'Yes, you can upgrade, downgrade, or cancel your plan at any time. Changes take effect immediately, and we will prorate any payments.',
  },
  {
    question: 'Do you offer refunds?',
    answer: 'Yes, we offer a 30-day money-back guarantee. If you are not satisfied, contact our support team for a full refund.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards and PayPal. All payments are processed securely.',
  },
  {
    question: 'Do you offer custom plans?',
    answer: 'Contact our team to discuss your specific needs and requirements.',
  },
  {
    question: 'What kind of support do you offer?',
    answer: 'All plans include community support. Pro plans include priority email support and early access to new features.',
  },
]

const pricingPlans = [
  {
    name: 'Free',
    price: '$0',
    period: '/forever',
    description: 'Perfect for exploring',
    features: [
      'Browse 100+ production-ready prompts',
      'Rate & review prompts',
      'Submit your own prompts',
      'Search & filter by AI model',
      'Copy prompts to clipboard',
      'Community forum access',
      'Access to all guides & resources',
    ],
    notIncluded: [
      'Advanced collections',
      'Prompt export (JSON/CSV)',
      'Generate custom prompts',
      'Advanced filtering',
      'Priority support',
    ],
    cta: 'Get Started Free',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$9',
    period: '/month',
    description: 'For serious prompt engineers',
    features: [
      'Everything in Free, plus:',
      'Save unlimited collections',
      'Export prompts (JSON/CSV)',
      'Generate custom prompts with AI',
      'Advanced filtering & search',
      'Early access to new prompts',
      'View usage analytics',
      'Priority email support',
      'Ad-free experience',
    ],
    notIncluded: [],
    cta: 'Start Free Trial',
    highlighted: true,
  },
];

export default function PricingPage() {
  return (
    <ErrorBoundary>
      <main className="min-h-screen">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-16 text-center"
        >
          <h1 className="text-5xl font-bold mb-6">
            Simple, Transparent{' '}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Pricing
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Choose the perfect plan for your prompt engineering needs.
            Free plan forever. Pro includes a 14-day free trial.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              onClick={() => trackFeatureUsage('pricing_start_free')}
            >
              <Icons.rocket className="mr-2 h-5 w-5" />
              Start Free
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => trackFeatureUsage('pricing_contact_sales')}
            >
              <Icons.phone className="mr-2 h-5 w-5" />
              Contact Sales
            </Button>
          </div>
        </motion.section>

        <section className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-2xl p-8 ${
                  plan.highlighted
                    ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-2xl scale-105'
                    : 'bg-white border border-slate-200'
                }`}
              >
                {plan.highlighted && (
                  <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full mb-4">
                    MOST POPULAR
                  </span>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className={plan.highlighted ? 'text-blue-100' : 'text-slate-600'}>
                  {plan.description}
                </p>
                <div className="my-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className={plan.highlighted ? 'text-blue-100' : 'text-slate-600'}>
                    {plan.period}
                  </span>
                </div>
                <Button
                  size="lg"
                  className="w-full mb-8"
                  variant={plan.highlighted ? 'default' : 'outline'}
                  onClick={() => trackFeatureUsage(`pricing_${plan.name.toLowerCase()}`)}
                >
                  {plan.cta}
                </Button>
                <div className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <svg className={`w-5 h-5 ${plan.highlighted ? 'text-green-300' : 'text-green-600'} flex-shrink-0 mt-0.5`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                  {plan.notIncluded.length > 0 && (
                    <>
                      <div className="border-t border-slate-200 my-4" />
                      {plan.notIncluded.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3 opacity-50">
                          <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 py-16 bg-slate-50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">
              Got questions? We've got answers.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="space-y-2"
              >
                <h3 className="text-lg font-semibold">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-16 text-center"
        >
          <div className="max-w-3xl mx-auto bg-primary/5 rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-4">
              Need a Custom Solution?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our Enterprise plan can be tailored to your organization's specific needs.
              Get in touch with our sales team to discuss your requirements.
            </p>
            <div className="flex justify-center gap-4">
              <Button
                size="lg"
                onClick={() => trackFeatureUsage('pricing_schedule_demo')}
              >
                <Icons.calendar className="mr-2 h-5 w-5" />
                Schedule Demo
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => trackFeatureUsage('pricing_download_comparison')}
              >
                <Icons.download className="mr-2 h-5 w-5" />
                Download Comparison
              </Button>
            </div>
          </div>
        </motion.section>
      </main>
    </ErrorBoundary>
  )
}