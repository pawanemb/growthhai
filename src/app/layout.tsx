import './globals.css'
import { Inter } from 'next/font/google'
import SupabaseProvider from '@/components/providers/supabase-provider'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Growthh.ai - SEO Content Platform',
  description: 'AI-powered SEO content generation platform',
}

export const dynamic = 'force-dynamic'
export const runtime = 'experimental-edge'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
