import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // Custom middleware logic can go here
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // Check if user is authenticated
        const isAuthenticated = !!token

        // Define protected paths
        const isProtectedPath =
          req.nextUrl.pathname.startsWith('/dashboard') ||
          req.nextUrl.pathname.startsWith('/builder') ||
          req.nextUrl.pathname.startsWith('/api/courses/generate') ||
          req.nextUrl.pathname.startsWith('/api/lessons') ||
          req.nextUrl.pathname.startsWith('/api/enrollments')

        // Allow access to protected paths only if authenticated
        if (isProtectedPath) {
          return isAuthenticated
        }

        // Allow access to public paths
        return true
      },
    },
    pages: {
      signIn: '/auth/signin',
    },
  }
)

// Configure which routes use this middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (NextAuth endpoints)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$).*)',
  ],
}
