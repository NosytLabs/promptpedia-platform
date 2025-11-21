'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const guides = [
  {
    slug: 'prompt-engineering-2025',
    title: 'Complete Guide to Prompt Engineering 2025',
    excerpt: 'Master the fundamentals of effective prompt writing with proven techniques used by top AI engineers.',
    category: 'Fundamentals',
    readTime: '8 min',
  },
  {
    slug: 'chain-of-thought-techniques',
    title: 'Chain-of-Thought Prompting: Advanced Techniques',
    excerpt: 'Learn how to make LLMs reason step-by-step for more accurate and detailed outputs.',
    category: 'Techniques',
    readTime: '6 min',
  },
  {
    slug: 'few-shot-learning',
    title: 'Few-Shot Learning with Examples',
    excerpt: 'Discover how to use examples to dramatically improve prompt performance across different AI models.',
    category: 'Techniques',
    readTime: '7 min',
  },
  {
    slug: 'midjourney-advanced-prompts',
    title: 'Advanced Midjourney Prompting',
    excerpt: 'Create stunning images with advanced Midjourney parameters and prompt structures.',
    category: 'Image Generation',
    readTime: '9 min',
  },
  {
    slug: 'dall-e-3-mastery',
    title: 'DALL-E 3 Mastery: From Text to Stunning Visuals',
    excerpt: 'Unlock the full potential of DALL-E 3 with text rendering, styles, and composition techniques.',
    category: 'Image Generation',
    readTime: '8 min',
  },
  {
    slug: 'video-generation-guide',
    title: 'Creating Cinematic Videos with Runway & Kling AI',
    excerpt: 'Generate professional-quality video content with optimized prompts for modern AI video tools.',
    category: 'Video Generation',
    readTime: '10 min',
  },
  {
    slug: 'claude-vs-gpt4',
    title: 'Claude vs GPT-4: Choosing the Right Model',
    excerpt: 'Compare Claude and GPT-4 strengths and learn which prompting strategies work best for each.',
    category: 'Model Comparison',
    readTime: '7 min',
  },
  {
    slug: 'prompt-optimization-tips',
    title: '10 Quick Wins for Prompt Optimization',
    excerpt: 'Simple, actionable tips to immediately improve your prompt results with minimal effort.',
    category: 'Tips & Tricks',
    readTime: '5 min',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4">
            Blog & <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Guides</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Learn prompt engineering mastery with in-depth guides, tutorials, and best practices.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {guides.map((guide, index) => (
            <motion.div
              key={guide.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={`/blog/${guide.slug}`}>
                <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow border border-slate-200 h-full">
                  <div className="flex items-start justify-between mb-3">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                      {guide.category}
                    </span>
                    <span className="text-sm text-slate-500">{guide.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 hover:text-blue-600">
                    {guide.title}
                  </h3>
                  <p className="text-slate-600">{guide.excerpt}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
