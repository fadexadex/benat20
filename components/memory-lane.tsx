"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "./ui/button"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"

export interface Memory {
  id: string
  name: string
  quote: string
  media_url: string
  media_type: string
  created_at: string
}

interface MemoryLaneProps {
  initialMemories: Memory[]
}

export function MemoryLane({ initialMemories }: MemoryLaneProps) {
  const [memories] = useState<Memory[]>(initialMemories)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused || memories.length === 0) return

    const interval = setInterval(() => {
      setIsAnimating(true)
      setCurrentIndex((prev) => (prev + 1) % memories.length)
      setTimeout(() => setIsAnimating(false), 500)
    }, 5000)

    return () => clearInterval(interval)
  }, [isPaused, memories.length])

  const nextMemory = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev + 1) % memories.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const prevMemory = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev - 1 + memories.length) % memories.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  if (memories.length === 0) {
    return (
      <section className="relative min-h-screen px-4 py-20 bg-background">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-5xl font-bold tracking-tight text-primary sm:text-6xl text-balance">
              Memory Lane
            </h2>
            <p className="text-lg text-muted-foreground text-pretty">No memories yet</p>
          </div>
        </div>
      </section>
    )
  }

  const currentMemory = memories[currentIndex]

  return (
    <section className="relative min-h-screen px-4 py-20 bg-background">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-5xl font-bold tracking-tight text-primary sm:text-6xl text-balance">Memory Lane</h2>
          <p className="text-lg text-muted-foreground text-pretty">Moments that made us smile</p>
        </div>

        <div className="relative">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center max-w-6xl mx-auto">
            {/* Media Container - Left Side */}
            <div
              className={`relative aspect-square rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 ease-out ${
                isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
              }`}
            >
              {currentMemory.media_type === "video" ? (
                <video
                  src={currentMemory.media_url}
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  muted
                  loop
                />
              ) : (
                <Image
                  src={currentMemory.media_url || "/placeholder.svg"}
                  alt={`Memory with ${currentMemory.name}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              )}
            </div>

            {/* Text Container - Right Side */}
            <div
              className={`flex flex-col justify-center space-y-6 transition-all duration-500 ease-out ${
                isAnimating ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"
              }`}
            >
              <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-serif italic text-foreground leading-relaxed text-balance">
                "{currentMemory.quote}"
              </blockquote>

              <p className="text-xl text-muted-foreground">— {currentMemory.name}</p>
            </div>
          </div>

          <div className="mt-12 flex items-center justify-center gap-6">
            <Button
              variant="outline"
              size="icon"
              onClick={prevMemory}
              disabled={isAnimating}
              className="h-12 w-12 rounded-full bg-transparent"
              aria-label="Previous memory"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            {/* Dots indicator */}
            <div className="flex gap-2">
              {memories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isAnimating) {
                      setIsAnimating(true)
                      setCurrentIndex(index)
                      setTimeout(() => setIsAnimating(false), 500)
                    }
                  }}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "w-8 bg-primary"
                      : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to memory ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextMemory}
              disabled={isAnimating}
              className="h-12 w-12 rounded-full bg-transparent"
              aria-label="Next memory"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsPaused(!isPaused)}
              className="h-12 w-12 rounded-full"
              aria-label={isPaused ? "Resume auto-play" : "Pause auto-play"}
            >
              {isPaused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
