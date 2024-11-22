import AuthButtons from '@/components/auth/AuthButtons'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

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

        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-center gap-4">
            <p className="text-center text-2xl text-white">
              Get started by signing in
            </p>
            <AuthButtons />
          </div>
        </div>
      </div>
    </main>
  )
}
