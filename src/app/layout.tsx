import './globals.css'
import { Inter } from 'next/font/google'
import SupabaseProvider from '@/components/providers/supabase-provider'
import { Toaster } from 'react-hot-toast'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/types/supabase'

const inter = Inter({ subsets: ['latin'] })

export const dynamic = 'force-dynamic'

async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerComponentClient<Database>({ cookies })

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()

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
  } catch (error) {
    console.error('Error in RootLayout:', error)
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
}

export default RootLayout
