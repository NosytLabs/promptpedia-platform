const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const COMPREHENSIVE_PROMPTS = [
  // Making Money & Business (10)
  {
    title: 'Generate 10 High-Paying Freelance Ideas',
    description: 'Brainstorm and validate profitable freelance service ideas',
    promptText: `You are a business consultant specializing in freelancing and service businesses. Generate 10 high-paying freelance service ideas based on:
- Market demand
- Entry barriers (low to medium)
- Profit margins (40%+)
- Skills required

For each, provide:
1. Service name
2. Target market
3. Average pricing model
4. Why it's profitable
5. Getting started steps`,
    category: ['Business'],
    aiSystem: ['ChatGPT', 'Claude'],
    techniques: ['Brainstorming', 'Analysis'],
    tags: ['freelance', 'money', 'side-hustle', 'business'],
    useCases: ['Entrepreneurship', 'Career planning'],
    examples: 'Technical writing, UI/UX design consulting, business process automation',
  },
  {
    title: 'Convert Blog Post to Sales Funnel Copy',
    description: 'Transform long-form content into high-converting sales sequences',
    promptText: `Transform this blog post content into a 5-email sales funnel that converts readers into customers:

[BLOG CONTENT HERE]

Create:
1. Welcome email (hook + value)
2. Problem email (pain points)
3. Solution email (your offer)
4. Social proof email (testimonials)
5. Urgency email (close)

Use copywriting formulas: AIDA, PAS, or storytelling approach`,
    category: ['Marketing'],
    aiSystem: ['ChatGPT', 'Claude'],
    techniques: ['Copywriting', 'Psychology'],
    tags: ['sales', 'marketing', 'conversions', 'email'],
    useCases: ['E-commerce', 'Digital products'],
    examples: 'SaaS landing pages, course launches, product promotions',
  },
  {
    title: 'Create Pricing Strategy Analysis',
    description: 'Develop competitive pricing models for products/services',
    promptText: `Analyze pricing strategy for [YOUR PRODUCT/SERVICE]:

Provide analysis on:
1. Cost structure breakdown
2. Competitor pricing comparison
3. Value-based pricing formula
4. Psychological pricing tactics (charm pricing, anchoring, bundling)
5. Tiered pricing recommendations (Basic, Pro, Enterprise)
6. Discount/promotion strategy
7. Payment term options

Consider market positioning: Premium, Mid-market, Budget`,
    category: ['Business'],
    aiSystem: ['ChatGPT', 'Claude'],
    techniques: ['Analysis', 'Strategy'],
    tags: ['pricing', 'business', 'strategy', 'revenue'],
    useCases: ['Product launch', 'Business optimization'],
    examples: 'SaaS pricing, e-course tiers, consulting rates',
  },
  {
    title: 'Generate Passive Income Ideas',
    description: 'Brainstorm and evaluate scalable passive income streams',
    promptText: `Generate 15 realistic passive income ideas with:
1. Low startup cost (<$1000)
2. Realistic ROI timeline
3. Effort required upfront
4. Maintenance effort ongoing
5. Scalability potential
6. Resource links/tools
7. 30-day action plan

Evaluate each on:
- Time to first $100
- Maximum possible income
- Barriers to entry`,
    category: ['Business'],
    aiSystem: ['ChatGPT', 'Claude'],
    techniques: ['Brainstorming', 'Analysis'],
    tags: ['passive-income', 'money', 'business', 'automation'],
    useCases: ['Financial independence', 'Side income'],
    examples: 'Digital products, affiliate marketing, niche sites',
  },
  {
    title: 'LinkedIn Profile Optimization for Sales',
    description: 'Create magnetic LinkedIn profile copy that attracts leads',
    promptText: `Optimize my LinkedIn profile to attract high-value clients/sales leads:

Current role: [YOUR ROLE]
Ideal clients: [TARGET MARKET]
Unique value: [YOUR EXPERTISE]

Generate optimized:
1. Headline (60 chars max)
2. About section (compelling story)
3. Experience bullets (achievement-focused)
4. Skills endorsements strategy
5. Content posting strategy

Make it conversion-focused for B2B sales.`,
    category: ['Business'],
    aiSystem: ['ChatGPT', 'Claude'],
    techniques: ['Copywriting', 'Marketing'],
    tags: ['linkedin', 'sales', 'business', 'personal-brand'],
    useCases: ['Lead generation', 'B2B sales'],
    examples: 'Consulting, agencies, SaaS sales professionals',
  },
  {
    title: 'Create Viral TikTok/Reels Scripts',
    description: 'Write engaging short-form video scripts with hooks',
    promptText: `Write 5 viral TikTok/Instagram Reel scripts (15-30 seconds) about [TOPIC]:

For each script:
1. Hook (first 2 seconds - stop scrolling)
2. Body (unique value/entertainment)
3. Call-to-action (follow, comment, share)
4. Caption/text overlay suggestions
5. Music/sound recommendations
6. Hashtag strategy

Use psychology: curiosity gap, storytelling, relatable content, trend-jacking`,
    category: ['Marketing'],
    aiSystem: ['ChatGPT', 'Claude'],
    techniques: ['Copywriting', 'Psychology'],
    tags: ['social-media', 'video', 'marketing', 'viral'],
    useCases: ['Content creation', 'Personal branding'],
    examples: 'Education, comedy, product demos, life tips',
  },
  {
    title: 'Write SEO-Optimized Blog Post',
    description: 'Create search-engine-friendly content with natural keywords',
    promptText: `Write a 2000-word SEO-optimized blog post on [TOPIC]:

Include:
1. SEO title (60 chars, keyword-rich)
2. Meta description (160 chars, call-to-action)
3. H1 headline (primary keyword)
4. H2 subheadings (LSI keywords)
5. Intro (hook + keyword + value proposition)
6. 5 body sections with strategic keyword placement
7. Conclusion with CTA
8. Internal linking suggestions (3-5 links)
9. External links (authority sources)
10. FAQ section (featured snippet optimization)

Target ranking position: Top 3`,
    category: ['Business'],
    aiSystem: ['ChatGPT', 'Claude'],
    techniques: ['SEO', 'Content creation'],
    tags: ['seo', 'blog', 'content', 'ranking'],
    useCases: ['Organic traffic', 'Lead generation'],
    examples: 'Product reviews, tutorials, how-to guides',
  },
  {
    title: 'Design Midjourney Prompts for Product Photos',
    description: 'Generate high-quality product photography with AI',
    promptText: `Create 10 detailed Midjourney prompts to generate professional product photos of [PRODUCT]:

For each include:
1. Product description (materials, colors, style)
2. Lighting setup (key light direction, shadows)
3. Camera angle (3/4 view, overhead, etc.)
4. Background (lifestyle, minimalist, white)
5. Props/styling elements
6. Mood/atmosphere (luxury, playful, professional)
7. Photography style reference
8. Settings: --ar [aspect ratio] --q 2 --v 6

Make prompts photorealistic and commerce-ready.`,
    category: ['Design'],
    aiSystem: ['midjourney-v7', 'dall-e-3'],
    techniques: ['Visual design', 'Descriptive'],
    tags: ['midjourney', 'product-photography', 'e-commerce', 'design'],
    useCases: ['E-commerce', 'Product marketing'],
    examples: 'Fashion, electronics, furniture, jewelry',
  },
  {
    title: 'React Component Code Generation',
    description: 'Generate production-ready React components with hooks',
    promptText: `Generate a production-ready React component for [COMPONENT_TYPE]:

Requirements:
1. Use React Hooks (useState, useEffect)
2. TypeScript types included
3. Tailwind CSS styling (responsive)
4. Accessibility (ARIA labels, keyboard support)
5. Error handling
6. Loading states
7. Edge cases handled
8. Proper component documentation (JSDoc)
9. Props interface well-defined

Style: Modern, follows React best practices, no external UI libraries unless specified.`,
    category: ['Development'],
    aiSystem: ['ChatGPT', 'claude-3.5-sonnet'],
    techniques: ['Code generation', 'Best practices'],
    tags: ['react', 'code', 'components', 'typescript'],
    useCases: ['Web development', 'UI engineering'],
    examples: 'Forms, tables, modals, dashboards',
  },
  {
    title: 'Create YouTube Video Script (5-10 min)',
    description: 'Write engaging scripts with pacing and transitions',
    promptText: `Write a complete YouTube video script for [TOPIC] (5-10 minute video):

Include:
1. Hook (first 10 seconds - grab attention)
2. Intro (who you are, what they'll learn)
3. Problem statement (why this matters)
4. 3-5 main points (each with transitions)
5. Examples/case studies (real stories)
6. Objections/common mistakes addressed
7. Call-to-action (subscribe, like, comment prompt)
8. Outro (summary + CTA again)
9. Pacing notes (where to pause, show visuals)
10. B-roll suggestions (what to show during talking)

Target: Educational, conversational, energetic tone.`,
    category: ['Content'],
    aiSystem: ['ChatGPT', 'Claude'],
    techniques: ['Storytelling', 'Copywriting'],
    tags: ['youtube', 'video', 'content', 'scripting'],
    useCases: ['Video marketing', 'Education'],
    examples: 'Tutorials, reviews, advice, How-to guides',
  },
  // Code & Development (5)
  {
    title: 'Debug TypeScript Errors',
    description: 'Analyze and fix TypeScript type errors quickly',
    promptText: `I'm getting TypeScript errors in this code:

[PASTE YOUR CODE]

Errors:
[PASTE ERROR MESSAGES]

Please:
1. Explain what each error means
2. Provide the corrected code
3. Explain the fix (why it works)
4. Suggest how to prevent similar errors

Keep explanations simple and actionable.`,
    category: ['Development'],
    aiSystem: ['ChatGPT', 'claude-3.5-sonnet'],
    techniques: ['Debugging', 'Technical'],
    tags: ['typescript', 'debugging', 'code', 'errors'],
    useCases: ['Development', 'Error fixing'],
    examples: 'Type mismatches, missing properties, inference issues',
  },
  {
    title: 'Generate Database Schema Design',
    description: 'Design efficient database schemas with relations',
    promptText: `Design a PostgreSQL/MySQL database schema for [APPLICATION]:

Include:
1. All required tables with columns
2. Data types (VARCHAR, INT, TIMESTAMP, etc.)
3. Primary keys and foreign keys
4. Indexes on frequently queried columns
5. Constraints (NOT NULL, UNIQUE, CHECK)
6. Relationships (1:1, 1:N, M:N)
7. Normalization (3NF recommended)
8. Sample data (10 rows) for testing
9. Query examples for common operations
10. Performance optimization notes

Use industry-standard naming conventions.`,
    category: ['Development'],
    aiSystem: ['ChatGPT', 'claude-3.5-sonnet'],
    techniques: ['Database design', 'Technical'],
    tags: ['database', 'sql', 'schema', 'backend'],
    useCases: ['Backend development', 'System design'],
    examples: 'E-commerce, CRM, social media, SaaS apps',
  },
  {
    title: 'Create API Documentation',
    description: 'Generate complete API reference documentation',
    promptText: `Generate API documentation for [YOUR_API]:

For each endpoint, include:
1. Endpoint path (/api/v1/users)
2. HTTP method (GET, POST, PUT, DELETE)
3. Description (what it does)
4. Authentication (required, type)
5. Request parameters (query, body, headers)
6. Request example (cURL, JavaScript)
7. Response structure (success + error)
8. Response examples (JSON)
9. Status codes (200, 400, 401, 404, 500)
10. Rate limiting info
11. Error messages (when things go wrong)

Format: OpenAPI 3.0 compatible`,
    category: ['Development'],
    aiSystem: ['ChatGPT', 'claude-3.5-sonnet'],
    techniques: ['Documentation', 'Technical writing'],
    tags: ['api', 'documentation', 'backend', 'developer-tools'],
    useCases: ['API development', 'Developer experience'],
    examples: 'REST APIs, GraphQL, Webhooks',
  },
  {
    title: 'Optimize Website Performance',
    description: 'Improve Core Web Vitals and page speed',
    promptText: `Analyze and optimize my website for performance:

Current metrics:
- Largest Contentful Paint (LCP): [TIME]ms
- First Input Delay (FID): [TIME]ms
- Cumulative Layout Shift (CLS): [VALUE]

Current issues (from Lighthouse):
[PASTE LIGHTHOUSE REPORT]

Provide:
1. Root causes analysis
2. Actionable fixes (code snippets if applicable)
3. Priority order (quick wins first)
4. Expected improvement for each fix
5. Tools to measure progress
6. Best practices to prevent regression

Focus on: images, CSS, JavaScript, caching, CDN`,
    category: ['Development'],
    aiSystem: ['ChatGPT', 'claude-3.5-sonnet'],
    techniques: ['Performance', 'Technical'],
    tags: ['performance', 'web', 'optimization', 'core-web-vitals'],
    useCases: ['Web development', 'SEO', 'UX'],
    examples: 'Next.js apps, React sites, WordPress',
  },
  // Design & UX (5)
  {
    title: 'UI/UX Design System Guidelines',
    description: 'Create comprehensive design system documentation',
    promptText: `Create design system guidelines for [APPLICATION_TYPE]:

Include:
1. Color palette (primary, secondary, grays, semantic colors)
2. Typography (font families, sizes, weights, line-height)
3. Spacing system (8px grid, padding/margin scale)
4. Button styles (primary, secondary, ghost, sizes)
5. Form components (inputs, selects, checkboxes, radios)
6. Cards and containers (border radius, shadows, padding)
7. Navigation patterns (nav bar, sidebar, breadcrumbs)
8. Icons (size system, stroke width)
9. Shadows and elevations (depth system)
10. Responsive breakpoints (mobile, tablet, desktop)
11. Animation guidelines (ease, duration, use cases)
12. Accessibility requirements (contrast, focus states)

Output: Figma design file structure or HTML component library guide.`,
    category: ['Design'],
    aiSystem: ['ChatGPT', 'Claude'],
    techniques: ['Design', 'UX'],
    tags: ['design-system', 'ui-ux', 'components', 'guidelines'],
    useCases: ['Product design', 'Team collaboration'],
    examples: 'SaaS apps, dashboards, consumer apps',
  },
  {
    title: 'Figma to React Component',
    description: 'Convert Figma design to production React code',
    promptText: `Convert this Figma component to React:

Component name: [NAME]
Figma link: [LINK]

Requirements:
1. Pixel-perfect recreation
2. Responsive design (mobile, tablet, desktop)
3. Tailwind CSS styling
4. React props (customizable text, colors, sizes)
5. Hover/active states
6. Accessibility (ARIA labels, semantic HTML)
7. TypeScript with proper types
8. Storybook stories for variations

Output: Complete production-ready component with stories.`,
    category: ['Development'],
    aiSystem: ['ChatGPT', 'claude-3.5-sonnet'],
    techniques: ['Design to code', 'React'],
    tags: ['react', 'figma', 'ui', 'component'],
    useCases: ['Web development', 'Design handoff'],
    examples: 'Landing pages, dashboards, mobile apps',
  },
  {
    title: 'Create Landing Page Copy',
    description: 'Write high-converting landing page content',
    promptText: `Write compelling landing page copy for [PRODUCT/SERVICE]:

Target audience: [WHO]
Main benefit: [WHAT THEY GET]
Unique value proposition: [WHY YOURS]

Create:
1. Headline (main hook, 60 chars max, benefit-driven)
2. Subheading (clarify main message, 80 chars)
3. Hero section (emotional story, 100 words)
4. Problem statement (pain points)
5. 3-4 solution sections (features + benefits)
6. Social proof section (testimonials, logos, stats)
7. Objection handlers (FAQ format)
8. Call-to-action (primary + secondary)
9. Urgency elements (limited time, scarcity)
10. Footer CTAs and links

Tone: [Professional/Casual/Playful], conversion-focused`,
    category: ['Marketing'],
    aiSystem: ['ChatGPT', 'Claude'],
    techniques: ['Copywriting', 'Psychology'],
    tags: ['landing-page', 'copy', 'marketing', 'conversion'],
    useCases: ['Product launch', 'Lead generation'],
    examples: 'SaaS, digital products, services, apps',
  },
  {
    title: 'Mobile App User Flow Design',
    description: 'Design intuitive mobile app user journeys',
    promptText: `Design a user flow for [MOBILE_APP_FEATURE]:

Include:
1. Entry point (how users discover feature)
2. Decision points (yes/no branches)
3. Error states (what if something goes wrong?)
4. Success state (happy path completion)
5. Alternative flows (shortcuts, power user paths)
6. Screen layouts (wireframe descriptions)
7. Button labels (action-oriented)
8. Form fields (only essentials)
9. Confirmation steps (critical actions)
10. Onboarding hints (new user guidance)

Create ASCII flow diagram and detailed descriptions.`,
    category: ['Design'],
    aiSystem: ['ChatGPT', 'Claude'],
    techniques: ['UX design', 'User research'],
    tags: ['mobile', 'ux-ui', 'user-flow', 'design'],
    useCases: ['App development', 'UX design'],
    examples: 'Payment flows, signup, data entry, checkout',
  },
  // Content & Writing (5)
  {
    title: 'Write Product Description',
    description: 'Create persuasive product descriptions for e-commerce',
    promptText: `Write product descriptions for [PRODUCT]:

Product details:
- Name: [NAME]
- Price: [PRICE]
- Features: [LIST FEATURES]
- Target customer: [WHO BENEFITS]
- Problem it solves: [MAIN BENEFIT]

Create:
1. Short description (50 words, punch line)
2. Long description (300 words, detailed benefits)
3. Feature bullets (5-8 benefits, not specs)
4. FAQ section (3-5 common questions)
5. Use case examples
6. Call-to-action
7. SEO-friendly variant (keywords included)
8. Social media description (Twitter, Instagram)

Tone: Persuasive, benefit-focused, easy-to-scan`,
    category: ['Business'],
    aiSystem: ['ChatGPT', 'Claude'],
    techniques: ['Copywriting', 'SEO'],
    tags: ['e-commerce', 'product', 'copy', 'sales'],
    useCases: ['E-commerce', 'Product marketing'],
    examples: 'Physical products, software, digital goods',
  },
  {
    title: 'Create Email Marketing Campaign',
    description: 'Build complete email sequences for nurture/sales',
    promptText: `Create a [CAMPAIGN_TYPE] email campaign:

Campaign goal: [GET SIGN-UPS/MAKE SALES/NURTURE]
Target audience: [WHO]
Product/offer: [WHAT]

Design sequence:
1. Email 1: Hook + value promise (subject line)
2. Email 2: Build credibility + testimonials
3. Email 3: Overcome objections
4. Email 4: FOMO + urgency + CTA
5. Email 5: Last chance (final push)

For each email:
- Subject line (high open rate, 50 chars)
- Preview text (next 50 chars)
- Body (clear hierarchy, scannable)
- Images (descriptions for alt text)
- Primary CTA (button text, link)
- Secondary CTA (alternative action)

Include: Personalization tags, segmentation logic, timing`,
    category: ['Marketing'],
    aiSystem: ['ChatGPT', 'Claude'],
    techniques: ['Copywriting', 'Email marketing'],
    tags: ['email', 'marketing', 'sales', 'automation'],
    useCases: ['Lead nurture', 'Sales funnels'],
    examples: 'Webinar series, product launch, nurture sequence',
  },
  {
    title: 'Write Professional Resume',
    description: 'Create ATS-optimized resume content',
    promptText: `Write a professional resume for [YOUR_ROLE]:

Your info:
- Years of experience: [X]
- Main skills: [LIST]
- Achievement highlights: [LIST]
- Target position: [ROLE]

Create:
1. Professional summary (3-4 lines, impact-focused)
2. Work experience section (5-7 bullets per role, achievement-focused, quantified)
3. Skills section (relevant, keyword-optimized for ATS)
4. Education section (degree, school, year)
5. Certifications (if applicable)
6. Projects/portfolio (if relevant)

Requirements:
- ATS-compatible (no graphics, tables, or special fonts)
- Quantified results (increased X by Y%)
- Action verbs (led, created, improved, etc.)
- Tailored to [TARGET_JOB_DESCRIPTION]

Tone: Professional, results-driven`,
    category: ['Business'],
    aiSystem: ['ChatGPT', 'Claude'],
    techniques: ['Professional writing', 'Career'],
    tags: ['resume', 'career', 'job', 'professional'],
    useCases: ['Job search', 'Career change'],
    examples: 'Tech roles, management, creative positions',
  },
  {
    title: 'Brainstorm Book Chapter Outline',
    description: 'Organize book concepts into compelling chapters',
    promptText: `Outline a book about [TOPIC]:

Book goal: [WHAT READERS WILL LEARN/ACHIEVE]
Target audience: [WHO]
Book type: [Self-help/Fiction/Business/Educational]

Create:
1. Book title + subtitle (compelling, searchable)
2. Table of contents (12-15 chapters)
3. Each chapter:
   - Chapter title (benefit-driven)
   - Main lesson (1 sentence)
   - Key points (3-5 bullets)
   - Stories/examples needed
   - Reader takeaway
4. Introduction outline (hook, promise, roadmap)
5. Conclusion outline (summary, action steps)
6. Resources/appendix

Make it: Engaging, logical flow, progressive difficulty`,
    category: ['Content'],
    aiSystem: ['ChatGPT', 'Claude'],
    techniques: ['Storytelling', 'Organization'],
    tags: ['book', 'writing', 'content', 'outline'],
    useCases: ['Author', 'Thought leadership'],
    examples: 'Self-help, business, fiction, memoirs',
  },
  {
    title: 'Generate Social Media Content Calendar',
    description: 'Plan 30 days of social content with scheduling',
    promptText: `Create a 30-day social media content calendar for [PLATFORM]:

Business: [YOUR_BUSINESS]
Goal: [AWARENESS/SALES/ENGAGEMENT]
Posting frequency: [X per day/week]

Include:
1. Content mix (70% educational, 20% promotional, 10% personal)
2. 30 unique post ideas with:
   - Post topic/angle
   - Main message (1 sentence)
   - Call-to-action (engage, click, follow)
   - Visual description
   - Best posting time
   - Hashtags (researched, trending)
3. Content pillars (main themes)
4. Engagement prompts (questions to ask)
5. Hashtag research (mix of popular + niche)
6. Trending topics to capitalize on

Format: CSV with date, content, CTA, hashtags`,
    category: ['Marketing'],
    aiSystem: ['ChatGPT', 'Claude'],
    techniques: ['Social media', 'Content strategy'],
    tags: ['social-media', 'content-calendar', 'marketing', 'planning'],
    useCases: ['Social media marketing', 'Content planning'],
    examples: 'Instagram, TikTok, LinkedIn, Twitter',
  },
];

async function main() {
  console.log('Starting comprehensive prompt seeding...');

  try {
    // Create or get system admin user for seed prompts
    let systemUser = await prisma.user.findFirst({
      where: { email: 'system@promptpedia.ai' }
    });

    if (!systemUser) {
      systemUser = await prisma.user.create({
        data: {
          name: 'Promptpedia System',
          email: 'system@promptpedia.ai',
          role: 'admin',
          membership: {
            create: {
              tier: 'PREMIUM',
              analyticsAccess: true,
              apiAccess: true,
            }
          }
        },
        include: { membership: true }
      });
      console.log(`✅ Created system admin user: ${systemUser.email}`);
    } else {
      console.log(`✅ Using existing system user: ${systemUser.email}`);
    }

    // First, check if prompts already exist to avoid duplicates
    const existingCount = await prisma.prompt.count();
    console.log(`📊 Existing prompts in database: ${existingCount}`);

    let createdCount = 0;
    for (const promptData of COMPREHENSIVE_PROMPTS) {
    try {
      // Check if prompt with same title already exists
      const existing = await prisma.prompt.findFirst({
        where: { title: promptData.title }
      });

      if (!existing) {
        const prompt = await prisma.prompt.create({
          data: {
            userId: systemUser.id,
            title: promptData.title,
            description: promptData.description,
            promptText: promptData.promptText,
            category: promptData.category || ['other'],
            aiSystem: promptData.aiSystem || ['other'],
            techniques: promptData.techniques || [],
            tags: promptData.tags || [],
            useCases: promptData.useCases || [],
            examples: promptData.examples,
            isPublic: true,
            status: 'PUBLISHED',
            viewCount: Math.floor(Math.random() * 5000) + 500,
            likeCount: Math.floor(Math.random() * 1000) + 50,
            rating: parseFloat((Math.random() * 1.5 + 3.8).toFixed(2)),
            ratingCount: Math.floor(Math.random() * 500) + 20,
          },
        });
        console.log(`✅ Created: ${prompt.title}`);
        createdCount++;
      } else {
        console.log(`⏭️  Skipped (exists): ${promptData.title}`);
      }
    } catch (error) {
      console.error(`❌ Error with "${promptData.title}":`, error.message);
    }
  }

    console.log(`✅ Seed complete! Created ${createdCount} new prompts.`);
    console.log(`📊 Total prompts in database: ${existingCount + createdCount}`);
  } catch (error) {
    console.error('❌ Seed failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(console.error);
