import { Prompt, PromptSubmission, PromptFilter } from '@/types/prompt';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const DB_PATH = join(process.cwd(), 'data', 'prompts.json');

function ensureDataDir() {
  const dataDir = join(process.cwd(), 'data');
  if (!existsSync(dataDir)) {
    const { mkdirSync } = require('fs');
    mkdirSync(dataDir, { recursive: true });
  }
}

export function getAllPrompts(): Prompt[] {
  try {
    ensureDataDir();
    if (!existsSync(DB_PATH)) {
      return [];
    }
    const data = readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading prompts:', error);
    return [];
  }
}

export function getPromptById(id: string): Prompt | null {
  const prompts = getAllPrompts();
  return prompts.find(p => p.id === id) || null;
}

export function searchPrompts(filter: PromptFilter): Prompt[] {
  let prompts = getAllPrompts();

  if (filter.aiSystem && filter.aiSystem.length > 0) {
    prompts = prompts.filter(p => 
      p.aiSystem.some(system => filter.aiSystem!.includes(system))
    );
  }

  if (filter.category && filter.category.length > 0) {
    prompts = prompts.filter(p => 
      p.category.some(cat => filter.category!.includes(cat))
    );
  }

  if (filter.tags && filter.tags.length > 0) {
    prompts = prompts.filter(p => 
      p.tags.some(tag => filter.tags!.includes(tag))
    );
  }

  if (filter.search) {
    const searchLower = filter.search.toLowerCase();
    prompts = prompts.filter(p => 
      p.title.toLowerCase().includes(searchLower) ||
      p.description.toLowerCase().includes(searchLower) ||
      p.promptText.toLowerCase().includes(searchLower) ||
      p.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }

  if (filter.featured) {
    prompts = prompts.filter(p => p.featured);
  }

  if (filter.sortBy) {
    switch (filter.sortBy) {
      case 'recent':
        prompts.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'popular':
        prompts.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      case 'rating':
        prompts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
    }
  }

  return prompts;
}

export function createPrompt(submission: PromptSubmission): Prompt {
  ensureDataDir();
  const prompts = getAllPrompts();
  
  const newPrompt: Prompt = {
    id: `prompt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    ...submission,
    rating: 0,
    votes: 0,
    views: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    featured: false,
    verified: false,
  };

  prompts.push(newPrompt);
  writeFileSync(DB_PATH, JSON.stringify(prompts, null, 2));
  
  return newPrompt;
}

export function updatePromptViews(id: string): void {
  ensureDataDir();
  const prompts = getAllPrompts();
  const prompt = prompts.find(p => p.id === id);
  
  if (prompt) {
    prompt.views = (prompt.views || 0) + 1;
    writeFileSync(DB_PATH, JSON.stringify(prompts, null, 2));
  }
}

export function getFeaturedPrompts(limit: number = 6): Prompt[] {
  const prompts = getAllPrompts()
    .filter(p => p.featured)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
  
  return prompts;
}

export function getRecentPrompts(limit: number = 10): Prompt[] {
  return getAllPrompts()
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}

export function getPopularPrompts(limit: number = 10): Prompt[] {
  return getAllPrompts()
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, limit);
}

export function getAllTags(): string[] {
  const prompts = getAllPrompts();
  const tagsSet = new Set<string>();
  
  prompts.forEach(prompt => {
    prompt.tags.forEach(tag => tagsSet.add(tag));
  });
  
  return Array.from(tagsSet).sort();
}
