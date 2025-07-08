import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Header } from './header'
import { Footer } from './footer'
import { ThemeProvider } from 'next-themes'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
}

// export const metadata: Metadata = {
//   metadataBase: new URL('https://nim-fawn.vercel.app/'),
//   alternates: {
//     canonical: '/'
//   },
//   title: {
//     default: 'RAUNAK GHAWGHAWE  Data Scientist',
//     template: '%s | Nim'
//   },
//   description:  'Nim is a free and open-source personal website template built with Next.js 15, React 19 and Motion-Primitives.',
// };
// app/layout.tsx   (keep the rest of the file exactly as it is)

export const metadata = {
  /* ---------- BASIC ---------- */
  metadataBase: new URL('https://personal-portfolio-site-kxxo.vercel.app/'),   // change later to your own domain
  alternates: { canonical: '/' },

  /* ---------- TITLE & DESCRIPTION ---------- */
  title: {
    default: 'Raunak Ghawghawe – Data Scientist & Analytics Engineer',
    template: '%s | Raunak Ghawghawe',
  },
  description:
    'Maryland‑based data scientist specialising in nonprofit and animal‑welfare analytics. Python · SQL · AWS · Tableau.',

  /* ---------- SEO KEYWORDS ---------- */
  keywords: [
    'data scientist',
    'analytics engineer',
    'nonprofit analytics',
    'animal welfare',
    'python',
    'sql',
    'tableau',
    'aws',
    'machine learning',
    'donor analytics',
    'data pipelines',
    'maryland',
    'washington dc',
  ],

  /* ---------- AUTHOR ---------- */
  authors: [{ name: 'Raunak Ghawghawe', url: 'https://personal-portfolio-site-kxxo.vercel.app/' }],

  /* ---------- OPEN GRAPH (for link previews) ---------- */
  openGraph: {
    title: 'Raunak Ghawghawe – Data Scientist',
    description:
      'Maryland‑based data scientist turning animal‑welfare data into action. Explore projects, blog posts and contact details.',
    url: 'https://personal-portfolio-site-kxxo.vercel.app/',
    siteName: 'Raunak Ghawghawe',
    images: [
      {
        url: '/og.jpeg',   // serves https://…/og-cover.png
        width: 800,
        height: 800,
        alt: 'Raunak Ghawghawe profile image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
} satisfies import('next').Metadata



const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} bg-white tracking-tight antialiased dark:bg-zinc-950`}
      >
        <ThemeProvider
          enableSystem={true}
          attribute="class"
          storageKey="theme"
          defaultTheme="system"
        >
          <div className="flex min-h-screen w-full flex-col font-[family-name:var(--font-inter-tight)]">
            <div className="relative mx-auto w-full max-w-screen-sm flex-1 px-4 pt-20">
              <Header />
              {children}
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
