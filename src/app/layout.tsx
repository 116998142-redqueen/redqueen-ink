// Layout — dark theme, minimal, clean
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Redqueen — Write once, publish everywhere',
  description: 'Transform one idea into blog posts, LinkedIn content, and newsletters — all with AI.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-zinc-950 text-zinc-100 antialiased`}>
        {/* Nav */}
        <nav className="fixed top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <a href="/" className="text-lg font-bold text-white">
              Redqueen<span className="text-purple-400">.</span>ink
            </a>
            <div className="flex items-center gap-6">
              <a href="/pricing" className="text-sm text-zinc-400 hover:text-white transition-colors">Pricing</a>
              <a href="/create" className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-500 transition-colors">
                Start Writing
              </a>
            </div>
          </div>
        </nav>
        <main className="pt-16">{children}</main>
      </body>
    </html>
  )
}
