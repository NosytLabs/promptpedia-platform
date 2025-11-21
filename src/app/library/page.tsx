'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Zap, BookOpen, Code, Users } from 'lucide-react';

interface Prompt {
  id: string;
  title: string;
  description: string;
  category: string[];
  aiSystems: string[];
  rating: number;
  viewCount: number;
}

export default function LibraryPage() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrompts();
  }, []);

  const fetchPrompts = async () => {
    try {
      const response = await fetch('/api/prompts?sortBy=popular');
      const data = await response.json();
      setPrompts(data.data?.items || []);
    } catch (error) {
      console.error('Failed to fetch prompts:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'all', label: 'All Prompts', icon: BookOpen },
    { id: 'agents', label: 'AI Agents', icon: Zap },
    { id: 'code', label: 'Code & Dev', icon: Code },
    { id: 'startup', label: 'Startup', icon: Users },
  ];

  const filtered = filter === 'all' 
    ? prompts 
    : prompts.filter(p => p.category.some(c => c.includes(filter.toLowerCase())));

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4">
            Prompt <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Library</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Production-ready prompts from Google, Claude, PromptCowboy, and the community. Copy, customize, and accelerate.
          </p>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  className={`px-6 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                    filter === cat.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-slate-200 text-slate-700 hover:border-blue-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((prompt, index) => (
              <motion.div
                key={prompt.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/prompts/${prompt.id}`}>
                  <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow p-6 h-full border border-slate-200 hover:border-blue-300 cursor-pointer">
                    <div className="flex items-start justify-between mb-3">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                        {prompt.category[0] || 'General'}
                      </span>
                      {prompt.rating >= 4.5 && (
                        <span className="text-yellow-500 text-sm">⭐ {prompt.rating.toFixed(1)}</span>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-bold mb-2 text-slate-900 line-clamp-2">{prompt.title}</h3>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-3">{prompt.description}</p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {prompt.aiSystems.slice(0, 2).map((sys) => (
                        <span
                          key={sys}
                          className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded"
                        >
                          {sys}
                        </span>
                      ))}
                      {prompt.aiSystems.length > 2 && (
                        <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">
                          +{prompt.aiSystems.length - 2}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center text-sm text-slate-500 border-t border-slate-100 pt-3">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                        {prompt.viewCount}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Call-to-Action Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to generate or enhance?</h2>
          <p className="text-lg mb-8 opacity-90">Use our tools to create optimized prompts for your specific use case.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/generate"
              className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-slate-100 transition-colors"
            >
              Generate Prompt
            </Link>
            <Link
              href="/enhance"
              className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:bg-opacity-10 transition-colors"
            >
              Enhance Prompt
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
