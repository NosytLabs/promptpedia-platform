# Promptpedia Testing Checklist

**Last Updated:** November 15, 2024  
**Build Status:** ✅ SUCCESSFUL (0 errors)

---

## 🚀 Quick Start Commands

```bash
# Development
npm run dev

# Build
npm run build

# Linting
npm run lint

# Testing
npm run test
npm run test:watch

# Documentation
npm run storybook
```

**Dev Server:** http://localhost:3000

---

## ✅ CORE FEATURES - Testing Checklist

### 1. Authentication Flow
- [ ] **Sign Up (OAuth)**
  - [ ] Visit `/auth/signup`
  - [ ] Click OAuth provider button
  - [ ] Redirect to provider login works
  - [ ] Account created after approval
  - [ ] Redirect to dashboard works
  
- [ ] **Sign In (OAuth)**
  - [ ] Visit `/auth/signin`
  - [ ] Sign in with existing account
  - [ ] Session persists on page reload
  - [ ] Can access protected pages

- [ ] **Protected Routes**
  - [ ] Unauthenticated user redirected to `/auth/signin` on protected page
  - [ ] Authenticated user can access `/dashboard`
  - [ ] Authenticated user can access `/my-prompts`
  - [ ] Authenticated user can access `/settings/*`

- [ ] **Sign Out**
  - [ ] User can sign out from settings or header menu
  - [ ] Session cleared after sign out
  - [ ] Redirected to home page

---

### 2. Membership System
- [ ] **View Membership Tier**
  - [ ] Visit `/settings/billing`
  - [ ] Current tier displays correctly (FREE by default)
  - [ ] Tier limits show correct numbers
  - [ ] Plan features listed accurately

- [ ] **View Pricing Plans**
  - [ ] Visit `/(marketing)/pricing`
  - [ ] 3 plans visible (FREE, PRO, PREMIUM)
  - [ ] Correct pricing shown ($0, $9.99, $29.99)
  - [ ] "Most Popular" badge on PRO tier
  - [ ] Features list matches tier config

- [ ] **Tier Limits Enforced**
  - [ ] FREE user can create max 5 prompts
  - [ ] PRO user can create max 50 prompts
  - [ ] PREMIUM user has unlimited prompts
  - [ ] Create button disabled when limit reached

- [ ] **Upgrade Button**
  - [ ] Visit `/settings/billing`
  - [ ] Click "Upgrade to PRO" button
  - [ ] ⚠️ Returns 501 Not Implemented (expected)
  - [ ] Button text is clear about not being available

---

### 3. Prompt Management

#### 3a. Create Prompt
- [ ] **Access Create Form**
  - [ ] Unauthenticated user redirected to signin
  - [ ] Authenticated user can access `/prompts/create`
  - [ ] Form loads with all fields

- [ ] **Fill Form**
  - [ ] Title field accepts text
  - [ ] Description field accepts markdown
  - [ ] Prompt text field accepts multiline input
  - [ ] Category dropdown works (12 categories)
  - [ ] Techniques multi-select works (12 options)
  - [ ] AI Systems multi-select works (9 options)
  - [ ] Tags field accepts comma-separated values
  - [ ] Examples field accepts text

- [ ] **Submit Prompt**
  - [ ] Submit button creates prompt
  - [ ] User redirected to `/my-prompts`
  - [ ] New prompt appears in list
  - [ ] Prompt is in DRAFT status initially

- [ ] **Limit Enforcement**
  - [ ] FREE user can only create 5 prompts
  - [ ] Error message shows when limit reached
  - [ ] Create button disabled/hidden after limit

#### 3b. Browse Prompts
- [ ] **Browse Page**
  - [ ] Visit `/prompts`
  - [ ] 1000+ community prompts load
  - [ ] Prompts display with title, description, creator
  - [ ] Pagination works (if implemented)

- [ ] **Filter & Search**
  - [ ] Filter by category works
  - [ ] Search by keyword works (basic text matching)
  - [ ] Results update when filter changes
  - [ ] "No results" message shows when appropriate

- [ ] **View Details**
  - [ ] Click on prompt card
  - [ ] Detail page loads (`/prompts/[id]`)
  - [ ] Full prompt text displays
  - [ ] Creator info shows with name
  - [ ] View count increments
  - [ ] Like button works
  - [ ] Bookmark button works
  - [ ] Share prompt options available

#### 3c. Manage Prompts
- [ ] **My Prompts Page**
  - [ ] Visit `/my-prompts`
  - [ ] Shows only user's prompts
  - [ ] Displays title, description, status
  - [ ] Shows creation date

- [ ] **Edit Prompt**
  - [ ] Click edit button on prompt
  - [ ] Form pre-fills with existing data
  - [ ] Save changes
  - [ ] Changes reflected in list and detail pages

- [ ] **Delete Prompt**
  - [ ] Click delete button
  - [ ] Confirmation dialog shows
  - [ ] Cancel works
  - [ ] Confirm deletes prompt
  - [ ] Removed from list
  - [ ] 404 on detail page after deletion

#### 3d. Engage with Prompts
- [ ] **Like Prompt**
  - [ ] Click like button on detail page
  - [ ] Like count increments
  - [ ] Button state changes (filled vs outline)
  - [ ] Like persists on reload

- [ ] **Bookmark Prompt**
  - [ ] Click bookmark button
  - [ ] Bookmark count increments
  - [ ] Button state changes
  - [ ] Bookmark persists

- [ ] **Copy Prompt**
  - [ ] Click "Copy to Clipboard" button
  - [ ] Toast notification shows "Copied!"
  - [ ] Prompt text copied to clipboard

---

### 4. Forum System

#### 4a. Browse Forum
- [ ] **Forum Page**
  - [ ] Visit `/forum`
  - [ ] Forum posts list displays
  - [ ] Posts show title, author, view count, reply count
  - [ ] Creation date shows

- [ ] **Category Filter**
  - [ ] Filter dropdown shows 6 categories
  - [ ] Selecting category filters posts
  - [ ] "All Topics" shows unfiltered list

- [ ] **Search Posts**
  - [ ] Type in search box
  - [ ] Results filter as you type
  - [ ] Works across all categories

#### 4b. Create Post
- [ ] **Access Create Form**
  - [ ] Unauthenticated user redirected to signin
  - [ ] Authenticated user can access `/forum/create`
  - [ ] Form loads

- [ ] **Fill Form**
  - [ ] Title field accepts text
  - [ ] Content field accepts markdown
  - [ ] Category dropdown works (6 options)
  - [ ] All fields validate

- [ ] **Submit Post**
  - [ ] Submit button creates post
  - [ ] Redirected to `/forum`
  - [ ] New post appears in list
  - [ ] Posted by current user
  - [ ] Timestamp shows

#### 4c. View Post Details
- [ ] **Post Detail Page**
  - [ ] Click on post in list
  - [ ] ⚠️ Detail page may not be implemented
  - [ ] If implemented, shows full post content
  - [ ] View count increments

#### 4d. Forum Interactions
- [ ] **Reply to Post**
  - [ ] ⚠️ Reply system not yet implemented (501)
  - [ ] Reply button/form may show but won't work

- [ ] **View Replies**
  - [ ] ⚠️ Replies not yet implemented
  - [ ] Reply count shows but cannot view

- [ ] **Like/Engage**
  - [ ] ⚠️ Forum engagement features not yet implemented

---

### 5. User Profiles & Settings

#### 5a. View Profile
- [ ] **Profile Page**
  - [ ] Visit `/settings/profile`
  - [ ] Current user info displays
  - [ ] Name field shows
  - [ ] Email field shows (read-only?)
  - [ ] Bio field shows
  - [ ] Avatar shows (if set)

#### 5b. Edit Profile
- [ ] **Update Name**
  - [ ] Change name field
  - [ ] Click save
  - [ ] Changes persist
  - [ ] Updated on other pages

- [ ] **Update Bio**
  - [ ] Add/edit bio text
  - [ ] Save changes
  - [ ] Bio appears on profile

- [ ] **Upload Avatar**
  - [ ] ⚠️ File upload not yet implemented
  - [ ] Avatar field may show placeholder
  - [ ] Cannot upload custom avatar yet

#### 5c. Billing Settings
- [ ] **View Billing Info**
  - [ ] Visit `/settings/billing`
  - [ ] Current membership tier shows
  - [ ] Plan details display
  - [ ] Next billing date shows (if applicable)

- [ ] **Upgrade Membership**
  - [ ] Click upgrade button
  - [ ] ⚠️ Returns 501 (payment not yet implemented)

- [ ] **Cancel Subscription**
  - [ ] ⚠️ Cancel button not functional (501)

---

### 6. Dashboard & Analytics

- [ ] **Access Dashboard**
  - [ ] Visit `/dashboard`
  - [ ] Stats load (if authenticated)
  - [ ] Unauthenticated user redirected

- [ ] **View Stats**
  - [ ] Prompts created count shows
  - [ ] Forum posts count shows
  - [ ] Total likes received shows
  - [ ] Member since date shows
  - [ ] Current tier shows

- [ ] **Advanced Analytics**
  - [ ] ⚠️ Pro/Premium analytics not yet implemented
  - [ ] Detailed graphs may not show

---

### 7. Discovery & Learning Pages

- [ ] **Home Page (`/`)**
  - [ ] Hero section loads
  - [ ] Featured prompts section displays
  - [ ] Recent prompts carousel works
  - [ ] Statistics section shows
  - [ ] CTA buttons work

- [ ] **Techniques Page (`/techniques`)**
  - [ ] 12 prompt engineering techniques listed
  - [ ] Each technique has description
  - [ ] Examples provided
  - [ ] Expandable/collapsible sections work

- [ ] **Resources Page (`/resources`)**
  - [ ] Learning resources list displays
  - [ ] Links to external resources work
  - [ ] Categories/organization is clear

- [ ] **Features Page (`/(marketing)/features`)**
  - [ ] Platform features overview displays
  - [ ] Icons and descriptions visible
  - [ ] Call-to-action buttons work

- [ ] **About Page (`/(marketing)/about`)**
  - [ ] About content displays
  - [ ] Mission statement visible
  - [ ] Team info or founder story shows

- [ ] **Pricing Page (`/(marketing)/pricing`)**
  - [ ] Pricing comparison table shows
  - [ ] 3 tiers visible
  - [ ] Features clearly listed
  - [ ] Correct pricing shown
  - [ ] CTA buttons work

---

## ⚠️ KNOWN LIMITATIONS - Testing Notes

### Features Not Yet Implemented
```
❌ Email Verification (startup signup risk)
❌ Password Reset (OAuth-only workaround)
❌ Payment Processing (users cannot upgrade)
❌ Forum Replies (API incomplete)
❌ File Uploads (avatars, thumbnails)
❌ Notifications (no email or real-time)
❌ Admin Dashboard (moderation not available)
❌ Advanced Search (basic filtering only)
❌ Real-time Updates (WebSocket not configured)
❌ User Follow System (social features incomplete)
❌ Recommendation Engine (personalization missing)
```

### Expected 501 Responses
When testing, these endpoints will return 501 (Not Implemented):
- `POST /api/checkout` - Stripe not connected
- `POST /api/user/subscription/cancel` - Stripe not connected

---

## 🔍 API Testing

### Test with cURL or Postman

#### Get Featured Prompts
```bash
curl http://localhost:3000/api/prompts/featured
```

#### Create Prompt (requires auth)
```bash
curl -X POST http://localhost:3000/api/prompts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Prompt",
    "promptText": "This is a test",
    "category": "Text Generation",
    "techniques": ["Chain-of-thought"],
    "tags": ["test"]
  }'
```

#### Get User Profile (requires auth)
```bash
curl http://localhost:3000/api/user/profile
```

#### Get User Membership
```bash
curl http://localhost:3000/api/user/membership
```

---

## 📊 Performance Testing

### Load Times (Expected)
- **Home Page:** < 1s
- **Prompts Page:** < 1.5s
- **Forum Page:** < 1.5s
- **API Response:** < 200ms

### Bundle Size
- **Initial JS:** ~85-130KB
- **Shared chunks:** ~84KB
- **Route-specific:** 1-4KB

### Build Performance
- **Build time:** ~90 seconds
- **Static pages:** 21 prerendered
- **Dynamic routes:** 14 server-rendered

---

## 🔐 Security Testing

- [ ] **HTTPS Required**
  - [ ] All connections use HTTPS in production
  - [ ] Cookies marked as Secure and HttpOnly

- [ ] **CSRF Protection**
  - [ ] Forms include CSRF tokens
  - [ ] State validation on OAuth callbacks

- [ ] **SQL Injection**
  - [ ] Using Prisma ORM (parameterized queries)
  - [ ] Input validation with Zod
  - [ ] No raw SQL queries

- [ ] **XSS Prevention**
  - [ ] User input sanitized
  - [ ] Rich text content escaped
  - [ ] No inline scripts allowed

- [ ] **Rate Limiting**
  - [ ] ⚠️ Not yet implemented
  - [ ] APIs vulnerable to brute force
  - [ ] Should be added before production

---

## 🎨 UI/UX Testing

- [ ] **Responsive Design**
  - [ ] Mobile (< 768px) - content readable, no horizontal scroll
  - [ ] Tablet (768px-1024px) - layouts work
  - [ ] Desktop (> 1024px) - full layouts display

- [ ] **Navigation**
  - [ ] Header navigation works on all pages
  - [ ] Mobile menu opens/closes
  - [ ] Active page highlighted in nav
  - [ ] Links work correctly

- [ ] **Forms**
  - [ ] Form fields focus properly
  - [ ] Validation messages clear
  - [ ] Submit buttons disabled during loading
  - [ ] Success/error messages show
  - [ ] Tab order logical

- [ ] **Accessibility**
  - [ ] Keyboard navigation works
  - [ ] Screen reader compatible
  - [ ] Color contrast meets WCAG AA
  - [ ] Form labels associated with inputs
  - [ ] Error messages descriptive

- [ ] **Dark Mode**
  - [ ] If applicable, toggle works
  - [ ] Colors properly inverted
  - [ ] Text readable in both modes

---

## 🐛 Browser Testing

### Browsers to Test (Recommended)
- [ ] Chrome/Chromium (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Each Browser - Check:
- [ ] All pages load without errors
- [ ] No console errors
- [ ] All buttons functional
- [ ] Forms submit properly
- [ ] Animations smooth
- [ ] Images load properly

---

## 📋 Deployment Checklist

Before deploying to production:

- [ ] Build passes without errors (`npm run build`)
- [ ] No TypeScript errors (`npm run lint`)
- [ ] All tests pass (`npm run test`)
- [ ] Environment variables set correctly
- [ ] Database migrations run
- [ ] Env secrets configured (auth, database URL, etc.)
- [ ] CORS configured for frontend domain
- [ ] Rate limiting configured (or at least planned)
- [ ] Email service configured (or planned)
- [ ] Error tracking (Sentry) configured (or planned)
- [ ] Analytics tracking added (or planned)
- [ ] Security headers set (CSP, X-Frame-Options, etc.)
- [ ] SSL/TLS certificate configured
- [ ] CDN configured (for static assets)
- [ ] Backup strategy in place
- [ ] Monitoring and alerting set up

---

## 📝 Debugging Tips

### Enable Verbose Logging
```typescript
// In development, add to /lib/client-error.ts
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', context)
}
```

### Check Database
```bash
# Connect to Prisma Studio
npx prisma studio
```

### Monitor API Responses
1. Open DevTools (F12)
2. Go to Network tab
3. Make API request
4. Click on request
5. Check Response tab

### Check Build Issues
```bash
npm run build -- --debug
```

### TypeScript Issues
```bash
npx tsc --noEmit
```

---

## 🚨 Common Issues & Solutions

### Issue: 401 Unauthorized on protected routes
**Solution:** Make sure you're signed in, check NextAuth session

### Issue: Prompts not showing
**Solution:** Check console for API errors, verify database has data

### Issue: Form not submitting
**Solution:** Check browser console for validation errors, verify all required fields filled

### Issue: Stripe payment fails
**Solution:** Expected - Stripe not implemented yet (returns 501)

### Issue: Email not received
**Solution:** Expected - Email system not implemented yet

### Issue: Avatar won't upload
**Solution:** Expected - File upload system not implemented yet

---

## 📞 Support & Reporting

**Found an issue?**
1. Check if it's in the "Known Limitations" section above
2. Check browser console for errors
3. Verify you're on the latest code (`git pull`)
4. Clear cache and reload (`Ctrl+Shift+R`)
5. Report with: OS, browser, steps to reproduce

---

**Last Updated:** November 15, 2024  
**Next Review:** After Phase 1 Implementation (Stripe Integration)
