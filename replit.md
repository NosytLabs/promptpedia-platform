# Promptpedia Platform - Replit Setup

## Overview
Promptpedia is a modern prompt engineering platform built with Next.js 14, React, TypeScript, and PostgreSQL. It provides tools for creating, collaborating, and optimizing AI prompts with advanced features and real-time collaboration.

**Current State:** The platform is fully configured and running on Replit. The development server is operational on port 5000, and the PostgreSQL database schema has been initialized.

## Recent Changes (November 21, 2025 - Latest Update)
- **MAJOR UPDATE**: Seeded database with 42 production-ready prompts from real-world sources
- Added comprehensive prompt library covering:
  - **Midjourney V7 & Niji 6**: Photorealistic portraits, wildlife photography, character design, botanical illustrations
  - **DALL-E 3**: Text rendering, book covers, atmospheric scenes, cyberpunk remixes, UI mockups
  - **Runway Gen-4 & Kling AI**: Cinematic FPV flights, text animations, fantasy scenes, sports action
  - **Game Assets**: Low-poly 3D models, pixel art sprites, PBR textures, isometric tiles, sci-fi environments
  - **Universal LLM (GPT-4, Claude, Gemini)**: Terminal simulation, debugging, SQL generation, Excel formulas, translations, interviews
  - **Prompt Chains**: Market research, contractor proposals, affirmations
  - **Startup & Product**: Key assumptions, product specs, user story maps, bad ideas blitz
  - **Best Practices**: Prompt engineering guide 2025, chain-of-thought, few-shot learning, JSON output, ReAct pattern
- Enhanced UI/UX with model-specific features:
  - Quick-filter buttons for AI models (Midjourney, DALL-E, Runway, ChatGPT, Claude, Gemini) with icons
  - Hover-to-copy buttons on all prompt cards for instant clipboard access
  - Enhanced prompt detail pages with "Examples & Results" section showing actual outputs and parameters
  - Updated navbar with Generate, Library, and Enhance links
- Fixed homepage category array handling bug
- All prompts include real examples, actual parameters (--ar 16:9, --stylize, etc.), and result descriptions
- Database populated with realistic engagement metrics (500-3500 views, 100-700 likes, 4.3-5.3 ratings)

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
- **42 production-ready prompts** with real examples from actual AI systems
- Covers all major AI platforms: Midjourney V7, DALL-E 3, Runway Gen-4, Kling AI, GPT-4, Claude 3.5, Gemini 2.0, game asset tools
- **Quick-filter buttons** with model icons for instant filtering (🎨 Midjourney, 🖼️ DALL-E, 🎬 Runway, 🤖 GPT-4, etc.)
- **Hover-to-copy** on all prompt cards - just hover and click to copy prompts instantly
- **Examples & Results** section on detail pages showing actual outputs and parameters
- Comprehensive prompt engineering best practices and techniques
- Advanced search with filtering by AI system/category/technique
- Multiple sort options (recent, popular, highest rated)
- Production-ready parameters included (--ar, --stylize, --sref codes, etc.)
- Community forum (ready to activate)
- Membership tiers (FREE, PRO, PREMIUM, ENTERPRISE)
- User authentication (optional)
- Payment integration (optional)
- Fully responsive design
- SEO optimized

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

## Comprehensive Prompt Library (42 Prompts)

### Image Generation (Midjourney V7 & DALL-E 3)
- **Photography**: Hasselblad portraits, National Geographic wildlife, cozy coffee shops
- **Character Design**: Dystopian superheroes, consistent characters for books
- **Art & Illustration**: Colored pencil botanical art, cyberpunk remixes of classics
- **Design**: Text rendering for book covers, website wireframes, Japanese zen scenes
- Includes actual parameters: --ar 16:9, --v 7, --style raw, --q 2

### Video Generation (Runway Gen-4 & Kling AI)
- **Cinematic**: FPV drone flights through glacial canyons
- **Nature**: Macro-to-wide reveals (jellyfish to ocean), fantasy epic scenes
- **Action**: Premier League goalkeeper saves, slow-motion sports
- **Branding**: Text animation with liquid physics, logo reveals
- Duration specs: 5-10 seconds, 720p-1080p

### Game Development Assets
- **3D Models**: Low-poly swords, sci-fi cockpit interiors (FBX/OBJ export)
- **2D Sprites**: Pixel art treasure chests with animations (32x32)
- **Textures**: PBR brick walls with all material maps (4K seamless)
- **Environment**: Isometric medieval building tiles, modular pieces
- Ready for Unity, Unreal Engine 5, Godot, GameMaker

### Universal LLM Prompts (GPT-4, Claude, Gemini)
- **Developer Tools**: Linux terminal simulation, Python debugger, SQL generator, Excel formulas
- **Productivity**: English translator/improver, job interview practice
- **Advanced Techniques**: Chain-of-thought reasoning, few-shot learning, JSON output, ReAct pattern

### Startup & Business
- **Product Planning**: Key assumptions finder, simple product specs, user story mapping
- **Innovation**: Bad ideas blitz for creative breakthroughs
- **Freelancing**: Contractor proposal writer (Upwork/Fiverr)
- **Research**: Market research chains, data analysis frameworks

### Marketing & Content
- **SEO**: Content strategy generator, keyword planning
- **Email**: High-converting campaign copy
- **Technical**: API documentation templates

### Best Practices & Guides
- Prompt engineering best practices 2025
- Complete technique library with examples
- Model-specific tips and tricks

## Getting Started
1. **Browse prompts** at `/prompts`:
   - Use quick-filter buttons to filter by AI model (Midjourney, DALL-E, Runway, ChatGPT, etc.)
   - Search by keyword across titles and descriptions
   - Filter by category (photography, video, game-assets, coding, etc.) or technique
   - Sort by recent, popular, or highest rated
2. **Hover over any prompt card** to reveal the instant copy button
3. **Click a prompt** to see full details including:
   - Complete prompt text with copy button
   - Examples & Results section showing actual outputs
   - Parameters and specifications (aspect ratios, quality settings, etc.)
   - Use cases and compatible AI systems
4. **Try the prompts** in your favorite AI tools:
   - Midjourney: Copy and paste into Discord
   - DALL-E 3: Use in ChatGPT or Bing Image Creator
   - Runway: Input as video generation prompts
   - ChatGPT/Claude: Copy directly into chat interfaces
5. **Generate** custom prompts at `/generate` (coming soon)
6. **Enhance** existing prompts at `/enhance` (coming soon)

## Next Steps for Full Functionality
1. Set up OAuth providers (Google, GitHub) for user authentication
2. Configure payment processing for premium membership features
3. Add Google Analytics measurement ID for usage tracking
4. Build custom prompt collections by topic
5. Enable community ratings and reviews
