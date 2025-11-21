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
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            Frequently Asked Questions
          </motion.h2>
          <p className="text-xl text-slate-600">Everything you need to know about Promptpedia</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-slate-200/60 hover:border-blue-200/60 overflow-hidden hover:bg-gradient-to-br hover:from-white hover:to-blue-50/30"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent transition-all duration-200"
              >
                <h3 className="font-semibold text-left text-slate-900 text-lg">{faq.question}</h3>
                <ChevronDown
                  size={24}
                  className={`text-slate-600 transition-all duration-300 flex-shrink-0 ${
                    activeIndex === index ? 'rotate-180 text-blue-600' : ''
                  }`}
                />
              </button>
              
              {activeIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="px-6 py-5 border-t border-slate-200/60 bg-gradient-to-br from-blue-50/30 to-transparent"
                >
                  <p className="text-slate-700 leading-relaxed">{faq.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-slate-600 mb-6 text-lg font-medium">Still have questions?</p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="mailto:hello@promptpedia.com"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:translate-y-[-2px]"
          >
            💬 Contact Us
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
