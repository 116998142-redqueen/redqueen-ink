# Redqueen.ink — Write once, publish everywhere

Transform a single idea into blog posts, LinkedIn content, and newsletters — all with AI.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env.local
# Fill in your API keys

# 3. Push database schema
npx prisma db push

# 4. Run dev server
npm run dev
```

## Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Styling:** TailwindCSS
- **Auth:** Auth.js v5 (Google OAuth)
- **AI:** OpenAI GPT-4o-mini + Claude Haiku
- **Payment:** Stripe
- **Database:** PostgreSQL (Supabase) + Prisma
- **Deploy:** Vercel

## Project Structure
```
src/
├── app/
│   ├── api/
│   │   ├── generate/    # AI content generation
│   │   └── repurpose/   # Content repurposing across platforms
│   ├── create/          # Main writing interface
│   ├── pricing/         # Pricing page
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx         # Landing page
└── lib/
    ├── ai.ts            # OpenAI + Claude clients
    ├── auth.ts          # Auth.js configuration
    ├── db.ts            # Prisma client
    ├── prompts.ts       # Platform-specific AI prompts
    ├── stripe.ts        # Stripe + plan config
    └── usage.ts         # Quota management
```

## Environment Variables
See `.env.example` for all required vars.

## Deployment
Push to GitHub → Connect to Vercel → Set env vars → Deploy
