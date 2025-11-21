export function generateSchemaMarkup() {
  const baseUrl = process.env.NEXT_PUBLIC_DOMAIN || 'https://promptpedia.replit.dev';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Promptpedia',
    description: 'Discover 50+ production-ready AI prompts for business, coding, design, and content creation',
    url: baseUrl,
    applicationCategory: 'ProductionApplication',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: '0',
      highPrice: '9',
      offerCount: '2',
      offers: [
        {
          '@type': 'Offer',
          name: 'Free Plan',
          price: '0',
          priceCurrency: 'USD',
          description: 'Browse 50+ prompts, Learn from blog, Submit prompts, Rate & share',
        },
        {
          '@type': 'Offer',
          name: 'Pro Plan',
          price: '9',
          priceCurrency: 'USD',
          description: 'Advanced prompt generation, Real-time AI testing, Collections, Export prompts',
        },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '250+',
    },
    keywords: 'prompt engineering, ChatGPT, Claude, GPT-4, Midjourney, AI prompts, make money',
    author: {
      '@type': 'Organization',
      name: 'Promptpedia',
      url: baseUrl,
    },
    inLanguage: 'en',
    isAccessibleForFree: true,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/prompts?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generatePromptSchema(prompt: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: prompt.title,
    description: prompt.description,
    text: prompt.promptText,
    keywords: prompt.tags?.join(', '),
    datePublished: prompt.createdAt,
    dateModified: prompt.updatedAt,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: prompt.rating,
      reviewCount: prompt.ratingCount,
    },
    author: {
      '@type': 'Organization',
      name: 'Promptpedia',
    },
  };
}
