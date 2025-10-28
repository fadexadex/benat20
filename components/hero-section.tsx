"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    setShowConfetti(true)
    // Remove confetti after animation
    const timer = setTimeout(() => setShowConfetti(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-secondary/20 to-accent/30" />

      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-[fall_3s_ease-in_forwards]"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}%`,
                animationDelay: `${Math.random() * 2}s`,
                opacity: 0,
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: ["#f59e0b", "#ec4899", "#8b5cf6", "#3b82f6"][Math.floor(Math.random() * 4)],
                }}
              />
            </div>
          ))}
        </div>
      )}

      <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div
          className={`relative transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
        >
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/images/design-mode/daa5ffce-ad2d-4750-9b87-8416c9b612a8.JPG.jpeg"
              alt="Benjamin"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
          </div>
        </div>

        <div
          className={`text-center md:text-left transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
        >
          <h1 className="mb-4 text-6xl font-bold tracking-tight sm:text-7xl md:text-8xl text-balance">
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Happy 20th,
            </span>
          </h1>
          <h2 className="mb-6 text-5xl font-bold tracking-tight text-primary sm:text-6xl md:text-7xl text-balance">
            Benjamin!
          </h2>
          <p className="mx-auto md:mx-0 max-w-2xl text-xl text-muted-foreground sm:text-2xl text-pretty leading-relaxed">
            Two decades of laughter, friendship, and unforgettable moments. Here's to the memories we've made and the
            adventures yet to come.
          </p>

          <div className="mt-12 animate-bounce">
            <svg
              className="mx-auto md:mx-0 h-6 w-6 text-muted-foreground"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
