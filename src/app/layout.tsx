import { Inter } from 'next/font/google'
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics'
import { Providers } from '@/components/providers'
import { Navbar } from '@/components/layout/Navbar'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Promptpedia - Expert Prompt Engineering Library & Community',
  description: 'Master one-shot, few-shot, chain-of-thought & more. 18+ expert prompt techniques with real examples from X/Twitter\'s top AI practitioners.',
  keywords: 'prompt engineering, one-shot learning, few-shot learning, chain-of-thought, AI prompts, ChatGPT, Claude, prompt library, community',
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
    title: 'Promptpedia - Expert Prompt Engineering Library & Community',
    description: 'Browse battle-tested prompts for Claude, GPT-4, Gemini, Veo 3 & more. Learn techniques like one-shot, few-shot, chain-of-thought, and prompt chaining.',
    siteName: 'Promptpedia',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Promptpedia - Expert Prompt Engineering Library & Community',
    description: '18+ expert prompt techniques with real examples from top AI practitioners on X. Master production-ready prompting now.',
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
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}