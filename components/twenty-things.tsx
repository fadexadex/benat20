"use client"

import { useEffect, useRef, useState } from "react"

const things = [
  "Your infectious laugh that lights up every room",
  "The way you always know how to make people smile",
  "Your incredible sense of style",
  "How you're always up for an adventure",
  "Your loyalty to friends and family",
  "The way you turn ordinary moments into memories",
  "Your passion for everything you do",
  "How you never give up on your dreams",
  "Your amazing cooking skills",
  "The energy you bring to every gathering",
  "Your kindness to everyone you meet",
  "How you make even the boring stuff fun",
  "Your creative problem-solving",
  "The way you celebrate others' successes",
  "Your genuine interest in people's stories",
  "How you stay true to yourself",
  "Your ability to find humor in any situation",
  "The way you inspire those around you",
  "Your thoughtfulness in the little things",
  "How you make 20 look absolutely amazing",
]

export function TwentyThings() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reveal cards one by one
            things.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...prev, index])
              }, index * 100)
            })
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen px-4 py-20 bg-muted/30">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-5xl font-bold tracking-tight text-primary sm:text-6xl text-balance">
            20 Things We Love About You
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">One for each amazing year</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {things.map((thing, index) => (
            <div
              key={index}
              className={`group relative p-6 rounded-xl bg-card border border-border hover:border-accent transition-all duration-500 ${
                visibleCards.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center text-primary-foreground font-bold text-sm shadow-lg group-hover:scale-110 transition-transform">
                {index + 1}
              </div>
              <p className="text-sm text-foreground leading-relaxed pt-2">{thing}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
