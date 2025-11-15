'use client'

import { motion } from 'framer-motion'
import { trackEngagement } from '@/lib/analytics'
import { ErrorBoundary } from '@/components/ui/error-boundary'

export default function AboutPage() {
  const team = [
    {
      name: 'Alex Thompson',
      role: 'Founder & CEO',
      bio: 'Former AI researcher with a passion for making advanced technology accessible to everyone.',
      image: '/team/alex.jpg',
    },
    {
      name: 'Dr. Maria Garcia',
      role: 'Chief Technology Officer',
      bio: 'PhD in Machine Learning with extensive experience in natural language processing and prompt engineering.',
      image: '/team/maria.jpg',
    },
    {
      name: 'James Wilson',
      role: 'Head of Product',
      bio: 'Product leader focused on creating intuitive tools that empower developers and content creators.',
      image: '/team/james.jpg',
    },
  ]

  const values = [
    {
      title: 'Community First',
      description: 'Every prompt, teardown, and playbook is sourced from practitioners sharing what works in production.',
    },
    {
      title: 'Evidence-Based Techniques',
      description: 'We verify each prompt with real transcripts, metrics, and examples from X/Twitter experiments and enterprise deployments.',
    },
    {
      title: 'Accessible Learning',
      description: 'Structured walkthroughs, annotated examples, and toolkits help builders of every skill level master advanced prompting.',
    },
    {
      title: 'Responsible Innovation',
      description: 'We highlight guardrails, risks, and mitigation tactics so the community can build responsibly and transparently.',
    },
  ]

  return (
    <ErrorBoundary>
      <main className="container mx-auto px-4 py-16">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
          onViewportEnter={() => trackEngagement('about_hero_view')}
        >
          <h1 className="text-5xl font-bold mb-6">
            About Promptpedia
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Promptpedia is the world's largest community-driven library of prompt engineering techniques.
            We curate expert-level prompts from AI practitioners, researchers, and top developers on X/Twitter.
            Learn one-shot, few-shot, chain-of-thought prompting, and more—all with real-world examples that actually work.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
          onViewportEnter={() => trackEngagement('about_values_view')}
        >
          <h2 className="text-3xl font-bold text-center mb-8">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-lg p-6 shadow-sm"
              >
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-16"
          onViewportEnter={() => trackEngagement('about_team_view')}
        >
          <h2 className="text-3xl font-bold text-center mb-8">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-lg overflow-hidden shadow-sm"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{member.role}</p>
                  <p className="text-muted-foreground">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
          onViewportEnter={() => trackEngagement('about_cta_view')}
        >
          <h2 className="text-3xl font-bold mb-4">
            Join Us in Shaping the Future of AI
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Whether you're a developer, researcher, or content creator,
            we invite you to be part of our growing community.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="/signup"
              className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
              onClick={() => trackEngagement('about_signup_click')}
            >
              Get Started
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
              onClick={() => trackEngagement('about_contact_click')}
            >
              Contact Us
            </a>
          </div>
        </motion.section>
      </main>
    </ErrorBoundary>
  )
}