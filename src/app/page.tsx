import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-white to-gray-100">
      <main className="flex w-full flex-1 flex-col items-center justify-center px-4 text-center sm:px-20">
        <h1 className="text-5xl font-bold text-gray-900 sm:text-6xl">
          Welcome to{' '}
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Growthh.ai
          </span>
        </h1>
        <p className="mt-4 max-w-xl text-xl text-gray-600">
          Your all-in-one platform for SEO content creation and management
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/auth/login"
            className="rounded-lg bg-blue-600 px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Get Started
          </Link>
          <Link
            href="/auth/register"
            className="rounded-lg border border-gray-300 bg-white px-8 py-3 text-lg font-semibold text-gray-900 transition-colors hover:bg-gray-50"
          >
            Sign Up
          </Link>
        </div>
      </main>
      <footer className="w-full border-t border-gray-200 py-8 text-center">
        <p className="text-gray-600">
          © {new Date().getFullYear()} Growthh.ai. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
