import { NextRequest, NextResponse } from 'next/server';
import { getAllPrompts, createPrompt, searchPrompts } from '@/lib/prompts-db';
import { PromptSubmission, PromptFilter } from '@/types/prompt';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    const filter: PromptFilter = {
      aiSystem: searchParams.get('aiSystem')?.split(',') as any,
      category: searchParams.get('category')?.split(',') as any,
      techniques: searchParams.get('techniques')?.split(',') as any,
      tags: searchParams.get('tags')?.split(','),
      search: searchParams.get('search') || undefined,
      featured: searchParams.get('featured') === 'true',
      sortBy: (searchParams.get('sortBy') as any) || 'recent',
    };

    const hasFilters = filter.aiSystem || filter.category || filter.techniques || filter.tags || filter.search || filter.featured;
    
    const prompts = hasFilters ? searchPrompts(filter) : getAllPrompts();
    
    return NextResponse.json({ 
      prompts,
      total: prompts.length 
    });
  } catch (error) {
    console.error('Error fetching prompts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch prompts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const submission: PromptSubmission = {
      title: body.title,
      description: body.description,
      promptText: body.promptText,
      aiSystem: body.aiSystem || [],
      category: body.category || [],
      techniques: body.techniques || [],
      examples: body.examples || [],
      tags: body.tags || [],
      useCases: body.useCases || [],
      author: body.author,
      authorEmail: body.authorEmail,
    };

    if (!submission.title || !submission.description || !submission.promptText) {
      return NextResponse.json(
        { error: 'Missing required fields: title, description, promptText' },
        { status: 400 }
      );
    }

    if (!submission.author) {
      return NextResponse.json(
        { error: 'Author name is required' },
        { status: 400 }
      );
    }

    const newPrompt = createPrompt(submission);
    
    return NextResponse.json({ 
      prompt: newPrompt,
      message: 'Prompt created successfully' 
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating prompt:', error);
    return NextResponse.json(
      { error: 'Failed to create prompt' },
      { status: 500 }
    );
  }
}
