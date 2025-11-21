'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Prompt } from '@/types/prompt';
import { exportPromptsToJSON, exportPromptsToCSV } from '@/lib/export-prompts';
import { Button } from '@/components/ui/button';

interface ExportPromptsButtonProps {
  prompts: Prompt[];
  isPro: boolean;
}

export function ExportPromptsButton({ prompts, isPro }: ExportPromptsButtonProps) {
  const [showMenu, setShowMenu] = useState(false);

  if (!isPro || prompts.length === 0) {
    return null;
  }

  return (
    <div className="relative inline-block">
      <Button
        size="sm"
        variant="outline"
        onClick={() => setShowMenu(!showMenu)}
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8m0 8l-4-2m4 2l4-2" />
        </svg>
        Export
      </Button>
      {showMenu && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 border border-slate-200"
        >
          <button
            onClick={() => {
              exportPromptsToJSON(prompts, 'prompts-collection');
              setShowMenu(false);
            }}
            className="block w-full text-left px-4 py-2 hover:bg-slate-50 text-sm font-medium"
          >
            📄 Export as JSON
          </button>
          <button
            onClick={() => {
              exportPromptsToCSV(prompts, 'prompts-collection');
              setShowMenu(false);
            }}
            className="block w-full text-left px-4 py-2 hover:bg-slate-50 text-sm font-medium border-t border-slate-200"
          >
            📊 Export as CSV
          </button>
        </motion.div>
      )}
    </div>
  );
}
