// AI Prompts for Redqueen.ink
// Three platform-specific content generation templates

export type Platform = 'blog' | 'linkedin' | 'newsletter'
export type Tone = 'professional' | 'storytelling' | 'technical' | 'casual'

interface GenerateOptions {
  idea: string
  platform: Platform
  tone: Tone
  keywords?: string[]
  length?: 'short' | 'medium' | 'long'
  audience?: string
}

// === BLOG PROMPT ===
export function buildBlogPrompt(options: GenerateOptions): string {
  return `You are a professional blog writer. Write a SEO-optimized blog post based on the following idea.

IDEA: "${options.idea}"
TONE: ${options.tone}
KEYWORDS: ${(options.keywords || []).join(', ')}
LENGTH: ${options.length || 'medium'} (medium = 1000-1500 words)
AUDIENCE: ${options.audience || 'general professionals'}

REQUIREMENTS:
1. Start with a hook that grabs attention
2. Include an H2 outline with 3-5 sections
3. Use short paragraphs (2-4 sentences max)
4. Include a key takeaway at the end
5. Add a "What do you think?" CTA
6. Optimize for the keyword naturally
7. Use data or examples where possible

Return the post in this JSON format:
{
  "title": "SEO-optimized title (max 60 chars)",
  "subtitle": "Compelling subtitle (max 120 chars)",
  "content": "Full post in markdown",
  "seo": {
    "metaDescription": "Max 160 chars",
    "keywords": ["keyword1", "keyword2"],
    "readingTime": "X min read"
  }
}`
}

// === LINKEDIN PROMPT ===
export function buildLinkedInPrompt(options: GenerateOptions): string {
  return `You are a LinkedIn content strategist. Write a professional, thought-leadership post based on the following idea.

IDEA: "${options.idea}"
TONE: ${options.tone}
AUDIENCE: ${options.audience || 'LinkedIn professionals'}

REQUIREMENTS:
1. Hook in the first line — stop the scroll
2. Personal story or insight to start
3. 3-5 bullet points or numbered insights
4. One key lesson or actionable takeaway
5. End with a question to drive engagement
6. 2-3 relevant hashtags
7. Keep it 300-600 words — LinkedIn sweet spot
8. Format with line breaks for readability

Return in this JSON format:
{
  "title": "Post headline (optional, appears above post)",
  "content": "Full post with proper line breaks",
  "hashtags": ["#Tag1", "#Tag2", "#Tag3"],
  "engagingQuestion": "Question to ask at the end"
}`
}

// === NEWSLETTER PROMPT ===
export function buildNewsletterPrompt(options: GenerateOptions): string {
  return `You are a newsletter writer. Write a conversational, value-packed newsletter edition based on the following idea.

IDEA: "${options.idea}"
TONE: ${options.tone} — keep it conversational and personal
AUDIENCE: ${options.audience || 'subscribers who opted in for your insights'}

REQUIREMENTS:
1. Open with a personal note or observation
2. 2-3 core insights, each with a clear takeaway
3. Include one actionable tip the reader can apply today
4. Curated style: insight → example → action
5. End with a warm sign-off
6. 600-1000 words
7. Include a P.S. with a recommendation or resource link

Return in this JSON format:
{
  "subject": "Email subject line (max 60 chars, compelling)",
  "previewText": "Preview text for inbox (max 100 chars)",
  "greeting": "Dear reader opening",
  "content": "Full newsletter body in markdown",
  "ps": "P.S. recommendation or resource",
  "signOff": "Your [name]"
}`
}

// === REPURPOSE PROMPT: Blog → LinkedIn ===
export function buildRepurposeLinkedInPrompt(blogContent: string): string {
  return `You are repurposing a blog post into a LinkedIn post.

BLOG CONTENT:
${blogContent.substring(0, 4000)}

Transform this into a LinkedIn thought-leadership post. Extract the single most compelling insight or story. Write in first person. Keep it 300-500 words. End with a question.

Return JSON format:
{
  "content": "LinkedIn post with line breaks",
  "hook": "The first line (hook)",
  "hashtags": ["#Tag1", "#Tag2"],
  "engagingQuestion": "Ending question"
}`
}

// === REPURPOSE PROMPT: Blog → Newsletter ===
export function buildRepurposeNewsletterPrompt(blogContent: string): string {
  return `You are repurposing a blog post into a newsletter edition.

BLOG CONTENT:
${blogContent.substring(0, 4000)}

Transform this into a conversational newsletter. Start with a personal reflection on the topic. Break down the key insights into 2-3 digestible sections. End with a tip and a warm sign-off. 500-800 words.

Return JSON format:
{
  "subject": "Email subject line",
  "content": "Newsletter body in markdown",
  "tip": "One actionable tip for readers"
}`
}

// === PLATFORM CONFIG ===
export const platformConfig: Record<Platform, {
  name: string
  label: string
  emoji: string
  description: string
  avgLength: string
  frequencyTip: string
}> = {
  blog: {
    name: 'blog',
    label: 'Blog',
    emoji: '📝',
    description: 'Deep, SEO-optimized articles for your website',
    avgLength: '1,000-1,500 words',
    frequencyTip: 'Post 1-2 times per week for SEO growth'
  },
  linkedin: {
    name: 'linkedin',
    label: 'LinkedIn',
    emoji: '💼',
    description: 'Thought-leadership posts to grow your network',
    avgLength: '300-600 words',
    frequencyTip: 'Post 3-5 times per week for maximum reach'
  },
  newsletter: {
    name: 'newsletter',
    label: 'Newsletter',
    emoji: '📬',
    description: 'Conversational emails your subscribers love',
    avgLength: '600-1,000 words',
    frequencyTip: 'Send 1-2 times per week to build habit'
  }
}
