import { NextRequest } from 'next/server';
import { apiResponse } from '@/lib/api-response';

export const dynamic = 'force-dynamic';

const FREE_MODELS = ['mistralai/mistral-7b-instruct:free'];
const PRO_MODELS = ['openai/gpt-4-turbo-preview'];

export async function POST(request: NextRequest) {
  try {
    const { prompt, isPro = false } = await request.json();

    if (!prompt?.trim()) {
      return apiResponse.error('Prompt is required', 400);
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return apiResponse.error('Service not configured', 500);
    }

    const model = isPro ? PRO_MODELS[0] : FREE_MODELS[0];

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'HTTP-Referer': process.env.NEXT_PUBLIC_DOMAIN || 'https://promptpedia.replit.dev',
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 400,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'API error');
    }

    const data = await response.json();
    return apiResponse.success({ response: data.choices[0].message.content });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to test prompt';
    return apiResponse.error(message, 400);
  }
}
