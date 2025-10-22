'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Prompt } from '@/types/prompt';
import { formatDate } from '@/lib/utils';

export default function PromptDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchPrompt(params.id as string);
    }
  }, [params.id]);

  const fetchPrompt = async (id: string) => {
    try {
      const response = await fetch(`/api/prompts/${id}`);
      if (response.ok) {
        const data = await response.json();
        setPrompt(data.prompt);
      } else {
        router.push('/prompts');
      }
    } catch (error) {
      console.error('Error fetching prompt:', error);
      router.push('/prompts');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!prompt) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Prompt not found</h1>
          <Link href="/prompts" className="text-blue-600 hover:underline">
            Back to prompts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <Link
          href="/prompts"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to all prompts
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="mb-6">
            {prompt.featured && (
              <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-semibold rounded-full mb-4">
                ⭐ Featured
              </span>
            )}
            {prompt.verified && (
              <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full mb-4 ml-2">
                ✓ Verified
              </span>
            )}

            <h1 className="text-4xl font-bold mb-4 text-slate-900">{prompt.title}</h1>
            <p className="text-xl text-slate-600 mb-6">{prompt.description}</p>

            <div className="flex items-center gap-6 text-sm text-slate-500 pb-6 border-b border-slate-200">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="font-medium">{prompt.author}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{formatDate(prompt.createdAt)}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                <span>{prompt.views} views</span>
              </div>
              {prompt.rating && (
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>{prompt.rating.toFixed(1)} ({prompt.votes} votes)</span>
                </div>
              )}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-slate-900">Compatible AI Systems</h2>
            <div className="flex flex-wrap gap-2">
              {prompt.aiSystem.map((system) => (
                <span
                  key={system}
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium"
                >
                  {system}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-slate-900">Categories</h2>
            <div className="flex flex-wrap gap-2">
              {prompt.category.map((cat) => (
                <span
                  key={cat}
                  className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-medium"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

          {prompt.techniques && prompt.techniques.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-slate-900">Techniques Used</h2>
              <div className="flex flex-wrap gap-2">
                {prompt.techniques.map((technique) => (
                  <Link
                    key={technique}
                    href={`/techniques#${technique}`}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition-shadow"
                  >
                    {technique.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-slate-900">Prompt Text</h2>
              <button
                onClick={() => copyToClipboard(prompt.promptText)}
                className="flex items-center px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
              >
                {copied ? (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>
            <pre className="bg-slate-900 text-slate-100 p-6 rounded-lg overflow-x-auto">
              <code className="whitespace-pre-wrap">{prompt.promptText}</code>
            </pre>
          </div>

          {prompt.examples && prompt.examples.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-slate-900">Examples</h2>
              <div className="space-y-6">
                {prompt.examples.map((example, index) => (
                  <div key={index} className="border border-slate-200 rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-3 text-slate-900">Example {index + 1}</h3>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-slate-700 mb-2">Input:</h4>
                      <div className="bg-slate-50 p-4 rounded border border-slate-200">
                        <pre className="whitespace-pre-wrap text-sm">{example.input}</pre>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold text-slate-700 mb-2">Output:</h4>
                      <div className="bg-slate-50 p-4 rounded border border-slate-200">
                        <pre className="whitespace-pre-wrap text-sm">{example.output}</pre>
                      </div>
                    </div>

                    {example.notes && (
                      <div className="bg-blue-50 border border-blue-200 p-4 rounded">
                        <p className="text-sm text-blue-900">
                          <strong>Note:</strong> {example.notes}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {prompt.useCases && prompt.useCases.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-slate-900">Use Cases</h2>
              <ul className="space-y-2">
                {prompt.useCases.map((useCase, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-6 h-6 mr-2 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-slate-700">{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {prompt.tags && prompt.tags.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-slate-900">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {prompt.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-slate-100 text-slate-700 rounded-md text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
