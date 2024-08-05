import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {

  const protectedPaths = ["/profile", "/products", "/order", "/contact"];

    const isAuthenticated = req.cookies.get('authjs.session-token');
    //console.log('Session Cookie:', isAuthenticated); // Debugging

    if (!isAuthenticated && protectedPaths.some(path => req.nextUrl.pathname.startsWith(path))) {
      const newUrl = new URL("/login", req.nextUrl.origin);
      return NextResponse.redirect(newUrl);
    };

  return NextResponse.next();
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
