import { NextRequest } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "./auth"
import { apiResponse, ApiError } from "./api-response"

export interface AuthSession {
  user: {
    id: string
    email?: string
    name?: string
    role?: string
  }
}

export const requireAuth = async (
  request?: NextRequest
): Promise<AuthSession> => {
  const session = await getServerSession(authOptions)

  if (!session || !session.user?.id) {
    throw new ApiError("Unauthorized", 401, "UNAUTHORIZED")
  }

  return session as AuthSession
}

export const requireAdminAuth = async (): Promise<AuthSession> => {
  const session = await getServerSession(authOptions)

  if (!session || !session.user?.id) {
    throw new ApiError("Unauthorized", 401, "UNAUTHORIZED")
  }

  if (session.user.role !== "admin") {
    throw new ApiError("Admin access required", 403, "FORBIDDEN")
  }

  return session as AuthSession
}

export const requireModeratorAuth = async (): Promise<AuthSession> => {
  const session = await getServerSession(authOptions)

  if (!session || !session.user?.id) {
    throw new ApiError("Unauthorized", 401, "UNAUTHORIZED")
  }

  const roles = ["admin", "moderator"]
  if (!session.user.role || !roles.includes(session.user.role)) {
    throw new ApiError("Moderator access required", 403, "FORBIDDEN")
  }

  return session as AuthSession
}
