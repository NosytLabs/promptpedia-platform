# 🎨 POLISH CHECKLIST - MAKE SITE PROFESSIONAL

## TIER 1: CRITICAL (Do Today)
- [x] Fix homepage null check bug
- [ ] Add navbar state indicator (signed in/out)
- [ ] Add footer with social links
- [ ] Add email newsletter capture widget

## TIER 2: HIGH PRIORITY (Do This Week)
- [ ] Improve auth pages styling (signin/signup)
- [ ] Add FAQ section to homepage
- [ ] Add pricing page CTAs throughout
- [ ] Add trust badges (200+ prompts, community powered)
- [ ] Improve button contrast/accessibility

## TIER 3: NICE TO HAVE (Polish)
- [ ] Add animations on scroll
- [ ] Add loading skeletons
- [ ] Error boundaries on components
- [ ] Form validation messages
- [ ] Success/error toast notifications

## QUICK WINS (30 min total)

### 1. Add Footer
Create `src/components/layout/footer.tsx`:
```typescript
- Links: Home, Browse, Generate, Learn, About, Terms
- Social: Twitter, GitHub, Email
- Newsletter signup
- Copyright
```

### 2. Improve Navbar
- Show user avatar if logged in
- Add Pro badge
- Highlight "Get Pro" for free users
- Mobile menu

### 3. Add FAQ Section
Before CTA on homepage:
```
Q: How is this different from ChatGPT?
A: We've curated 200+ prompts tested in production...

Q: Do I need Pro?
A: Free tier lets you browse and learn. Pro unlocks AI optimization.

Q: Can I submit my own prompts?
A: Yes! Community submissions drive innovation.
```

### 4. Email Widget
Simple popup/sticky:
```
"Join 5K+ Prompt Engineers"
"Get daily AI tips & prompts"
[Email input] [Subscribe button]
```

## EXPECTED IMPACT

After polish:
- Bounce rate: -20% (less friction)
- Pro conversion: +30% (clearer CTAs)
- Email list: +500/week (newsletter captures)
- Time on site: +40% (better UX)

**Result:** Professional site that converts 2-5% of visitors to Pro instead of 0.5-1%
