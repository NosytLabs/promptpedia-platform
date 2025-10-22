'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { AISystem, PromptCategory, PromptExample } from '@/types/prompt';

const AI_SYSTEM_OPTIONS: { value: AISystem; label: string }[] = [
  { value: 'claude-3.5-sonnet', label: 'Claude 3.5 Sonnet' },
  { value: 'claude-3-opus', label: 'Claude 3 Opus' },
  { value: 'claude-3-sonnet', label: 'Claude 3 Sonnet' },
  { value: 'claude-3-haiku', label: 'Claude 3 Haiku' },
  { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
  { value: 'gpt-4', label: 'GPT-4' },
  { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
  { value: 'gemini-pro', label: 'Gemini Pro' },
  { value: 'gemini-ultra', label: 'Gemini Ultra' },
  { value: 'veo-3', label: 'Veo 3' },
  { value: 'midjourney', label: 'Midjourney' },
  { value: 'stable-diffusion', label: 'Stable Diffusion' },
  { value: 'dall-e-3', label: 'DALL·E 3' },
  { value: 'other', label: 'Other' },
];

const CATEGORY_OPTIONS: { value: PromptCategory; label: string }[] = [
  { value: 'text-generation', label: 'Text Generation' },
  { value: 'code-generation', label: 'Code Generation' },
  { value: 'data-analysis', label: 'Data Analysis' },
  { value: 'creative-writing', label: 'Creative Writing' },
  { value: 'image-generation', label: 'Image Generation' },
  { value: 'video-generation', label: 'Video Generation' },
  { value: 'chatbot', label: 'Chatbot' },
  { value: 'summarization', label: 'Summarization' },
  { value: 'translation', label: 'Translation' },
  { value: 'education', label: 'Education' },
  { value: 'business', label: 'Business' },
  { value: 'research', label: 'Research' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'other', label: 'Other' },
];

interface ExampleFormState extends PromptExample {
  id: string;
}

export default function SubmitPromptPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [promptText, setPromptText] = useState('');
  const [aiSystems, setAISystems] = useState<AISystem[]>([]);
  const [categories, setCategories] = useState<PromptCategory[]>([]);
  const [tags, setTags] = useState<string>('');
  const [useCases, setUseCases] = useState<string>('');
  const [author, setAuthor] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [examples, setExamples] = useState<ExampleFormState[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleAISystemToggle = (value: AISystem) => {
    setAISystems((prev) =>
      prev.includes(value)
        ? prev.filter((s) => s !== value)
        : [...prev, value]
    );
  };

  const handleCategoryToggle = (value: PromptCategory) => {
    setCategories((prev) =>
      prev.includes(value)
        ? prev.filter((c) => c !== value)
        : [...prev, value]
    );
  };

  const addExample = () => {
    setExamples((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        input: '',
        output: '',
        notes: '',
      },
    ]);
  };

  const updateExample = (id: string, field: keyof PromptExample, value: string) => {
    setExamples((prev) => prev.map((example) =>
      example.id === id ? { ...example, [field]: value } : example
    ));
  };

  const removeExample = (id: string) => {
    setExamples((prev) => prev.filter((example) => example.id !== id));
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPromptText('');
    setAISystems([]);
    setCategories([]);
    setTags('');
    setUseCases('');
    setAuthor('');
    setAuthorEmail('');
    setExamples([]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !description || !promptText || aiSystems.length === 0 || categories.length === 0 || !author) {
      setError('Please complete all required fields (title, description, prompt text, AI systems, categories, author).');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const payload = {
        title,
        description,
        promptText,
        aiSystem: aiSystems,
        category: categories,
        tags: tags.split(',').map((tag) => tag.trim()).filter(Boolean),
        useCases: useCases.split('\n').map((useCase) => useCase.trim()).filter(Boolean),
        examples: examples.map(({ id, ...rest }) => rest),
        author,
        authorEmail: authorEmail || undefined,
      };

      const response = await fetch('/api/prompts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to submit prompt');
      }

      setSuccess('Prompt submitted successfully! It will appear in the gallery shortly.');
      resetForm();

      setTimeout(() => {
        router.push('/prompts');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'An error occurred while submitting the prompt.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            Share Your Expertise
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Submit an <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">In-Depth Prompt</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Contribute to the largest community-curated library of production-ready prompts for Claude, ChatGPT, Veo 3, and beyond.
          </p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="p-4 bg-red-100 text-red-700 rounded-lg border border-red-200">
                {error}
              </div>
            )}

            {success && (
              <div className="p-4 bg-green-100 text-green-700 rounded-lg border border-green-200">
                {success}
              </div>
            )}

            <section>
              <h2 className="text-2xl font-bold mb-4">Core Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-semibold text-slate-700">Prompt Title *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="What's the name of your prompt?"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-semibold text-slate-700">Author Name *</label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="How should we credit you?"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-semibold text-slate-700">Author Email</label>
                  <input
                    type="email"
                    value={authorEmail}
                    onChange={(e) => setAuthorEmail(e.target.value)}
                    placeholder="Optional — used for verification"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-semibold text-slate-700">Short Description *</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Give an overview of what this prompt does and who it's for"
                    rows={3}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Prompt Content</h2>
              <div className="space-y-2">
                <label className="font-semibold text-slate-700">Prompt Text *</label>
                <textarea
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  placeholder="Paste your complete prompt here"
                  rows={12}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                  required
                />
                <p className="text-sm text-slate-500">
                  Include placeholders like {{VARIABLE}} to make your prompt reusable.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">AI Systems *</h2>
              <p className="text-sm text-slate-500 mb-4">
                Select all AI systems this prompt is optimized for.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {AI_SYSTEM_OPTIONS.map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center gap-3 px-4 py-3 border rounded-lg cursor-pointer transition-colors ${
                      aiSystems.includes(option.value)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      checked={aiSystems.includes(option.value)}
                      onChange={() => handleAISystemToggle(option.value)}
                    />
                    <span className="font-medium text-slate-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Categories *</h2>
              <p className="text-sm text-slate-500 mb-4">
                Choose the categories that best describe your prompt.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {CATEGORY_OPTIONS.map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center gap-3 px-4 py-3 border rounded-lg cursor-pointer transition-colors ${
                      categories.includes(option.value)
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-slate-200 hover:border-purple-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      checked={categories.includes(option.value)}
                      onChange={() => handleCategoryToggle(option.value)}
                    />
                    <span className="font-medium text-slate-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Tags & Use Cases</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="font-semibold text-slate-700">Tags</label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="Enter comma-separated tags (e.g., research, strategy, enterprise)"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-semibold text-slate-700">Use Cases</label>
                  <textarea
                    value={useCases}
                    onChange={(e) => setUseCases(e.target.value)}
                    placeholder={`List each use case on a new line.\nExample:\n- Customer support triaging\n- Legal document analysis\n- Automated market research`}
                    rows={5}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Examples</h2>
                <button
                  type="button"
                  onClick={addExample}
                  className="inline-flex items-center px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Example
                </button>
              </div>
              <p className="text-sm text-slate-500 mb-4">
                Provide real-world input/output examples to help others understand how to use your prompt effectively.
              </p>

              <div className="space-y-6">
                {examples.length === 0 && (
                  <div className="border border-dashed border-slate-300 rounded-lg p-6 text-center text-slate-500">
                    No examples added yet. Click “Add Example” to include detailed walkthroughs.
                  </div>
                )}

                {examples.map((example, index) => (
                  <div key={example.id} className="border border-slate-200 rounded-xl p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-slate-700">Example {index + 1}</h3>
                      <button
                        type="button"
                        onClick={() => removeExample(example.id)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="font-semibold text-slate-700">Sample Input</label>
                        <textarea
                          value={example.input}
                          onChange={(e) => updateExample(example.id, 'input', e.target.value)}
                          placeholder="Paste the exact user input or context"
                          rows={4}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="font-semibold text-slate-700">Expected Output</label>
                        <textarea
                          value={example.output}
                          onChange={(e) => updateExample(example.id, 'output', e.target.value)}
                          placeholder="Show the AI's ideal response"
                          rows={4}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="font-semibold text-slate-700">Notes</label>
                        <textarea
                          value={example.notes || ''}
                          onChange={(e) => updateExample(example.id, 'notes', e.target.value)}
                          placeholder="Explain why this example works well or tips for adaptation"
                          rows={3}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200">
              <p className="text-sm text-slate-500">
                By submitting, you agree to share this prompt with the community under the Promptpedia contribution guidelines.
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Prompt'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
