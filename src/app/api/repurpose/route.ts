// API route — Repurpose content to another platform (DEMO MODE)
import { NextRequest, NextResponse } from 'next/server'

const repurposedContents: Record<string, Record<string, string>> = {
  blog_to_linkedin: {
    content: `💡 **New insight from my latest blog post**

After spending some time diving deep into AI-powered content creation, one thing became crystal clear:

The best creators aren't the ones who produce the most content. They're the ones who repurpose strategically.

Here are 3 takeaways:

1️⃣ **Depth has its place** — but not every platform needs it
2️⃣ **Your voice should stay** — only the format changes
3️⃣ **Consistency beats volume** — publish everywhere, but with intention

Which platform do you struggle with the most?`,
  },
  blog_to_newsletter: {
    content: `# Hi friends,

This week I wrote about AI-powered content creation and wanted to share some behind-the-scenes thinking.

**The core insight?** Most creators overcomplicate their workflow.

The best content strategy is simple: one idea, multiple formats, zero friction.

Here's what I've been experimenting with lately:
- Writing blog posts for depth
- Extracting LinkedIn posts for reach
- Crafting newsletters for connection

The key is starting with the idea, not the platform.

Hope this helps!
— Your creator friend`,
  },
  linkedin_to_blog: {
    content: `# Turning LinkedIn Insights into Long-Form Content

LinkedIn is great for quick insights, but sometimes an idea deserves more room to breathe.

## The Deeper Dive

That thought you shared in a 500-character LinkedIn post? It probably has 2000 more words waiting to be written.

## Why It Works

When you start with a tight, punchy insight on LinkedIn, you've already validated the core message. Expanding it into a blog post feels natural rather than forced.

## Practical Steps

1. Look at your most-engaged LinkedIn posts
2. Pick one that sparked conversation
3. Expand each bullet point into a section
4. Add examples and data
5. Structure it with headers and subheaders`,
  },
  linkedin_to_newsletter: {
    content: `# Hey subscriber,

You might have seen my LinkedIn post about content creation last week. Here's the extended version with all the context that couldn't fit in 500 characters.

**The backstory:** I've been testing different content workflows for months. What I found surprised me...

Most creators spend 80% of their time on the *writing* and only 20% on the *strategy*.

But the ones who are growing fast? They flip that ratio.

**Here's my take:** Don't optimize for writing speed. Optimize for distribution reach.

Same thought, shared across every platform your audience hangs out on.

More thoughts on this next week!

Best,
Your creator`,
  },
  newsletter_to_blog: {
    content: `# From Newsletter to Blog: Expanding Your Ideas

Your newsletter subscribers get the raw, personal version. But the same idea can become a comprehensive blog post.

## Why Expand?

Newsletters are intimate and conversational. Blogs are authoritative and searchable. They serve different purposes but come from the same source.

## The Expansion Process

1. **Identify the core insight** from your newsletter
2. **Add research and data** to support it
3. **Structure with headers** for scannability
4. **Add examples** that didn't fit in the newsletter format
5. **Optimize for SEO** with keywords and meta descriptions

## The Result

One newsletter idea becomes a blog post that drives organic traffic for months. That's the compounding effect of smart content strategy.`,
  },
  newsletter_to_linkedin: {
    content: `💡 **The one thing I wish I knew earlier about content creation**

I shared this in my newsletter this week, but it deserves a broader audience:

> "Don't optimize for writing speed. Optimize for distribution reach."

Here's what I mean:

📝 Writing one piece of content is fast
📬 Adapting it for 3 platforms takes strategy
🚀 Publishing it everywhere compounds your returns

The creators winning in 2026 aren't writing more.
They're distributing smarter.

What's your #1 content distribution tip? 👇`,
  },
}

export async function POST(req: NextRequest) {
  try {
    const { content, fromPlatform, toPlatform } = await req.json()

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    const key = `${fromPlatform}_to_${toPlatform}` as string
    const result = repurposedContents[key] || {
      content: `*Repurposed from ${fromPlatform} to ${toPlatform}*\n\nThis is a demo version showing how content gets adapted across platforms while maintaining the core message and adjusting tone for each audience.`
    }

    return NextResponse.json({
      content: result.content,
      from: fromPlatform,
      to: toPlatform,
      words: result.content.split(/\s+/).length,
      model: 'demo',
    })

  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Repurposing failed' }, { status: 500 })
  }
}
