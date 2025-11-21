'use client';

// Cache templates for 24 hours - static content
export const revalidate = 86400;

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Download } from 'lucide-react';

export default function TemplatesPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const templates = [
    {
      category: 'Email Marketing',
      items: [
        { name: 'Welcome Email', text: 'Subject: Welcome to [PRODUCT]!\n\nHi [NAME],\n\nThank you for joining [PRODUCT]. We\'re excited to have you.\n\nHere are 3 things to do first:\n1. Complete your profile\n2. Join our community\n3. Check out [RESOURCE]\n\nBest,\n[SENDER]' },
        { name: 'Sales Email', text: 'Subject: [NAME], I think we can help\n\nHi [NAME],\n\nI noticed [OBSERVATION].\n\nWe help [INDUSTRY] companies [RESULT] using [SOLUTION].\n\nWould you be open to a quick chat?\n\nBest,\n[SENDER]' },
      ],
    },
    {
      category: 'Business Writing',
      items: [
        { name: 'Meeting Agenda', text: 'Meeting: [TOPIC]\nDate: [DATE]\nTime: [TIME]\nDuration: 30 min\n\n📋 Agenda:\n1. Welcome (2 min)\n2. Key Discussion Points (15 min)\n3. Action Items (8 min)\n4. Next Steps (5 min)' },
        { name: 'Project Summary', text: 'Project: [NAME]\nOwner: [PERSON]\nStatus: [STATUS]\n\n✅ Completed:\n- [ITEM 1]\n- [ITEM 2]\n\n⏳ In Progress:\n- [ITEM 3]\n\n📅 Next:\n- [ITEM 4]' },
      ],
    },
    {
      category: 'Prompt Templates',
      items: [
        { name: 'Content Brief Template', text: 'Write [CONTENT_TYPE] about [TOPIC]:\n- Target audience: [AUDIENCE]\n- Main message: [MESSAGE]\n- Key points: [POINTS]\n- Call-to-action: [CTA]\n- Tone: [TONE]' },
        { name: 'Code Generation Template', text: 'Generate [LANGUAGE] code for [TASK]:\n- Requirements: [REQUIREMENTS]\n- Error handling: [HANDLING]\n- Testing: [TESTS]\n- Documentation: [DOCS]\nKeep it: production-ready, well-commented' },
      ],
    },
  ];

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

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
            Copy-Paste <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Templates</span>
          </h1>
          <p className="text-xl text-slate-600">Ready-to-use templates for emails, documents, and prompts. Customize and ship faster.</p>
        </motion.div>

        {/* Templates Grid */}
        <div className="space-y-12">
          {templates.map((section, sectionIdx) => (
            <motion.div
              key={section.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIdx * 0.1 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-slate-900">{section.category}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {section.items.map((item, itemIdx) => {
                  const id = `${section.category}-${itemIdx}`;
                  return (
                    <div key={id} className="bg-white rounded-lg border border-slate-200 hover:shadow-lg transition-shadow">
                      <div className="p-6">
                        <h3 className="text-lg font-semibold mb-4 text-slate-900">{item.name}</h3>
                        <pre className="bg-slate-50 p-4 rounded text-sm text-slate-700 overflow-auto max-h-40 mb-4 whitespace-pre-wrap font-mono">
                          {item.text}
                        </pre>
                        <button
                          onClick={() => copyToClipboard(item.text, id)}
                          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                          {copied === id ? (
                            <>
                              <Check className="w-4 h-4" /> Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" /> Copy Template
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center"
        >
          <h2 className="text-2xl font-bold mb-4">More templates coming soon!</h2>
          <p className="text-lg mb-6">Subscribe to get 50+ new templates for business, marketing, and content.</p>
        </motion.div>
      </div>
    </main>
  );
}
