import { NextRequest } from 'next/server';
import { apiResponse } from '@/lib/api-response';

export const dynamic = 'force-dynamic';

const FREE_MODELS = ['mistralai/mistral-7b-instruct:free', 'meta-llama/llama-2-7b-chat:free'];
const PRO_MODELS = ['openai/gpt-4-turbo-preview', 'anthropic/claude-3-opus'];

interface ImprovePromptRequest {
  input: string;
  promptType?: string;
  isPro?: boolean;
  strategy?: 'standard' | 'cot' | 'few-shot' | 'hybrid';
}

// Advanced prompt optimization strategies based on research
const strategies = {
  standard: {
    system: 'Transform the user\'s lazy prompt into a clear, effective prompt optimized for ChatGPT. Be concise but detailed.',
    temperature: 0.7,
  },
  cot: {
    system: `Transform the user's prompt into one that uses Chain-of-Thought reasoning. 
Include "Let's think step by step" patterns. Structure: 1) Problem analysis, 2) Sub-steps, 3) Solution.
Use this when the task involves reasoning, math, logic, or complex analysis.`,
    temperature: 0.5,
  },
  'few-shot': {
    system: `Transform the user's prompt to use few-shot learning with 2-3 high-quality examples.
Structure: [Example 1 Input → Output] [Example 2 Input → Output] [User's actual task]
Ensure examples are diverse and representative.`,
    temperature: 0.6,
  },
  hybrid: {
    system: `Create a HYBRID prompt combining multiple techniques:
1. Few-shot examples (2-3 diverse examples)
2. Chain-of-thought structure (step-by-step thinking)
3. Clear constraints and output format
4. Role-based context if beneficial
Optimize for accuracy and clarity.`,
    temperature: 0.6,
  },
};

async function improvePromptWithOpenRouter(
  input: string,
  strategy: string = 'hybrid',
  isPro: boolean = false
) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error('OpenRouter API key not configured');

  const models = isPro ? PRO_MODELS : FREE_MODELS;
  const model = models[Math.floor(Math.random() * models.length)];
  
  const strategyConfig = strategies[strategy as keyof typeof strategies] || strategies.hybrid;

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
      'HTTP-Referer': process.env.NEXT_PUBLIC_DOMAIN || 'https://promptpedia.replit.dev',
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: 'system',
          content: strategyConfig.system,
        },
        {
          role: 'user',
          content: `Improve this prompt: "${input}"
        
Return ONLY the improved prompt, no explanations.`,
        },
      ],
      temperature: strategyConfig.temperature,
      max_tokens: 600,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'OpenRouter API error');
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

export async function POST(request: NextRequest) {
  try {
    const body: ImprovePromptRequest = await request.json();
    const { input, isPro = false, strategy = 'hybrid' } = body;

    if (!input?.trim()) {
      return apiResponse.error('Input prompt is required', 400);
    }

    // Check usage limits for free users
    if (!isPro) {
      // Free users limited to 5 per day - would check against database in production
      // For now, allow all requests but rate limiting would be implemented via API gateway
    }

    const improved = await improvePromptWithOpenRouter(input, strategy, isPro);
    return apiResponse.success({ improved });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to improve prompt';
    const status = message.includes('API key') ? 500 : 400;
    return apiResponse.error(message, status);
  }
}
