import { withMiddlewareAuthRequired, getSession } from '@auth0/nextjs-auth0/edge';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default withMiddlewareAuthRequired(async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const session = await getSession(req, res);
  const user = session?.user;

  // 1. Get the role from the Auth0 User object
  // Note: 'https://hatua.app/role' is a custom claim you set in Auth0 Actions
  const userRole = user?.['https://hatua.app/role'] || 'Cheetah'; // Default role

  const url = req.nextUrl.pathname;

  // 2. Protect the "Simba Lounge" (Elite 50km+ runners)
  if (url.startsWith('/dashboard/simba-lounge') && userRole !== 'Simba') {
    return NextResponse.redirect(new URL('/dashboard/upgrade', req.url));
  }

  // 3. Protect the "Chui Track" (Intermediate 20km+ runners)
  if (url.startsWith('/dashboard/chui-track') && userRole === 'Cheetah') {
    return NextResponse.redirect(new URL('/dashboard/training', req.url));
  }

  return res;
});

export const config = {
  matcher: ['/dashboard/:path*'], // Only run this logic on dashboard pages
};

