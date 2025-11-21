'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Send, X } from 'lucide-react';
import { Prompt } from '@/types/prompt';

interface TestPromptModalProps {
  prompt: Prompt;
  isOpen: boolean;
  onClose: () => void;
}

export function TestPromptModal({ prompt, isOpen, onClose }: TestPromptModalProps) {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const testPrompt = async () => {
    if (!userInput.trim()) return;
    
    setLoading(true);
    try {
      const fullPrompt = `${prompt.promptText}\n\n${userInput}`;
      const res = await fetch('/api/prompts/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: fullPrompt }),
      });
      const data = await res.json();
      setResponse(data.data?.response || 'No response');
    } catch (error) {
      setResponse('Error testing prompt. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyPrompt = async () => {
    await navigator.clipboard.writeText(prompt.promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{prompt.title}</h2>
            <p className="text-sm text-slate-600 mt-1">{prompt.description}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Prompt Preview */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-3">Original Prompt</h3>
            <div className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm overflow-x-auto max-h-40 overflow-y-auto">
              {prompt.promptText}
            </div>
            <button
              onClick={copyPrompt}
              className="mt-2 text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <Copy className="w-4 h-4" />
              {copied ? 'Copied!' : 'Copy prompt'}
            </button>
          </div>

          {/* Test Input */}
          <div>
            <label className="font-semibold text-slate-900 block mb-2">Test Input</label>
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Enter test data for this prompt..."
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={4}
            />
          </div>

          {/* Test Button */}
          <button
            onClick={testPrompt}
            disabled={loading || !userInput.trim()}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            {loading ? 'Testing...' : 'Test Prompt'}
          </button>

          {/* Response */}
          {response && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="font-semibold text-slate-900 mb-3">Response</h3>
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg max-h-48 overflow-y-auto">
                <p className="text-slate-700 whitespace-pre-wrap">{response}</p>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
