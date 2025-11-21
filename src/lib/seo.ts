import type { Metadata } from 'next';

export function generateSEOMetadata(
  title: string,
  description: string,
  path: string,
  image?: string
): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_DOMAIN || 'https://promptpedia.replit.dev';
  const fullUrl = `${baseUrl}${path}`;

  return {
    title: `${title} | Promptpedia`,
    description,
    canonical: fullUrl,
    openGraph: {
      title: `${title} | Promptpedia`,
      description,
      url: fullUrl,
      type: 'website',
      images: image ? [{ url: image }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Promptpedia`,
      description,
    },
    keywords: [
      'prompt engineering',
      'AI prompts',
      'Midjourney',
      'DALL-E',
      'ChatGPT',
      'Claude',
      'prompt library',
      'AI tools',
    ],
  };
}

export const siteMetadata = {
  title: 'Promptpedia - Prompt Library & Engineering Platform',
  description: 'Browse 100+ production-ready prompts for Midjourney, DALL-E 3, GPT-4, Claude, and more. Save collections, export to JSON/CSV, and master prompt engineering.',
  keywords: [
    'prompt engineering',
    'AI prompts',
    'Midjourney prompts',
    'DALL-E prompts',
    'ChatGPT prompts',
    'Claude prompts',
    'prompt library',
  ],
};
