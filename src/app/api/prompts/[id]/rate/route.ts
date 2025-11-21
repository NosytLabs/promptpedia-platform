import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { apiResponse, handleApiError } from "@/lib/api-response"

export const dynamic = "force-dynamic"

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { rating } = await request.json()

    if (!rating || rating < 1 || rating > 5) {
      return apiResponse.error("Rating must be between 1 and 5", 400)
    }

    const prompt = await prisma.prompt.findUnique({
      where: { id: params.id },
    })

    if (!prompt) {
      return apiResponse.notFound("Prompt not found")
    }

    const currentTotal = prompt.rating * prompt.ratingCount
    const newTotal = currentTotal + rating
    const newCount = prompt.ratingCount + 1
    const newRating = newTotal / newCount

    const updatedPrompt = await prisma.prompt.update({
      where: { id: params.id },
      data: {
        rating: newRating,
        ratingCount: newCount,
      },
      include: {
        user: {
          select: { name: true, image: true, email: true },
        },
      },
    })

    return apiResponse.success(updatedPrompt)
  } catch (error) {
    return handleApiError(error)
  }
}
