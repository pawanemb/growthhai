import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (session) {
    redirect('/dashboard')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Growthh<span className="text-[hsl(280,100%,70%)]">.ai</span>
        </h1>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <div className="flex flex-col gap-4 rounded-xl bg-white/10 p-4">
            <h3 className="text-2xl font-bold">AI-Powered SEO</h3>
            <div className="text-lg">
              Optimize your content with advanced AI algorithms
            </div>
          </div>
          <div className="flex flex-col gap-4 rounded-xl bg-white/10 p-4">
            <h3 className="text-2xl font-bold">Content Generation</h3>
            <div className="text-lg">
              Create engaging content that ranks
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <p className="text-center text-2xl text-white">
            Get started today
          </p>
          <div className="flex gap-4">
            <Link
              href="/auth/signup"
              className="rounded-md bg-blue-600 px-8 py-3 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Sign up
            </Link>
            <Link
              href="/auth/login"
              className="rounded-md bg-white/10 px-8 py-3 text-sm font-medium text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
