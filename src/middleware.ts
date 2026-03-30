import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function runs on every request
export function middleware(request: NextRequest) {
  // Add any custom logic here (e.g., logging)
  return NextResponse.next()
}

// THE MATCHER: This tells Next.js which pages to apply the middleware to
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (Auth0 login routes)
     * - api/mpesa/callback (Don't block Safaricom!)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api/auth|api/mpesa/callback|_next/static|_next/image|favicon.ico).*)',
  ],
}
