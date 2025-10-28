"use client"

import { useState } from "react"
import Image from "next/image"
import { Card } from "./ui/card"
import { Button } from "./ui/button"
import { Heart } from "lucide-react"
import type { Memory } from "./memory-lane"

interface MemoryCardProps {
  memory: Memory
  onLike?: (memoryId: string) => void
  expanded?: boolean
}

export function MemoryCard({ memory, onLike, expanded = false }: MemoryCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  const handleLike = () => {
    setIsLiked(true)
    onLike?.(memory.id)
    setTimeout(() => setIsLiked(false), 300)
  }

  return (
    <Card
      className={`group relative mx-auto overflow-hidden border-0 shadow-2xl transition-all duration-500 ${
        expanded ? "aspect-auto" : "aspect-[4/3] max-w-4xl hover:scale-[1.02] hover:shadow-3xl cursor-pointer"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className={`relative w-full ${expanded ? "h-[60vh]" : "h-full"}`}>
        <Image
          src={memory.imageUrl || "/placeholder.svg"}
          alt={`Memory with ${memory.name}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      </div>

      <div
        className={`absolute inset-x-0 bottom-0 p-8 transition-all duration-500 ${
          isHovered || expanded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-90"
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <p
              className={`mb-3 font-medium leading-relaxed text-white text-balance ${
                expanded ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"
              }`}
            >
              "{memory.quote}"
            </p>
            <p className={`text-white/80 ${expanded ? "text-xl" : "text-lg"}`}>— {memory.name}</p>
          </div>

          {onLike && (
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                handleLike()
              }}
              className={`flex-shrink-0 h-12 w-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all ${
                isLiked ? "scale-125" : "scale-100"
              }`}
            >
              <Heart
                className={`h-6 w-6 transition-colors ${
                  (memory.likes || 0) > 0 ? "fill-red-500 text-red-500" : "text-white"
                }`}
              />
              {(memory.likes || 0) > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {memory.likes}
                </span>
              )}
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}
