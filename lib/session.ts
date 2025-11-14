import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

/**
 * Get the current session on the server side
 * Use this in Server Components and API Routes
 */
export async function getSession() {
  return await getServerSession(authOptions)
}

/**
 * Get the current user or redirect to signin
 * Use this in Server Components that require authentication
 */
export async function getCurrentUser() {
  const session = await getSession()

  if (!session?.user) {
    redirect("/auth/signin")
  }

  return session.user
}

/**
 * Get the current user ID or return null
 * Use this in API routes
 */
export async function getCurrentUserId(): Promise<string | null> {
  const session = await getSession()
  return session?.user?.id || null
}

/**
 * Require authentication in API routes
 * Throws an error if not authenticated
 */
export async function requireAuth() {
  const session = await getSession()

  if (!session?.user) {
    throw new Error("Unauthorized")
  }

  return session.user
}
