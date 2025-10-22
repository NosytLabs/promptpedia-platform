'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Prompt, AISystem, PromptCategory, PromptTechnique } from '@/types/prompt';
import { timeAgo } from '@/lib/utils';

const AI_SYSTEMS: { value: AISystem; label: string }[] = [
  { value: 'claude-3.5-sonnet', label: 'Claude 3.5 Sonnet' },
  { value: 'claude-3-opus', label: 'Claude 3 Opus' },
  { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
  { value: 'gpt-4', label: 'GPT-4' },
  { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
  { value: 'gemini-pro', label: 'Gemini Pro' },
  { value: 'veo-3', label: 'Veo 3' },
  { value: 'midjourney', label: 'Midjourney' },
  { value: 'dall-e-3', label: 'DALL-E 3' },
];

const CATEGORIES: { value: PromptCategory; label: string }[] = [
  { value: 'text-generation', label: 'Text Generation' },
  { value: 'code-generation', label: 'Code Generation' },
  { value: 'data-analysis', label: 'Data Analysis' },
  { value: 'creative-writing', label: 'Creative Writing' },
  { value: 'image-generation', label: 'Image Generation' },
  { value: 'video-generation', label: 'Video Generation' },
  { value: 'chatbot', label: 'Chatbot' },
  { value: 'summarization', label: 'Summarization' },
  { value: 'translation', label: 'Translation' },
  { value: 'business', label: 'Business' },
  { value: 'education', label: 'Education' },
  { value: 'research', label: 'Research' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'productivity', label: 'Productivity' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'other', label: 'Other' },
];

const TECHNIQUES: { value: PromptTechnique; label: string }[] = [
  { value: 'one-shot', label: 'One-Shot' },
  { value: 'few-shot', label: 'Few-Shot' },
  { value: 'zero-shot', label: 'Zero-Shot' },
  { value: 'chain-of-thought', label: 'Chain-of-Thought' },
  { value: 'self-consistency', label: 'Self-Consistency' },
  { value: 'prompt-chaining', label: 'Prompt Chaining' },
  { value: 'role-based', label: 'Role-Based' },
  { value: 'structured-debate', label: 'Structured Debate' },
  { value: 'iterative-refinement', label: 'Iterative Refinement' },
  { value: 'constraint-based', label: 'Constraint-Based' },
  { value: 'socratic-method', label: 'Socratic Method' },
  { value: 'json-output', label: 'JSON Output' },
  { value: 'multi-step', label: 'Multi-Step' },
  { value: 'standard', label: 'Standard' },
];

export default function PromptsPage() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAISystem, setSelectedAISystem] = useState<AISystem | ''>('');
  const [selectedCategory, setSelectedCategory] = useState<PromptCategory | ''>('');
  const [selectedTechnique, setSelectedTechnique] = useState<PromptTechnique | ''>('');
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'rating'>('recent');

  useEffect(() => {
    fetchPrompts();
  }, [searchQuery, selectedAISystem, selectedCategory, selectedTechnique, sortBy]);

  const fetchPrompts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (selectedAISystem) params.append('aiSystem', selectedAISystem);
      if (selectedCategory) params.append('category', selectedCategory);
      if (selectedTechnique) params.append('techniques', selectedTechnique);
      params.append('sortBy', sortBy);

      const response = await fetch(`/api/prompts?${params.toString()}`);
      const data = await response.json();
      setPrompts(data.prompts || []);
    } catch (error) {
      console.error('Error fetching prompts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4">
            Browse <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Prompts</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Discover and use high-quality prompts for AI systems
          </p>
          <Link
            href="/submit"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Submit Your Prompt
          </Link>
        </motion.div>

        <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <input
              type="text"
              placeholder="Search prompts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              value={selectedAISystem}
              onChange={(e) => setSelectedAISystem(e.target.value as AISystem | '')}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All AI Systems</option>
              {AI_SYSTEMS.map((system) => (
                <option key={system.value} value={system.value}>
                  {system.label}
                </option>
              ))}
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as PromptCategory | '')}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              {CATEGORIES.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>

            <select
              value={selectedTechnique}
              onChange={(e) => setSelectedTechnique(e.target.value as PromptTechnique | '')}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Techniques</option>
              {TECHNIQUES.map((technique) => (
                <option key={technique.value} value={technique.value}>
                  {technique.label}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'recent' | 'popular' | 'rating')}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="recent">Most Recent</option>
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : prompts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-slate-600">No prompts found. Be the first to submit one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prompts.map((prompt, index) => (
              <motion.div
                key={prompt.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/prompts/${prompt.id}`}>
                  <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow p-6 h-full border border-slate-200 hover:border-blue-300 cursor-pointer">
                    {prompt.featured && (
                      <div className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full mb-3">
                        ⭐ Featured
                      </div>
                    )}
                    
                    <h3 className="text-xl font-bold mb-2 text-slate-900">{prompt.title}</h3>
                    <p className="text-slate-600 mb-4 line-clamp-3">{prompt.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {prompt.aiSystem.slice(0, 3).map((system) => (
                        <span
                          key={system}
                          className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md"
                        >
                          {system}
                        </span>
                      ))}
                      {prompt.aiSystem.length > 3 && (
                        <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-md">
                          +{prompt.aiSystem.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {prompt.category.slice(0, 2).map((cat) => (
                        <span
                          key={cat}
                          className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-md"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm text-slate-500 border-t border-slate-100 pt-4">
                      <div className="flex items-center gap-4">
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
                      <span>{timeAgo(prompt.createdAt)}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
