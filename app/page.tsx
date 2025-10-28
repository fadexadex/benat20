import { HeroSection } from "@/components/hero-section"
import { MemoryLane } from "@/components/memory-lane"
import { TwentyThings } from "@/components/twenty-things"
import { BenjaminInNumbers } from "@/components/benjamin-in-numbers"
import { PolaroidWall } from "@/components/polaroid-wall"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { createClient } from "@/lib/supabase/server"

export default async function Home() {
  const supabase = await createClient()

  // Fetch memories from Supabase
  const { data: memories } = await supabase.from("memories").select("*").order("created_at", { ascending: true })

  return (
    <main className="min-h-screen">
      <HeroSection />
      <TwentyThings />
      <MemoryLane initialMemories={memories || []} />
      <BenjaminInNumbers />
      <PolaroidWall />
      <ScrollToTop />
      <Footer />
    </main>
  )
}
