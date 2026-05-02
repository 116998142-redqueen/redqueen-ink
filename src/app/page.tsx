// Landing page — main value proposition
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-800 bg-zinc-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/50 px-4 py-1.5 text-sm text-zinc-400">
              ⚡ Write once, publish everywhere
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              From one idea to{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                three platforms
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-400">
              Transform your thoughts into SEO-optimized blog posts, LinkedIn thought-leadership,
              and engaging newsletters — all with a single input. Save 10+ hours a week.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link
                href="/create"
                className="rounded-lg bg-purple-600 px-8 py-3 text-sm font-semibold text-white hover:bg-purple-500 transition-colors"
              >
                Start Writing Free →
              </Link>
              <Link
                href="/pricing"
                className="rounded-lg border border-zinc-700 px-8 py-3 text-sm font-semibold text-zinc-300 hover:bg-zinc-800 transition-colors"
              >
                See Pricing
              </Link>
            </div>
            <p className="mt-4 text-sm text-zinc-600">
              No credit card required · 5 free posts every month
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b border-zinc-800 bg-zinc-950 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-white">How it works</h2>
            <p className="mt-4 text-zinc-400">One workflow. Three platforms. Zero friction.</p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {[
              { step: '01', title: 'Share your idea', desc: 'A sentence, a bullet, a thought. Just tell us what you want to say.' },
              { step: '02', title: 'AI crafts it', desc: 'We generate blog, LinkedIn, and newsletter versions optimized for each platform.' },
              { step: '03', title: 'Publish everywhere', desc: 'Review, tweak, and export to all your platforms in one click.' },
            ].map((item) => (
              <div key={item.step} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-8">
                <div className="mb-4 text-4xl font-bold text-purple-500">{item.step}</div>
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans preview */}
      <section className="bg-zinc-950 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-white">Simple pricing</h2>
            <p className="mt-4 text-zinc-400">Start free. Upgrade when you grow.</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              { name: 'Free', price: '$0', posts: '5 posts/mo', features: ['All templates', 'Basic AI', 'Export'] },
              { name: 'Creator', price: '$15', posts: '30 posts/mo', features: ['Tone control', 'SEO analysis', 'Markdown export'], popular: true },
              { name: 'Pro', price: '$39', posts: 'Unlimited', features: ['One-click publish', 'Content calendar', 'GPT-4o + Claude'] },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`rounded-xl border p-8 ${
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
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                  {plan.price !== '$0' && <span className="text-sm text-zinc-400">/mo</span>}
                </div>
                <p className="mt-1 text-sm text-zinc-500">{plan.posts}</p>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-zinc-300">
                      <span className="text-purple-400">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/signup"
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
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-zinc-950 py-8">
        <div className="mx-auto max-w-6xl px-6 text-center text-sm text-zinc-600">
          Redqueen.ink — Write once, publish everywhere.
        </div>
      </footer>
    </div>
  )
}
