// Stripe setup
import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
  typescript: true,
})

// Plan configuration
export const plans = {
  free: {
    name: 'Free',
    price: 0,
    postsPerMonth: 5,
    features: [
      '5 posts per month',
      'Blog + LinkedIn + Newsletter templates',
      'Basic AI generation',
    ],
  },
  creator: {
    name: 'Creator',
    price: 15,
    priceId: '', // Set your Stripe price ID here
    postsPerMonth: 30,
    features: [
      '30 posts per month',
      'All platforms (Blog/LinkedIn/Newsletter)',
      'Tone customization',
      'SEO suggestions',
      'Export to Markdown',
    ],
  },
  pro: {
    name: 'Pro',
    price: 39,
    priceId: '',
    postsPerMonth: -1, // unlimited
    features: [
      'Unlimited posts',
      'One-click publish',
      'Content calendar',
      'Advanced AI (GPT-4o + Claude Sonnet)',
      'API access',
      'Priority support',
    ],
  },
  team: {
    name: 'Team',
    price: 79,
    priceId: '',
    postsPerMonth: -1,
    features: [
      'Everything in Pro',
      '5 team seats',
      'Brand voice profiles',
      'Advanced analytics',
      'Custom integrations',
    ],
  },
} as const

export type PlanKey = keyof typeof plans
