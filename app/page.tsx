import { Navbar } from "@/components/navbar"
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
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        <section id="hero">
          <HeroSection />
        </section>
        <section id="twenty-things">
          <TwentyThings />
        </section>
        <section id="memories">
          <MemoryLane initialMemories={memories || []} />
        </section>
        <section id="numbers">
          <BenjaminInNumbers />
        </section>
        <section id="gallery">
          <PolaroidWall />
        </section>
        <ScrollToTop />
        <Footer />
      </main>
    </>
  )
}
