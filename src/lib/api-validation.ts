import { z } from "zod"
import { ApiError } from "./api-response"

export const parseJson = async <T = any>(
  request: Request,
  schema: z.ZodSchema<T>
): Promise<T> => {
  try {
    const data = await request.json()
    return schema.parse(data) as T
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new ApiError("Invalid JSON in request body", 400, "INVALID_JSON")
    }

    if (error instanceof z.ZodError) {
      const fieldErrors = error.errors.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      }))
      throw new ApiError("Validation failed", 422, "VALIDATION_ERROR")
    }

    throw error
  }
}

export const validateQueryParams = <T>(
  params: Record<string, any>,
  schema: z.ZodSchema
): T => {
  try {
    return schema.parse(params) as T
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ApiError("Invalid query parameters", 400, "INVALID_PARAMS")
    }
    throw error
  }
}

export const schemas = {
  profile: {
    update: z.object({
      name: z.string().min(1).max(255).optional(),
      bio: z.string().max(1000).optional(),
    }),
  },
  prompt: {
    create: z.object({
      title: z.string().min(1).max(500),
      description: z.string().max(2000).optional(),
      promptText: z.string().min(1),
      category: z.string().max(100).optional(),
      techniques: z.array(z.string()).optional(),
      aiSystems: z.array(z.string()).optional(),
      tags: z.array(z.string()).optional(),
      examples: z.string().optional(),
    }),
    update: z.object({
      title: z.string().min(1).max(500).optional(),
      description: z.string().max(2000).optional(),
      promptText: z.string().min(1).optional(),
      category: z.string().max(100).optional(),
      techniques: z.array(z.string()).optional(),
      aiSystems: z.array(z.string()).optional(),
      tags: z.array(z.string()).optional(),
      examples: z.string().optional(),
      isPublic: z.boolean().optional(),
      status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(),
    }),
  },
  forum: {
    createPost: z.object({
      title: z.string().min(1).max(500),
      content: z.string().min(1),
      category: z.string().max(100).optional(),
    }),
    createReply: z.object({
      content: z.string().min(1),
    }),
  },
  pagination: z.object({
    skip: z.coerce.number().int().min(0).optional(),
    take: z.coerce.number().int().min(1).max(100).optional(),
  }),
  search: z.object({
    query: z.string().max(500).optional(),
    category: z.string().max(100).optional(),
    skip: z.coerce.number().int().min(0).optional(),
    take: z.coerce.number().int().min(1).max(100).optional(),
  }),
}
