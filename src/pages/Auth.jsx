import { useState } from "react"
import { supabase } from "../supabaseClient"

export default function Auth() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSignUp = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) setMessage(error.message)
    else setMessage("✅ Signup successful! Check your email to confirm.")
    setLoading(false)
  }

  const handleLogin = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setMessage(error.message)
    else setMessage("🎉 Login successful!")
    setLoading(false)
  }

  return (
    <div className="auth-container">
      <h2>Auth Demo</h2>
      <input
        className="auth-input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="auth-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="auth-buttons">
        <button className="auth-btn" onClick={handleSignUp} disabled={loading}>
          Sign Up
        </button>
        <button className="auth-btn" onClick={handleLogin} disabled={loading}>
          Login
        </button>
      </div>
      {message && <p className="auth-message">{message}</p>}
    </div>
  )
}
