import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

export default async function Home() {
  try {
    const supabase = createServerComponentClient({ cookies })
    const { data: { session } } = await supabase.auth.getSession()

    if (session) {
      redirect('/dashboard')
    }
  } catch (error) {
    console.error('Error checking session:', error)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white text-gray-900">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-extrabold tracking-tight sm:text-[5rem]"
        >
          Growthh<span className="text-indigo-600">.ai</span>
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8"
        >
          <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900">AI-Powered SEO</h3>
            <div className="text-lg text-gray-600">
              Optimize your content with advanced AI algorithms
            </div>
          </div>
          <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900">Content Generation</h3>
            <div className="text-lg text-gray-600">
              Create engaging content that ranks
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col items-center gap-4"
        >
          <p className="text-center text-2xl text-gray-900">
            Get started today
          </p>
          <Link
            href="/auth"
            className="rounded-md bg-indigo-600 px-8 py-3 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Get Started
          </Link>
        </motion.div>
      </div>
    </main>
  )
}
