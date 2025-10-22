export type AISystem = 
  | 'claude-3.5-sonnet'
  | 'claude-3-opus'
  | 'claude-3-sonnet'
  | 'claude-3-haiku'
  | 'gpt-4-turbo'
  | 'gpt-4'
  | 'gpt-3.5-turbo'
  | 'gemini-pro'
  | 'gemini-ultra'
  | 'veo-3'
  | 'midjourney'
  | 'stable-diffusion'
  | 'dall-e-3'
  | 'other';

export type PromptTechnique = 
  | 'one-shot'
  | 'few-shot'
  | 'zero-shot'
  | 'chain-of-thought'
  | 'self-consistency'
  | 'prompt-chaining'
  | 'role-based'
  | 'structured-debate'
  | 'iterative-refinement'
  | 'constraint-based'
  | 'socratic-method'
  | 'json-output'
  | 'multi-step'
  | 'standard';

export type PromptCategory = 
  | 'text-generation'
  | 'code-generation'
  | 'data-analysis'
  | 'creative-writing'
  | 'image-generation'
  | 'video-generation'
  | 'chatbot'
  | 'summarization'
  | 'translation'
  | 'education'
  | 'business'
  | 'research'
  | 'entertainment'
  | 'marketing'
  | 'productivity'
  | 'other';

export interface PromptExample {
  input: string;
  output: string;
  notes?: string;
}

export interface Prompt {
  id: string;
  title: string;
  description: string;
  promptText: string;
  aiSystem: AISystem[];
  category: PromptCategory[];
  techniques: PromptTechnique[];
  examples: PromptExample[];
  tags: string[];
  useCases: string[];
  author: string;
  authorEmail?: string;
  rating?: number;
  votes?: number;
  views?: number;
  createdAt: string;
  updatedAt: string;
  featured?: boolean;
  verified?: boolean;
}

export interface PromptSubmission {
  title: string;
  description: string;
  promptText: string;
  aiSystem: AISystem[];
  category: PromptCategory[];
  techniques: PromptTechnique[];
  examples: PromptExample[];
  tags: string[];
  useCases: string[];
  author: string;
  authorEmail?: string;
}

export interface PromptFilter {
  aiSystem?: AISystem[];
  category?: PromptCategory[];
  techniques?: PromptTechnique[];
  tags?: string[];
  search?: string;
  featured?: boolean;
  sortBy?: 'recent' | 'popular' | 'rating';
}
