import './css/style.css'

import { Inter } from 'next/font/google'


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

export const metadata = {
  title: 'Genghis Kahn AI',
  description: 'A community-driven AI bridging crypto and development',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-inter antialiased bg-black text-slate-100   tracking-tight">
        <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
          {children}
        </div>
      </body>
    </html>
  )
}
