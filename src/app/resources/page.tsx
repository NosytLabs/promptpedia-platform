'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ResourcesPage() {
  const promptLibraries = [
    {
      name: 'Awesome Prompts',
      url: 'https://github.com/f/awesome-chatgpt-prompts',
      description: 'Curated list of ChatGPT prompts from the community',
      stars: '100k+',
      icon: '⭐',
      tags: ['ChatGPT', 'Community', 'Open Source'],
    },
    {
      name: 'LangChain Hub',
      url: 'https://smith.langchain.com/hub',
      description: 'Production-ready prompts for LangChain applications',
      stars: '80k+',
      icon: '🦜',
      tags: ['LangChain', 'Production', 'Framework'],
    },
    {
      name: 'OpenAI Cookbook',
      url: 'https://github.com/openai/openai-cookbook',
      description: 'Example code and guides for using OpenAI API',
      stars: '50k+',
      icon: '📚',
      tags: ['OpenAI', 'Examples', 'Tutorials'],
    },
    {
      name: 'Prompt Engineering Guide',
      url: 'https://www.promptingguide.ai/',
      description: 'Comprehensive guide to prompt engineering techniques',
      stars: '40k+',
      icon: '📖',
      tags: ['Education', 'Research', 'Guide'],
    },
    {
      name: 'AI Prompt Library',
      url: 'https://library.aiprm.com/',
      description: 'Collection of prompts for ChatGPT and other AI tools',
      stars: '30k+',
      icon: '🎯',
      tags: ['ChatGPT', 'Multi-tool', 'Browser Extension'],
    },
    {
      name: 'ShareGPT',
      url: 'https://sharegpt.com/',
      description: 'Share and discover ChatGPT conversations',
      stars: '25k+',
      icon: '💬',
      tags: ['Community', 'Conversations', 'Examples'],
    },
  ];

  const tools = [
    {
      name: 'PromptPerfect',
      url: 'https://promptperfect.jina.ai/',
      description: 'AI-powered prompt optimization tool',
      category: 'Optimization',
    },
    {
      name: 'PromptBase',
      url: 'https://promptbase.com/',
      description: 'Marketplace for buying and selling prompts',
      category: 'Marketplace',
    },
    {
      name: 'Anthropic Console',
      url: 'https://console.anthropic.com/',
      description: 'Claude prompt playground and testing',
      category: 'Testing',
    },
    {
      name: 'OpenAI Playground',
      url: 'https://platform.openai.com/playground',
      description: 'Test and experiment with GPT models',
      category: 'Testing',
    },
  ];

  const research = [
    {
      title: 'Chain-of-Thought Prompting',
      authors: 'Wei et al., Google Research',
      year: '2022',
      url: 'https://arxiv.org/abs/2201.11903',
      description: 'Enabling complex reasoning through intermediate reasoning steps',
    },
    {
      title: 'Self-Consistency Improves Chain of Thought',
      authors: 'Wang et al., Google Research',
      year: '2023',
      url: 'https://arxiv.org/abs/2203.11171',
      description: 'Improving reliability by sampling multiple reasoning paths',
    },
    {
      title: 'Large Language Models are Zero-Shot Reasoners',
      authors: 'Kojima et al.',
      year: '2022',
      url: 'https://arxiv.org/abs/2205.11916',
      description: 'Simple "Let\'s think step by step" improves reasoning',
    },
    {
      title: 'Constitutional AI',
      authors: 'Bai et al., Anthropic',
      year: '2022',
      url: 'https://arxiv.org/abs/2212.08073',
      description: 'Harmlessness from AI feedback through constitutional prompting',
    },
  ];

  const communities = [
    {
      name: 'r/PromptEngineering',
      platform: 'Reddit',
      members: '50k+',
      url: 'https://reddit.com/r/PromptEngineering',
      description: 'Active community discussing prompt techniques',
    },
    {
      name: 'Prompt Engineering Discord',
      platform: 'Discord',
      members: '30k+',
      url: 'https://discord.gg/promptengineering',
      description: 'Real-time chat with prompt engineers',
    },
    {
      name: '#PromptEngineering',
      platform: 'X/Twitter',
      members: '100k+',
      url: 'https://twitter.com/hashtag/PromptEngineering',
      description: 'Follow latest trends and techniques',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
            Curated Resources
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Community Resources
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Open-source prompt libraries, tools, research papers, and communities 
            to help you master prompt engineering.
          </p>
        </motion.div>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-slate-900">📚 Open Source Prompt Libraries</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {promptLibraries.map((library, index) => (
              <motion.div
                key={library.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <a
                  href={library.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white rounded-xl shadow-sm hover:shadow-xl transition-all p-6 border border-slate-200 hover:border-blue-400 h-full group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-4xl">{library.icon}</span>
                    <div className="flex items-center text-sm text-slate-500">
                      <svg className="w-4 h-4 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {library.stars}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 text-slate-900 group-hover:text-blue-600 transition-colors">
                    {library.name}
                  </h3>
                  
                  <p className="text-slate-600 mb-4 text-sm">
                    {library.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {library.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-slate-900">🛠️ Prompt Engineering Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white rounded-xl shadow-sm hover:shadow-lg transition-all p-6 border border-slate-200 hover:border-purple-400 group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                      {tool.name}
                    </h3>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                      {tool.category}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm">{tool.description}</p>
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-slate-900">📄 Key Research Papers</h2>
          <div className="bg-white rounded-xl shadow-sm p-8 border border-slate-200">
            <div className="space-y-6">
              {research.map((paper, index) => (
                <motion.div
                  key={paper.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-l-4 border-blue-500 pl-6 py-2 hover:border-purple-500 transition-colors"
                >
                  <a
                    href={paper.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
                      {paper.title}
                    </h3>
                    <p className="text-sm text-slate-500 mb-2">
                      {paper.authors} • {paper.year}
                    </p>
                    <p className="text-sm text-slate-600">{paper.description}</p>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-slate-900">👥 Join the Community</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {communities.map((community, index) => (
              <motion.div
                key={community.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <a
                  href={community.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-sm hover:shadow-lg transition-all p-6 border border-blue-200 hover:border-blue-400 h-full group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-white text-slate-700 text-xs font-semibold rounded-full border border-slate-200">
                      {community.platform}
                    </span>
                    <span className="text-sm font-bold text-blue-600">{community.members}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 text-slate-900 group-hover:text-blue-600 transition-colors">
                    {community.name}
                  </h3>
                  
                  <p className="text-slate-600 text-sm">
                    {community.description}
                  </p>
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white"
        >
          <h2 className="text-3xl font-bold mb-4">Contribute Your Resources</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Know a great prompt library or tool? Help the community by submitting it to our resources page.
          </p>
          <Link
            href="/submit"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-slate-50 transition-colors font-semibold shadow-lg"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Submit a Resource
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
