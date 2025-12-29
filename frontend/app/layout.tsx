import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster"
import { cn } from '@/lib/utils'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Elev8AI - Empower Your Future',
  description: 'Discover, Plan, and Thrive with AI-Driven Career Guidance',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={cn(inter.className, "min-h-screen antialiased")}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}