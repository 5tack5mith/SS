import { useState } from "react"
import { supabase } from "../supabaseClient"
import "./Launch.css" // we'll add custom styles here

export default function Launch({ onLoginSuccess }) {
  const [isSignUp, setIsSignUp] = useState(true)
  const [form, setForm] = useState({
    name: "",
    partnerName: "",
    anniversaryDate: "",
    email: "",
    password: "",
  })
  const [message, setMessage] = useState("")

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Sign Up
  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    })

    if (error) {
      setMessage(error.message)
      return
    }

    const user = data.user
    if (user) {
      const { error: insertError } = await supabase.from("profiles").insert([
        {
          id: user.id,
          name: form.name,
          partner_name: form.partnerName,
          anniversary_date: form.anniversaryDate,
          email: form.email,
        },
      ])
      if (insertError) {
        setMessage(insertError.message)
      } else {
        setMessage("🎉 Account created successfully!")
        if (onLoginSuccess) onLoginSuccess(user)
      }
    }
  }

  // Login
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    })

    if (error) {
      setMessage(error.message)
    } else {
      setMessage("✅ Login successful!")
      if (onLoginSuccess) onLoginSuccess(form.email)
    }
  }

  return (
    <div className="launch-container">
      <div className="glass-card">
        <h1>Welcome 💕</h1>

        {/* Tabs */}
        <div className="tabs">
          <button
            className={isSignUp ? "active" : ""}
            onClick={() => setIsSignUp(true)}
          >
            Sign Up
          </button>
          <button
            className={!isSignUp ? "active" : ""}
            onClick={() => setIsSignUp(false)}
          >
            Login
          </button>
        </div>

        {/* Sign Up Form */}
        {isSignUp ? (
          <div className="form">
            <input
              name="name"
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
            />
            <input
              name="partnerName"
              type="text"
              placeholder="Partner's Name"
              value={form.partnerName}
              onChange={handleChange}
            />
            <input
              name="anniversaryDate"
              type="date"
              value={form.anniversaryDate}
              onChange={handleChange}
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
            <button onClick={handleSignUp}>Create Account</button>
          </div>
        ) : (
          // Login Form
          <div className="form">
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
            <button onClick={handleLogin}>Login</button>
          </div>
        )}

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  )
}
