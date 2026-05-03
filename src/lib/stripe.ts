// Demo Stripe — no API keys needed
export const stripe = {
  // Demo mock — return plan info without actual Stripe calls
  async charges: {
    create: async () => ({ id: 'demo_charge', status: 'succeeded' }),
  },
  async checkout: {
    sessions: {
      create: async () => ({ id: 'demo_session', url: '/create' }),
    },
  },
}

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
    postsPerMonth: -1,
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
