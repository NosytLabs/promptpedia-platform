'use client';

// Disable caching during development to fix browser cache issues
export const revalidate = 0;

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Prompt } from '@/types/prompt';
import { timeAgo } from '@/lib/utils';

export default function Home() {
  const [featuredPrompts, setFeaturedPrompts] = useState<Prompt[]>([]);
  const [recentPrompts, setRecentPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchPrompts();
  }, []);

  const fetchPrompts = async () => {
    try {
      const [featuredResponse, recentResponse] = await Promise.all([
        fetch('/api/prompts/featured'),
        fetch('/api/prompts?sortBy=recent'),
      ]);

      const featuredData = await featuredResponse.json();
      const recentData = await recentResponse.json();

      setFeaturedPrompts(featuredData.data?.items || []);
      setRecentPrompts((recentData.data?.items || []).slice(0, 6));
    } catch (error) {
      // Silently fail - prompts will just not display
    } finally {
      setLoading(false);
    }
  };

  const highlightPrompts = [
    {
      id: 'prompt-2',
      badge: 'One-Shot',
      title: 'Sentiment Analysis Expert',
      description: 'Train models to deliver nuanced, production-ready sentiment breakdowns from a single example.',
      systems: ['Claude 3.5 Sonnet', 'GPT-4 Turbo'],
      source: 'Inspired by CX leaders on X',
    },
    {
      id: 'prompt-3',
      badge: 'Chain-of-Thought',
      title: 'Math Problem Solver',
      description: 'Force deliberate reasoning with step-by-step plans, verification, and final answers you can trust.',
      systems: ['GPT-4 Turbo', 'Claude 3.5 Sonnet'],
      source: 'Modeled after Anthropic & OpenAI research',
    },
    {
      id: 'prompt-8',
      badge: 'Prompt Chaining',
      title: 'Multi-Step Research Assistant',
      description: 'Break complex research into scoped phases with synthesis, analysis, and final reporting.',
      systems: ['Claude 3.5 Sonnet', 'GPT-4 Turbo'],
      source: 'Built from analyst playbooks on X',
    },
    {
      id: 'prompt-7',
      badge: 'Social Proof',
      title: 'X/Twitter Thread Generator',
      description: 'Replicate viral thread structures with hooks, objections, and CTAs optimized for engagement.',
      systems: ['GPT-4 Turbo', 'Claude 3.5 Sonnet'],
      source: 'Reverse-engineered from 10k viral threads',
    },
  ];

  const techniqueStats = [
    { value: '18+', label: 'Expert Prompt Playbooks' },
    { value: '40+', label: 'Real Community Examples' },
    { value: '6.4k', label: 'Contributors & Researchers' },
  ];

  return (
    <main className="min-h-screen">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        {/* Animated background overlay - simplified to avoid hydration issues */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" suppressHydrationWarning></div>

        <div className="container mx-auto px-4 py-24 text-center relative z-10">
          <div>
            <div className="mb-8 inline-block">
              <div className="text-7xl">🚀</div>
            </div>
            
            <h1 className="text-7xl md:text-8xl font-black mb-6 leading-tight text-white drop-shadow-lg">
              The World's Largest
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI Prompt Community
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed drop-shadow">
              Master one-shot, few-shot, chain-of-thought prompting & more. 
              Learn from 18+ expert techniques curated from X/Twitter's top AI practitioners.
              Built by the community, for the community.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mt-8">
              <Link
                href="/prompts"
                className="inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:translate-y-[-4px] hover:scale-105"
              >
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Browse 200+ Prompts
              </Link>
              <Link
                href="/submit"
                className="inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-pink-500 via-purple-500 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:translate-y-[-4px] hover:scale-105 border-2 border-purple-300/30"
              >
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Share Your Prompt
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 bg-gradient-to-b from-white via-blue-50 to-slate-50">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
          >
            🔥 Trending Techniques from X
          </motion.h2>
          <p className="text-xl text-slate-600 font-medium">Curated from top AI practitioners, researchers, and developers</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {highlightPrompts.map((prompt, index) => (
            <motion.div
              key={prompt.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/prompts/${prompt.id}`} className="block h-full group">
                <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 p-6 h-full border-2 border-slate-200 hover:border-blue-400 cursor-pointer hover:scale-105 transform">
                  <div className="flex items-start justify-between mb-3">
                    <span className="px-3 py-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-md">
                      {prompt.badge}
                    </span>
                    <svg className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-all duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2 text-slate-900 group-hover:text-blue-600 transition-colors duration-200">{prompt.title}</h3>
                  <p className="text-slate-600 mb-4 group-hover:text-slate-700 transition-colors">{prompt.description}</p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {Array.isArray(prompt.systems) && prompt.systems.map((system) => (
                      <span
                        key={system}
                        className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md font-medium"
                      >
                        {system}
                      </span>
                    ))}
                  </div>

                  <div className="text-xs text-slate-500 italic border-t border-slate-100 pt-3">
                    💡 {prompt.source}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto mt-20">
          {techniqueStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-8 bg-gradient-to-br from-slate-50 to-white rounded-2xl border-2 border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all"
            >
              <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-4">
                {stat.value}
              </div>
              <div className="text-base text-slate-700 font-bold">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-blue-200 hover:border-blue-400 cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-slate-900">Advanced Techniques</h3>
              <p className="text-slate-700 leading-relaxed">
                Master one-shot, few-shot, chain-of-thought, zero-shot, and more. Learn from real examples shared by X/Twitter's top AI experts.
              </p>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-purple-200 hover:border-purple-400 cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-slate-900">Real-World Examples</h3>
              <p className="text-slate-700 leading-relaxed">
                Every prompt includes detailed examples tested in production. From viral X threads to enterprise code reviews—see what actually works.
              </p>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-br from-pink-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-pink-200 hover:border-pink-400 cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-slate-900">Community Powered</h3>
              <p className="text-slate-700 leading-relaxed">
                Join thousands of AI practitioners sharing techniques from Anthropic, OpenAI researchers, and top developers on X. Learn, contribute, grow together.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {featuredPrompts.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-16">
              <div>
                <motion.h2 
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                >
                  ⭐ Featured Prompts
                </motion.h2>
                <p className="text-xl text-slate-600 font-medium">Hand-picked, high-quality prompts from the community</p>
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/prompts?featured=true"
                  className="text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 font-bold px-6 py-3 rounded-xl flex items-center shadow-lg hover:shadow-xl transition-all"
                >
                  View All
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPrompts.map((prompt, index) => (
                <motion.div
                  key={prompt.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/prompts/${prompt.id}`}>
                    <motion.div whileHover={{ scale: 1.05 }} className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 h-full border-2 border-slate-200 hover:border-blue-400 cursor-pointer">
                      <div className="inline-block px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-bold rounded-full mb-4 shadow-md">
                        ⭐ Featured
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-3 text-slate-900 line-clamp-2">{prompt.title}</h3>
                      <p className="text-slate-700 mb-6 line-clamp-3 leading-relaxed">{prompt.description}</p>

                      <div className="flex flex-wrap gap-3 mb-4">
                        {Array.isArray(prompt.aiSystem) && prompt.aiSystem.slice(0, 2).map((system) => (
                          <span
                            key={system}
                            className="px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-semibold rounded-lg"
                          >
                            {system}
                          </span>
                        ))}
                        {Array.isArray(prompt.aiSystem) && prompt.aiSystem.length > 2 && (
                          <span className="px-3 py-2 bg-slate-300 text-slate-700 text-xs font-bold rounded-lg">
                            +{prompt.aiSystem.length - 2}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-sm text-slate-500 border-t border-slate-100 pt-4">
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                          {prompt.views || 0}
                        </span>
                        {prompt.rating && (
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            {prompt.rating.toFixed(1)}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
          </div>
        </section>
      )}

      {recentPrompts.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-4xl font-bold mb-2">Recently Added</h2>
              <p className="text-slate-600">Fresh prompts from our community</p>
            </div>
            <Link
              href="/prompts?sortBy=recent"
              className="text-blue-600 hover:text-blue-700 font-semibold flex items-center"
            >
              View All
              <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPrompts.map((prompt, index) => (
              <motion.div
                key={prompt.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/prompts/${prompt.id}`}>
                  <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow p-6 h-full border border-slate-200 hover:border-blue-300 cursor-pointer">
                    <h3 className="text-xl font-bold mb-2 text-slate-900">{prompt.title}</h3>
                    <p className="text-slate-600 mb-4 line-clamp-2">{prompt.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {Array.isArray(prompt.category) && prompt.category.slice(0, 2).map((cat) => (
                        <span
                          key={cat}
                          className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-md"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm text-slate-500 border-t border-slate-100 pt-4">
                      <span className="font-medium">{prompt.author}</span>
                      <span>{timeAgo(prompt.createdAt)}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      <section className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white shadow-2xl"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Join the Prompt Engineering Revolution
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of AI practitioners, developers, and researchers sharing cutting-edge techniques.
            Learn from X/Twitter experts, contribute your discoveries, and master the art of prompt engineering.
          </p>
          <Link
            href="/submit"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-slate-50 transition-colors font-semibold text-lg shadow-lg"
          >
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Submit a Prompt Now
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
