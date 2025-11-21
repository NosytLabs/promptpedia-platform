'use client';

// Cache homepage for 1 hour - huge cost savings
export const revalidate = 3600;

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Prompt } from '@/types/prompt';
import { timeAgo } from '@/lib/utils';

export default function Home() {
  const [featuredPrompts, setFeaturedPrompts] = useState<Prompt[]>([]);
  const [recentPrompts, setRecentPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <section className="container mx-auto px-4 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            The World's Largest
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Prompt Engineering Community
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-4xl mx-auto">
            Master one-shot, few-shot, chain-of-thought prompting & more. 
            Learn from 18+ expert techniques curated from X/Twitter's top AI practitioners.
            Built by the community, for the community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/prompts"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Browse Prompts
            </Link>
            <Link
              href="/submit"
              className="inline-flex items-center justify-center px-8 py-4 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Submit Your Prompt
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 py-16 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">🔥 Trending Techniques from X</h2>
          <p className="text-xl text-slate-600">Curated from top AI practitioners, researchers, and developers</p>
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
                <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 h-full border-2 border-slate-200 hover:border-blue-400 cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold rounded-full">
                      {prompt.badge}
                    </span>
                    <svg className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2 text-slate-900 group-hover:text-blue-600 transition-colors">{prompt.title}</h3>
                  <p className="text-slate-600 mb-4">{prompt.description}</p>

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

        <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
          {techniqueStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Advanced Prompt Techniques</h3>
            <p className="text-slate-600">
              Master one-shot, few-shot, chain-of-thought, zero-shot, and more. Learn from real examples shared by X/Twitter's top AI experts.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Real-World Examples</h3>
            <p className="text-slate-600">
              Every prompt includes detailed examples tested in production. From viral X threads to enterprise code reviews—see what actually works.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Community Powered</h3>
            <p className="text-slate-600">
              Join thousands of AI practitioners sharing techniques from Anthropic, OpenAI researchers, and top developers on X. Learn, contribute, grow together.
            </p>
          </div>
        </motion.div>
      </section>

      {featuredPrompts.length > 0 && (
        <section className="container mx-auto px-4 py-16 bg-slate-50 rounded-3xl my-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-4xl font-bold mb-2">⭐ Featured Prompts</h2>
              <p className="text-slate-600">Hand-picked, high-quality prompts from the community</p>
            </div>
            <Link
              href="/prompts?featured=true"
              className="text-blue-600 hover:text-blue-700 font-semibold flex items-center"
            >
              View All
              <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
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
                    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow p-6 h-full border border-slate-200 hover:border-blue-300 cursor-pointer">
                      <div className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full mb-3">
                        Featured
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2 text-slate-900">{prompt.title}</h3>
                      <p className="text-slate-600 mb-4 line-clamp-2">{prompt.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {Array.isArray(prompt.aiSystem) && prompt.aiSystem.slice(0, 2).map((system) => (
                          <span
                            key={system}
                            className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md"
                          >
                            {system}
                          </span>
                        ))}
                        {Array.isArray(prompt.aiSystem) && prompt.aiSystem.length > 2 && (
                          <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-md">
                            +{prompt.aiSystem.length - 2} more
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
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
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
