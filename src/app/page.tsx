'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Home() {
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
          className="flex flex-col items-center gap-6"
        >
          <p className="text-center text-2xl text-gray-900">
            Transform your content strategy today
          </p>
          <div className="flex gap-4">
            <Link
              href="/auth?mode=signup"
              className="rounded-md bg-indigo-600 px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Sign up
            </Link>
            <Link
              href="/auth?mode=login"
              className="rounded-md bg-white px-8 py-3 text-base font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Log in
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Start creating better content in minutes
          </p>
        </motion.div>
      </div>
    </main>
  )
}
