import { Inter } from 'next/font/google'
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics'
import { Providers } from '@/components/providers'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Promptpedia - Modern Prompt Engineering Platform',
  description: 'A modern platform for prompt engineering, collaboration, and optimization.',
  keywords: 'prompt engineering, AI, machine learning, collaboration, optimization',
  authors: [{ name: 'NosytLabs' }],
  creator: 'NosytLabs',
  publisher: 'NosytLabs',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://promptpedia.com',
    title: 'Promptpedia - Modern Prompt Engineering Platform',
    description: 'A modern platform for prompt engineering, collaboration, and optimization.',
    siteName: 'Promptpedia',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Promptpedia - Modern Prompt Engineering Platform',
    description: 'A modern platform for prompt engineering, collaboration, and optimization.',
    creator: '@promptpedia',
    site: '@promptpedia',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <GoogleAnalytics />
      </head>
      <body className={cn('min-h-screen bg-background antialiased', inter.className)}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}