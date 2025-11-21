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
    category: 'Business',
    aiSystem: ['ChatGPT', 'Claude'],
    techniques: ['Brainstorming', 'Market Analysis'],
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
    category: 'Marketing',
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
    category: 'Business',
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
    category: 'Business',
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

Generate:
1. Headline (220 char) - keyword-optimized for discovery
2. About section (2600 char) - compelling story + authority
3. Headline/tagline variations (5 options)
4. Content strategy (5 post ideas weekly)
5. CTA strategy (DM templates)
6. Skills to list (top 20)
7. Hashtag strategy

Focus on: Credibility, relatability, conversions`,
    category: 'Marketing',
    aiSystem: ['ChatGPT', 'Claude'],
    techniques: ['Copywriting', 'Personal Branding'],
    tags: ['linkedin', 'sales', 'leads', 'branding'],
    useCases: ['B2B sales', 'Personal branding'],
    examples: 'Consultants, coaches, B2B services',
  },
  {
    title: 'Product Launch Campaign Framework',
    description: 'Strategic 30-day product launch plan with messaging',
    promptText: `Create a complete product launch campaign for [PRODUCT]:

Timeline: 30 days

Phases:
1. Pre-launch (Days 1-7)
   - Waitlist building
   - Content strategy
   - Influencer outreach

2. Launch day (Day 15)
   - Email sequence
   - Social media blitz
   - Press release angles

3. Momentum (Days 15-30)
   - Customer stories
   - Social proof campaigns
   - Upsell sequences

Include:
- Messaging frameworks
- Content calendar (posts/emails)
- Metrics to track
- Budget allocation`,
    category: 'Marketing',
    aiSystem: ['ChatGPT', 'Claude'],
    techniques: ['Strategy', 'Project management'],
    tags: ['launch', 'marketing', 'product', 'growth'],
    useCases: ['Product launches', 'SaaS releases'],
    examples: 'Software launches, digital products, services',
  },
  {
    title: 'High-Ticket Sales Objection Handler',
    description: 'Handle sophisticated sales objections for premium offerings',
    promptText: `I sell high-ticket services ($5000-50000). Create responses for:

Objection 1: "I need to think about it"
Objection 2: "I don't have the budget"
Objection 3: "Can I get a discount?"
Objection 4: "I need to ask my team/partner"
Objection 5: "Your competitor is cheaper"

For each, provide:
1. Underlying concern (what they're really saying)
2. Validation response
3. Reframe (shift perspective)
4. Proof/authority
5. CTA

Use psychology: loss aversion, social proof, urgency`,
    category: 'Sales',
    aiSystem: ['ChatGPT', 'Claude'],
    techniques: ['Persuasion', 'Sales Psychology'],
    tags: ['sales', 'objections', 'high-ticket', 'conversion'],
    useCases: ['B2B sales', 'Consulting'],
    examples: 'Software sales, coaching, consulting',
  },
  {
    title: 'Affiliate Marketing Strategy Builder',
    description: 'Create profitable affiliate marketing campaigns',
    promptText: `Build a profitable affiliate marketing strategy for [NICHE]:

1. Product selection
   - Commission rates analysis
   - Audience alignment
   - Demand level

2. Traffic generation
   - Channel selection (blog, YouTube, email)
   - SEO keywords (high intent)
   - Content calendar (30 days)

3. Conversion optimization
   - CTR improvement tactics
   - Pre-sell content strategy
   - A/B testing plan

4. Metrics to track
   - Commission targets
   - ROI calculations
   - Attribution modeling

5. Scaling strategy
   - From 0-$100/month
   - From $100-$1000/month
   - From $1000+/month`,
    category: 'Business',
    aiSystem: ['ChatGPT', 'Claude'],
    techniques: ['Marketing', 'Strategy'],
    tags: ['affiliate', 'marketing', 'passive-income', 'growth'],
    useCases: ['Passive income', 'Entrepreneurship'],
    examples: 'Niche blogs, YouTube channels, email lists',
  },
  {
    title: 'Customer Retention & Loyalty Program',
    description: 'Design systems to retain customers and increase lifetime value',
    promptText: `Design a customer retention program for [BUSINESS]:

Current churn rate: [X%]
Average customer lifetime: [Y months]
Goal: Increase LTV by [Z%]

Create:
1. Churn analysis (why customers leave)
2. Retention tactics by stage:
   - Days 0-30 (onboarding)
   - Days 30-90 (engagement)
   - Days 90+ (loyalty)

3. Loyalty program structure
   - Point system
   - Rewards tiers
   - Exclusive perks

4. Win-back campaigns
   - For dormant customers
   - Re-engagement messaging
   - Special incentives

5. Metrics & KPIs
   - NPS, retention rate, LTV`,
    category: 'Business',
    aiSystem: ['ChatGPT', 'Claude'],
    techniques: ['Strategy', 'Psychology'],
    tags: ['retention', 'loyalty', 'customer-success', 'revenue'],
    useCases: ['SaaS', 'Subscription businesses'],
    examples: 'Membership sites, subscriptions, software',
  },
  {
    title: 'Influencer Collaboration Deal Proposal',
    description: 'Craft compelling partnership proposals for influencers',
    promptText: `Create an influencer partnership proposal:

Brand: [YOUR BRAND]
Budget: $[AMOUNT]
Influencer tier: [MICRO/MACRO/MEGA]
Goals: [AWARENESS/SALES/ENGAGEMENT]

Include:
1. Partnership overview
2. Deliverables breakdown
   - Posts (Instagram/TikTok)
   - Stories/Reels
   - Video content
   - Duration

3. Performance metrics
   - Expected reach
   - Engagement rate targets
   - Click-through metrics

4. Timeline & payments
   - Payment schedule
   - Content approval process
   - Rights & exclusivity

5. Influencer benefits
   - Compensation
   - Product/access
   - Personal branding`,
    category: 'Marketing',
    aiSystem: ['ChatGPT', 'Claude'],
    techniques: ['Negotiation', 'Marketing'],
    tags: ['influencer', 'marketing', 'partnerships', 'growth'],
    useCases: ['Brand marketing', 'Product launches'],
    examples: 'Startups, e-commerce, SaaS',
  },
  
  // Making Books & Content (8)
  {
    title: 'Book Outline Generator (Non-Fiction)',
    description: 'Create detailed chapter outlines for non-fiction books',
    promptText: `Create a detailed book outline for:
Title: [YOUR BOOK TITLE]
Topic: [MAIN TOPIC]
Target audience: [WHO READS THIS]
Book length: [50k/80k/100k words]

Provide:
1. Front matter (intro, why now, benefits)
2. 8-12 chapter breakdown
   - Chapter title
   - Main thesis
   - Key points (3-5)
   - Real-world examples
   - Word count target

3. For each chapter:
   - Opening hook
   - Story/anecdote
   - Core concepts
   - Actionable takeaways
   - Transitions

4. Back matter (conclusion, resources, glossary)
5. Writing timeline (weeks needed)`,
    category: 'Writing',
    aiSystem: ['ChatGPT', 'Claude'],
    techniques: ['Outlining', 'Storytelling'],
    tags: ['book', 'writing', 'non-fiction', 'content'],
    useCases: ['Self-publishing', 'Authority building'],
    examples: 'Memoir, how-to, business books',
  },
  {
    title: 'Fiction Novel Story Bible',
    description: 'Develop comprehensive story bibles for fiction novels',
    promptText: `Create a story bible for a novel:
Genre: [FANTASY/SCI-FI/THRILLER]
Premise: [ONE SENTENCE]
Target length: [WORDS]

Include:
1. World-building
   - Setting details
   - Rules/magic systems
   - History/lore

2. Characters (5-7 main)
   - Background
   - Motivations
   - Flaws
   - Character arc

3. Plot outline
   - Act 1: Setup (inciting incident)
   - Act 2: Confrontation (complications)
   - Act 3: Resolution (climax)
   - Subplots (3-4)

4. Theme & message
5. Tone & style
6. Scene-by-scene breakdown (chapter 1-3 detailed)
7. Pacing strategy`,
    category: 'Writing',
    aiSystem: ['ChatGPT', 'Claude'],
    techniques: ['Storytelling', 'Character Development'],
    tags: ['fiction', 'novel', 'writing', 'storytelling'],
    useCases: ['Novel writing', 'Self-publishing'],
    examples: 'Fantasy, sci-fi, mystery, romance',
  },
  {
    title: 'Blog Content Calendar (90 Days)',
    description: 'Strategic content plan for blog growth and SEO',
    promptText: `Create a 90-day blog content calendar for [NICHE]:

Goals: [TRAFFIC/LEADS/BRAND]
Target keywords: [MAIN TOPICS]
Publishing frequency: [X posts/week]

Provide:
1. Pillar topics (5 main themes)
2. Keyword research
   - High-intent keywords (conversions)
   - Long-tail keywords (traffic)
   - Content clusters

3. Content calendar
   - Week-by-week breakdown
   - Post titles (SEO-optimized)
   - Target keywords
   - Content type (guide/how-to/listicle)
   - CTA strategy

4. Cross-promotion plan
   - Social media angles
   - Email sequences
   - Internal linking

5. Content repurposing
   - Video scripts
   - Podcast episodes
   - Infographics`,
    category: 'Marketing',
    aiSystem: ['ChatGPT', 'Claude'],
    techniques: ['Content Strategy', 'SEO'],
    tags: ['blog', 'content', 'seo', 'growth'],
    useCases: ['Content marketing', 'Lead generation'],
    examples: 'SaaS blogs, agency sites, personal brands',
  },
  {
    title: 'Social Media Content Strategy (3 Months)',
    description: 'Comprehensive social media playbook for growth',
    promptText: `Create social media strategy for [PLATFORMS]:
Brand: [BRAND NAME]
Goal: [FOLLOWERS/ENGAGEMENT/SALES]
Current followers: [COUNT]
Target growth: [X% in 90 days]

Include:
1. Content pillars (5 types)
   - Educational (40%)
   - Entertaining (30%)
   - Promotional (20%)
   - Community (10%)

2. Platform-specific strategies
   - Instagram (Reels, Stories, Posts)
   - TikTok (trends, trends)
   - LinkedIn (professional content)
   - YouTube (Shorts/videos)

3. Posting schedule
   - Frequency per platform
   - Best times to post
   - Content calendar (30 days sample)

4. Engagement strategy
   - Hashtag research
   - Comment/DM templates
   - Community building tactics

5. Performance metrics
   - KPIs to track
   - Benchmarks
   - Monthly goals`,
    category: 'Marketing',
    aiSystem: ['ChatGPT', 'Claude'],
    techniques: ['Social Strategy', 'Growth Hacking'],
    tags: ['social-media', 'marketing', 'growth', 'engagement'],
    useCases: ['Brand growth', 'Lead generation'],
    examples: 'Personal brands, businesses, creators',
  },
  {
    title: 'Email Newsletter Launch Plan',
    description: 'Build and grow an engaged email subscriber base',
    promptText: `Create email newsletter strategy:
Topic: [NEWSLETTER TOPIC]
Target subscribers: [X in 90 days]
Monetization: [SPONSORSHIPS/PRODUCTS/ADS]

Include:
1. Newsletter positioning
   - Target audience profile
   - Unique angle
   - Value proposition

2. Launch sequence (first 5 emails)
   - Welcome email
   - Value preview
   - Reader profile
   - Engagement setup
   - Content preview

3. Content format
   - Recurring sections
   - Content sources
   - Tone & voice
   - Word count target

4. Growth strategy
   - Lead magnet
   - Signup locations
   - Cross-promotion
   - Referral strategy

5. Monetization
   - Sponsor rates
   - Product recommendations
   - Conversion strategy

6. Analytics to track
   - Open rate target
   - Click rate
   - Unsubscribe rate`,
    category: 'Marketing',
    aiSystem: ['ChatGPT', 'Claude'],
    techniques: ['Email Marketing', 'Growth'],
    tags: ['email', 'newsletter', 'marketing', 'growth'],
    useCases: ['Audience building', 'Monetization'],
    examples: 'Creator newsletters, niche content, B2B',
  },
  {
    title: 'Podcast Launch Blueprint',
    description: 'Complete guide to starting and growing a podcast',
    promptText: `Create podcast launch plan:
Podcast name: [NAME]
Topic: [NICHE]
Format: [SOLO/INTERVIEW/NARRATIVE]
Episode length: [MINS]
Release frequency: [X per week]

Include:
1. Show positioning
   - Unique angle
   - Target listener
   - Competitive advantage

2. Technical setup
   - Recording equipment (budget)
   - Software/hosting
   - Distribution platforms

3. Content strategy
   - 12-episode outline
   - Intro/outro music ideas
   - Guest list (if interviews)
   - Outline template

4. Launch strategy
   - Pre-launch buzz (social)
   - Guest appearances
   - Cross-promotion

5. Growth tactics
   - Guest exchange strategy
   - Review generation
   - Guesting on other shows
   - YouTube clips from audio

6. Monetization (Month 6+)
   - Sponsorship rates
   - Affiliate opportunities
   - Premium content`,
    category: 'Marketing',
    aiSystem: ['ChatGPT', 'Claude'],
    techniques: ['Content Strategy', 'Audio Production'],
    tags: ['podcast', 'content', 'audio', 'growth'],
    useCases: ['Audience building', 'Authority'],
    examples: 'Creator economy, thought leadership',
  },
  {
    title: 'White Paper/Case Study Template',
    description: 'Professional B2B sales collateral generator',
    promptText: `Create a white paper/case study for [SOLUTION]:
Industry: [TARGET INDUSTRY]
Problem: [MAIN PAIN POINT]
Solution type: [TECHNOLOGY/PROCESS/SERVICE]
Target decision maker: [ROLE]

Structure:
1. Cover page & executive summary (2-3 paragraphs)

2. Problem statement
   - Market context
   - Industry challenges
   - Impact/costs

3. Solution overview
   - How it works
   - Key features
   - Differentiation

4. Case study section
   - Client background
   - Implementation
   - Results (metrics)
   - ROI calculation

5. Best practices
   - Recommendations
   - Implementation timeline
   - Success factors

6. Call to action
   - Demo offer
   - Consultation link
   - Resources

Design: Professional, data-driven, credible`,
    category: 'Business',
    aiSystem: ['ChatGPT', 'Claude'],
    techniques: ['Technical Writing', 'B2B Marketing'],
    tags: ['case-study', 'b2b', 'sales', 'content'],
    useCases: ['B2B marketing', 'Lead generation'],
    examples: 'SaaS, enterprise software, consulting',
  },
  {
    title: 'Email Sales Funnel Sequence',
    description: 'Automated email sequences that convert subscribers to customers',
    promptText: `Create email funnel for [OFFER]:
Product/service: [DESCRIPTION]
Price: $[AMOUNT]
Target market: [AUDIENCE]
Goal: [SALES/LEADS]

Sequence (7-10 emails):
1. Welcome/hook email
2. Problem identification email
3. Pain point deep dive
4. Solution introduction
5. Social proof email (testimonials)
6. Objection handler email
7. Special offer/scarcity email
8. Last chance email
9. Post-purchase/upsell

For each email:
- Subject line (urgency/curiosity)
- Opening hook
- Main copy
- CTA
- Timing (days apart)

Include:
- Segmentation by behavior
- A/B testing recommendations
- Expected conversion rates`,
    category: 'Marketing',
    aiSystem: ['ChatGPT', 'Claude'],
    techniques: ['Copywriting', 'Psychology'],
    tags: ['email', 'sales', 'funnel', 'conversion'],
    useCases: ['E-commerce', 'Digital products', 'Services'],
    examples: 'Online courses, SaaS, digital downloads',
  },
  
  // Making Websites & Apps (8)
  {
    title: 'Website Technical SEO Audit Prompt',
    description: 'Comprehensive technical SEO analysis checklist',
    promptText: `Analyze website technical SEO for [DOMAIN]:

Audit areas:
1. Site structure
   - URL structure optimization
   - Crawlability (robots.txt)
   - XML sitemaps
   - Pagination handling
   - Hreflang tags

2. Performance metrics
   - Core Web Vitals (LCP, FID, CLS)
   - Mobile-Friendliness
   - Load time optimization
   - Image optimization
   - CSS/JS minification

3. On-page elements
   - Title tags (50-60 chars)
   - Meta descriptions
   - Header hierarchy (H1-H6)
   - Schema markup
   - Internal linking

4. Mobile optimization
   - Responsive design
   - Touch elements size
   - Mobile menu
   - Viewport meta tag

5. Issues & fixes
   - Duplicate content
   - Broken links
   - Redirect chains
   - Mixed content warnings

6. Priority fixes list
   - High impact items
   - Implementation timeline
   - Expected traffic gain`,
    category: 'Web Development',
    aiSystem: ['ChatGPT', 'Claude'],
    techniques: ['Technical Analysis', 'SEO'],
    tags: ['seo', 'web', 'technical', 'optimization'],
    useCases: ['Website optimization', 'SEO'],
    examples: 'Agency audits, e-commerce, content sites',
  },
  {
    title: 'Landing Page Conversion Optimization',
    description: 'Identify and fix conversion rate killers',
    promptText: `Analyze landing page for conversion optimization:
Goal: [SIGNUP/PURCHASE/DOWNLOAD]
Current conversion rate: [X%]
Target conversion rate: [Y%]

Analyze:
1. Copy & messaging
   - Headline effectiveness
   - Subheading clarity
   - Value prop positioning
   - Benefit-driven language
   - CTA clarity

2. Design & layout
   - Above-the-fold content
   - Visual hierarchy
   - CTA button prominence
   - Form length & fields
   - Social proof placement

3. User psychology
   - Loss aversion tactics
   - FOMO elements
   - Authority signals
   - Testimonial quality
   - Guarantee strength

4. Technical elements
   - Form fields needed
   - Load time
   - Mobile responsiveness
   - Redirects/tracking

5. A/B testing recommendations
   - Headline variations
   - CTA button text/color
   - Form field count
   - Layout changes

6. Implementation priority
   - High-impact changes first
   - Expected uplift per change`,
    category: 'Web Design',
    aiSystem: ['ChatGPT', 'Claude'],
    techniques: ['UX/CRO', 'Psychology'],
    tags: ['conversion', 'cro', 'landing-page', 'optimization'],
    useCases: ['SaaS', 'E-commerce', 'Lead generation'],
    examples: 'Startup landing pages, product pages',
  },
  {
    title: 'Mobile App Feature Prioritization Matrix',
    description: 'Framework for prioritizing app features using RICE/Kano',
    promptText: `Create feature prioritization matrix for [APP]:
Current users: [COUNT]
Monthly growth: [X%]
Dev resources: [TEAM SIZE]

For top 15 proposed features, evaluate:

RICE scoring:
- Reach: Users impacted monthly
- Impact: Usage change per user (3x/2x/1x)
- Confidence: Certainty level (%)
- Effort: Dev weeks needed

Kano analysis:
- Must-have: Baseline expectations
- Performance: More = better
- Delighter: Surprise & delight

Output:
1. Ranked feature list (RICE score)
2. Quadrant matrix (Effort vs Impact)
3. 90-day roadmap
4. Release timing strategy
5. Success metrics per feature

Include:
- Dependencies between features
- Technical complexity
- Resource allocation`,
    category: 'Product Management',
    aiSystem: ['ChatGPT', 'Claude'],
    techniques: ['Product Strategy', 'Analysis'],
    tags: ['product', 'prioritization', 'strategy', 'app'],
    useCases: ['App development', 'Product management'],
    examples: 'SaaS, mobile apps, web platforms',
  },
  {
    title: 'API Documentation Template',
    description: 'Generate OpenAPI/Swagger documentation',
    promptText: `Create API documentation for [API NAME]:
Base URL: [API_URL]
Authentication: [AUTH_TYPE]
Rate limit: [REQUESTS/HOUR]

For each endpoint, document:
1. Endpoint details
   - HTTP method
   - URL path
   - Description
   - Required/optional params

2. Request format
   - Headers needed
   - Request body example
   - Parameter descriptions
   - Data types

3. Response format
   - Success response (200)
   - Error responses (400, 401, 500)
   - Response body examples
   - Status codes

4. Authentication
   - API key setup
   - OAuth/JWT flow
   - Rate limiting info

5. Code examples
   - cURL
   - Python
   - JavaScript
   - Go

6. Error handling
   - Error codes
   - Error messages
   - Retry logic

Generate: OpenAPI 3.0 spec (YAML/JSON)`,
    category: 'Web Development',
    aiSystem: ['ChatGPT', 'Claude'],
    techniques: ['Technical Writing', 'Documentation'],
    tags: ['api', 'documentation', 'development', 'technical'],
    useCases: ['Developer platforms', 'API services'],
    examples: 'SaaS APIs, payment gateways, data APIs',
  },
  {
    title: 'Database Schema Design for [Use Case]',
    description: 'Design normalized, efficient database schemas',
    promptText: `Design database schema for [APPLICATION]:
Use case: [DESCRIPTION]
Expected scale: [USERS/RECORDS]
Performance: [LATENCY/THROUGHPUT]

Provide:
1. Entity relationship diagram (ERD)
   - Entities & attributes
   - Relationships (1-to-many, many-to-many)
   - Primary/foreign keys
   - Data types

2. Normalization
   - 3NF compliance
   - Denormalization where beneficial
   - Aggregate tables for reporting

3. Indexing strategy
   - Primary indexes
   - Secondary indexes
   - Composite indexes
   - Query optimization

4. Scalability
   - Sharding strategy (if needed)
   - Replication approach
   - Backup strategy

5. SQL schema code
   - CREATE TABLE statements
   - Index definitions
   - Constraints

6. Query examples
   - Common queries
   - Optimization tips
   - N+1 query prevention`,
    category: 'Web Development',
    aiSystem: ['ChatGPT', 'Claude'],
    techniques: ['Database Design', 'System Design'],
    tags: ['database', 'sql', 'development', 'architecture'],
    useCases: ['App backend', 'Data platforms'],
    examples: 'SaaS apps, marketplaces, social platforms',
  },
  {
    title: 'Component Library Documentation',
    description: 'Create Storybook/design system documentation',
    promptText: `Document React component library for [DESIGN_SYSTEM]:

For each component:
1. Overview
   - Purpose
   - When to use
   - When not to use
   - Similar components

2. Props interface
   - Prop names & types
   - Default values
   - Required/optional
   - Descriptions

3. Usage examples
   - Basic usage
   - With variations
   - Advanced patterns
   - Common mistakes

4. Accessibility
   - ARIA attributes
   - Keyboard navigation
   - Screen reader support

5. Design tokens
   - Colors used
   - Typography
   - Spacing
   - Shadows/borders

6. Storybook stories
   - Primary story
   - All variants
   - Edge cases
   - Dark mode

Include: TypeScript definitions, CSS/Tailwind classes`,
    category: 'Web Design',
    aiSystem: ['ChatGPT', 'Claude'],
    techniques: ['Design Systems', 'Documentation'],
    tags: ['design-system', 'components', 'documentation', 'frontend'],
    useCases: ['Design systems', 'Team collaboration'],
    examples: 'Enterprise design systems, design agencies',
  },
  {
    title: 'Progressive Web App (PWA) Implementation Guide',
    description: 'Convert web app to PWA with offline support',
    promptText: `Create PWA implementation checklist for [APP]:

1. Service Worker setup
   - Registration code
   - Lifecycle management
   - Caching strategies

2. Web App Manifest
   - App icons
   - Metadata
   - Display modes
   - Theme colors

3. Offline functionality
   - Network fallback
   - Cached assets
   - Dynamic content strategies
   - Sync strategies

4. Installation
   - Home screen installation
   - App shelf support
   - Launch screen

5. Performance optimization
   - Code splitting
   - Lazy loading
   - Image optimization
   - Resource caching

6. Testing checklist
   - Offline testing
   - Installation flow
   - Performance metrics (Lighthouse)
   - Cross-browser compatibility

7. Deployment
   - HTTPS requirement
   - Server configuration
   - Manifest hosting

Code examples: JavaScript, service worker snippets`,
    category: 'Web Development',
    aiSystem: ['ChatGPT', 'Claude'],
    techniques: ['Web Development', 'Performance'],
    tags: ['pwa', 'offline', 'performance', 'mobile-web'],
    useCases: ['Web app optimization', 'Mobile experience'],
    examples: 'SaaS apps, productivity tools, marketplaces',
  },
  
  // UI/UX Design (8)
  {
    title: 'Mobile App UI Kit Component Prompt',
    description: 'Generate comprehensive mobile design components',
    promptText: `Design mobile UI kit for [APP_TYPE]:
Platform: [iOS/Android/Both]
Design system: [Material Design/Human Interface]
Target users: [DEMOGRAPHIC]

Create components:
1. Navigation
   - Tab bars
   - Drawers
   - Bottom navigation
   - Breadcrumbs

2. Forms
   - Text inputs
   - Dropdowns
   - Checkboxes/radio
   - Date pickers
   - Error states

3. Cards & lists
   - List items
   - Card layouts
   - Media cards
   - Section headers

4. Buttons & CTAs
   - Primary/secondary
   - Disabled states
   - Loading states
   - Sizes (small/medium/large)

5. Modals & overlays
   - Alerts/dialogs
   - Bottom sheets
   - Snackbars
   - Loading spinners

6. States
   - Empty states
   - Loading states
   - Error states
   - Success states

Include: Figma file structure, component specs, spacing/color usage`,
    category: 'UI/UX Design',
    aiSystem: ['ChatGPT', 'Claude'],
    techniques: ['Design Systems', 'UI Design'],
    tags: ['ui-design', 'mobile', 'design-system', 'ux'],
    useCases: ['App development', 'Design handoff'],
    examples: 'Startups, agencies, design studios',
  },
  {
    title: 'User Research Interview Script',
    description: 'Prepare structured user interview questions',
    promptText: `Create user research interview script:
Product: [PRODUCT]
Research goal: [UNDERSTAND PROBLEM/VALIDATE SOLUTION]
Target user: [PERSONA]
Interview length: 30-45 minutes

Include:
1. Warm-up questions (5 min)
   - Background info
   - Comfort building
   - Rapport

2. Problem exploration (10 min)
   - Current workflow
   - Pain points
   - Workarounds
   - Frequency

3. Solution validation (15 min)
   - Prototype/concept walkthrough
   - First impressions
   - Concerns
   - Willingness to pay

4. Follow-up questions (10 min)
   - Motivation drivers
   - Decision factors
   - Competitive comparison

5. Close (5 min)
   - Key takeaways
   - Next steps
   - Referral requests

Include:
- Follow-up prompts for each question
- Note-taking guide
- Recording consent form`,
    category: 'Research',
    aiSystem: ['ChatGPT', 'Claude'],
    techniques: ['User Research', 'Interviewing'],
    tags: ['research', 'ux', 'user-testing', 'product'],
    useCases: ['Product development', 'Market validation'],
    examples: 'Startups, agencies, product teams',
  },
  {
    title: 'Wireframe to High-Fidelity Conversion',
    description: 'Turn low-fidelity wireframes into production designs',
    promptText: `Convert wireframe to high-fidelity design:
Product: [PRODUCT]
Page/screen: [NAME]
Target platform: [WEB/iOS/Android]

From wireframe provided:
1. Visual hierarchy
   - Color palette application
   - Typography hierarchy
   - Spacing & alignment
   - Weight & contrast

2. Micro-interactions
   - Hover states
   - Focus states
   - Loading states
   - Error states
   - Transitions

3. Component refinement
   - Button styling
   - Input fields
   - Cards/containers
   - Icons & imagery

4. Accessibility
   - Color contrast (WCAG AA)
   - Touch target sizes
   - Focus indicators
   - Alt text for images

5. Design assets
   - Color specifications
   - Typography specs
   - Spacing system
   - Icon set

Output: Figma file with components, specifications, documentation`,
    category: 'UI/UX Design',
    aiSystem: ['ChatGPT', 'Claude'],
    techniques: ['Visual Design', 'UI Design'],
    tags: ['design', 'ui', 'product-design', 'web'],
    useCases: ['Design handoff', 'Development', 'Product'],
    examples: 'SaaS dashboards, e-commerce, apps',
  },
  {
    title: 'Design System Documentation',
    description: 'Create comprehensive design system specification',
    promptText: `Document design system for [BRAND]:

1. Brand guidelines
   - Logo usage
   - Color palette (primary/secondary)
   - Typography (font families, scales)
   - Imagery & illustrations
   - Voice & tone

2. Design tokens
   - Colors (with semantic names)
   - Typography (font sizes, weights, line-heights)
   - Spacing (4px grid system)
   - Shadows & elevation
   - Border radius & strokes

3. Component library
   - Buttons (primary/secondary/tertiary)
   - Forms (inputs, selects, checkboxes)
   - Navigation (nav bar, breadcrumbs)
   - Cards, lists, tables
   - Modals, alerts, toasts

4. Patterns
   - Common layouts
   - Form patterns
   - Error handling
   - Loading states
   - Empty states

5. Accessibility
   - Color contrast requirements
   - Typography minimums
   - Interactive element sizes
   - ARIA usage

6. Usage guidelines
   - Do's and don'ts
   - Common patterns
   - Anti-patterns
   - Platform-specific notes

Include: Figma library, Storybook setup, developer handoff guide`,
    category: 'UI/UX Design',
    aiSystem: ['ChatGPT', 'Claude'],
    techniques: ['Design Systems', 'Brand Guidelines'],
    tags: ['design-system', 'branding', 'ui', 'documentation'],
    useCases: ['Brand consistency', 'Design at scale'],
    examples: 'Enterprise design, design agencies, tech companies',
  },
  {
    title: 'Competitive UX Analysis Framework',
    description: 'Deep competitive analysis on user experience',
    promptText: `Conduct competitive UX analysis for [CATEGORY]:
Your product: [NAME]
Competitors: [3-5 APPS/SITES]

For each competitor:
1. Overall assessment
   - Strengths
   - Weaknesses
   - Unique features
   - Market positioning

2. User flows
   - Onboarding flow
   - Core user journey
   - Conversion flow
   - Common actions

3. Interface analysis
   - Navigation structure
   - Information architecture
   - Key screens
   - Unique UI patterns

4. User experience
   - Friction points
   - Delighters
   - Pain points
   - Accessibility

5. Opportunities
   - Your competitive advantage
   - Feature gaps
   - UX improvements
   - Positioning differentiators

6. Recommendations
   - What to copy (best practices)
   - What to improve
   - What to avoid
   - Innovation opportunities

Include: Screenshots, UX flow diagrams, comparison matrix`,
    category: 'Research',
    aiSystem: ['ChatGPT', 'Claude'],
    techniques: ['UX Research', 'Competitive Analysis'],
    tags: ['ux', 'research', 'competitive-analysis', 'product'],
    useCases: ['Product strategy', 'Positioning'],
    examples: 'Startups, product teams, design consultants',
  },
  {
    title: 'Accessibility Audit Report',
    description: 'WCAG 2.1 AA compliance audit and fixes',
    promptText: `Perform accessibility audit for [WEBSITE/APP]:
Current WCAG level: [A/AA/AAA target]

Audit checklist:
1. Perceivable
   - Color contrast (WCAG AA 4.5:1 text)
   - Text alternatives (alt text)
   - Adaptable content
   - Distinguishable (text sizing)

2. Operable
   - Keyboard navigation
   - Focus visible
   - Skip links present
   - Touch targets (min 44x44px)
   - No keyboard traps

3. Understandable
   - Language specified
   - Readable text (16px+)
   - Predictable behavior
   - Input assistance
   - Error prevention

4. Robust
   - Valid HTML
   - ARIA usage correct
   - Browser compatibility
   - Assistive tech support

Issues found:
- Issue category
- WCAG criteria violated
- Severity (Critical/High/Medium/Low)
- Fix recommendation
- Estimated effort

Output:
- Prioritized fix list
- Implementation timeline
- Testing strategy
- Success metrics`,
    category: 'Web Development',
    aiSystem: ['ChatGPT', 'Claude'],
    techniques: ['Accessibility', 'Compliance', 'Testing'],
    tags: ['accessibility', 'wcag', 'compliance', 'auditing'],
    useCases: ['Website compliance', 'App accessibility'],
    examples: 'Enterprise websites, SaaS, public sector',
  },
];

async function main() {
  console.log('Starting comprehensive prompt seeding...');

  for (const promptData of COMPREHENSIVE_PROMPTS) {
    try {
      const prompt = await prisma.prompt.create({
        data: {
          title: promptData.title,
          description: promptData.description,
          promptText: promptData.promptText,
          category: promptData.category,
          aiSystem: promptData.aiSystem,
          techniques: promptData.techniques,
          tags: promptData.tags,
          useCases: promptData.useCases,
          examples: promptData.examples,
          isPublic: true,
          status: 'approved',
          viewCount: Math.floor(Math.random() * 5000) + 500,
          likeCount: Math.floor(Math.random() * 1000) + 50,
          rating: (Math.random() * 1.5 + 3.8).toFixed(2),
          ratingCount: Math.floor(Math.random() * 500) + 20,
        },
      });
      console.log(`✅ Created: ${prompt.title}`);
    } catch (error) {
      console.error(`❌ Error creating "${promptData.title}":`, error);
    }
  }

  console.log('✅ Comprehensive seed complete!');
  await prisma.$disconnect();
}

main().catch(console.error);
