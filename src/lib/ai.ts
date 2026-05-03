// Demo AI content generator — no OpenAI/Anthropic API keys needed
export type AIModel = 'gpt-mini' | 'gpt-best' | 'claude-mini' | 'claude-best'

const modelConfig = {
  'gpt-mini': { provider: 'openai', model: 'gpt-4o-mini', cost: 'cheap' } as const,
  'gpt-best': { provider: 'openai', model: 'gpt-4o', cost: 'expensive' } as const,
  'claude-mini': { provider: 'anthropic', model: 'claude-3-5-haiku-latest', cost: 'cheap' } as const,
  'claude-best': { provider: 'anthropic', model: 'claude-3-5-sonnet-latest', cost: 'expensive' } as const,
}

interface GenerateParams {
  prompt: string
  model?: AIModel
  temperature?: number
  maxTokens?: number
}

export async function generateContent(params: GenerateParams): Promise<string> {
  const { model = 'gpt-mini' } = params
  const config = modelConfig[model]

  // Demo mode: return demo content without real API calls
  await new Promise(resolve => setTimeout(resolve, 500))

  if (params.prompt.includes('blog')) {
    return JSON.stringify({
      title: 'The Future of Creation',
      content: 'This is a demo blog post generated without API keys. In production, this would use ' + config.model + '.',
      seoScore: 78,
    })
  }

  return JSON.stringify({
    content: 'Demo content generated with ' + config.model + '. Set OPENAI_API_KEY or ANTHROPIC_API_KEY for real AI generation.',
  })
}

export function estimateCost(model: AIModel, tokens: number): number {
  const prices: Record<string, { input: number; output: number }> = {
    'gpt-4o-mini': { input: 0.00015, output: 0.0006 },
    'gpt-4o': { input: 0.0025, output: 0.01 },
    'claude-3-5-haiku-latest': { input: 0.00025, output: 0.00125 },
    'claude-3-5-sonnet-latest': { input: 0.003, output: 0.015 },
  }
  const config = modelConfig[model]
  const price = prices[config.model]
  if (!price) return 0

  const inputTokens = Math.round(tokens * 0.7)
  const outputTokens = Math.round(tokens * 0.3)
  return (inputTokens / 1000) * price.input + (outputTokens / 1000) * price.output
}
