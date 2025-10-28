import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()

    // Check authentication
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { name, quote, media_url, media_type } = body

    const { data, error } = await supabase
      .from("memories")
      .insert([{ name, quote, media_url, media_type }])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Error creating memory:", error)
    return NextResponse.json({ error: "Failed to create memory" }, { status: 500 })
  }
}
