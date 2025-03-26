import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { useFeatureFlags } from '@/hooks/use-feature-flags'
import { useIcon } from '@/hooks/use-icon'
import { Loading } from '@/components/ui/loading'
import { ErrorBoundary } from '@/components/ui/error-boundary'
import { trackFeatureUsage } from '@/lib/analytics'

const FeatureCard = dynamic(() => import('@/components/ui/feature-card'), {
  loading: () => <Loading />,
})

const TestimonialCard = dynamic(() => import('@/components/ui/testimonial-card'), {
  loading: () => <Loading />,
})

const NewsletterForm = dynamic(() => import('@/components/ui/newsletter-form'), {
  loading: () => <Loading />,
})

export default function Home() {
  const { isEnabled } = useFeatureFlags()
  const { getIcon } = useIcon()

  const features = [
    {
      title: 'Advanced Prompt Engineering',
      description: 'Create, test, and optimize prompts with real-time feedback and AI-powered suggestions.',
      icon: 'brain',
    },
    {
      title: 'Collaborative Workspace',
      description: 'Work together with your team in real-time, share prompts, and track version history.',
      icon: 'users',
    },
    {
      title: 'Performance Analytics',
      description: 'Monitor prompt performance, track usage metrics, and identify optimization opportunities.',
      icon: 'chart',
    },
    {
      title: 'AI Model Integration',
      description: 'Connect with popular AI models and customize prompts for each platform.',
      icon: 'robot',
    },
  ]

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'AI Research Lead',
      company: 'TechCorp',
      content: 'Promptpedia has revolutionized our prompt engineering workflow. The collaborative features and analytics are game-changing.',
      avatar: '/avatars/sarah.jpg',
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Product Manager',
      company: 'AI Solutions',
      content: 'The platform's intuitive interface and powerful optimization tools have significantly improved our prompt quality.',
      avatar: '/avatars/marcus.jpg',
    },
  ]

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ErrorBoundary>
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold mb-6">
            Modern Prompt Engineering Platform
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create, optimize, and collaborate on AI prompts with powerful tools and real-time analytics.
          </p>
        </motion.section>

        {isEnabled('features') && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {features.map((feature, index) => (
              <Suspense key={index} fallback={<Loading />}>
                <FeatureCard
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  onClick={() => trackFeatureUsage(feature.title)}
                />
              </Suspense>
            ))}
          </section>
        )}

        {isEnabled('testimonials') && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">
              What Our Users Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <Suspense key={index} fallback={<Loading />}>
                  <TestimonialCard {...testimonial} />
                </Suspense>
              ))}
            </div>
          </section>
        )}

        {isEnabled('newsletter') && (
          <section className="w-full max-w-2xl mx-auto">
            <Suspense fallback={<Loading />}>
              <NewsletterForm />
            </Suspense>
          </section>
        )}
      </ErrorBoundary>
    </main>
  )
}