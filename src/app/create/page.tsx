// Core writing interface — the main feature
'use client'

import { useState } from 'react'

type Platform = 'blog' | 'linkedin' | 'newsletter'
type Tone = 'professional' | 'storytelling' | 'technical' | 'casual'

interface GeneratedContent {
  platform: Platform
  content: string
  loading: boolean
}

const platformMeta: Record<Platform, { label: string; emoji: string; placeholder: string }> = {
  blog: { label: 'Blog', emoji: '📝', placeholder: 'A deep dive into...' },
  linkedin: { label: 'LinkedIn', emoji: '💼', placeholder: 'A professional insight about...' },
  newsletter: { label: 'Newsletter', emoji: '📬', placeholder: 'This week I learned...' },
}

const tones: { value: Tone; label: string }[] = [
  { value: 'professional', label: 'Professional' },
  { value: 'storytelling', label: 'Storytelling' },
  { value: 'technical', label: 'Technical' },
  { value: 'casual', label: 'Casual' },
]

export default function CreatePage() {
  const [idea, setIdea] = useState('')
  const [tone, setTone] = useState<Tone>('professional')
  const [primaryPlatform, setPrimaryPlatform] = useState<Platform>('blog')
  const [generated, setGenerated] = useState<GeneratedContent[]>([])
  const [generating, setGenerating] = useState(false)

  const platforms: Platform[] = ['blog', 'linkedin', 'newsletter']

  async function handleGenerate() {
    if (!idea.trim()) return
    setGenerating(true)
    setGenerated(platforms.map(p => ({ platform: p, content: '', loading: true })))

    // Call API to generate for primary platform first
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea, tone, platform: primaryPlatform }),
      })
      const data = await res.json()

      setGenerated(prev =>
        prev.map(g => (g.platform === primaryPlatform ? { ...g, content: data.content, loading: false } : g))
      )

      // Generate repurposed versions
      if (data.content) {
        for (const platform of platforms.filter(p => p !== primaryPlatform)) {
          const repRes = await fetch('/api/repurpose', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: data.content, fromPlatform: primaryPlatform, toPlatform: platform }),
          })
          const repData = await repRes.json()
          setGenerated(prev =>
            prev.map(g => (g.platform === platform ? { ...g, content: repData.content, loading: false } : g))
          )
        }
      }
    } catch (e) {
      console.error('Generation failed:', e)
    }

    setGenerating(false)
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-white">Create Content</h1>
        <p className="mt-2 text-zinc-400">Share your idea. We&apos;ll write it for all platforms.</p>

        {/* Input */}
        <div className="mt-8 space-y-4">
          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="What do you want to say? Just a sentence or a bullet list is enough..."
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-6 text-white placeholder-zinc-600 focus:border-purple-500 focus:outline-none"
            rows={4}
          />

          <div className="flex flex-wrap gap-4">
            {/* Tone selector */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-zinc-500">Tone:</span>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value as Tone)}
                className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white"
              >
                {tones.map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>

            {/* Primary platform */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-zinc-500">Write for:</span>
              <div className="flex gap-1">
                {platforms.map(p => (
                  <button
                    key={p}
                    onClick={() => setPrimaryPlatform(p)}
                    className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                      primaryPlatform === p
                        ? 'bg-purple-600 text-white'
                        : 'border border-zinc-700 text-zinc-400 hover:bg-zinc-800'
                    }`}
                  >
                    {platformMeta[p].emoji} {platformMeta[p].label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!idea.trim() || generating}
            className="w-full rounded-xl bg-purple-600 py-4 text-lg font-semibold text-white hover:bg-purple-500 disabled:opacity-50 transition-colors"
          >
            {generating ? '✨ Generating for all platforms...' : '✨ Generate for All Platforms'}
          </button>
        </div>

        {/* Results */}
        {generated.length > 0 && (
          <div className="mt-12 space-y-8">
            {generated.map((g) => (
              <div key={g.platform} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">
                    {platformMeta[g.platform].emoji} {platformMeta[g.platform].label}
                  </h2>
                  {g.loading && <span className="text-sm text-purple-400 animate-pulse">Generating...</span>}
                </div>
                {g.content ? (
                  <div className="prose prose-invert prose-zinc max-w-none">
                    <pre className="whitespace-pre-wrap font-sans text-sm text-zinc-300">{g.content}</pre>
                  </div>
                ) : g.loading ? null : (
                  <p className="text-sm text-zinc-600">Waiting for content...</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
