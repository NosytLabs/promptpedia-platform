'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Prompt } from '@/types/prompt';
import { Star, Eye } from 'lucide-react';

interface RelatedPromptsProps {
  currentPrompt: Prompt;
  relatedPrompts: Prompt[];
}

export function RelatedPrompts({ currentPrompt, relatedPrompts }: RelatedPromptsProps) {
  if (relatedPrompts.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-12 border-t border-slate-200 pt-8"
    >
      <h3 className="text-2xl font-bold text-slate-900 mb-6">Related Prompts</h3>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {relatedPrompts.map((prompt, idx) => (
          <motion.div
            key={prompt.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Link href={`/prompts/${prompt.id}`}>
              <div className="h-full p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all group cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 flex-1">
                    {prompt.title}
                  </h4>
                </div>

                <p className="text-sm text-slate-600 line-clamp-2 mb-3">{prompt.description}</p>

                <div className="flex items-center justify-between text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Eye className="w-3 h-3" />
                    <span>{prompt.viewCount}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span>{parseFloat(String(prompt.rating)).toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
