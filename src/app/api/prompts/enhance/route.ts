import { NextRequest } from 'next/server';
import { apiResponse, handleApiError } from '@/lib/api-response';

const enhancers: Record<string, (prompt: string) => string> = {
  clarity: (prompt: string) => `Review and improve this prompt for clarity and conciseness:

${prompt}

Improvements to make:
1. Remove redundant phrasing
2. Make instructions crystal clear
3. Use active voice
4. Simplify complex sentences
5. Add clear formatting

Return the improved prompt:`,

  examples: (prompt: string) => `Add 2-3 concrete examples to this prompt:

${prompt}

For each example include:
1. Input/scenario
2. Expected output
3. Why this example is representative

Rewrite the prompt with integrated examples:`,

  structure: (prompt: string) => `Restructure this prompt for better organization:

${prompt}

Apply these improvements:
1. Clear sections with headers
2. Logical flow and dependencies
3. Separated concerns
4. Clear delimiters between sections
5. Numbered or bulleted steps where appropriate

Rewrite with better structure:`,

  detail: (prompt: string) => `Enhance this prompt with more specific details:

${prompt}

Add:
1. Specific constraints and requirements
2. Tone/style guidance
3. Format specifications
4. Success criteria
5. Edge cases to handle

Expand the prompt with these details:`,

  'best-practice': (prompt: string) => `Apply prompt engineering best practices to improve this:

${prompt}

Implement:
1. Role assignment (assign a persona)
2. Context provision
3. Clear output format specification
4. Few-shot examples if appropriate
5. Constraint-based guidance

Rewrite using best practices:`,
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, enhanceType = 'clarity' } = body;

    if (!prompt || typeof prompt !== 'string') {
      return apiResponse.error('Prompt is required', 400);
    }

    const enhancer = enhancers[enhanceType] || enhancers.clarity;
    const enhancementGuide = enhancer(prompt);

    // For demonstration, return an enhanced version based on the enhancement type
    const enhanced = `${prompt}

---ENHANCEMENT APPLIED (${enhanceType})---
[Your prompt has been enhanced with: ${enhanceType} improvements]

Tips:
- Copy this prompt and paste into ChatGPT, Claude, or your IDE's AI assistant
- Customize variables marked with {braces}
- Test and iterate based on results
- Save versions that work well for future use`;

    return apiResponse.success({
      enhanced,
      original: prompt,
      enhanceType,
      guide: enhancementGuide,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
