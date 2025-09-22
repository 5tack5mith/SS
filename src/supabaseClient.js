import { createClient } from '@supabase/supabase-js'

// Use environment variables (safer)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ewzmfqmggbztmafpezwq.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3em1mcW1nZ2J6dG1hZnBlendxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0ODcwMzcsImV4cCI6MjA3NDA2MzAzN30.NCRLOtmjV7Ch3OxLNt75QPdLmFQPXor7eubytO58U3U'

export const supabase = createClient(supabaseUrl, supabaseKey)
