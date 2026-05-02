// Pricing page
import Link from 'next/link'

const plans = [
  {
    name: 'Free',
    price: '$0',
    posts: '5 posts/month',
    features: ['Blog, LinkedIn & Newsletter templates', 'Basic AI generation', 'Export to Markdown'],
  },
  {
    name: 'Creator',
    price: '$15',
    posts: '30 posts/month',
    features: ['All templates & platforms', 'Tone customization', 'SEO suggestions', 'Content history'],
    popular: true,
  },
  {
    name: 'Pro',
    price: '$39',
    posts: 'Unlimited',
    features: ['Unlimited posts', 'One-click publish', 'Content calendar', 'GPT-4o + Claude access', 'API access'],
  },
  {
    name: 'Team',
    price: '$79',
    posts: 'Unlimited',
    features: ['All Pro features', '5 team seats', 'Brand voice profiles', 'Advanced analytics', 'Priority support'],
  },
]

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold text-white">Simple pricing</h1>
        <p className="mt-4 text-lg text-zinc-400">Start free. Upgrade when you grow.</p>
      </div>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-xl border p-6 ${
              plan.popular
                ? 'border-purple-500 bg-purple-950/20 ring-1 ring-purple-500'
                : 'border-zinc-800 bg-zinc-900/50'
            }`}
          >
            {plan.popular && (
              <div className="mb-4 inline-flex rounded-full bg-purple-600/20 px-3 py-1 text-xs font-medium text-purple-400">
                Most Popular
              </div>
            )}
            <h3 className="text-xl font-bold text-white">{plan.name}</h3>
            <div className="mt-4">
              <span className="text-4xl font-bold text-white">{plan.price}</span>
              {plan.price !== '$0' && <span className="text-sm text-zinc-400">/mo</span>}
            </div>
            <p className="mt-1 text-sm text-zinc-500">{plan.posts}</p>
            <ul className="mt-6 space-y-3">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-zinc-300">
                  <span className="mt-0.5 text-purple-400">✓</span> {f}
                </li>
              ))}
            </ul>
            <Link
              href="/create"
              className={`mt-8 block w-full rounded-lg py-2.5 text-center text-sm font-semibold transition-colors ${
                plan.popular
                  ? 'bg-purple-600 text-white hover:bg-purple-500'
                  : 'border border-zinc-700 text-zinc-300 hover:bg-zinc-800'
              }`}
            >
              {plan.price === '$0' ? 'Get Started' : 'Subscribe'}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
