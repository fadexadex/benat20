"use client"

import { useEffect, useState } from "react"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isBirthday, setIsBirthday] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const birthday = new Date("2025-10-30T00:00:00")

      // If birthday has passed this year, set it to next year
      if (now > birthday) {
        birthday.setFullYear(birthday.getFullYear() + 1)
      }

      const difference = birthday.getTime() - now.getTime()

      if (difference <= 0) {
        setIsBirthday(true)
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((difference / 1000 / 60) % 60)
      const seconds = Math.floor((difference / 1000) % 60)

      setTimeLeft({ days, hours, minutes, seconds })
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  if (isBirthday) {
    return (
      <section className="bg-accent/20 px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-5xl font-bold text-primary sm:text-6xl text-balance">
            🎉 It's Benjamin's Birthday! 🎉
          </h2>
          <p className="text-xl text-muted-foreground text-pretty">Happy 20th Birthday, Benjamin!</p>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-accent/20 px-4 py-20">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-8 text-4xl font-bold text-primary sm:text-5xl text-balance">Countdown to the Big Day</h2>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          <div className="rounded-xl bg-card p-6 shadow-lg">
            <div className="text-5xl font-bold text-primary sm:text-6xl">{timeLeft.days}</div>
            <div className="mt-2 text-sm uppercase tracking-wide text-muted-foreground">Days</div>
          </div>

          <div className="rounded-xl bg-card p-6 shadow-lg">
            <div className="text-5xl font-bold text-primary sm:text-6xl">{timeLeft.hours}</div>
            <div className="mt-2 text-sm uppercase tracking-wide text-muted-foreground">Hours</div>
          </div>

          <div className="rounded-xl bg-card p-6 shadow-lg">
            <div className="text-5xl font-bold text-primary sm:text-6xl">{timeLeft.minutes}</div>
            <div className="mt-2 text-sm uppercase tracking-wide text-muted-foreground">Minutes</div>
          </div>

          <div className="rounded-xl bg-card p-6 shadow-lg">
            <div className="text-5xl font-bold text-primary sm:text-6xl">{timeLeft.seconds}</div>
            <div className="mt-2 text-sm uppercase tracking-wide text-muted-foreground">Seconds</div>
          </div>
        </div>
      </div>
    </section>
  )
}
