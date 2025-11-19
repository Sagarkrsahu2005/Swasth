import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken')?.value
  const pathname = request.nextUrl.pathname

  // Protected routes
  const protectedRoutes = ['/admin', '/admin/gov']
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
