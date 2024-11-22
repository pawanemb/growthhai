import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const runtime = 'experimental-edge'

export async function middleware(req: NextRequest) {
  try {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req, res })

    const {
      data: { session },
    } = await supabase.auth.getSession()

    // If user is not signed in and the current path is not / or /auth redirect the user to /
    if (!session && !req.nextUrl.pathname.match(/^\/($|auth)/)) {
      return NextResponse.redirect(new URL('/', req.url))
    }

    // If user is signed in and the current path is / or /auth redirect the user to /dashboard
    if (session && (req.nextUrl.pathname === '/' || req.nextUrl.pathname === '/auth')) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    return res
  } catch (error) {
    console.error('Error in middleware:', error)
    return NextResponse.next()
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)', '/'],
}
