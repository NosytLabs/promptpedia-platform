'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Copy, Sparkles, Share2 } from 'lucide-react';

export default function EnhancePage() {
  const searchParams = useSearchParams();
  const [originalPrompt, setOriginalPrompt] = useState('');

  useEffect(() => {
    const prompt = searchParams?.get('prompt');
    if (prompt) {
      try {
        setOriginalPrompt(atob(prompt));
      } catch (e) {
        console.error('Error decoding prompt');
      }
    }
  }, [searchParams]);
  const [enhanceType, setEnhanceType] = useState('clarity');
  const [enhancedPrompt, setEnhancedPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const enhance = async () => {
    if (!originalPrompt.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/prompts/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: originalPrompt, enhanceType }),
      });
      
      const data = await response.json();
      setEnhancedPrompt(data.data?.enhanced || '');
    } catch (error) {
      console.error('Enhancement failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(enhancedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Enhance Your Prompts
              </span>
            </h1>
            <p className="text-xl text-slate-600">
              Optimize and polish your prompts to get better results from AI models.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <label className="block text-lg font-semibold text-slate-900 mb-4">
                  Original Prompt
                </label>
                <textarea
                  value={originalPrompt}
                  onChange={(e) => setOriginalPrompt(e.target.value)}
                  placeholder="Paste your prompt here..."
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  rows={8}
                />
              </div>

              {/* Enhancement Type */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <label className="block text-lg font-semibold text-slate-900 mb-4">
                  Enhancement Type
                </label>
                <div className="space-y-3">
                  {[
                    { value: 'clarity', label: 'Clarity', desc: 'Make it more clear and concise' },
                    { value: 'examples', label: 'Add Examples', desc: 'Include concrete examples' },
                    { value: 'structure', label: 'Add Structure', desc: 'Improve organization' },
                    { value: 'detail', label: 'Add Detail', desc: 'Include more specifics' },
                    { value: 'best-practice', label: 'Best Practice', desc: 'Apply prompt engineering best practices' },
                  ].map((option) => (
                    <label key={option.value} className="flex items-start p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                      <input
                        type="radio"
                        name="enhance"
                        value={option.value}
                        checked={enhanceType === option.value}
                        onChange={(e) => setEnhanceType(e.target.value)}
                        className="mt-1 mr-3"
                      />
                      <div>
                        <div className="font-medium text-slate-900">{option.label}</div>
                        <div className="text-sm text-slate-600">{option.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Enhance Button */}
              <button
                onClick={enhance}
                disabled={loading || !originalPrompt.trim()}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                {loading ? 'Enhancing...' : 'Enhance Prompt'}
              </button>
            </div>

            {/* Output Section */}
            <div>
              {enhancedPrompt && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl shadow-lg p-8 sticky top-8"
                >
                  <label className="block text-lg font-semibold text-slate-900 mb-4">
                    Enhanced Prompt
                  </label>
                  <div className="bg-slate-50 rounded-lg p-6 border border-slate-200 whitespace-pre-wrap text-slate-700 font-mono text-sm leading-relaxed mb-6 max-h-96 overflow-y-auto">
                    {enhancedPrompt}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={copyToClipboard}
                      className="flex-1 flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold text-sm"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                    <button
                      onClick={() => {
                        setOriginalPrompt(enhancedPrompt);
                        setEnhancedPrompt('');
                      }}
                      className="flex-1 flex items-center justify-center px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors font-semibold text-sm"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Enhance Again
                    </button>
                  </div>
                </motion.div>
              )}

              {!enhancedPrompt && (
                <div className="bg-slate-100 rounded-2xl p-8 text-center">
                  <p className="text-slate-600">Your enhanced prompt will appear here</p>
                </div>
              )}
            </div>
          </div>

          {/* Best Practices */}
          <div className="mt-12 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Enhancement Examples</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Original</h4>
                <p className="text-sm text-slate-600 bg-white p-3 rounded">"Write about AI"</p>
              </div>
              <div className="flex items-center justify-center">→</div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Enhanced</h4>
                <p className="text-sm text-slate-600 bg-white p-3 rounded">"Write a 300-word blog post about how AI is changing software development for technical audiences. Include 2 real-world examples and a practical takeaway."</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
