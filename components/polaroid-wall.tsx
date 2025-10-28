"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface Photo {
  id: string
  src: string
  caption: string
  rotation: number
  type?: "image" | "video"
}

const photos: Photo[] = [
  {
    id: "15",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7EFFFB2E-62D7-4C00-873F-F7413D055814-P5h2iPlQLsBUnYixhtZJ3RAx65BVrJ.MP4",
    caption: "Living in the moment 🎬",
    rotation: -2,
    type: "video",
  },
  {
    id: "25",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2587.JPG-PzdXDoyNM4sdsVK3GvXdEvnF1S0uPu.jpeg",
    caption: "Me and Barney, best friends forever 💜",
    rotation: -4,
  },
  {
    id: "4",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6097-E8qs87ecurQ1yKz6xpuWIEogBdBBG1.jpeg",
    caption: "Deep in thought 💭",
    rotation: 4,
  },
  {
    id: "12",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_1943-vCD76mUcqYohNOWyaWaHuNO6GLIeUL.jpg",
    caption: "Tech squad making moves 🚀",
    rotation: 2,
  },
  {
    id: "26",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2585.JPG-1mJwqnOzwyExxlmACVH61ZGrIuG0QK.jpeg",
    caption: "Little me, big dreams 📸",
    rotation: -3,
  },
  {
    id: "18",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_7519-xsIrOZFOSGpmYhmnlSCcPyhqx3ilVE.MOV",
    caption: "Glow is a full time job 🎞️",
    rotation: 2,
    type: "video",
  },
  {
    id: "7",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_7533.PNG-72tWsvqyvPXnr9LDP91RsLEARij7Ds.png",
    caption: "Quick snap between classes 📸",
    rotation: -3,
  },
  {
    id: "27",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2589.JPG-gzJkE0AH9qgXMnGLqn8VmpoCJWROUM.jpeg",
    caption: "Airport adventures & big smiles ✈️",
    rotation: 4,
  },
  {
    id: "2",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_1223.JPG-W7Qcu36l2VnA4mG5rAuqfCTLfvtyxO.jpeg",
    caption: "Uncle Benjamin's tender moments 💙",
    rotation: 2,
  },
  {
    id: "22",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3BC090E6-0EE7-46ED-B260-E195657D57E2-gIdCjQlimVtfFRKUyGfVAOzt7VjHhx.MOV",
    caption: "Growing up on camera 🎥",
    rotation: -2,
    type: "video",
  },
  {
    id: "16",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20video%20-%20Made%20with%20Clipchamp-fTE5YgbUld7pvEgJLEk66qBG6sbqcx.mp4",
    caption: "Memories in motion 🎥",
    rotation: 3,
    type: "video",
  },
  {
    id: "28",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2588.JPG-VXdlzYabl6iMm32rgMlGpJIF6HxaMn.jpeg",
    caption: "Ready for the day ahead 🎒",
    rotation: 3,
  },
  {
    id: "9",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9314-dAdn8tUlQbXDcKaGUblJXdTL27rX5W.jpg",
    caption: "Chef Benjamin serves excellence 👨‍🍳",
    rotation: -2,
  },
  {
    id: "23",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/B7D4C99C-C2CC-48E8-B415-AECABCF294F0-MQuhnxG1clDuqikwCY764uttrXuOwa.MOV",
    caption: "Rewind to simpler times ⏮️",
    rotation: -4,
    type: "video",
  },
  {
    id: "14",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_1377.JPG-97VBQWeTmXylo2ULr4wm62xf1JPtka.jpeg",
    caption: "Brotherhood beyond words 🤝",
    rotation: 3,
  },
  {
    id: "29",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2586.JPG-XyPtgKV7lyhKsn7KLEo0IwbsVSUufW.jpeg",
    caption: "Young boss on the phone 📱",
    rotation: -3,
  },
  {
    id: "5",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_7146.PNG-1CEUDlutzM0ykQWACTlmGIQpO4j4s9.png",
    caption: "Sunday's finest 🙏",
    rotation: -4,
  },
  {
    id: "24",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/603EEF18-96FF-43AF-A485-8CC752007CB9-3NjAJo10mobNgrkmd8N57BxZi2StlX.MOV",
    caption: "Flashback moments 🎞️",
    rotation: 2,
    type: "video",
  },
  {
    id: "19",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1A07C542-9B05-4AE6-B2AA-4A3484322D99-uxX6UROs4zxgecJYXletuE2ABJu5Kd.mp4",
    caption: "Dancing away worries ⭐",
    rotation: -3,
    type: "video",
  },
  {
    id: "1",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2697-8NUANKWiSfnVWshWX1QP5PlGBa7xDU.jpg",
    caption: "Peace, love & good vibes ✌️",
    rotation: -3,
  },
  {
    id: "10",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2525-EdJoSaYLpEFWJVzTNrPyzX6OhX7u3M.jpg",
    caption: "Standing tall, standing proud 💪",
    rotation: 4,
  },
  {
    id: "17",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20video%20-%20Made%20with%20Clipchamp%20%281%29-MbLJyCANTQ9NeKQllDu0PbTyfXfBaK.mp4",
    caption: "Lecture Shenanigans 📹",
    rotation: -4,
    type: "video",
  },
  {
    id: "3",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2839.JPG-vgkMTZXEkUUAg2Wh3gqFWIFF8HQZBR.jpeg",
    caption: "Brothers in learning 📖",
    rotation: -2,
  },
  {
    id: "8",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_7166-ChqNEQr4bdkP2znzgyiB7VUoIoB6mP.jpg",
    caption: "Caught in action 🏃",
    rotation: 2,
  },
  {
    id: "13",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2013-iXQyC1Y2c1aw6cJV2WQAPKbhk545s3.jpg",
    caption: "Winter vibes & scholarly strides ❄️",
    rotation: -4,
  },
  {
    id: "6",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4780-R4aE8YhgJWUd2UWqigWex47QftIWFw.jpeg",
    caption: "Looking up to greatness ⭐",
    rotation: 3,
  },
  {
    id: "11",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_1213.PNG-tYKCEiXX9n4u5zSK49bUY8K461xCkb.jpeg",
    caption: "Rest & recharge mode 😴",
    rotation: -3,
  },
  {
    id: "30",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2592.JPG-Tfv6ZytghQvAITHTutHzJg50QzlgV6.jpeg",
    caption: "Golden hour confidence ☀️",
    rotation: 2,
  },
  {
    id: "31",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2599.JPG-bLjrbOt12m86BUj9eNY8TQk8nSgjQa.jpeg",
    caption: "Party hat vibes 🎉",
    rotation: -3,
  },
  {
    id: "32",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2595.JPG-MsFMjmiRynO7hyo260qg17Qs27wi6T.jpeg",
    caption: "Face paint fun 🎨",
    rotation: 4,
  },
  {
    id: "33",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2594.JPG-cVSIQXDoiU608BOOFKKYRhMHimsELx.jpeg",
    caption: "Mysterious mood 🤫",
    rotation: -2,
  },
  {
    id: "34",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2591.JPG-e3yffVSc855EeVo2hnIwmHar7q2Ep8.jpeg",
    caption: "Teddy bear treasures 🧸",
    rotation: 3,
  },
  {
    id: "35",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2603.JPG-8H2MSdr8hqq4Okhf0XmSQrjmlosMJ6.jpeg",
    caption: "Stadium smiles 🏟️",
    rotation: -4,
  },
  {
    id: "36",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2598.JPG-VrJOfRc7D8uer8zmo9tlOv63C0h6cW.jpeg",
    caption: "Orange drip energy 🧡",
    rotation: 2,
  },
  {
    id: "37",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2600.JPG-vhgGMZ5TBzjgyquY7jrODCWhXnsF0I.jpeg",
    caption: "Birthday celebration moments 🎂",
    rotation: -3,
  },
  {
    id: "38",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2604.JPG-LdaCOetdP3SKZJd13NhUMp1Qhz7Mc2.jpeg",
    caption: "Plaid jacket days 🧥",
    rotation: 4,
  },
]

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function PolaroidWall() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [shuffledPhotos, setShuffledPhotos] = useState<Photo[]>(photos)

  // Avoid SSR/client mismatch by shuffling only after mount
  useEffect(() => {
    setShuffledPhotos(shuffleArray(photos))
  }, [])

  return (
    <section className="relative min-h-screen px-4 py-20 bg-muted/30">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-5xl font-bold tracking-tight text-primary sm:text-6xl text-balance">
            Polaroid Memories
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">Moments captured in time</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {shuffledPhotos.map((photo) => (
            <div
              key={photo.id}
              className="relative group cursor-pointer"
              onMouseEnter={() => setHoveredId(photo.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div
                className={`relative bg-white p-4 pb-16 shadow-xl transition-all duration-300 ${
                  hoveredId === photo.id ? "scale-110 rotate-0 z-10" : "hover:scale-105"
                }`}
                style={{
                  transform: hoveredId === photo.id ? "rotate(0deg)" : `rotate(${photo.rotation}deg)`,
                }}
              >
                <div className="relative aspect-square overflow-hidden bg-muted">
                  {photo.type === "video" ? (
                    <video
                      src={photo.src}
                      className="absolute inset-0 w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                    />
                  ) : (
                    <Image src={photo.src || "/placeholder.svg"} alt={photo.caption} fill className="object-cover" />
                  )}
                </div>
                <p className="mt-4 text-center font-handwriting text-lg text-gray-800">{photo.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
