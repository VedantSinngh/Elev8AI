
import { Brain, Users, Accessibility } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative mt-16 flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden py-24">
      <div className="hero-gradient absolute inset-0" />
      <div className="container relative z-10 mx-auto px-4 text-center">
        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
          Empowering Education Through{" "}
          <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
            Technology
          </span>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
          Making learning accessible for everyone through innovative technology and personalized experiences.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" variant="default" className="gap-2">
            <Accessibility className="h-4 w-4" />
            Blind Users
          </Button>
          <Button size="lg" variant="default" className="gap-2">
            <Users className="h-4 w-4" />
            Deaf Users
          </Button>
          <Button size="lg" variant="default" className="gap-2">
            <Brain className="h-4 w-4" />
            All Users
          </Button>
          <Button size="lg" variant="secondary">Start Your Career</Button>
        </div>
      </div>
    </section>
  )
}