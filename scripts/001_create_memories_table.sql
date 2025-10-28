-- Create memories table
create table if not exists public.memories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  quote text not null,
  media_url text not null,
  media_type text not null check (media_type in ('image', 'video')),
  created_at timestamp with time zone default now()
);

-- Enable RLS (but allow public read access for this birthday site)
alter table public.memories enable row level security;

-- Allow anyone to read memories
create policy "memories_select_all"
  on public.memories for select
  using (true);

-- Only authenticated users can insert memories (admin only)
create policy "memories_insert_authenticated"
  on public.memories for insert
  with check (auth.uid() is not null);

-- Only authenticated users can update memories
create policy "memories_update_authenticated"
  on public.memories for update
  using (auth.uid() is not null);

-- Only authenticated users can delete memories
create policy "memories_delete_authenticated"
  on public.memories for delete
  using (auth.uid() is not null);
