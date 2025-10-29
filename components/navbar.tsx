"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Cake, Heart, Image as ImageIcon, Trophy, Camera } from "lucide-react"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80 // navbar height offset
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      })
      setIsMobileMenuOpen(false)
    }
  }

  const navItems = [
    { id: "hero", label: "Home", icon: Cake },
    { id: "twenty-things", label: "20 Things", icon: Heart },
    { id: "memories", label: "Memories", icon: ImageIcon },
    { id: "numbers", label: "In Numbers", icon: Trophy },
    { id: "gallery", label: "Gallery", icon: Camera },
  ]

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-300 ease-in-out",
          isScrolled
            ? "bg-background/80 backdrop-blur-lg border-b border-border/40 shadow-sm"
            : "bg-transparent",
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo/Brand */}
            <button
              onClick={() => scrollToSection("hero")}
              className="group flex items-center gap-2 font-bold transition-colors hover:text-accent"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-accent to-secondary shadow-md transition-transform group-hover:scale-110">
                <Cake className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="bg-linear-to-r from-primary via-accent to-secondary bg-clip-text text-transparent text-base sm:text-xl">
                Benjamin's 20th
              </span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:gap-2">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Button
                    key={item.id}
                    variant="ghost"
                    onClick={() => scrollToSection(item.id)}
                    className="group relative overflow-hidden px-4 py-2 text-foreground transition-all hover:text-primary"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                      {item.label}
                    </span>
                    <span className="absolute inset-0 z-0 scale-x-0 bg-linear-to-r from-accent/20 to-secondary/20 transition-transform duration-300 group-hover:scale-x-100" />
                  </Button>
                )
              })}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "absolute left-0 w-full overflow-hidden bg-background/95 backdrop-blur-lg transition-all duration-300 ease-in-out md:hidden",
            isMobileMenuOpen ? "max-h-96 border-b border-border/40 shadow-lg" : "max-h-0",
          )}
        >
          <div className="space-y-1 px-4 pb-4 pt-2">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors hover:bg-accent/10 hover:text-primary"
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </nav>
    </>
  )
}

