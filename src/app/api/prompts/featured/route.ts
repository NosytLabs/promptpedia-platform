import { NextResponse } from 'next/server';
import { getFeaturedPrompts } from '@/lib/prompts-db';

export async function GET() {
  try {
    const prompts = getFeaturedPrompts(6);
    
    return NextResponse.json({ 
      prompts,
      total: prompts.length 
    });
  } catch (error) {
    console.error('Error fetching featured prompts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch featured prompts' },
      { status: 500 }
    );
  }
}
