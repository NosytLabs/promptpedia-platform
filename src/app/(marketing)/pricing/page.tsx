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

export const metadata = {
  title: 'Pricing - Promptpedia',
  description: 'Choose the perfect plan for your prompt engineering needs.',
}

const faqs = [
  {
    question: 'What happens after my trial ends?',
    answer: 'After your 14-day trial, you will automatically switch to our Free plan unless you choose to upgrade. We will notify you before the trial ends.',
  },
  {
    question: 'Can I change plans later?',
    answer: 'Yes, you can upgrade, downgrade, or cancel your plan at any time. Changes take effect immediately, and we'll prorate any payments.',
  },
  {
    question: 'Do you offer refunds?',
    answer: 'Yes, we offer a 30-day money-back guarantee. If you're not satisfied, contact our support team for a full refund.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and wire transfers for Enterprise plans. All payments are processed securely.',
  },
  {
    question: 'Do you offer custom plans?',
    answer: 'Yes, our Enterprise plan can be customized to your specific needs. Contact our sales team to discuss your requirements.',
  },
  {
    question: 'What kind of support do you offer?',
    answer: 'All plans include community support. Pro plans include priority email support, while Enterprise plans get dedicated support and training.',
  },
]

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
            All plans include a 14-day free trial.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              onClick={() => trackFeatureUsage('pricing_start_trial')}
            >
              <Icons.rocket className="mr-2 h-5 w-5" />
              Start Free Trial
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
          <Suspense fallback={<Loading />}>
            <PricingComparison />
          </Suspense>
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