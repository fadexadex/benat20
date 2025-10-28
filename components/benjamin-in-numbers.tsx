"use client"

import { useEffect, useRef, useState } from "react"

interface Stat {
  number: string
  label: string
  icon: string
}

const stats: Stat[] = [
  { number: "20", label: "Years of Awesomeness", icon: "🎂" },
  { number: "1000+", label: "Memories Created", icon: "📸" },
  { number: "∞", label: "Laughs Shared", icon: "😂" },
  { number: "100%", label: "Authenticity", icon: "⭐" },
  { number: "24/7", label: "Friend Availability", icon: "🤝" },
  { number: "365", label: "Days of Being Amazing", icon: "✨" },
]

export function BenjaminInNumbers() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-5xl font-bold tracking-tight text-primary sm:text-6xl text-balance">
            Benjamin in Numbers
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">The stats that matter</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-2xl bg-gradient-to-br from-card to-muted border border-border hover:border-accent transition-all duration-700 hover:scale-105 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-5xl mb-4">{stat.icon}</div>
              <div className="text-5xl font-bold text-primary mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-lg text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
