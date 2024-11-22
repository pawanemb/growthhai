import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const runtime = 'experimental-edge'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Redirect to home if not authenticated and trying to access protected routes
  if (!session && !req.nextUrl.pathname.match(/^\/($|auth)/)) {
    return NextResponse.redirect(new URL('/auth', req.url))
  }

  // Redirect to dashboard if authenticated and trying to access auth pages
  if (session && (req.nextUrl.pathname === '/' || req.nextUrl.pathname === '/auth')) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  // Allow access to account settings only for authenticated users
  if (!session && req.nextUrl.pathname.startsWith('/account-settings')) {
    return NextResponse.redirect(new URL('/auth', req.url))
  }

  return res
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
}
