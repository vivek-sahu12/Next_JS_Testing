import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const lowerPath = pathname.toLowerCase();

  // Normalize URL casing (e.g. /SignUp → /signup)
  if (pathname !== lowerPath && !pathname.startsWith('/_next') && !pathname.includes('.')) {
    const url = request.nextUrl.clone();
    url.pathname = lowerPath;
    return NextResponse.redirect(url, 308);
  }

  // Common path aliases
  if (lowerPath === '/signin') {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url, 308);
  }

  if (lowerPath === '/register') {
    const url = request.nextUrl.clone();
    url.pathname = '/signup';
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
