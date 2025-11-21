import { Inter } from 'next/font/google'
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics'
import { Providers } from '@/components/providers'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN || 'https://promptpedia.replit.dev'),
  title: 'Promptpedia - Prompt Engineering Library with 50+ Expert Prompts',
  description: 'Discover 50+ production-ready AI prompts for ChatGPT, Claude, GPT-4 & Midjourney. Learn chain-of-thought, few-shot, and one-shot techniques. Make money with prompt engineering.',
  keywords: 'prompt engineering, ChatGPT prompts, Claude prompts, GPT-4, Midjourney prompts, AI prompts, prompt library, make money AI, freelancing, business automation',
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
    url: process.env.NEXT_PUBLIC_DOMAIN || 'https://promptpedia.replit.dev',
    title: 'Promptpedia - 50+ Expert Prompts for Making Money with AI',
    description: 'Browse 50+ production-ready prompts covering business, coding, design, content creation & more. Learn from expert engineers. Start your AI journey free.',
    siteName: 'Promptpedia',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Promptpedia - Prompt Engineering Library',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Promptpedia - Make Money with AI Prompts',
    description: '50+ production-ready prompts. Learn from top AI engineers. Free library + $9/month Pro with advanced features.',
    creator: '@promptpedia',
    site: '@promptpedia',
    images: '/og-image.png',
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_DOMAIN || 'https://promptpedia.replit.dev',
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
          <Footer />
        </Providers>
      </body>
    </html>
  )
}