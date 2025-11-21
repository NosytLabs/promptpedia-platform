import { getFeaturedPrompts } from '@/lib/db-queries'
import { apiResponse, handleApiError } from '@/lib/api-response'

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const prompts = await getFeaturedPrompts()
    
    return apiResponse.success({ 
      items: prompts,
      total: prompts.length 
    })
  } catch (error) {
    return handleApiError(error)
  }
}
