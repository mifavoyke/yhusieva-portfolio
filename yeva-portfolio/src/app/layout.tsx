// src/app/layout.tsx

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Yeva | Portfolio',
  description: 'Portfolio of Yeva - Software Engineer with a cyberpunk aesthetic',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`bg-zinc-950 text-neutral-200 ${inter.className}`}>
        <Navbar />
        <main className="mx-auto">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
