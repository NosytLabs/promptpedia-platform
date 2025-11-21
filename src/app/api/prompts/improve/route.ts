import { NextRequest } from 'next/server';
import { apiResponse, handleApiError } from '@/lib/api-response';

export const dynamic = 'force-dynamic';

// Free model options to keep costs low
const FREE_MODELS = ['mistralai/mistral-7b-instruct:free', 'meta-llama/llama-2-7b-chat:free'];

// Pro model options for better quality
const PRO_MODELS = ['openai/gpt-4-turbo-preview', 'anthropic/claude-3-opus'];

async function improvePromptWithOpenRouter(input: string, promptType: string, isPro: boolean) {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error('OpenRouter API key not configured');
  }

  // Select model based on Pro status
  const models = isPro ? PRO_MODELS : FREE_MODELS;
  const model = models[Math.floor(Math.random() * models.length)];

  // Build system prompt based on type
  const systemPrompts: Record<string, string> = {
    standard:
      'You are an expert prompt engineer. Take the user\'s lazy prompt and transform it into a highly effective, clear, and specific prompt that will get great results from ChatGPT. Keep it concise but detailed.',
    reasoning:
      'You are an expert in chain-of-thought prompting. Transform the user\'s prompt into one that encourages step-by-step reasoning and detailed analysis. Include "Let\'s think step by step" patterns.',
    research:
      'You are an expert researcher. Transform the user\'s prompt into one optimized for web research and data gathering. Include specific research objectives and output format requirements.',
    'custom-gpt':
      'You are an expert at creating Custom GPT system prompts. Transform the user\'s idea into a detailed system prompt for a Custom GPT with clear instructions, capabilities, and constraints.',
    video:
      'You are an expert at video generation prompts for tools like Runway and Kling AI. Transform the user\'s idea into a detailed video prompt including camera movement, duration, style, and specific visual elements.',
  };

  const systemPrompt = systemPrompts[promptType] || systemPrompts.standard;

  try {
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
            content: systemPrompt,
          },
          {
            role: 'user',
            content: `Improve this prompt: "${input}"`,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`OpenRouter API error: ${error.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const improved = data.choices[0].message.content;

    return improved;
  } catch (error) {
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { input, promptType, isPro } = await request.json();

    if (!input || !input.trim()) {
      return apiResponse.error('Input prompt is required', 400);
    }

    // Check usage limits
    // TODO: Implement actual usage tracking with database
    // For now, allow all requests but log for future tracking

    const improved = await improvePromptWithOpenRouter(input, promptType || 'standard', isPro || false);

    return apiResponse.success({ improved });
  } catch (error) {
    console.error('Prompt improvement error:', error);
    return apiResponse.error(
      error instanceof Error ? error.message : 'Failed to improve prompt',
      error instanceof Error && error.message.includes('API key') ? 500 : 400
    );
  }
}
