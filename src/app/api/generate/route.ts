// API route — Generate content from idea
import { NextRequest, NextResponse } from 'next/server'
import { generateContent } from '@/lib/ai'
import { buildBlogPrompt, buildLinkedInPrompt, buildNewsletterPrompt, type Platform, type Tone } from '@/lib/prompts'

export async function POST(req: NextRequest) {
  try {
    const { idea, tone, platform } = await req.json() as {
      idea: string
      tone: Tone
      platform: Platform
    }

    if (!idea?.trim()) {
      return NextResponse.json({ error: 'Idea is required' }, { status: 400 })
    }

    // Build the right prompt based on platform
    const promptBuilders: Record<Platform, (opts: any) => string> = {
      blog: buildBlogPrompt,
      linkedin: buildLinkedInPrompt,
      newsletter: buildNewsletterPrompt,
    }

    const promptFn = promptBuilders[platform]
    if (!promptFn) {
      return NextResponse.json({ error: 'Invalid platform' }, { status: 400 })
    }

    const prompt = promptFn({ idea, tone, platform, length: 'medium' })

    // Use cheaper model for first draft
    const content = await generateContent({
      prompt,
      model: 'gpt-mini',
      temperature: 0.7,
      maxTokens: 4096,
    })

    return NextResponse.json({ content, platform })
  } catch (error) {
    console.error('Generate error:', error)
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 })
  }
}
