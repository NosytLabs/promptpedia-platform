'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Copy, Share2, Zap } from 'lucide-react';

export default function GeneratePage() {
  const [topic, setTopic] = useState('');
  const [useCase, setUseCase] = useState('general');
  const [style, setStyle] = useState('instructive');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generatePrompt = async () => {
    if (!topic.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/prompts/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, useCase, style }),
      });
      
      const data = await response.json();
      setGeneratedPrompt(data.data?.prompt || '');
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sharePrompt = () => {
    const text = `Check out this prompt I generated:\n\n${generatedPrompt}`;
    if (navigator.share) {
      navigator.share({
        title: 'Generated Prompt',
        text,
      });
    } else {
      navigator.clipboard.writeText(text);
      setCopied(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Generate Prompts
              </span>
            </h1>
            <p className="text-xl text-slate-600">
              Create optimized prompts for any use case using AI. Powered by best practices from top prompt engineers.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="space-y-6">
              {/* Topic Input */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  What do you want the prompt to do?
                </label>
                <textarea
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., Analyze customer feedback for sentiment and extract key issues"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={3}
                />
              </div>

              {/* Use Case Selector */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Use Case
                  </label>
                  <select
                    value={useCase}
                    onChange={(e) => setUseCase(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="general">General Purpose</option>
                    <option value="analysis">Data Analysis</option>
                    <option value="coding">Code Generation</option>
                    <option value="content">Content Creation</option>
                    <option value="customer-service">Customer Service</option>
                    <option value="research">Research & Learning</option>
                    <option value="marketing">Marketing</option>
                    <option value="creative">Creative Writing</option>
                  </select>
                </div>

                {/* Style Selector */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Prompt Style
                  </label>
                  <select
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="instructive">Instructive (Clear steps)</option>
                    <option value="role-based">Role-Based (Persona)</option>
                    <option value="chain-of-thought">Chain-of-Thought (Reasoning)</option>
                    <option value="few-shot">Few-Shot (Examples)</option>
                    <option value="structured">Structured (JSON Output)</option>
                  </select>
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={generatePrompt}
                disabled={loading || !topic.trim()}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Zap className="w-5 h-5 mr-2" />
                {loading ? 'Generating...' : 'Generate Prompt'}
              </button>
            </div>
          </div>

          {/* Generated Prompt Display */}
          {generatedPrompt && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg p-8 space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Your Generated Prompt</h2>
                <div className="bg-slate-50 rounded-lg p-6 border border-slate-200 whitespace-pre-wrap text-slate-700 font-mono text-sm leading-relaxed">
                  {generatedPrompt}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={copyToClipboard}
                  className="flex-1 flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  <Copy className="w-5 h-5 mr-2" />
                  {copied ? 'Copied!' : 'Copy to Clipboard'}
                </button>

                <button
                  onClick={sharePrompt}
                  className="flex-1 flex items-center justify-center px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors font-semibold"
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  Share
                </button>

                <button
                  onClick={() => {
                    const encoded = btoa(generatedPrompt);
                    window.location.href = `/enhance?prompt=${encoded}`;
                  }}
                  className="flex-1 flex items-center justify-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
                >
                  Enhance Further
                </button>
              </div>

              {/* Usage Instructions */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-2">How to Use</h3>
                <ul className="text-blue-800 space-y-1 text-sm">
                  <li>✓ Paste this prompt into ChatGPT, Claude, or Gemini</li>
                  <li>✓ Use it in your IDE's AI assistant (VS Code, GitHub Copilot)</li>
                  <li>✓ Customize variables (marked with {'{braces}'})</li>
                  <li>✓ Iterate based on results and save your best versions</li>
                </ul>
              </div>
            </motion.div>
          )}

          {/* Tips Section */}
          <div className="mt-12 bg-slate-100 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Tips for Better Prompts</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">✓ Be Specific</h4>
                <p className="text-slate-600 text-sm">The more detail you provide about your goal, the better the generated prompt.</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">✓ Include Context</h4>
                <p className="text-slate-600 text-sm">Mention the audience, format, and any constraints (word count, tone, etc.)</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">✓ Add Examples</h4>
                <p className="text-slate-600 text-sm">Few-shot prompts with examples usually perform much better than zero-shot.</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">✓ Iterate & Test</h4>
                <p className="text-slate-600 text-sm">Test prompts with different AI models and refine based on results.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
