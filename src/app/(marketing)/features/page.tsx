'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { Loading } from '@/components/ui/loading'
import { ErrorBoundary } from '@/components/ui/error-boundary'
import { trackFeatureUsage } from '@/lib/analytics'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'

const FeatureCard = dynamic(() => import('@/components/ui/feature-card'), {
  loading: () => <Loading />,
})

const InteractiveDemo = dynamic(() => import('@/components/marketing/interactive-demo'), {
  loading: () => <Loading />,
})

export default function FeaturesPage() {
  const features = [
    {
      title: 'Advanced Prompt Engineering',
      description: 'Create, test, and optimize prompts with real-time feedback and AI-powered suggestions. Our platform provides intelligent recommendations based on your goals and use cases.',
      icon: 'brain',
    },
    {
      title: 'Collaborative Workspace',
      description: 'Work together seamlessly with your team in real-time. Share prompts, track version history, and maintain a centralized repository of your best performing prompts.',
      icon: 'users',
    },
    {
      title: 'Performance Analytics',
      description: 'Monitor prompt performance with detailed analytics. Track usage metrics, identify optimization opportunities, and make data-driven decisions to improve your prompts.',
      icon: 'chart',
    },
    {
      title: 'AI Model Integration',
      description: 'Connect with popular AI models including GPT-4, Claude, and more. Customize prompts for each platform and ensure consistent performance across different models.',
      icon: 'robot',
    },
  ]

  const advancedFeatures = [
    {
      title: 'Version Control',
      description: 'Keep track of prompt iterations with built-in version control. Compare different versions, roll back changes, and maintain a history of your prompt development.',
      icon: 'git-branch',
    },
    {
      title: 'Template Library',
      description: 'Access a growing library of prompt templates for common use cases. Save time by starting with proven templates and customize them for your specific needs.',
      icon: 'library',
    },
    {
      title: 'Export & Integration',
      description: 'Export your prompts in various formats and integrate them with your existing tools and workflows. Our API makes it easy to incorporate prompts into your applications.',
      icon: 'download',
    },
    {
      title: 'Security & Compliance',
      description: 'Enterprise-grade security features ensure your prompts and data are protected. Role-based access control and audit logs help maintain compliance requirements.',
      icon: 'shield',
    },
  ]

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
            Powerful Features for Modern{' '}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Prompt Engineering
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover how Promptpedia's comprehensive feature set can transform your prompt engineering workflow
            and help you achieve better results with AI models.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              onClick={() => trackFeatureUsage('features_get_started')}
            >
              <Icons.rocket className="mr-2 h-5 w-5" />
              Get Started Free
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => trackFeatureUsage('features_view_demo')}
            >
              <Icons.play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>
        </motion.section>

        <section className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Try It Yourself</h2>
            <p className="text-lg text-muted-foreground">
              Experience the power of our platform with this interactive demo
            </p>
          </motion.div>
          <Suspense fallback={<Loading />}>
            <InteractiveDemo />
          </Suspense>
        </section>

        <section className="container mx-auto px-4 py-16 bg-slate-50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Core Features</h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to create and manage effective prompts
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Suspense key={index} fallback={<Loading />}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <FeatureCard
                    title={feature.title}
                    description={feature.description}
                    icon={feature.icon}
                    onClick={() => trackFeatureUsage(feature.title)}
                  />
                </motion.div>
              </Suspense>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Advanced Capabilities</h2>
            <p className="text-lg text-muted-foreground">
              Take your prompt engineering to the next level
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {advancedFeatures.map((feature, index) => (
              <Suspense key={index} fallback={<Loading />}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <FeatureCard
                    title={feature.title}
                    description={feature.description}
                    icon={feature.icon}
                    onClick={() => trackFeatureUsage(feature.title)}
                  />
                </motion.div>
              </Suspense>
            ))}
          </div>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="container mx-auto px-4 py-16 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Prompt Engineering?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of developers and teams who are already using Promptpedia
            to create better AI interactions.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              onClick={() => trackFeatureUsage('features_signup')}
            >
              <Icons.rocket className="mr-2 h-5 w-5" />
              Get Started Free
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => trackFeatureUsage('features_contact_sales')}
            >
              <Icons.phone className="mr-2 h-5 w-5" />
              Contact Sales
            </Button>
          </div>
        </motion.section>
      </main>
    </ErrorBoundary>
  )
}