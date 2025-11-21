# Code Optimization for Low-Cost Hosting

## Priority 1: Caching (Biggest impact)

### Database Query Caching
```typescript
// lib/cache.ts
import { cache } from 'react';

export const getPromptsOptimized = cache(async () => {
  const prompts = await prisma.prompt.findMany({
    where: { isPublic: true, status: 'PUBLISHED' },
    include: { user: { select: { name: true, image: true } } },
  });
  return prompts;
});

// Revalidate: daily (86400 seconds)
// Result: 90% fewer database queries
```

### Route Caching
```typescript
// src/app/prompts/page.tsx
export const revalidate = 3600; // Cache for 1 hour

// This means:
// - First user generates HTML
// - Next 3600 seconds: Serve cached HTML (zero compute cost!)
// - At 3600s: Regenerate in background
```

### Header-Based Caching
```javascript
// next.config.js already has:
{
  headers: [
    {
      key: 'Cache-Control',
      value: 'public, max-age=86400, must-revalidate'
    }
  ]
}
```

## Priority 2: Bundle Size (Reduce requests)

### Current optimizations:
- ✅ swcMinify: true (25% smaller JS)
- ✅ compress: true (gzip enabled)
- ✅ No source maps in prod

### Add to next.config.js:
```javascript
{
  productionBrowserSourceMaps: false,
  experimental: {
    optimizePackageImports: [
      "lucide-react",  // Only import what you use
      "@radix-ui/react-*",
    ],
  }
}
```

## Priority 3: Image Optimization (Reduce bandwidth)

### Current: Not optimized
### Target: WebP + lazy loading

```jsx
// components/prompt-card.tsx
import Image from 'next/image';

export function PromptCard({ prompt }) {
  return (
    <Image
      src={prompt.image}
      alt={prompt.title}
      width={400}
      height={300}
      loading="lazy"        // Don't load until visible
      quality={75}          // Reduce quality 20%
      sizes="(max-width: 768px) 100vw, 50vw"
      placeholder="blur"    // Show blur while loading
      blurDataURL={...}     // Tiny placeholder
    />
  );
}
```

## Priority 4: API Cost Reduction (Most expensive)

### Use free models for testing
```typescript
// src/lib/ai.ts
export async function generatePrompt(prompt: string, strategy: string) {
  // Free tier users get Mistral (free)
  const model = user?.tier === 'PRO' 
    ? 'anthropic/claude-3-sonnet'  // $0.06/request
    : 'mistralai/mistral-7b';       // $0.00/request

  return openRouter.chat.completions.create({
    model,
    messages: [{ role: 'user', content: prompt }],
  });
}
```

### Cache API responses
```typescript
const cachedResponse = cache(async () => {
  return generatePrompt(userPrompt, strategy);
}, { revalidate: 604800 });  // Cache 7 days
```

## Priority 5: Database Optimization

### Add indexes for frequent queries
```typescript
// prisma/schema.prisma
model Prompt {
  id        Int     @id @default(autoincrement())
  title     String
  isPublic  Boolean @default(true)
  status    String  @default("DRAFT")
  viewCount Int     @default(0)

  @@index([isPublic, status])      // For browsing
  @@index([viewCount])             // For trending
  @@index([category])              // For filtering
}
```

### Implement connection pooling
```typescript
// Already in DATABASE_URL with Replit
// Prisma auto-uses connection pooling on managed DB
```

## Results Expected

| Optimization | Impact | Implementation |
|---|---|---|
| Caching (1 hour) | -90% DB queries | 30 min |
| Bundle reduction | -30% JS size | 1 hour |
| Image lazy loading | -70% image loads | 1 hour |
| Free API models | -100% cost (free users) | 30 min |
| DB indexing | -50% query time | 30 min |

**Total savings: 60-75% compute usage** = 60-75% lower hosting costs
