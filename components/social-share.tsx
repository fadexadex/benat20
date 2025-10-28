"use client"

import { Button } from "./ui/button"
import { Share2, Twitter, Facebook, Link2 } from "lucide-react"
import { useState } from "react"

export function SocialShare() {
  const [copied, setCopied] = useState(false)
  const shareUrl = typeof window !== "undefined" ? window.location.href : ""
  const shareText = "Check out this amazing birthday tribute for Benjamin's 20th! 🎉"

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    window.open(url, "_blank", "width=550,height=420")
  }

  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    window.open(url, "_blank", "width=550,height=420")
  }

  return (
    <section className="relative px-4 py-20 bg-gradient-to-br from-secondary/20 to-accent/20">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-8">
          <Share2 className="mx-auto h-12 w-12 text-primary mb-4" />
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-primary sm:text-5xl text-balance">
            Share the Love
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Help us celebrate Benjamin by sharing this tribute
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button onClick={handleTwitterShare} className="gap-2 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white">
            <Twitter className="h-5 w-5" />
            Share on Twitter
          </Button>

          <Button onClick={handleFacebookShare} className="gap-2 bg-[#1877F2] hover:bg-[#166fe5] text-white">
            <Facebook className="h-5 w-5" />
            Share on Facebook
          </Button>

          <Button onClick={handleCopyLink} variant="outline" className="gap-2 bg-transparent">
            <Link2 className="h-5 w-5" />
            {copied ? "Link Copied!" : "Copy Link"}
          </Button>
        </div>
      </div>
    </section>
  )
}
