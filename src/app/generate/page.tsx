'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Copy, Send, Sparkles, BookOpen } from 'lucide-react';
import { TestPromptModal } from '@/components/test-prompt-modal';
import { Prompt } from '@/types/prompt';

export default function GeneratePage() {
  const [userInput, setUserInput] = useState('');
  const [strategy, setStrategy] = useState('hybrid');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isPro] = useState(false);
  const [libraryPrompts, setLibraryPrompts] = useState<Prompt[]>([]);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [showTestModal, setShowTestModal] = useState(false);

  useEffect(() => {
    // Load library prompts for Pro users
    if (isPro) {
      fetch('/api/prompts?take=10')
        .then((res) => res.json())
        .then((data) => setLibraryPrompts(data.data?.data || []))
        .catch((err) => console.error('Failed to load prompts:', err));
    }
  }, [isPro]);

  const strategies = [
    { value: 'standard', label: '✨ Standard', desc: 'Clear & effective' },
    { value: 'cot', label: '🧠 Chain-of-Thought', desc: 'Step-by-step' },
    { value: 'few-shot', label: '📚 Few-Shot', desc: 'With examples' },
    { value: 'hybrid', label: '🎯 Hybrid', desc: 'Best of all' },
  ];

  const generatePrompt = async () => {
    if (!userInput.trim()) return;
    setLoading(true);
    try {
      const response = await fetch('/api/prompts/improve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: userInput, isPro, strategy }),
      });
      const data = await response.json();
      setGeneratedPrompt(data.data?.improved || '');
    } catch (error) {
      setGeneratedPrompt('Error generating prompt. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!generatedPrompt) return;
    await navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const testLibraryPrompt = (prompt: Prompt) => {
    setSelectedPrompt(prompt);
    setShowTestModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">
              Turn your lazy prompts into{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">great ones</span>
            </h1>
            <p className="text-xl text-slate-600">Powered by advanced AI optimization techniques</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Generator */}
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-lg p-8 border-2 border-slate-200">
                {/* Input */}
                <div className="flex gap-4 items-start mb-6">
                  <div className="flex-1">
                    <textarea
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder="What do you want the prompt to do?"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-medium"
                      rows={4}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.ctrlKey) generatePrompt();
                      }}
                    />
                  </div>
                </div>

                {/* Strategy Selector */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Optimization Strategy</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {strategies.map((s) => (
                      <button
                        key={s.value}
                        onClick={() => setStrategy(s.value)}
                        className={`p-3 rounded-lg text-sm font-medium transition-all text-left ${
                          strategy === s.value ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        <div className="font-semibold">{s.label}</div>
                        <div className="text-xs opacity-75">{s.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Generate Button */}
                <button
                  onClick={generatePrompt}
                  disabled={loading || !userInput.trim()}
                  className="w-full bg-slate-900 text-white py-3 rounded-lg hover:bg-slate-800 disabled:opacity-50 transition-colors font-semibold flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  {loading ? 'Optimizing...' : 'Optimize Prompt'}
                </button>
              </motion.div>

              {/* Results */}
              {generatedPrompt && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 bg-white rounded-2xl shadow-lg p-8 border-2 border-green-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-yellow-500" />
                      Optimized Prompt
                    </h3>
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm"
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
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center items-center py-12">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    <p className="text-slate-600">Optimizing with advanced techniques...</p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Pro Features Sidebar */}
            <div className="lg:col-span-1">
              {isPro ? (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200 sticky top-4">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Test from Library
                  </h3>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {libraryPrompts.map((prompt) => (
                      <button
                        key={prompt.id}
                        onClick={() => testLibraryPrompt(prompt)}
                        className="w-full p-3 bg-white rounded-lg hover:shadow-md transition-all text-left text-sm"
                      >
                        <p className="font-medium text-slate-900 line-clamp-2">{prompt.title}</p>
                        <p className="text-xs text-slate-600 mt-1">{prompt.aiSystem?.join(', ')}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200 text-center sticky top-4">
                  <h3 className="font-bold text-slate-900 mb-3">Pro Feature</h3>
                  <p className="text-sm text-slate-600 mb-4">Test prompts from our library and get advanced optimization</p>
                  <Link href="/pricing">
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm">
                      Upgrade to Pro
                    </button>
                  </Link>
                </motion.div>
              )}
            </div>
          </div>

          {/* Info Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-16 grid md:grid-cols-4 gap-6">
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <div className="text-3xl font-bold text-blue-600 mb-2">4</div>
              <p className="font-semibold text-slate-900">Optimization Strategies</p>
              <p className="text-sm text-slate-600 mt-1">Chain-of-thought, few-shot, and hybrid approaches</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
              <div className="text-3xl font-bold text-purple-600 mb-2">⚡</div>
              <p className="font-semibold text-slate-900">Instant Results</p>
              <p className="text-sm text-slate-600 mt-1">Get optimized prompts in seconds</p>
            </div>
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <div className="text-3xl font-bold text-green-600 mb-2">🎯</div>
              <p className="font-semibold text-slate-900">Proven Techniques</p>
              <p className="text-sm text-slate-600 mt-1">Based on latest prompt engineering research</p>
            </div>
            <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
              <div className="text-3xl font-bold text-yellow-600 mb-2">🧠</div>
              <p className="font-semibold text-slate-900">Pro Testing</p>
              <p className="text-sm text-slate-600 mt-1">Test prompts before using them</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {selectedPrompt && <TestPromptModal prompt={selectedPrompt} isOpen={showTestModal} onClose={() => setShowTestModal(false)} />}
    </div>
  );
}
