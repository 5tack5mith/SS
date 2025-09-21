import { supabase } from "./supabaseClient"

function App() {
  async function testConnection() {
    const { data, error } = await supabase.from("profiles").select("*").limit(1)
    if (error) {
      console.error("❌ Supabase error:", error.message)
    } else {
      console.log("✅ Supabase working! Example row:", data)
    }
  }

  return (
    <div>
      <h1>Supabase Test</h1>
      <button onClick={testConnection}>Test Supabase</button>
    </div>
  )
}

export default App
