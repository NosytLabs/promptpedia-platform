import { NextRequest } from 'next/server';
import { apiResponse, handleApiError } from '@/lib/api-response';

const templatesByStyle: Record<string, (topic: string, useCase: string) => string> = {
  instructive: (topic: string, useCase: string) => `You are an expert in ${useCase}. Create a detailed, step-by-step prompt for: ${topic}

Include:
1. Clear objective
2. Step-by-step instructions
3. Success criteria
4. Example output format

Make it actionable and specific.`,

  'role-based': (topic: string, useCase: string) => `You are a world-class ${useCase} expert with 20+ years of experience.

Create a prompt for: ${topic}

Include:
1. Your expertise background
2. Specific guidelines based on your role
3. Quality expectations
4. Example approach

Make it authoritative and detailed.`,

  'chain-of-thought': (topic: string, useCase: string) => `Create a prompt for: ${topic}

Use the Chain-of-Thought technique:
1. Start with "Let's think through this step by step"
2. Break the problem into components
3. Show reasoning at each step
4. Include verification step
5. Final answer format

Ensure it forces deliberate reasoning.`,

  'few-shot': (topic: string, useCase: string) => `Create a prompt for: ${topic}

Include:
1. Clear task description
2. 2-3 detailed examples showing:
   - Input format
   - Reasoning process
   - Expected output
3. Now apply this to: {user_input}

Make examples concrete and representative.`,

  structured: (topic: string, useCase: string) => `Create a prompt for: ${topic}

Requirements:
1. Task: Clear objective
2. Context: Relevant background
3. Output format: JSON with specific fields
4. Constraints: Rules to follow
5. Example: Show JSON structure

Provide structured, machine-readable output.`,
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { topic, useCase = 'general', style = 'instructive' } = body;

    if (!topic || typeof topic !== 'string') {
      return apiResponse.error('Topic is required', 400);
    }

    const generator = templatesByStyle[style] || templatesByStyle.instructive;
    const prompt = generator(topic, useCase);

    return apiResponse.success({
      prompt,
      topic,
      useCase,
      style,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
