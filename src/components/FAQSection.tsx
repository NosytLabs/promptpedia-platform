'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'What is Promptpedia?',
    answer: 'Promptpedia is a professional prompt engineering platform with 200+ curated prompts across 9 categories. Browse, test, improve, and monetize AI prompts for any task.'
  },
  {
    question: 'Is Promptpedia free?',
    answer: 'Yes! Free tier includes browsing 200+ prompts, rating system, blog guides, templates, and utilities. Pro tier ($9/month) adds unlimited AI improvements, premium models, and export features.'
  },
  {
    question: 'How do I generate or improve a prompt?',
    answer: 'Go to "AI Optimizer" and paste your prompt. Choose a strategy (Standard, Chain-of-Thought, Few-Shot, or Hybrid) and let AI enhance it. Free tier: 5 daily improvements. Pro: unlimited.'
  },
  {
    question: 'Can I submit my own prompts?',
    answer: 'Absolutely! Click "Submit Prompt" to share your prompts with the community. Your submission will be reviewed and published if it meets quality standards.'
  },
  {
    question: 'Which AI models does Promptpedia use?',
    answer: 'Free tier uses Mistral 7B and Llama. Pro tier unlocks Claude 3.5 Sonnet, GPT-4o, and more. All models accessed via OpenRouter for cost efficiency.'
  },
  {
    question: 'How is my data protected?',
    answer: 'Your data is encrypted in transit and at rest. Prompts you submit are under your ownership. Your account uses industry-standard NextAuth.js authentication.'
  },
  {
    question: 'Can I export my prompts?',
    answer: 'Yes! Pro tier users can export collections as JSON or CSV. Perfect for backup or sharing with your team.'
  },
  {
    question: 'How do I cancel my Pro subscription?',
    answer: 'Go to Settings > Billing > Subscriptions and click "Cancel". You can resubscribe anytime.'
  },
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-slate-600">Everything you need to know about Promptpedia</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition"
              >
                <h3 className="font-bold text-left text-slate-900">{faq.question}</h3>
                <ChevronDown
                  size={20}
                  className={`text-slate-600 transition-transform flex-shrink-0 ${
                    activeIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              {activeIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-6 py-4 border-t border-slate-200 bg-slate-50"
                >
                  <p className="text-slate-600">{faq.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-600 mb-4">Still have questions?</p>
          <a
            href="mailto:hello@promptpedia.com"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
