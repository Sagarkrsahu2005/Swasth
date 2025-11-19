import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Providers } from '@/app/provider'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Swasth Emergency - Real-Time Hospital Availability',
  description: 'Find nearby hospitals with real-time availability of beds, ICU, ventilators, oxygen, and ambulances',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased bg-background text-foreground`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
