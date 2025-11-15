import { getFeaturedPrompts } from '@/lib/prompts-db'
import { apiResponse, handleApiError } from '@/lib/api-response'

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const prompts = getFeaturedPrompts(6)
    
    return apiResponse.success({ 
      items: prompts,
      total: prompts.length 
    })
  } catch (error) {
    return handleApiError(error)
  }
}
