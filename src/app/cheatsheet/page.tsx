'use client';

// Cache cheatsheet for 24 hours - static content
export const revalidate = 86400;

import { motion } from 'framer-motion';

export default function CheatsheetPage() {
  const sections = [
    {
      title: '🎯 Prompt Engineering Cheatsheet',
      items: [
        { name: 'Role-Playing', desc: "Tell AI: 'You are a [ROLE] with [EXPERTISE]'" },
        { name: 'Examples', desc: 'Show 2-3 examples of the output you want (Few-Shot)' },
        { name: 'Step-by-Step', desc: 'Use "Think step by step" for complex tasks (Chain-of-Thought)' },
        { name: 'Format', desc: 'Specify output format: "Output as JSON", "Use markdown"' },
        { name: 'Context', desc: 'Include relevant background and constraints' },
        { name: 'Tone', desc: 'Set tone: "professional", "casual", "expert"' },
        { name: 'Length', desc: 'Be specific: "200 words", "5 bullet points"' },
        { name: 'Error Handling', desc: 'Tell AI what to do if unsure or unclear' },
      ],
    },
    {
      title: '🚀 Quick Wins (Save Hours)',
      items: [
        { name: 'Content Repurposing', desc: 'Blog → Email → Tweet → LinkedIn → Video Script (1 prompt)' },
        { name: 'Email Sequences', desc: 'Generate 5-email sales funnel in 2 minutes' },
        { name: 'Code Generation', desc: 'React component + tests + documentation in 1 prompt' },
        { name: 'Document Templates', desc: 'Business plan, pitch deck, job descriptions in minutes' },
        { name: 'SEO Content', desc: 'Keyword research + blog structure + full post in one go' },
        { name: 'Customer Research', desc: 'Generate buyer personas, pain points, messaging in 1 run' },
      ],
    },
    {
      title: '💡 Pro Tips',
      items: [
        { name: 'Be Specific', desc: 'Vague prompts = vague results. Add details.' },
        { name: 'Iterate', desc: 'First output is rarely perfect. Refine with follow-ups.' },
        { name: 'Use Templates', desc: 'Copy-paste this: "For [target], [brand] solves [problem] by [solution]"' },
        { name: 'Test Models', desc: 'Claude 3.5 for analysis, GPT-4 for creativity, Mistral for speed' },
        { name: 'Save Winners', desc: 'Keep prompts that work in a collection for reuse' },
        { name: 'A/B Test', desc: 'Try 2 versions of a prompt and measure results' },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4">
            Prompt Engineering <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Cheatsheet</span>
          </h1>
          <p className="text-xl text-slate-600">Master prompt engineering in 5 minutes. Bookmark this page.</p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-12">
          {sections.map((section, sectionIdx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIdx * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-3xl font-bold mb-8">{section.title}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {section.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="border-l-4 border-blue-600 pl-4">
                    <h3 className="font-bold text-lg text-slate-900 mb-2">{item.name}</h3>
                    <p className="text-slate-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Reference */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-12 text-white"
        >
          <h2 className="text-3xl font-bold mb-6">✨ Pro Prompt Template</h2>
          <div className="bg-white/10 backdrop-blur p-6 rounded-lg font-mono text-sm space-y-2">
            <p>You are a [ROLE] with expertise in [EXPERTISE].</p>
            <p>Your task is to [SPECIFIC_TASK].</p>
            <p>Consider: [CONTEXT, CONSTRAINTS, REQUIREMENTS].</p>
            <p>Examples of good output: [EXAMPLE 1], [EXAMPLE 2].</p>
            <p>Output format: [JSON/MARKDOWN/PLAIN_TEXT].</p>
            <p>Tone: [PROFESSIONAL/CASUAL/EXPERT].</p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
