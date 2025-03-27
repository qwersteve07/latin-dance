import { NextResponse } from 'next/server';
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // check the match routes
  if (authenticationRoutes.some(route => pathname.includes(route))) {
    const authToken = request.cookies.get('social-dance-token')
    if (!authToken) {
      return NextResponse.redirect(new URL('/', request.url)); // Redirect to root
    } else {
      return NextResponse.next(); // Allow request to proceed
    }
  }

  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.includes('/api/') ||
    PUBLIC_FILE.test(request.nextUrl.pathname)
  ) {
    return NextResponse.next();
  }

  const locale = request.cookies.get('NEXT_LOCALE')?.value || 'tw'

  if (request.nextUrl.locale !== locale) {
    return NextResponse.redirect(
      new URL(`/${locale}${request.nextUrl.pathname}${request.nextUrl.search}`, request.url)
    )
  }
}

// Apply middleware only to protected routes
const authenticationRoutes = ['/events-list', '/events-list/new', '/events-list/:slug'];

export const config = {
  matcher: [...authenticationRoutes, '/:path*'], // Protect these routes
};
