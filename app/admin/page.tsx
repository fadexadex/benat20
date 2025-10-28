import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminMemoryManager } from "@/components/admin-memory-manager"

export default async function AdminPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  // Fetch all memories
  const { data: memories } = await supabase.from("memories").select("*").order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-primary">Admin Panel</h1>
            <p className="text-muted-foreground mt-2">Manage Benjamin's birthday memories</p>
          </div>
          <form action="/api/auth/logout" method="post">
            <button type="submit" className="text-sm text-muted-foreground hover:text-foreground">
              Logout
            </button>
          </form>
        </div>

        <AdminMemoryManager initialMemories={memories || []} />
      </div>
    </div>
  )
}
