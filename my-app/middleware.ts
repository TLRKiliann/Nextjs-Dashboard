import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {

  if (!req || !req.nextUrl) {
    console.error('Invalid request object:', req);
    return NextResponse.error();
  };

  const protectedPaths = ["/profile", "/products", "/cart", "/address", "/order", "/contact", "/payment"];
  
  const isAuthenticated = req.cookies.get('authjs.session-token');

  // Debugging
  //console.log('Session Cookie:', isAuthenticated);
  //console.log('Requested Path:', req.nextUrl.pathname);

  if (!isAuthenticated && protectedPaths.some(path => req.nextUrl.pathname.startsWith(path))) {
    const newUrl = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(newUrl);
  };

  if (isAuthenticated && req.nextUrl.pathname === "/login") {
    const newUrl = new URL("/profile", req.nextUrl.origin);
    return NextResponse.redirect(newUrl);
  };

  return NextResponse.next();
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
