# 💰 COMPLETE HOSTING & COST GUIDE - Promptpedia

## Part 1: All Replit Deployment Options

### Option 1: **AUTOSCALE** (RECOMMENDED ✅)
**Best for:** Variable traffic websites, APIs
```
Pricing: $1/mo base + $3.20/million compute units + $1.20/million requests
Scales: 0 instances when idle → up to 20+ when needed
Perfect for: Promptpedia (quiet nights, busy days)
```

**Real cost for Promptpedia at different scales:**
- 100 visitors/day: $0 (covered by $25 credits)
- 1K visitors/day: $8-15/month
- 5K visitors/day: $50-100/month

**Pros:** Pay only for what you use, automatic scaling, simple
**Cons:** Variable costs, cold starts (slow first request after idle)

---

### Option 2: **RESERVED VM** (Not recommended)
**Best for:** Always-on services (Discord bots, 24/7 APIs)
```
Pricing:
- Shared VM: $20/month (0.5vCPU, 2GB RAM)
- Dedicated: $40-160/month (1-4vCPU, 4-16GB RAM)
Perfect for: Keep running 24/7 always
```

**Cost for Promptpedia:** $20/month minimum = overkill
**Only use if:** You need 24/7 availability or very predictable traffic

---

### Option 3: **STATIC DEPLOYMENT** (Cheapest if possible)
**Best for:** Frontend-only apps, documentation, portfolios
```
Pricing: FREE hosting + $0.10/GB data transfer
Perfect for: Zero backend cost
Example: 100GB/month = $10
```

**Issue for Promptpedia:** Requires backend (database, prompt generation)
Can't use because: You need Node.js server for API routes

---

### Option 4: **SCHEDULED DEPLOYMENT** (Use for background jobs)
**Best for:** Cron jobs, cleanup tasks, email notifications
```
Pricing: $1/month base + $3.20/million compute units
Perfect for: Tasks that run on a schedule (not constantly)
```

**Use case for Promptpedia:** Send weekly trending prompts email, cleanup old data
**Cost:** Negligible (~$1-2/month)

---

## Part 2: Self-Hosting with Mini PC (YES, It Runs Both!)

### Can Mini PC Run App + Database?
**YES! Easily.**

**Why:**
- PostgreSQL uses ~100-500MB RAM
- Next.js uses ~300-500MB RAM
- Total: ~500-800MB RAM needed (leave 1-2GB for OS)
- Even cheap mini PC has 8-16GB RAM

### Hardware Recommendations

#### Budget ($160-400)
- **GEEKOM Air 12 Lite**: $160 (Intel N150, 8GB RAM, 256GB SSD)
  - Idle power: 6-8W
  - Monthly electricity: ~$0.75
  - Performance: Handles 50-100 concurrent users
  - Best for: Learning, testing

#### Recommended ($450-600)
- **GEEKOM A6**: ~$450-500
  - CPU: AMD Ryzen 7 6800H (8-core)
  - RAM: 32GB DDR5
  - Storage: 1TB SSD
  - Idle power: 15-20W
  - Monthly electricity: ~$2.25-3/month
  - Performance: Handles 500-1000 concurrent users
  - **BEST CHOICE for production Promptpedia**

#### Professional ($700-1000)
- **Beelink SER8 Pro**: ~$600-700
  - Similar to GEEKOM A6
  - More storage options (2TB)
  - Better value for heavy workloads

### Setup (Docker + PostgreSQL)

**Step 1: Install Ubuntu Server on mini PC**
```bash
# Download Ubuntu Server 22.04 LTS
# Boot from USB, install to 256GB+ SSD
```

**Step 2: Install Docker**
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
```

**Step 3: Deploy with Docker Compose**
```yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    restart: always
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://postgres:password@db:5432/promptpedia
    depends_on:
      - db
    volumes:
      - ./logs:/app/logs  # Persistent logs

  db:
    image: postgres:16-alpine
    restart: always
    environment:
      POSTGRES_DB: promptpedia
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data  # Persistent data
    ports:
      - "5432:5432"  # Optional: expose for backups

  nginx:
    image: nginx:alpine
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./certs:/etc/nginx/certs:ro  # SSL certs

volumes:
  postgres_data:
```

**Step 4: Get SSL Certificate**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot certonly --standalone -d yourdomain.com
# Copy /etc/letsencrypt/live/yourdomain.com to ./certs
```

**Step 5: Deploy**
```bash
docker-compose up -d
# App now live at yourdomain.com
```

### Operating Costs

**One-time:**
- Mini PC (GEEKOM A6): $500
- Internet connection: $50-100/month (already have this)
- Domain: $12/year

**Monthly (recurring):**
- Electricity: $3-5/month
- Internet: included
- Backups (optional): $5-10/month
- **Total: $8-15/month**

**Break-even calculation:**
```
Mini PC cost: $500
Vercel + Supabase: $50/month ($20 + $30)
Break-even: 500 ÷ 50 = 10 months

After 10 months, you're saving $40/month!
Year 1 total: $500 (hardware) + $50 (electricity/domain)
Vercel Year 1: $600 (Vercel) + $360 (Supabase) = $960

SAVINGS: $410 first year
SAVINGS: $600/year ongoing
```

---

## Part 3: OpenRouter API Costs (Prompt Generation)

### How API Pricing Works
**Charged per token, not per request**
- Input tokens (your prompt) = cheaper
- Output tokens (AI response) = 2-5× more expensive

### Model Costs Comparison

| Model | Use Case | Input Cost | Output Cost | Typical Request Cost |
|-------|----------|-----------|-----------|----------------------|
| **Mistral 7B** | FREE - Test drafts | $0 | $0 | $0 |
| **Claude 3.5 Haiku** | Fast cheap | $0.80/M | $4/M | $0.01 |
| **Claude 3.5 Sonnet** | Balanced | $3/M | $15/M | $0.05 |
| **GPT-4o** | Best quality | $5/M | $15/M | $0.08 |
| **Claude 4 Opus** | Premium quality | $15/M | $75/M | $0.25 |

### Cost Calculation Example

**Typical Promptpedia Generation Request:**
```
Input: Your prompt + context = 10,000 tokens
Output: Generated optimized prompt = 2,000 tokens

Using GPT-4o ($5/$15 per million):
- Input: 10,000 ÷ 1,000,000 × $5 = $0.05
- Output: 2,000 ÷ 1,000,000 × $15 = $0.03
- Total: $0.08 per request

Using Claude 3.5 Sonnet ($3/$15 per million):
- Input: $0.03
- Output: $0.03
- Total: $0.06 per request

Using Mistral (FREE):
- Total: $0.00 per request
```

### Cost Projection for Promptpedia

**Scenario: 1,000 users/month, 10% generate prompts = 100 requests/month**

| Model | Price/Request | Monthly Cost | Annual Cost |
|-------|---|---|---|
| Mistral (free tier) | $0.00 | $0 | $0 |
| Claude Haiku | $0.01 | $1 | $12 |
| Claude Sonnet | $0.06 | $6 | $72 |
| GPT-4o | $0.08 | $8 | $96 |

**Strategy for Promptpedia:**
- **Free users:** Use Mistral 7B (free)
- **Pro users:** Offer Claude Sonnet (better quality, $0.06/request)
- **Your cost:** ~$0-50/month for API even at 5000 requests/month

---

## Part 4: Complete Cost Comparison - All Options

### Scenario: Promptpedia at 5,000 Monthly Visitors

#### Option A: Replit Autoscale (Current)
```
Hosting: $80-100/month
Database: Included
API (OpenRouter): $50/month (Sonnet)
Total: $130-150/month
```

#### Option B: Vercel + Supabase + OpenRouter
```
Hosting: $20/month (after free tier exceeded)
Bandwidth overage: ~$100 (750GB/mo)
Database: $25/month
API (OpenRouter): $50/month
Total: $195/month
COST: $65/month MORE than Replit
```

#### Option C: Self-Hosted Mini PC + OpenRouter
```
Hardware (amortized): $20/month ($500 ÷ 24 months)
Electricity: $3-5/month
Internet: $0 (already have)
Database: $0 (local PostgreSQL)
API (OpenRouter): $50/month
Total: $73-75/month
SAVES: $55-75/month vs Replit, $120/month vs Vercel
BREAKEVEN: 10 months
```

---

## Part 5: Recommendation Matrix

Choose based on your needs:

| Scenario | Best Option | Cost/Month | Setup Time |
|----------|---|---|---|
| **Just starting, testing** | Replit Autoscale | $0 (credits) | 5 min |
| **Early growth (100-1K users)** | Replit Autoscale | $5-15 | 5 min |
| **Sustainable growth (1K-5K)** | Mini PC + Self-host | $75 | 2 hours |
| **Fast scaling (5K-50K+)** | Mini PC + CDN (Cloudflare) | $100 | 3 hours |
| **Zero DevOps, maximum convenience** | Vercel + Supabase | $50-150 | 15 min |

---

## Part 6: Optimization for Low Costs

### 1. Reduce Compute Usage (Save on Replit)
```javascript
// next.config.js
{
  swcMinify: true,              // Reduce JS by 30%
  compress: true,               // Gzip responses
  productionBrowserSourceMaps: false,  // Save memory
  experimental: {
    optimizePackageImports: ["lodash", "@mui/icons-material"],
  }
}
```

### 2. Aggressive Caching
```typescript
// Route handler
export const revalidate = 3600; // Cache for 1 hour (reduces DB queries 90%)

// Static generation for prompts list
export const generateStaticParams = async () => {
  return [];  // Generate at build time
};
```

### 3. Database Query Optimization
```typescript
// Cache frequently accessed data
const getPopularPrompts = cache(async () => {
  return prisma.prompt.findMany({
    where: { isPublic: true },
    take: 20,
    orderBy: { viewCount: 'desc' }
  });
}, { revalidate: 86400 });  // Revalidate daily
```

### 4. Lazy Load Images
```jsx
import Image from 'next/image';

<Image
  src="prompt.jpg"
  loading="lazy"
  alt="Prompt"
  quality={75}  // Reduce quality slightly for web
/>
```

### 5. Use CDN for Static Assets
```bash
# Enable Cloudflare (free) in front of Replit/mini PC
# Reduces bandwidth by 70% (cached assets served globally)
```

### 6. API Cost Optimization
```typescript
// Use cache for API responses
const response = await cache(async () => {
  return openrouter.chat.completions.create({
    model: "mistralai/mistral-7b",  // Free for testing
    messages: [...]
  });
}, { revalidate: 604800 });  // Cache 7 days
```

---

## Part 7: Quick Decision Guide

**Ask yourself:**

1. **Do I have $500 to spend upfront?**
   - YES → Buy mini PC, save $600+ yearly
   - NO → Use Replit autoscale ($0 first 3 months)

2. **Do I want zero maintenance?**
   - YES → Replit (fully managed)
   - NO → Mini PC (full control, learn DevOps)

3. **Do I expect 50K+ monthly users in year 1?**
   - YES → Plan for mini PC + CDN
   - NO → Stick with Replit

4. **Am I okay with outages?**
   - YES → Mini PC (depends on internet, power)
   - NO → Replit (99.9% SLA)

---

## Part 8: Implementation Roadmap

### Month 1: Launch (Use Replit)
- Deploy on Replit autoscale
- Cost: $0 (credits cover it)
- Monitor: Set up analytics

### Month 2-3: Optimize (Still Replit)
- Add caching
- Optimize images
- Reduce API costs
- Cost: $5-10/month

### Month 4+: Scale Decision
- If traffic < 2K daily: Keep Replit ($20-50/mo)
- If traffic > 5K daily: Buy mini PC ($75/mo long-term)
- If traffic > 50K daily: Add CDN + multiple mini PCs

---

## FINAL VERDICT

**Best for Promptpedia NOW:** Replit Autoscale
- Reason: No upfront cost, simple setup, fast

**Best for Promptpedia at Scale (6+ months):** Self-hosted Mini PC
- Reason: 50% cost savings, full control, easier to optimize

**Avoid for Promptpedia:** Vercel + Supabase combo
- Reason: Most expensive ($50-150/mo), adds complexity

---

**Next Step:** Deploy on Replit NOW, monitor costs, migrate to mini PC when you see consistent 2K+ daily traffic.
