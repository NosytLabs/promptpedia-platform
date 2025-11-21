# Promptpedia Platform - Setup Instructions

## 🚀 What You Need to Do

Follow these steps to get Promptpedia running:

---

## **STEP 1: Environment Configuration**

### 1a. Copy Environment Variables
```bash
cp .env.local .env.local  # Already created for you
```

### 1b. Get Required Secrets
You need to obtain these API keys and add them to `.env.local`:

1. **Database (REQUIRED)**
   - Already available in Replit: Use `DATABASE_URL` from Replit secrets
   - Copy and paste into `.env.local` as `DATABASE_URL`

2. **NextAuth (REQUIRED)**
   - Generate secret: `openssl rand -base64 32`
   - Set `NEXTAUTH_SECRET` to the generated value
   - Set `NEXTAUTH_URL` to `http://localhost:5000` (local) or your deployed URL

3. **OpenRouter API Key (REQUIRED for AI features)**
   - Get free key: https://openrouter.ai/keys
   - Add to `.env.local` as `OPENROUTER_API_KEY`

4. **OAuth (OPTIONAL but recommended for social login)**
   - **Google OAuth:**
     - Go to: https://console.cloud.google.com/
     - Create OAuth 2.0 credentials
     - Add `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
   
   - **GitHub OAuth:**
     - Go to: https://github.com/settings/developers
     - Create OAuth app
     - Add `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`

5. **Dodo Payments (OPTIONAL for production billing)**
   - Get keys: https://dodo.ai/
   - Create payment products
   - Add: `DODO_SECRET_KEY`, `NEXT_PUBLIC_DODO_PUBLIC_KEY`, product IDs

---

## **STEP 2: Database Setup**

### 2a. Push Schema to Database
```bash
npm run db:push
```
This syncs your Prisma schema with the database.

### 2b. Seed 50 Production Prompts
```bash
npm run db:seed
```
This creates:
- System admin user (system@promptpedia.ai)
- 50 production-ready prompts across 4 categories
- Sample data with view counts, ratings, engagement metrics

---

## **STEP 3: Run Development Server**

```bash
npm run dev
```

Then open: **http://localhost:5000**

You should see:
- ✅ Homepage with featured prompts
- ✅ 50+ prompts to browse
- ✅ Generate page for prompt optimization
- ✅ Blog with 14 guides
- ✅ Clean 4-item navigation

---

## **STEP 4: Verification Checklist**

After running `npm run dev`, verify everything works:

- [ ] Homepage loads without errors
- [ ] Can browse /prompts and see 50+ prompts
- [ ] Search/filter by category works
- [ ] Can view individual prompt details
- [ ] Share button appears on prompts
- [ ] Feedback component appears on prompts
- [ ] Related prompts show below prompt
- [ ] Blog page shows 14 guides
- [ ] Navigation bar works smoothly
- [ ] Mobile responsive design

---

## **What's Ready to Go**

✅ **50 Production Prompts** covering:
- Business & Making Money (10)
- Code & Development (5)
- Design & UX (5)
- Content & Writing (5)
- Plus 20 more specialized prompts

✅ **Quality of Life Features:**
- One-click social sharing (Twitter, LinkedIn, email)
- User feedback collection (helpful/not-helpful)
- Related prompts recommendations
- Advanced search & filtering
- 14 SEO-optimized blog guides

✅ **SEO & Discovery:**
- Sitemap.xml for search engines
- Robots.txt crawling rules
- Metadata tags & OpenGraph
- Schema markup utilities
- Proper redirects for old routes

✅ **Design & UX:**
- Modern 2025 design with smooth animations
- Responsive mobile layout
- 4-item clean navigation
- Professional component library

---

## **Optional: Enable Payments**

To enable Pro tier ($9/month):

1. Sign up for Dodo Payments: https://dodo.ai/
2. Create 3 products: Pro, Premium, Enterprise
3. Add product IDs to `.env.local`
4. Uncomment payment routes in code

---

## **Deployment (Publish to Production)**

When ready to go live:

```bash
# Build production version
npm run build

# Deploy via Replit Publish button
# Or run: npm start
```

Your app will be live with:
- Automatic HTTPS
- CDN distribution
- Automatic scaling

---

## **Troubleshooting**

### Port Already in Use
```bash
# Kill process on port 5000
fuser -k 5000/tcp
# Then restart: npm run dev
```

### Database Connection Error
```bash
# Verify DATABASE_URL in .env.local
# Make sure Replit PostgreSQL is enabled
# Run: npm run db:push
```

### Missing Prompts
```bash
# Re-seed database
npm run db:seed
```

### Stale Package Cache
```bash
rm -rf node_modules .next
npm install
npm run dev
```

---

## **Next Steps After Launch**

1. **Enable Auth:** Add your OAuth keys to enable social login
2. **Setup Payments:** Configure Dodo Payments for Pro tier
3. **Add Analytics:** Set up Google Analytics for tracking
4. **Email Notifications:** Configure SendGrid for email features
5. **Monitor Performance:** Use Replit analytics dashboard

---

## **Support & Resources**

- **Docs:** See replit.md for full architecture
- **Components:** All UI components in src/components/
- **Database:** Schema in prisma/schema.prisma
- **Prompts:** See prisma/seed-comprehensive.js for examples
- **Blog:** Blog posts in src/app/blog/

---

**You're ready to launch! 🚀**

Any questions? Check the SETUP_INSTRUCTIONS.md for detailed steps.
