import { NextRequest, NextResponse } from 'next/server';
import { getPromptById, updatePromptViews } from '@/lib/prompts-db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const prompt = getPromptById(params.id);
    
    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt not found' },
        { status: 404 }
      );
    }

    updatePromptViews(params.id);
    
    return NextResponse.json({ prompt });
  } catch (error) {
    console.error('Error fetching prompt:', error);
    return NextResponse.json(
      { error: 'Failed to fetch prompt' },
      { status: 500 }
    );
  }
}
