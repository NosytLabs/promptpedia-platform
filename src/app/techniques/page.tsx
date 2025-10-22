'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function TechniquesPage() {
  const techniques = [
    {
      id: 'one-shot',
      name: 'One-Shot Learning',
      description: 'Train AI models with a single example to understand patterns and apply them to new inputs.',
      icon: '1️⃣',
      difficulty: 'Beginner',
      useWhen: 'You have one perfect example and want consistent formatting',
      examples: ['Sentiment analysis', 'Data extraction', 'Format conversion'],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'few-shot',
      name: 'Few-Shot Learning',
      description: 'Provide 2-5 examples to establish patterns for style, tone, or structure.',
      icon: '🎯',
      difficulty: 'Beginner',
      useWhen: 'You need to demonstrate nuanced patterns or variations',
      examples: ['Creative writing style', 'Complex classification', 'Brand voice matching'],
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 'chain-of-thought',
      name: 'Chain-of-Thought (CoT)',
      description: 'Force explicit step-by-step reasoning for complex problems and calculations.',
      icon: '🔗',
      difficulty: 'Intermediate',
      useWhen: 'Solving multi-step problems requiring transparent logic',
      examples: ['Math problems', 'Complex analysis', 'Strategic planning'],
      color: 'from-green-500 to-emerald-500',
    },
    {
      id: 'zero-shot',
      name: 'Zero-Shot Prompting',
      description: 'Get results without examples by leveraging the model\'s pre-trained knowledge.',
      icon: '⚡',
      difficulty: 'Beginner',
      useWhen: 'Task is straightforward and well-understood by the model',
      examples: ['Simple translations', 'Basic summarization', 'Common tasks'],
      color: 'from-yellow-500 to-orange-500',
    },
    {
      id: 'prompt-chaining',
      name: 'Prompt Chaining',
      description: 'Break complex tasks into sequential steps, feeding outputs as inputs.',
      icon: '⛓️',
      difficulty: 'Advanced',
      useWhen: 'Task is too complex for one prompt or needs specialized steps',
      examples: ['Research workflows', 'Content pipelines', 'Multi-stage analysis'],
      color: 'from-red-500 to-rose-500',
    },
    {
      id: 'self-consistency',
      name: 'Self-Consistency',
      description: 'Generate multiple reasoning paths and select the most consistent answer.',
      icon: '✓',
      difficulty: 'Advanced',
      useWhen: 'Accuracy is critical and you want to verify reasoning',
      examples: ['Critical calculations', 'Important decisions', 'Fact verification'],
      color: 'from-indigo-500 to-purple-500',
    },
    {
      id: 'role-based',
      name: 'Role-Based Prompting',
      description: 'Assign specific expertise roles to get specialized, authoritative responses.',
      icon: '👔',
      difficulty: 'Beginner',
      useWhen: 'You need domain expertise or professional perspective',
      examples: ['Expert consultation', 'Technical reviews', 'Professional advice'],
      color: 'from-teal-500 to-cyan-500',
    },
    {
      id: 'structured-debate',
      name: 'Structured Debate',
      description: 'Force analysis of multiple perspectives before reaching a conclusion.',
      icon: '⚖️',
      difficulty: 'Advanced',
      useWhen: 'Complex decisions needing balanced consideration',
      examples: ['Strategic decisions', 'Policy analysis', 'Investment evaluation'],
      color: 'from-amber-500 to-yellow-500',
    },
    {
      id: 'iterative-refinement',
      name: 'Iterative Refinement',
      description: 'Draft, critique, and revise in multiple passes for high-quality output.',
      icon: '🔄',
      difficulty: 'Intermediate',
      useWhen: 'Quality matters more than speed',
      examples: ['Important communications', 'Marketing copy', 'Documentation'],
      color: 'from-violet-500 to-purple-500',
    },
    {
      id: 'constraint-based',
      name: 'Constraint-Based Writing',
      description: 'Use specific limitations to force creative and focused solutions.',
      icon: '📏',
      difficulty: 'Intermediate',
      useWhen: 'You need creative thinking within specific bounds',
      examples: ['Social media posts', 'Copywriting', 'Creative exercises'],
      color: 'from-pink-500 to-rose-500',
    },
    {
      id: 'socratic-method',
      name: 'Socratic Method',
      description: 'Guide learning through questions rather than providing direct answers.',
      icon: '❓',
      difficulty: 'Intermediate',
      useWhen: 'Teaching, training, or developing understanding',
      examples: ['Tutoring', 'Interview prep', 'Critical thinking development'],
      color: 'from-emerald-500 to-teal-500',
    },
    {
      id: 'json-output',
      name: 'JSON Output Formatting',
      description: 'Force structured, parseable output for API integration and automation.',
      icon: '{ }',
      difficulty: 'Beginner',
      useWhen: 'Building integrations or need consistent data structure',
      examples: ['API responses', 'Data pipelines', 'Automation workflows'],
      color: 'from-slate-500 to-gray-600',
    },
  ];

  const resources = [
    {
      title: 'X/Twitter Threads',
      description: 'Follow top AI researchers and practitioners sharing cutting-edge techniques',
      accounts: ['@AnthropicAI', '@OpenAI', '@GregKamradt', '@voooooogel'],
    },
    {
      title: 'Research Papers',
      description: 'Academic papers introducing and validating these techniques',
      papers: ['Chain-of-Thought Prompting', 'Self-Consistency', 'Few-Shot Learning'],
    },
    {
      title: 'Open Source Collections',
      description: 'Community-maintained prompt libraries and frameworks',
      sources: ['Awesome Prompts', 'LangChain Hub', 'OpenAI Cookbook'],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
            Master the Art
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Prompt Engineering
            </span>{' '}
            Techniques
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Learn advanced methods used by AI practitioners worldwide. Each technique includes examples, 
            use cases, and implementation details from real production systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {techniques.map((technique, index) => (
            <motion.div
              key={technique.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={`/prompts?technique=${technique.id}`} className="block h-full group">
                <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all p-6 h-full border border-slate-200 hover:border-transparent relative overflow-hidden">
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${technique.color} opacity-10 rounded-bl-full`}></div>
                  
                  <div className="relative">
                    <div className="text-4xl mb-3">{technique.icon}</div>
                    
                    <h3 className="text-xl font-bold mb-2 text-slate-900 group-hover:text-blue-600 transition-colors">
                      {technique.name}
                    </h3>
                    
                    <div className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full mb-3">
                      {technique.difficulty}
                    </div>
                    
                    <p className="text-slate-600 mb-4 text-sm">
                      {technique.description}
                    </p>

                    <div className="mb-4">
                      <p className="text-xs font-semibold text-slate-700 mb-1">Use when:</p>
                      <p className="text-xs text-slate-600">{technique.useWhen}</p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-slate-700 mb-2">Examples:</p>
                      <div className="flex flex-wrap gap-1">
                        {technique.examples.map((example) => (
                          <span
                            key={example}
                            className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded"
                          >
                            {example}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center text-blue-600 text-sm font-medium group-hover:translate-x-1 transition-transform">
                      View prompts
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12 mb-16"
        >
          <h2 className="text-3xl font-bold mb-6 text-slate-900">📚 Learning Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-bold text-lg mb-2 text-slate-900">{resource.title}</h3>
                <p className="text-sm text-slate-600 mb-3">{resource.description}</p>
                <ul className="space-y-1">
                  {(resource.accounts || resource.papers || resource.sources)?.map((item: string) => (
                    <li key={item} className="text-sm text-blue-600 flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center bg-white rounded-2xl p-12 shadow-lg"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Apply These Techniques?</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Browse our library of production-ready prompts using these techniques, 
            or contribute your own discoveries to help the community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/prompts"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Browse Prompts
            </Link>
            <Link
              href="/submit"
              className="inline-flex items-center justify-center px-8 py-4 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors font-semibold shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Share Your Technique
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
