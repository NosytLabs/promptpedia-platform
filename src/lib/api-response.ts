import { NextResponse } from "next/server"

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
  status: number
}

export class ApiError extends Error {
  constructor(
    public message: string,
    public status: number = 500,
    public code?: string
  ) {
    super(message)
    this.name = "ApiError"
  }
}

export const apiResponse = {
  success: <T>(data: T, status = 200) => 
    NextResponse.json({ success: true, data }, { status }),

  created: <T>(data: T) => 
    NextResponse.json({ success: true, data }, { status: 201 }),

  error: (message: string, status = 500, code?: string) =>
    NextResponse.json(
      { success: false, error: message, code },
      { status }
    ),

  badRequest: (message: string, code?: string) =>
    NextResponse.json(
      { success: false, error: message, code },
      { status: 400 }
    ),

  unauthorized: (message = "Unauthorized") =>
    NextResponse.json(
      { success: false, error: message, code: "UNAUTHORIZED" },
      { status: 401 }
    ),

  forbidden: (message = "Forbidden") =>
    NextResponse.json(
      { success: false, error: message, code: "FORBIDDEN" },
      { status: 403 }
    ),

  notFound: (message = "Not found") =>
    NextResponse.json(
      { success: false, error: message, code: "NOT_FOUND" },
      { status: 404 }
    ),

  conflict: (message = "Conflict") =>
    NextResponse.json(
      { success: false, error: message, code: "CONFLICT" },
      { status: 409 }
    ),

  unprocessable: (message: string) =>
    NextResponse.json(
      { success: false, error: message, code: "UNPROCESSABLE_ENTITY" },
      { status: 422 }
    ),

  serverError: (message = "Internal server error") =>
    NextResponse.json(
      { success: false, error: message, code: "INTERNAL_SERVER_ERROR" },
      { status: 500 }
    ),
}

export const handleApiError = (error: unknown) => {
  if (error instanceof ApiError) {
    return apiResponse.error(error.message, error.status, error.code)
  }

  if (error instanceof SyntaxError) {
    return apiResponse.badRequest("Invalid JSON in request body")
  }

  if (error instanceof Error) {
    return apiResponse.serverError(error.message)
  }

  return apiResponse.serverError("An unexpected error occurred")
}
