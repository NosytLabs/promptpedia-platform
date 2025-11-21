'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Copy, Send, Sparkles } from 'lucide-react';

export default function GeneratePage() {
  const [userInput, setUserInput] = useState('');
  const [promptType, setPromptType] = useState('standard');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isPro] = useState(false);

  const promptTypes = [
    { value: 'standard', label: '✨ Standard Prompt', desc: 'Recommended for most tasks' },
    { value: 'reasoning', label: '🧠 Reasoning Prompt', desc: 'For complex analysis' },
    { value: 'research', label: '🔍 Deep Research', desc: 'For web-based research' },
    { value: 'custom-gpt', label: '🤖 Custom GPT', desc: 'Design your own AI agents' },
    { value: 'video', label: '🎬 Video Prompt', desc: 'For video generation' },
  ];

  const quickActions = [
    { label: '📚 Research a topic', value: 'research' },
    { label: '📊 Analyze data', value: 'analyze' },
    { label: '📝 Draft a document', value: 'draft' },
    { label: '💡 Brainstorm ideas', value: 'brainstorm' },
    { label: '🤖 Create custom GPT', value: 'custom-gpt' },
  ];

  const generatePrompt = async () => {
    if (!userInput.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/prompts/improve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: userInput,
          promptType,
          isPro,
        }),
      });

      const data = await response.json();
      if (data.data?.improved) {
        setGeneratedPrompt(data.data.improved);
      } else if (data.error) {
        setGeneratedPrompt(`Error: ${data.error}`);
      }
    } catch (error) {
      setGeneratedPrompt('Failed to generate prompt. Please try again.');
      console.error('Generation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!generatedPrompt) return;
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  const applyQuickAction = (action: string) => {
    const prompts: Record<string, string> = {
      research: 'Create a comprehensive research prompt about ',
      analyze: 'Analyze and provide insights on ',
      draft: 'Draft a professional document about ',
      brainstorm: 'Generate creative ideas for ',
      'custom-gpt': 'Create a custom GPT for ',
    };
    setUserInput(prompts[action] || '');
    setPromptType(action === 'custom-gpt' ? 'custom-gpt' : 'standard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">
              Turn your lazy prompts into{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">great ones</span>
            </h1>
            <p className="text-xl text-slate-600">Idea to prompt in seconds - get much better results from ChatGPT</p>
          </div>

          {/* Main Input */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-2 border-slate-200"
          >
            <div className="flex gap-4 items-start mb-6">
              <div className="flex-1">
                <textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="I want a prompt that will..."
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={3}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.ctrlKey) {
                      generatePrompt();
                    }
                  }}
                />
              </div>
              <button
                onClick={generatePrompt}
                disabled={loading || !userInput.trim()}
                className="bg-slate-900 text-white p-3 rounded-lg hover:bg-slate-800 disabled:opacity-50 transition-colors mt-1"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>

            {/* Prompt Type Selector */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-3">Prompt Type</label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {promptTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setPromptType(type.value)}
                    className={`p-3 rounded-lg text-sm font-medium transition-all text-left ${
                      promptType === type.value
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <div className="font-semibold">{type.label}</div>
                    <div className="text-xs opacity-75">{type.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="border-t pt-6">
              <label className="block text-sm font-semibold text-slate-700 mb-3">Quick Start</label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {quickActions.map((action) => (
                  <button
                    key={action.value}
                    onClick={() => applyQuickAction(action.value)}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Results */}
          {generatedPrompt && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg p-8 border-2 border-green-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-500" />
                  Improved Prompt
                </h3>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="bg-slate-900 text-slate-100 p-6 rounded-lg font-mono text-sm whitespace-pre-wrap break-words max-h-96 overflow-y-auto">
                {generatedPrompt}
              </div>
            </motion.div>
          )}

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center items-center py-12"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-slate-600">Improving your prompt...</p>
              </div>
            </motion.div>
          )}

          {!isPro && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-8 text-center"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Upgrade to Pro</h3>
              <p className="text-slate-600 mb-6">Get unlimited prompt improvements and test with advanced models</p>
              <Link href="/pricing">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                  View Pro Features
                </button>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
