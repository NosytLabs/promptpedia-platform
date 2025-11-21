# Promptpedia Platform - Replit Setup

## Overview
Promptpedia is a modern prompt engineering platform built with Next.js 14, React, TypeScript, and PostgreSQL. It provides tools for creating, collaborating, and optimizing AI prompts with advanced features and real-time collaboration.

**Current State:** The platform is fully configured and running on Replit. The development server is operational on port 5000, and the PostgreSQL database schema has been initialized.

## Recent Changes (November 21, 2025)
- Configured Next.js to run on port 5000 with 0.0.0.0 host for Replit compatibility
- Set up PostgreSQL database with Prisma ORM
- Loaded 18 production-ready prompts from real research:
  - **Gemini Nano**: Sentiment analysis, document extraction, image tagging
  - **Nano Banana Pro**: 3D figurine, Bollywood style, fantasy maps, image editing
  - **Custom AI Agents**: Coding assistant, customer support, RAG research
  - **Video Generation**: Coffee shop, Tokyo neon, yoga, underwater footage
  - **Best Practices & Guides**: Comprehensive prompt engineering guide, content creation, marketing, development
- All prompts include examples from production systems (OpenAI, Google, Anthropic)
- Database populated with realistic engagement metrics (views, likes, ratings)

## Project Architecture

### Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL (via Neon on Replit)
- **ORM:** Prisma
- **Authentication:** NextAuth.js (optional)
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Payment Processing:** Dodo Payments & Stripe (optional)

### Project Structure
```
src/
├── app/              # Next.js App Router pages and API routes
│   ├── (marketing)/  # Marketing pages (about, features, pricing)
│   ├── api/          # API endpoints
│   ├── auth/         # Authentication pages
│   ├── dashboard/    # User dashboard
│   ├── forum/        # Community forum
│   ├── prompts/      # Prompt browsing and creation
│   └── settings/     # User settings
├── components/       # React components
├── lib/              # Utility functions and configurations
├── styles/           # Global styles
└── types/           # TypeScript type definitions

prisma/
└── schema.prisma    # Database schema
```

### Database Schema
The database includes:
- **User Management:** User, Account, Session, VerificationToken
- **Prompts:** Prompt model with categories, tags, techniques, and ratings
- **Forum:** ForumPost, ForumReply for community discussions
- **Membership:** Membership, Subscription for premium features
- **Analytics:** UserContribution for tracking user activity

### Key Features
- 18+ production-ready prompts with real examples
- Prompts for Gemini Nano, Nano Banana Pro, custom agents, video generation
- Comprehensive prompt engineering best practices guide
- Prompt browsing with search, filtering by AI system/category/technique
- Advanced sorting (recent, popular, rating)
- Community forum
- Membership tiers (FREE, PRO, PREMIUM, ENTERPRISE)
- User authentication (optional)
- Payment integration (optional)
- Responsive design with dark mode
- SEO optimization

## Development

### Running the Application
The development server runs automatically via the workflow. To restart manually:
```bash
npm run dev
```
The app will be available at the Replit preview URL.

### Database Management
```bash
# Generate Prisma Client
npx prisma generate

# Push schema changes to database
npx prisma db push

# Open Prisma Studio (database GUI)
npx prisma studio
```

### Available Commands
- `npm run dev` - Start development server (0.0.0.0:5000)
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run storybook` - Start Storybook documentation

## Configuration

### Required Environment Variables
- `DATABASE_URL` - PostgreSQL connection string (automatically set by Replit)

### Optional Environment Variables
For full functionality, you may want to set:
- `NEXTAUTH_URL` - Your Replit app URL
- `NEXTAUTH_SECRET` - Random secret for NextAuth
- `NEXTAUTH_JWT_SECRET` - JWT secret
- `GOOGLE_CLIENT_ID` - Google OAuth (optional)
- `GOOGLE_CLIENT_SECRET` - Google OAuth (optional)
- `GITHUB_CLIENT_ID` - GitHub OAuth (optional)
- `GITHUB_CLIENT_SECRET` - GitHub OAuth (optional)
- `DODO_SECRET_KEY` - Dodo Payments secret (optional)
- `NEXT_PUBLIC_DODO_PUBLIC_KEY` - Dodo Payments public key (optional)

### Deployment
The project is configured for autoscale deployment:
- Build command: `npm run build`
- Start command: `npm start`
- The deployment will automatically scale based on traffic

## Notes
- The app uses Next.js 14 App Router (not Pages Router)
- Authentication is optional - the app works without OAuth providers configured
- Payment integration is optional - membership features work without payment setup
- All images are optimized via Next.js Image component
- The database is persistent and backed up by Replit

## Prompt Categories Available

### Model-Specific
- **Gemini Nano** (on-device LLM): Sentiment analysis, document extraction, image tagging
- **Nano Banana Pro** (image gen/edit): Portrait transforms, style transfers, map generation
- **All Models**: Claude, GPT-4, Gemini

### Use Cases
- AI Agent System Prompts (coding, support, research)
- Video Generation (social media, cinematic, B-roll)
- Content Creation (blog posts, ad copy, social calendars)
- Development (API integration, code review, SQL generation)
- Data Analysis (insights, business intelligence)
- Marketing (SEO, PPC, email campaigns)
- Best Practices Guides & Tutorials

### Prompt Techniques Covered
- Chain-of-Thought, Few-Shot, Zero-Shot
- ReAct Pattern, Prompt Scaffolding
- Role-Based, Constraint-Based, Structured Debate
- JSON Output, Iterative Refinement
- One-Shot Learning, Self-Consistency

## Getting Started
1. Browse prompts at `/prompts` - search by keyword, filter by model/category
2. Click any prompt to see full details with examples
3. Submit your own prompts at `/submit`
4. View popular/trending prompts by sorting (recent, popular, highest rated)

## Next Steps for Full Functionality
1. Set up OAuth providers (Google, GitHub) for user authentication
2. Configure payment processing for premium membership features
3. Add Google Analytics measurement ID for usage tracking
4. Build custom prompt collections by topic
5. Enable community ratings and reviews
