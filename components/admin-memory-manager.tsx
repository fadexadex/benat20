"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, Upload } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface Memory {
  id: string
  name: string
  quote: string
  media_url: string
  media_type: string
  created_at: string
}

interface AdminMemoryManagerProps {
  initialMemories: Memory[]
}

export function AdminMemoryManager({ initialMemories }: AdminMemoryManagerProps) {
  const [memories, setMemories] = useState<Memory[]>(initialMemories)
  const [isAdding, setIsAdding] = useState(false)
  const [name, setName] = useState("")
  const [quote, setQuote] = useState("")
  const [mediaUrl, setMediaUrl] = useState("")
  const [mediaType, setMediaType] = useState<"image" | "video">("image")
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Upload failed")

      const data = await response.json()
      setMediaUrl(data.url)
      setMediaType(file.type.startsWith("video/") ? "video" : "image")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed")
    } finally {
      setIsUploading(false)
    }
  }

  const handleAddMemory = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      const response = await fetch("/api/memories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, quote, media_url: mediaUrl, media_type: mediaType }),
      })

      if (!response.ok) throw new Error("Failed to add memory")

      const newMemory = await response.json()
      setMemories([newMemory, ...memories])
      setName("")
      setQuote("")
      setMediaUrl("")
      setMediaType("image")
      setIsAdding(false)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add memory")
    }
  }

  const handleDeleteMemory = async (id: string) => {
    if (!confirm("Are you sure you want to delete this memory?")) return

    try {
      const response = await fetch(`/api/memories/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete memory")

      setMemories(memories.filter((m) => m.id !== id))
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete memory")
    }
  }

  return (
    <div className="space-y-6">
      {error && <div className="rounded-lg bg-destructive/10 p-4 text-destructive">{error}</div>}

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Add New Memory</CardTitle>
            <Button variant="outline" size="sm" onClick={() => setIsAdding(!isAdding)}>
              {isAdding ? (
                "Cancel"
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" /> Add Memory
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        {isAdding && (
          <CardContent>
            <form onSubmit={handleAddMemory} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Who is this memory from?"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="quote">Memory / Quote</Label>
                <Textarea
                  id="quote"
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder="Share a special memory or message..."
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="media">Upload Image or Video</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="media"
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                  />
                  {isUploading && <span className="text-sm text-muted-foreground">Uploading...</span>}
                </div>
                {mediaUrl && (
                  <div className="mt-2 relative w-32 h-32 rounded-lg overflow-hidden">
                    {mediaType === "video" ? (
                      <video src={mediaUrl} className="w-full h-full object-cover" />
                    ) : (
                      <Image src={mediaUrl || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
                    )}
                  </div>
                )}
              </div>

              <Button type="submit" disabled={!mediaUrl || isUploading}>
                <Upload className="mr-2 h-4 w-4" />
                Add Memory
              </Button>
            </form>
          </CardContent>
        )}
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {memories.map((memory) => (
          <Card key={memory.id}>
            <CardContent className="p-4">
              <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
                {memory.media_type === "video" ? (
                  <video src={memory.media_url} className="w-full h-full object-cover" />
                ) : (
                  <Image src={memory.media_url || "/placeholder.svg"} alt={memory.name} fill className="object-cover" />
                )}
              </div>
              <h3 className="font-semibold text-lg mb-2">{memory.name}</h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{memory.quote}</p>
              <Button variant="destructive" size="sm" onClick={() => handleDeleteMemory(memory.id)}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
