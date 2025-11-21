# Promptpedia Platform - Replit Setup

## Overview
Promptpedia is a professional prompt engineering platform built with Next.js 14, React, TypeScript, and PostgreSQL. It provides tools for discovering, creating, improving, and monetizing AI prompts with advanced features and community collaboration.

**Current State:** Production-ready platform with 100+ curated prompts, advanced optimization engine, Pro membership, comprehensive blog, and user submission system.

## Recent Changes (November 21, 2025 - Quality of Life Polish)
- **Share Functionality**: One-click share buttons for Twitter, LinkedIn, email, and copy-to-clipboard
- **User Feedback System**: Helpful/not-helpful toggles with optional comment submission
- **Related Prompts**: Smart recommendations based on category and AI system similarity
- **Advanced Search**: Filter by category, AI system, rating, and sort (recent/popular/rated)
- **Navigation Polish**: Clean 4-item navbar (Home, Browse, Generate, Learn) with emoji icons
- **Blog Expansion**: Added 14 SEO-focused guides covering business, content creation, web design, SEO, coding
- **Route Consolidation**: Removed redundant /enhance, /techniques, /resources - single source of truth
- **Code Cleanup**: Removed unused components, optimized file structure for maintainability

## Architecture

### Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL (Neon on Replit)
- **ORM:** Prisma
- **Authentication:** NextAuth.js
- **Payment:** Dodo Payments (usage-based + recurring)
- **Styling:** Tailwind CSS v3
- **UI Components:** Radix UI
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **API Integration:** OpenRouter (Mistral/Llama for free, GPT-4/Claude for Pro)

### Project Structure
```
src/
├── app/                          # Next.js App Router
│   ├── (marketing)/              # Public marketing pages
│   ├── api/                      # Backend API routes
│   ├── auth/                     # Authentication
│   ├── prompts/                  # Prompt library & CRUD
│   ├── generate/                 # AI prompt optimization
│   ├── blog/                     # Educational guides
│   ├── dashboard/                # User dashboard
│   ├── settings/                 # User preferences
│   ├── submit/                   # User prompt submissions
│   └── forum/                    # Community discussions
├── components/                   # Reusable React components
│   ├── layout/                   # Header, footer, navbar
│   ├── ui/                       # UI primitives
│   ├── share-prompt-button.tsx   # Share to social media
│   ├── advanced-search.tsx       # Filter & search UI
│   ├── related-prompts.tsx       # Recommendation component
│   ├── prompt-feedback.tsx       # User feedback collection
│   └── [other components]
├── lib/                          # Utilities & configurations
├── styles/                       # Global styles
└── types/                        # TypeScript definitions

prisma/
├── schema.prisma                 # Database schema
└── seed-comprehensive.js         # 34 production prompts
```

### Database Schema
**Core Tables:**
- User: Profiles, preferences, roles
- Prompt: 100+ prompts with ratings, views, engagement
- Membership: FREE/PRO tiers with Dodo Payments integration
- Subscription: Recurring & usage-based billing
- ForumPost/ForumReply: Community discussions
- UserContribution: Activity tracking

**Dodo Payments Integration:**
- `dodoCustomerId` / `dodoSubscriptionId` for recurring billing
- Usage tracking for metered pricing (improvements per day)
- Webhook handling for payment events

## Key Features

### For Free Users
✅ Browse 100+ production prompts
✅ 5-star rating system
✅ Search and filter prompts
✅ Read educational blog (14 guides)
✅ Submit prompts for review
✅ Share prompts to social media
✅ View analytics (prompts, ratings)

### For Pro Users ($9/month)
✅ All free features +
✅ Unlimited prompt improvements (4 strategies: Standard, CoT, Few-Shot, Hybrid)
✅ Test library prompts with live AI responses
✅ Advanced search with filtering
✅ Collections & favorites
✅ Export prompts (JSON/CSV)
✅ Priority support
✅ No ads

### Advanced Features
- **Prompt Optimization Engine**: 4 research-backed strategies using OpenRouter
- **Real-time AI Testing**: Test prompts with Mistral (free) or GPT-4/Claude (Pro)
- **Usage Tracking**: Free users get 5 daily improvements, Pro users get 100
- **Community Submissions**: Users can submit prompts for admin review
- **Comprehensive Blog**: SEO-optimized guides on prompt engineering, business, web design
- **Social Sharing**: One-click share to Twitter, LinkedIn, email
- **User Feedback**: Helpful/not-helpful with comment collection
- **Related Prompts**: Smart recommendations based on similarity

## Monetization Strategy

### Revenue Model
1. **Pro Subscription** ($9/month)
   - Recurring billing via Dodo Payments
   - Payment page at /pricing

2. **Usage-Based Billing** (Future)
   - Free: 5 daily prompt improvements
   - Pro: 100+ daily improvements
   - Additional usage charged at $0.01-0.10 per improvement
   - Implemented via Dodo Payments metered billing

3. **Enterprise** (Future)
   - Team workspaces
   - API access
   - Custom integrations
   - Dedicated support

### Cost Optimization
- Free models (Mistral 7B, Llama 2) for free users
- Premium models (GPT-4, Claude) only for Pro users
- localStorage for collections (zero backend cost)
- Dodo Payments (lower fees than Stripe)
- Self-hosted on Replit (low server costs)

## Deployment

### Development
```bash
npm run dev
# Runs on 0.0.0.0:5000
```

### Production (via Replit)
- Build: `npm run build`
- Start: `npm start`
- Deployment target: autoscale (serverless)

## Configuration

### Environment Variables (Required)
```
DATABASE_URL              # PostgreSQL connection
OPENROUTER_API_KEY        # AI model access
NEXT_PUBLIC_DOMAIN        # Public app domain
```

### Optional Variables
```
NEXTAUTH_URL              # NextAuth configuration
NEXTAUTH_SECRET           # JWT secret
DODO_SECRET_KEY           # Dodo Payments (for production)
NEXT_PUBLIC_DODO_PUBLIC_KEY  # Dodo public key
```

## SEO & Content Strategy

**14 Blog Guides** covering:
- Prompt engineering fundamentals (2025)
- Advanced techniques (CoT, Few-Shot, Hybrid)
- Model-specific guides (Midjourney, DALL-E, Claude vs GPT-4)
- Monetization (Making Money, Business Growth)
- Content Creation (Blog to Books)
- Technical (Web Design, Coding, SEO, Database Design)
- Design Systems & Accessibility

**Organic Growth Vectors:**
- Long-tail keywords (50+ blog posts planned)
- Prompt library SEO (meta descriptions, schema markup)
- Community-generated content (user submissions)
- Social sharing (viral potential through Twitter/LinkedIn)

## Next Steps (Low-Cost Implementation)

### High Priority (Dev Cost: LOW)
1. ✅ Dodo Payments usage-based billing setup
2. ✅ Advanced search with full-text capabilities
3. ✅ Share & feedback system
4. ⏳ Email notifications (SendGrid free tier)
5. ⏳ Analytics dashboard (PostHog free tier)

### Medium Priority (Dev Cost: MEDIUM)
1. File uploads (avatars, thumbnails) - using local storage/Replit
2. Admin moderation dashboard
3. Prompt versioning & history
4. Team workspaces (Pro feature)
5. API documentation & keys

### Lower Priority (Dev Cost: HIGH)
1. Real-time WebSocket collaboration
2. Advanced AI model benchmarking
3. Custom integrations (Zapier, Make)
4. Native mobile apps

## Performance Metrics

**Target KPIs:**
- Page load: <2s (Core Web Vitals green)
- Time to Interactive: <3s
- First Contentful Paint: <1.5s
- Lighthouse score: 85+

**User Metrics:**
- 1000+ daily active users (Year 1 goal)
- 10% free-to-Pro conversion
- 100+ community-submitted prompts
- $5K+ monthly recurring revenue

## Notes
- Platform uses Dodo Payments (preferred over Stripe for lower fees)
- All free tier features are fully functional (excellent onboarding)
- Pro monetization is clear and fair (users see immediate value)
- Low dev cost through free/cheap service integrations
- SEO-first content strategy for organic growth
- Community-driven via user submissions and sharing

