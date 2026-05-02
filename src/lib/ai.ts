// AI API Client — OpenAI & Claude
import OpenAI from 'openai'
import Anthropic from '@anthropic-ai/sdk'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

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
  const { prompt, model = 'gpt-mini', temperature = 0.7, maxTokens = 4096 } = params
  const config = modelConfig[model]

  if (config.provider === 'openai') {
    const response = await openai.chat.completions.create({
      model: config.model,
      messages: [
        { role: 'system', content: 'You are a professional content writer. Always respond with valid JSON.' },
        { role: 'user', content: prompt },
      ],
      temperature,
      max_tokens: maxTokens,
      response_format: { type: 'json_object' },
    })
    return response.choices[0]?.message?.content || '{}'
  } else {
    const response = await anthropic.messages.create({
      model: config.model,
      max_tokens: maxTokens,
      temperature,
      system: 'You are a professional content writer. Always respond with valid JSON.',
      messages: [{ role: 'user', content: prompt }],
    })
    const block = response.content[0]
    return block.type === 'text' ? block.text : '{}'
  }
}

// Cost estimation per request (approximate)
export function estimateCost(model: AIModel, tokens: number): number {
  // Prices per 1K tokens in USD
  const prices: Record<string, { input: number; output: number }> = {
    'gpt-4o-mini': { input: 0.00015, output: 0.0006 },
    'gpt-4o': { input: 0.0025, output: 0.01 },
    'claude-3-5-haiku-latest': { input: 0.00025, output: 0.00125 },
    'claude-3-5-sonnet-latest': { input: 0.003, output: 0.015 },
  }
  const config = modelConfig[model]
  const price = prices[config.model]
  if (!price) return 0

  // Assume 70% input, 30% output for rough estimate
  const inputTokens = Math.round(tokens * 0.7)
  const outputTokens = Math.round(tokens * 0.3)
  return (inputTokens / 1000) * price.input + (outputTokens / 1000) * price.output
}
