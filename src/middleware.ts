import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const currentUser = 'currentUser';

  if (currentUser && request.nextUrl.pathname.startsWith('/redirect-middleware')) {
    return Response.redirect(new URL('/blog/lorem-ipsum4/', request.url))
  }

}

export const config = {
  matcher: '/:path*',
}