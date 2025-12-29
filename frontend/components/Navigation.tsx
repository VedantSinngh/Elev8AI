"use client"

import { Brain } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navigation() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Brain className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">Elev8AI</span>
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <Link href="#features">
            <Button variant="ghost">Features</Button>
          </Link>
          <Link href="#team">
            <Button variant="ghost">Team</Button>
          </Link>
          <Link href="#team">
            <Button variant="ghost">Therapy</Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}