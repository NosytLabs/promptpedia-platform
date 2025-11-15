import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  return NextResponse.json(
    { message: "OAuth-based authentication is currently used. Email/password registration is not yet implemented." },
    { status: 501 }
  )
}
