'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calculator, FileText, Lightbulb, TrendingUp, Mail, Code } from 'lucide-react';

export default function ToolsPage() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const tools = [
    {
      id: 'prompt-calculator',
      title: 'Prompt Effectiveness Calculator',
      description: 'Score your prompt quality (0-100) with AI analysis',
      icon: Calculator,
      color: 'from-blue-500 to-cyan-500',
      action: 'Calculate Score',
    },
    {
      id: 'content-generator',
      title: 'Content Brief Generator',
      description: 'Auto-generate content briefs from topic + keywords',
      icon: FileText,
      color: 'from-purple-500 to-pink-500',
      action: 'Generate Brief',
    },
    {
      id: 'idea-generator',
      title: '10x Ideas Generator',
      description: 'Brainstorm 10 business ideas from one concept',
      icon: Lightbulb,
      color: 'from-yellow-500 to-orange-500',
      action: 'Generate Ideas',
    },
    {
      id: 'trending-analyzer',
      title: 'Trending Topics Analyzer',
      description: 'Find trending prompts & AI topics this week',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      action: 'Analyze Trends',
    },
    {
      id: 'email-templates',
      title: 'Email Template Library',
      description: 'Copy-paste ready email templates (20+)',
      icon: Mail,
      color: 'from-red-500 to-rose-500',
      action: 'Browse Templates',
    },
    {
      id: 'code-snippets',
      title: 'Code Snippet Library',
      description: 'Ready-to-use code examples (React, Python, SQL)',
      icon: Code,
      color: 'from-slate-600 to-slate-700',
      action: 'View Snippets',
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
            Free <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Tools & Utilities</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Boost your prompt engineering with calculators, templates, generators, and code snippets. All free for Promptpedia users.
          </p>
        </motion.div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {tools.map((tool, idx) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className={`bg-gradient-to-br ${tool.color} rounded-2xl p-8 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer group`}>
                  <Icon className="w-8 h-8 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-bold mb-2">{tool.title}</h3>
                  <p className="text-white/90 mb-6">{tool.description}</p>
                  <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-colors">
                    {tool.action}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Reference Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-12 mb-12"
        >
          <h2 className="text-3xl font-bold mb-8">📚 Quick Reference Guides</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-blue-600">Prompt Engineering Basics</h3>
              <ul className="space-y-3 text-slate-700">
                <li>✅ <strong>System Message:</strong> Set the context and role</li>
                <li>✅ <strong>Examples (Few-Shot):</strong> Show desired output</li>
                <li>✅ <strong>Step-by-Step:</strong> Use chain-of-thought</li>
                <li>✅ <strong>Output Format:</strong> Specify JSON, markdown, etc.</li>
                <li>✅ <strong>Temperature:</strong> 0 = deterministic, 1 = creative</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-purple-600">Common Use Cases</h3>
              <ul className="space-y-3 text-slate-700">
                <li>🎯 <strong>Content Creation:</strong> Blogs, emails, scripts</li>
                <li>💼 <strong>Business:</strong> Plans, strategies, analysis</li>
                <li>🧠 <strong>Learning:</strong> Tutorials, explanations</li>
                <li>💻 <strong>Development:</strong> Code generation, debugging</li>
                <li>🎨 <strong>Design:</strong> Visual descriptions, specifications</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Pro Features Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Unlock Advanced Features with Pro</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get unlimited prompt generation (4 strategies), custom prompt creation, collections, export to JSON/CSV, and priority support.
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center px-8 py-3 bg-white text-blue-600 rounded-lg font-bold hover:shadow-lg transition-shadow"
          >
            View Pricing
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
