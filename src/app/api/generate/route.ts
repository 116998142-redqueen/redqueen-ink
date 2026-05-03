// API route — Generate content from idea (DEMO MODE - no API keys needed)
import { NextRequest, NextResponse } from 'next/server'

const demoContents: Record<string, string> = {
  blog: `# The Future of AI-Powered Content Creation

In today's fast-paced digital landscape, content creators face an ever-growing challenge: producing high-quality content consistently across multiple platforms. The solution? AI-assisted writing tools that understand context, tone, and platform-specific requirements.

## Why Multi-Platform Matters

Each platform has its own audience, format, and expectations. A blog post that performs well on your website might fall flat on LinkedIn. A newsletter that engages subscribers might not work as a standalone article.

## The One-Workflow Approach

Imagine sharing your idea once and getting three optimized versions back. That's the power of unified content creation. You maintain your voice while adapting to each platform's unique demands.

## Getting Started

Start by jotting down your core idea. Focus on the message you want to convey, not the format. Let AI handle the rest.`,

  linkedin: `💡 **The single most underrated skill for creators in 2026?**

Adapting your message across platforms without losing your voice.

Here's what I've learned:

Most creators write once and post once. Big mistake.

📝 **Your blog** needs depth and structure
💼 **Your LinkedIn** needs insights and personality
📬 **Your newsletter** needs intimacy and value

Same idea. Three different executions.

The creators winning right now aren't working harder — they're working smarter with the right workflow.

What platform do you find hardest to write for consistently? 👇`,

  newsletter: `# Hey everyone,

This week I've been thinking a lot about **content creation workflows** and how most of us are doing it wrong.

## The Problem

We treat each platform as a separate task. Write blog → switch context → write LinkedIn post → switch context → write newsletter. That's three separate creative sessions for one idea.

## A Better Way

What if you could write once and get three outputs, each optimized for its platform?

Think about it:
- Blog readers want depth and research
- LinkedIn followers want quick insights
- Newsletter subscribers want personal perspective

**Same core message. Three different deliveries.**

## Try This

Next time you have an idea, don't ask "where should I post this?" Ask "how can I share this across all platforms without burning out?"

That small shift in thinking changes everything.

See you next week,
— Your friendly creator

*P.S. Tools like Redqueen make this workflow seamless. But even without tools, the mindset shift alone will save you hours.*`
}

export async function POST(req: NextRequest) {
  try {
    const { idea, tone, platform } = await req.json()

    if (!idea?.trim()) {
      return NextResponse.json({ error: 'Idea is required' }, { status: 400 })
    }

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Return demo content based on platform
    const content = demoContents[platform as string] || demoContents.blog
    const personalizedContent = `*Based on your idea: "${idea.slice(0, 60)}..."*\n\n${content}`

    return NextResponse.json({
      content: personalizedContent,
      platform,
      tone,
      words: personalizedContent.split(/\s+/).length,
      model: 'demo',
    })

  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Generation failed' }, { status: 500 })
  }
}
