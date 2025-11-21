import { cache } from 'react';
import prisma from './prisma';

/**
 * OPTIMIZED DATABASE QUERIES
 * All queries use React cache() for request-level deduplication
 * This prevents N+1 queries on same request
 */

// Cache: Only within the same request, revalidate every hour
export const getPopularPrompts = cache(async (limit = 20) => {
  return prisma.prompt.findMany({
    where: { isPublic: true, status: 'PUBLISHED' },
    orderBy: { viewCount: 'desc' },
    take: limit,
    select: {
      id: true,
      title: true,
      description: true,
      category: true,
      aiSystem: true,
      rating: true,
      ratingCount: true,
      viewCount: true,
    },
  });
});

// Cache: Featured prompts with user info
export const getFeaturedPrompts = cache(async () => {
  return prisma.prompt.findMany({
    where: { 
      isPublic: true, 
      status: 'PUBLISHED',
      rating: { gte: 4.5 },
    },
    orderBy: { rating: 'desc' },
    take: 6,
    include: {
      user: {
        select: { name: true, image: true },
      },
    },
  });
});

// Cache: Search prompts with proper indexing
export const searchPrompts = cache(async (
  query: string,
  category?: string,
  limit = 20
) => {
  return prisma.prompt.findMany({
    where: {
      isPublic: true,
      status: 'PUBLISHED',
      AND: [
        {
          OR: [
            { title: { search: query } },
            { description: { search: query } },
          ],
        },
        category ? { category: { has: category } } : {},
      ],
    },
    orderBy: [
      { _relevance: { search: query, sort: 'desc' } },
      { viewCount: 'desc' },
    ],
    take: limit,
  });
});

// Cache: Get single prompt with all details
export const getPromptById = cache(async (id: string | number) => {
  return prisma.prompt.findUnique({
    where: { id: typeof id === 'string' ? parseInt(id) : id },
    include: {
      user: {
        select: { name: true, image: true, email: true },
      },
      _count: {
        select: { feedback: true },
      },
    },
  });
});

// Cache: Get related prompts based on category/tags
export const getRelatedPrompts = cache(async (
  category: string[],
  currentId: number,
  limit = 5
) => {
  return prisma.prompt.findMany({
    where: {
      isPublic: true,
      status: 'PUBLISHED',
      id: { not: currentId },
      category: { hasSome: category },
    },
    orderBy: { viewCount: 'desc' },
    take: limit,
    select: {
      id: true,
      title: true,
      description: true,
      category: true,
      rating: true,
    },
  });
});

// Cache: Statistics for dashboard
export const getPromptStats = cache(async () => {
  return prisma.prompt.aggregate({
    _count: true,
    _avg: {
      rating: true,
      viewCount: true,
    },
  });
});
