import './globals.css'
import { Inter } from 'next/font/google'
import SupabaseProvider from '@/components/providers/supabase-provider'
import { Toaster } from 'react-hot-toast'
import { headers, cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Growthh.ai - SEO Content Platform',
  description: 'AI-powered SEO content generation platform',
}

export const dynamic = 'force-dynamic'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerComponentClient({ cookies })

  try {
    await supabase.auth.getSession()
  } catch (error) {
    console.error('Error in root layout:', error)
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <SupabaseProvider>
          {children}
          <Toaster />
        </SupabaseProvider>
      </body>
    </html>
  )
}
