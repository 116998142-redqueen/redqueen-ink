// API route — Repurpose content to another platform
import { NextRequest, NextResponse } from 'next/server'
import { generateContent } from '@/lib/ai'
import { buildRepurposeLinkedInPrompt, buildRepurposeNewsletterPrompt } from '@/lib/prompts'
import type { Platform } from '@/lib/prompts'

export async function POST(req: NextRequest) {
  try {
    const { content, fromPlatform, toPlatform } = await req.json() as {
      content: string
      fromPlatform: Platform
      toPlatform: Platform
    }

    if (!content?.trim()) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 })
    }

    let prompt: string
    if (toPlatform === 'linkedin') {
      prompt = buildRepurposeLinkedInPrompt(content)
    } else if (toPlatform === 'newsletter') {
      prompt = buildRepurposeNewsletterPrompt(content)
    } else {
      // Blog: just return the original (or could expand)
      return NextResponse.json({ content })
    }

    const generated = await generateContent({
      prompt,
      model: 'gpt-mini',
      temperature: 0.7,
      maxTokens: 3072,
    })

    return NextResponse.json({ content: generated, fromPlatform, toPlatform })
  } catch (error) {
    console.error('Repurpose error:', error)
    return NextResponse.json({ error: 'Repurposing failed' }, { status: 500 })
  }
}
