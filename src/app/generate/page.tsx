'use client';

import { useState, lazy, Suspense } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Copy, Send, Sparkles } from 'lucide-react';

// Dynamic import - TestPromptModal only loads when needed
const TestPromptModal = dynamic(
  () => import('@/components/test-prompt-modal').then(mod => ({ default: mod.TestPromptModal })),
  { loading: () => <div>Loading...</div> }
);

export default function GeneratePage() {
  const [userInput, setUserInput] = useState('');
  const [strategy, setStrategy] = useState('hybrid');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isPro] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);

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
        // Add cache header to API
        signal: AbortSignal.timeout(30000),
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto">
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
                <textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Enter your prompt here... (e.g., 'write a blog post about AI')"
                  className="w-full h-40 p-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono text-sm"
                />

                {/* Strategies */}
                <div className="mt-6 space-y-2">
                  <p className="text-sm font-semibold text-slate-700">Optimization Strategy:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {strategies.map((s) => (
                      <button
                        key={s.value}
                        onClick={() => setStrategy(s.value)}
                        className={`p-3 rounded-lg text-left transition-all ${
                          strategy === s.value
                            ? 'bg-blue-600 text-white shadow-lg'
                            : 'bg-slate-100 hover:bg-slate-200'
                        }`}
                      >
                        <div className="font-semibold">{s.label}</div>
                        <div className="text-xs opacity-80">{s.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Generate Button */}
                <button
                  onClick={generatePrompt}
                  disabled={loading || !userInput.trim()}
                  className="w-full mt-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  {loading ? 'Generating...' : 'Generate & Optimize'}
                </button>

                {/* Output */}
                {generatedPrompt && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-sm font-semibold text-slate-700">Optimized Prompt:</p>
                      <button
                        onClick={copyToClipboard}
                        className="flex items-center gap-1 px-2 py-1 bg-white border border-slate-300 rounded text-sm hover:bg-slate-100"
                      >
                        <Copy className="w-4 h-4" />
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <p className="text-sm font-mono whitespace-pre-wrap">{generatedPrompt}</p>
                  </motion.div>
                )}
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {isPro ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-200">
                  <p className="text-sm text-slate-700 mb-4">💎 Pro Feature: Test with AI Models</p>
                  <p className="text-xs text-slate-600">Click a prompt from the library to test with real AI responses.</p>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
                  <p className="font-semibold text-slate-900 mb-2">✨ Upgrade to Pro</p>
                  <p className="text-sm text-slate-700 mb-4">Unlock advanced features and premium AI models.</p>
                  <Link href="/pricing" className="w-full block text-center py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow">
                    View Plans
                  </Link>
                </motion.div>
              )}

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" /> Strategies
                </h3>
                <ul className="space-y-3 text-sm">
                  <li><strong>Standard:</strong> Clear, direct prompts</li>
                  <li><strong>Chain-of-Thought:</strong> Step-by-step reasoning</li>
                  <li><strong>Few-Shot:</strong> Example-based prompts</li>
                  <li><strong>Hybrid:</strong> Best of all techniques</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal - only renders when needed */}
      <Suspense fallback={null}>
        {showTestModal && selectedPrompt && (
          <TestPromptModal
            isOpen={showTestModal}
            onClose={() => setShowTestModal(false)}
            prompt={selectedPrompt}
          />
        )}
      </Suspense>
    </div>
  );
}
