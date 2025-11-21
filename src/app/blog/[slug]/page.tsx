'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

const guides: Record<string, {
  title: string;
  category: string;
  readTime: string;
  content: React.ReactNode;
}> = {
  'prompt-engineering-2025': {
    title: 'Complete Guide to Prompt Engineering 2025',
    category: 'Fundamentals',
    readTime: '8 min',
    content: (
      <div className="prose prose-slate max-w-none">
        <h2>What is Prompt Engineering?</h2>
        <p>Prompt engineering is the art and science of crafting inputs to AI models to achieve desired outputs. In 2025, it's become essential for anyone working with AI.</p>
        
        <h2>Core Principles</h2>
        <ul>
          <li><strong>Clarity:</strong> Be specific about what you want</li>
          <li><strong>Context:</strong> Provide relevant background information</li>
          <li><strong>Constraints:</strong> Set boundaries for the output</li>
          <li><strong>Examples:</strong> Show what good looks like</li>
        </ul>

        <h2>Best Practices</h2>
        <p>Start with a clear goal, then refine iteratively. Test your prompts across different models to find what works best.</p>
      </div>
    ),
  },
  'chain-of-thought-techniques': {
    title: 'Chain-of-Thought Prompting: Advanced Techniques',
    category: 'Techniques',
    readTime: '6 min',
    content: (
      <div className="prose prose-slate max-w-none">
        <h2>What is Chain-of-Thought?</h2>
        <p>Chain-of-Thought (CoT) prompting encourages AI models to break down complex reasoning into steps.</p>
        
        <h2>Basic Example</h2>
        <p><code>Instead of:</code> "What's 15 x 324?"</p>
        <p><code>Try:</code> "Let's solve 15 × 324 step by step. First, break it down..."</p>

        <h2>When to Use CoT</h2>
        <p>Use CoT for: math problems, logic puzzles, planning, code generation, and complex analysis.</p>
      </div>
    ),
  },
  'few-shot-learning': {
    title: 'Few-Shot Learning with Examples',
    category: 'Techniques',
    readTime: '7 min',
    content: (
      <div className="prose prose-slate max-w-none">
        <h2>Few-Shot Prompting Explained</h2>
        <p>Few-shot learning means providing a few examples of the task before asking the AI to perform it on new data.</p>
        
        <h2>Structure</h2>
        <p>Example 1 → Example 2 → New Task</p>

        <h2>Benefits</h2>
        <ul>
          <li>Dramatically improves output quality</li>
          <li>Works across all AI models</li>
          <li>Minimal extra tokens needed</li>
        </ul>
      </div>
    ),
  },
  'midjourney-advanced-prompts': {
    title: 'Advanced Midjourney Prompting',
    category: 'Image Generation',
    readTime: '9 min',
    content: (
      <div className="prose prose-slate max-w-none">
        <h2>Mastering Midjourney Parameters</h2>
        <p>Midjourney's power comes from understanding its parameters: --ar, --v, --q, --s, --sref, and more.</p>
        
        <h2>Essential Parameters</h2>
        <ul>
          <li><code>--ar 16:9</code> - Aspect ratio</li>
          <li><code>--v 6</code> - Model version</li>
          <li><code>--q 2</code> - Quality (0.25, 0.5, 1, 2)</li>
          <li><code>--s 750</code> - Stylize (0-1000)</li>
        </ul>

        <h2>Advanced Techniques</h2>
        <p>Use image weights, style references (--sref), and describe the medium for professional results.</p>
      </div>
    ),
  },
  'dall-e-3-mastery': {
    title: 'DALL-E 3 Mastery: From Text to Stunning Visuals',
    category: 'Image Generation',
    readTime: '8 min',
    content: (
      <div className="prose prose-slate max-w-none">
        <h2>DALL-E 3 vs Earlier Versions</h2>
        <p>DALL-E 3 excels at text rendering, complex compositions, and following detailed instructions precisely.</p>
        
        <h2>Key Strengths</h2>
        <ul>
          <li>Accurate text in images</li>
          <li>Complex multi-element scenes</li>
          <li>Specific style adherence</li>
        </ul>

        <h2>Pro Tips</h2>
        <p>Use descriptive language. DALL-E 3 responds well to natural language over cryptic parameters.</p>
      </div>
    ),
  },
  'video-generation-guide': {
    title: 'Creating Cinematic Videos with Runway & Kling AI',
    category: 'Video Generation',
    readTime: '10 min',
    content: (
      <div className="prose prose-slate max-w-none">
        <h2>Video Generation in 2025</h2>
        <p>Runway Gen-4 and Kling AI represent the state-of-the-art in AI video generation.</p>
        
        <h2>Runway vs Kling</h2>
        <p><strong>Runway:</strong> Better for cinematic, smooth motion</p>
        <p><strong>Kling:</strong> Excellent for text animations and creative effects</p>

        <h2>Prompting Strategy</h2>
        <p>Focus on movement, camera motion, lighting, and mood. Specify duration (5-10 seconds typical).</p>
      </div>
    ),
  },
  'claude-vs-gpt4': {
    title: 'Claude vs GPT-4: Choosing the Right Model',
    category: 'Model Comparison',
    readTime: '7 min',
    content: (
      <div className="prose prose-slate max-w-none">
        <h2>When to Use Each Model</h2>
        <p><strong>Claude 3.5 Sonnet:</strong> Best for analysis, writing, coding. More thoughtful responses.</p>
        <p><strong>GPT-4:</strong> Best for creativity, complex reasoning, multimodal tasks.</p>

        <h2>Prompting Differences</h2>
        <p>Claude prefers longer, more detailed prompts. GPT-4 works well with concise instructions.</p>

        <h2>Model-Specific Optimization</h2>
        <p>Test the same prompt on both and see which produces better results for your use case.</p>
      </div>
    ),
  },
  'prompt-optimization-tips': {
    title: '10 Quick Wins for Prompt Optimization',
    category: 'Tips & Tricks',
    readTime: '5 min',
    content: (
      <div className="prose prose-slate max-w-none">
        <h2>Quick Wins</h2>
        <ol>
          <li>Add "Think step by step" to improve reasoning</li>
          <li>Include one example of the desired output</li>
          <li>Specify the output format explicitly</li>
          <li>Ask for confidence levels on uncertain responses</li>
          <li>Use role-playing ("You are a...")</li>
          <li>Add constraints to limit output</li>
          <li>Test with different temperatures/settings</li>
          <li>Break complex tasks into smaller steps</li>
          <li>Use delimiter characters to separate sections</li>
          <li>Request iteration ("Can you improve this?")</li>
        </ol>

        <h2>Implementation</h2>
        <p>Try one tip per prompt and measure the improvement in output quality.</p>
      </div>
    ),
  },
};

export default function GuidePage({ params }: { params: { slug: string } }) {
  const guide = guides[params.slug];

  if (!guide) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <Link href="/blog" className="text-blue-600 hover:text-blue-700 mb-6 inline-flex items-center">
            ← Back to Guides
          </Link>

          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
              {guide.category}
            </span>
            <h1 className="text-5xl font-bold text-slate-900 mb-4">{guide.title}</h1>
            <p className="text-slate-600">{guide.readTime} read</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            {guide.content}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
