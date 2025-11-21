'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, X, ChevronDown } from 'lucide-react';

interface AdvancedSearchProps {
  onSearch: (filters: SearchFilters) => void;
}

export interface SearchFilters {
  query: string;
  category?: string;
  aiSystem?: string;
  sortBy?: 'recent' | 'popular' | 'rated';
  minRating?: number;
}

export function AdvancedSearch({ onSearch }: AdvancedSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({ query: '' });
  const [showAdvanced, setShowAdvanced] = useState(false);

  const categories = [
    'Writing',
    'Business',
    'Marketing',
    'Sales',
    'Web Development',
    'UI/UX Design',
    'Research',
    'Product Management',
    'Image Generation',
    'Video Generation',
  ];

  const aiSystems = ['ChatGPT', 'Claude', 'Gemini', 'GPT-4', 'Midjourney', 'DALL-E', 'Runway'];

  const sortOptions = [
    { value: 'recent', label: '📅 Most Recent' },
    { value: 'popular', label: '🔥 Most Popular' },
    { value: 'rated', label: '⭐ Highest Rated' },
  ];

  const handleSearch = () => {
    onSearch(filters);
    setIsOpen(false);
  };

  const resetFilters = () => {
    setFilters({ query: '' });
    onSearch({ query: '' });
  };

  return (
    <div className="w-full">
      {/* Main Search Bar */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="relative mb-4">
        <div className="relative">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search prompts, techniques, tools..."
            value={filters.query}
            onChange={(e) => setFilters({ ...filters, query: e.target.value })}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Toggle Advanced */}
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
        >
          {showAdvanced ? '✕' : '⚙️'} {showAdvanced ? 'Hide' : 'Show'} Advanced Filters
        </button>
      </motion.div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-slate-50 rounded-lg border border-slate-200 mb-4 space-y-4"
        >
          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Category</label>
            <select
              value={filters.category || ''}
              onChange={(e) => setFilters({ ...filters, category: e.target.value || undefined })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* AI System */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">AI System</label>
            <select
              value={filters.aiSystem || ''}
              onChange={(e) => setFilters({ ...filters, aiSystem: e.target.value || undefined })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All AI Systems</option>
              {aiSystems.map((system) => (
                <option key={system} value={system}>
                  {system}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Sort By</label>
            <div className="grid grid-cols-3 gap-2">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFilters({ ...filters, sortBy: option.value as any })}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    filters.sortBy === option.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-slate-700 border border-slate-300 hover:border-blue-400'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Min Rating */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Minimum Rating</label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="5"
                step="0.5"
                value={filters.minRating || 0}
                onChange={(e) => setFilters({ ...filters, minRating: parseFloat(e.target.value) })}
                className="flex-1"
              />
              <span className="text-sm font-medium text-slate-900 min-w-[3rem]">
                {(filters.minRating || 0).toFixed(1)} ⭐
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <button
              onClick={handleSearch}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Search
            </button>
            <button
              onClick={resetFilters}
              className="flex-1 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 font-medium"
            >
              Reset
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
