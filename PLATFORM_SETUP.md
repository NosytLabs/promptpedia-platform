# Promptpedia Platform - Setup Guide

This guide walks you through setting up the full Promptpedia platform with user authentication, membership tiers, forum, and user-generated prompt features.

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Git

## 1. Database Setup

### Using PostgreSQL locally:

```bash
# Create a new PostgreSQL database
createdb promptpedia

# Set your DATABASE_URL in .env.local
DATABASE_URL="postgresql://user:password@localhost:5432/promptpedia"
```

### Or using Supabase (recommended for easy hosting):

1. Create a free account at https://supabase.com
2. Create a new project
3. Copy the connection string to your `.env.local` as `DATABASE_URL`

## 2. Environment Variables

Copy `.env.example` to `.env.local` and fill in the required values:

```bash
cp .env.example .env.local
```

### Required Environment Variables:

```env
# Database
DATABASE_URL=postgresql://...

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate_a_random_secret_here
NEXTAUTH_JWT_SECRET=generate_another_random_secret_here

# OAuth Providers (sign up at Google Cloud Console and GitHub)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Stripe (for payment processing)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## 3. OAuth Setup

### Google OAuth:

1. Go to https://console.cloud.google.com
2. Create a new project
3. Enable the "Google+ API"
4. Create OAuth 2.0 credentials (Web application)
5. Add `http://localhost:3000/api/auth/callback/google` to authorized redirect URIs
6. Copy Client ID and Client Secret to `.env.local`

### GitHub OAuth:

1. Go to https://github.com/settings/developers
2. Create a new OAuth App
3. Set Authorization callback URL to `http://localhost:3000/api/auth/callback/github`
4. Copy Client ID and Client Secret to `.env.local`

## 4. Stripe Setup (Optional but recommended for production)

1. Create a Stripe account at https://stripe.com
2. Go to Stripe Dashboard > API Keys
3. Copy Publishable Key and Secret Key to `.env.local`
4. Create products for each membership tier:
   - PRO ($9.99/month)
   - PREMIUM ($29.99/month)
   - ENTERPRISE (custom pricing)
5. Copy the product IDs to `.env.local`

## 5. Install Dependencies

```bash
npm install
```

## 6. Set Up Prisma

### Generate Prisma Client:

```bash
npx prisma generate
```

### Run Database Migrations:

```bash
npx prisma migrate dev --name init
```

This will:
- Create all tables in your database
- Generate the Prisma client

## 7. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Platform Features

### User Authentication
- **Email/Password signup and login**
- **OAuth integration** (Google, GitHub)
- **Session management** with NextAuth.js

### Membership Tiers
- **Free Plan**: 5 custom prompts, basic forum access
- **Pro Plan** ($9.99/month): 50 custom prompts, analytics, API access
- **Premium Plan** ($29.99/month): Unlimited prompts, advanced features
- **Enterprise Plan**: Custom pricing, dedicated support

### User Dashboard
- View profile and statistics
- Manage custom prompts
- Track views and likes
- Upgrade/downgrade membership

### Create & Manage Prompts
- **Create prompts** with detailed information
- **Categories** (Text Generation, Code, Creative Writing, etc.)
- **Techniques** (Chain-of-thought, Few-shot, Zero-shot, etc.)
- **AI Systems** (GPT-4, Claude, Gemini, etc.)
- **Edit and delete** your prompts
- **View analytics** (Pro+ plans)

### Community Forum
- **Create discussions** in 6 categories
- **Browse forum** with search and filtering
- **Reply to posts** (authenticated users)
- **Trending topics** section
- **Category organization**

### User Profiles
- **Profile settings** (name, bio, email)
- **Change password**
- **Billing management**
- **Subscription management**

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/[...nextauth]` - NextAuth endpoints

### User
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `GET /api/user/stats` - Get user statistics
- `GET /api/user/membership` - Get membership info
- `GET /api/user/billing` - Get billing details
- `POST /api/user/subscription/cancel` - Cancel subscription

### Prompts
- `GET /api/prompts` - List prompts with filters
- `POST /api/prompts` - Create new prompt
- `GET /api/prompts/[id]` - Get prompt details
- `PUT /api/prompts/[id]` - Update prompt
- `DELETE /api/prompts/[id]` - Delete prompt
- `GET /api/my-prompts` - List user's prompts

### Forum
- `GET /api/forum/posts` - List forum posts
- `POST /api/forum/posts` - Create forum post
- `GET /api/forum/posts/[id]` - Get post details
- `POST /api/forum/posts/[id]/replies` - Create reply

## File Structure

```
src/
├── app/
│   ├── auth/
│   │   ├── signin/
│   │   ├── signup/
│   │   └── callback/
│   ├── dashboard/
│   ├── prompts/
│   │   ├── create/
│   │   └── [id]/
│   ├── forum/
│   │   ├── create/
│   │   └── [id]/
│   ├── my-prompts/
│   ├── pricing/
│   ├── settings/
│   │   ├── profile/
│   │   └── billing/
│   ├── api/
│   │   ├── auth/
│   │   ├── user/
│   │   ├── prompts/
│   │   ├── forum/
│   │   └── checkout/
│   └── layout.tsx
├── components/
│   ├── ui/
│   ├── layout/
│   └── ...
├── lib/
│   ├── auth.ts
│   ├── prisma.ts
│   ├── membership-tiers.ts
│   └── utils.ts
└── types/

prisma/
├── schema.prisma
└── migrations/
```

## Database Schema

### Core Models
- **User** - User accounts and profiles
- **Account** - OAuth account connections
- **Session** - User sessions
- **Membership** - User membership tier and subscription info
- **Subscription** - Subscription payment history

### Content Models
- **Prompt** - User-created and community prompts
- **ForumPost** - Forum discussion threads
- **ForumReply** - Responses to forum posts
- **UserContribution** - Track user activity metrics

## Deployment

### Deploy to Vercel (recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Deploy to Other Platforms

For Railway, Render, or other platforms:
1. Set all environment variables
2. Run `npm run build`
3. Start with `npm run start`

## Troubleshooting

### Database connection issues
- Ensure PostgreSQL is running
- Check DATABASE_URL format
- Run `npx prisma db push` to sync schema

### OAuth not working
- Verify callback URLs match exactly
- Check client IDs and secrets
- Clear browser cookies and try again

### Build errors
- Delete `node_modules` and `.next` folder
- Run `npm install` again
- Run `npm run build`

## Support

For issues or questions:
1. Check the documentation in `/docs`
2. Review API endpoint examples
3. Check browser console for errors
4. Review server logs for backend errors

## Next Steps

1. Set up analytics tracking
2. Configure email notifications
3. Implement payment webhook handlers
4. Add more OAuth providers
5. Set up monitoring and logging
6. Configure backup strategy

## License

MIT
