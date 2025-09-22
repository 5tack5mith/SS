import launchBg from "./assets/StarryNightResized.png";
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from './supabaseClient'

export default function LaunchScreen(){
  const [activeTab, setActiveTab] = useState('signup')
  
  // Sign up form state
  const [signupData, setSignupData] = useState({
    you: '',
    them: '',
    date: '',
    email: '',
    password: ''
  })
  
  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })
  
  // UI state
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const navigate = useNavigate()

  useEffect(()=>{
    const savedYou = localStorage.getItem('you')
    const savedThem = localStorage.getItem('them')
    const savedDate = localStorage.getItem('date')
    if(savedYou) setSignupData(prev => ({...prev, you: savedYou}))
    if(savedThem) setSignupData(prev => ({...prev, them: savedThem}))
    if(savedDate) setSignupData(prev => ({...prev, date: savedDate}))
  },[])

  const handleSignup = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      // Create user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: signupData.email,
        password: signupData.password,
      })
      
      if (authError) throw authError
      
      if (authData.user) {
        // Wait a moment for the user to be fully authenticated
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Save profile data
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: authData.user.id,
              you_name: signupData.you || 'You 💌',
              them_name: signupData.them || 'Them 💌',
              start_date: signupData.date || '',
              created_at: new Date().toISOString()
            }
          ])
        
        if (profileError) {
          console.error('Profile error:', profileError)
          // If profile creation fails, still save to localStorage and continue
          console.log('Continuing with localStorage fallback')
        }
        
        // Save to localStorage for backward compatibility
        localStorage.setItem('you', signupData.you || 'You 💌')
        localStorage.setItem('them', signupData.them || 'Them 💌')
        localStorage.setItem('date', signupData.date || '')
        
        // Check if user needs email confirmation
        if (authData.user.email_confirmed_at) {
          // User is confirmed, navigate to home
          navigate('/home')
        } else {
          // User needs to confirm email first
          setError('Please check your email and click the confirmation link before logging in.')
          setActiveTab('login') // Switch to login tab
        }
      }
    } catch (error) {
      console.error('Signup error:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      })
      
      if (error) throw error
      
      if (data.user) {
        console.log('Login successful for user:', data.user.id)
        
        // Fetch profile data
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single()
        
        console.log('Profile data:', profileData, 'Profile error:', profileError)
        
        // Save to localStorage for backward compatibility
        if (profileData) {
          localStorage.setItem('you', profileData.you_name || 'You 💌')
          localStorage.setItem('them', profileData.them_name || 'Them 💌')
          localStorage.setItem('date', profileData.start_date || '')
        } else {
          // If no profile data found, use default values
          localStorage.setItem('you', 'You 💌')
          localStorage.setItem('them', 'Them 💌')
          localStorage.setItem('date', '')
        }
        
        navigate('/home')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (form, field, value) => {
    if (form === 'signup') {
      setSignupData(prev => ({...prev, [field]: value}))
    } else {
      setLoginData(prev => ({...prev, [field]: value}))
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${launchBg})` }}
    >
      <div className="glass-card rounded-3xl p-12 w-[720px] shadow-2xl">
        <h1 className="text-4xl text-center font-marker mb-6">Welcome to the Stars ✨</h1>
        
        {/* Tab Navigation */}
        <div className="flex mb-6 bg-white/20 rounded-full p-1">
          <button
            onClick={() => setActiveTab('signup')}
            className={`flex-1 py-2 px-4 rounded-full font-marker transition-all duration-300 ${
              activeTab === 'signup' 
                ? 'bg-gradient-to-r from-violet-500 to-pink-400 text-white' 
                : 'text-white/70 hover:text-white'
            }`}
            style={{ opacity: 0.7 }}
          >
            Sign Up
          </button>
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-2 px-4 rounded-full font-marker transition-all duration-300 ${
              activeTab === 'login' 
                ? 'bg-gradient-to-r from-violet-500 to-pink-400 text-white' 
                : 'text-white/70 hover:text-white'
            }`}
            style={{ opacity: 0.7 }}
          >
            Login
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 rounded-full bg-red-500/30 text-red-100 text-center font-marker" style={{ opacity: 0.8 }}>
            {error}
          </div>
        )}

        {/* Sign Up Form */}
        {activeTab === 'signup' && (
          <form onSubmit={handleSignup} className="space-y-4">
            <input 
              value={signupData.you} 
              onChange={e => handleInputChange('signup', 'you', e.target.value)} 
              placeholder="You 💌" 
              className="w-full p-4 rounded-full bg-white/30 backdrop-blur-md outline-none font-marker" 
              style={{ opacity: 0.7 }}
              required
            />
            <input 
              value={signupData.them} 
              onChange={e => handleInputChange('signup', 'them', e.target.value)} 
              placeholder="Them 💌" 
              className="w-full p-4 rounded-full bg-white/30 backdrop-blur-md outline-none font-marker" 
              style={{ opacity: 0.7 }}
              required
            />
            <input 
              value={signupData.date} 
              onChange={e => handleInputChange('signup', 'date', e.target.value)} 
              placeholder="When it Started 💞" 
              type="date" 
              className="w-full p-4 rounded-full bg-white/30 backdrop-blur-md outline-none font-marker" 
              style={{ opacity: 0.7 }}
            />
            <input 
              value={signupData.email} 
              onChange={e => handleInputChange('signup', 'email', e.target.value)} 
              placeholder="Email 📧" 
              type="email" 
              className="w-full p-4 rounded-full bg-white/30 backdrop-blur-md outline-none font-marker" 
              style={{ opacity: 0.7 }}
              required
            />
            <input 
              value={signupData.password} 
              onChange={e => handleInputChange('signup', 'password', e.target.value)} 
              placeholder="Password 🔒" 
              type="password" 
              className="w-full p-4 rounded-full bg-white/30 backdrop-blur-md outline-none font-marker" 
              style={{ opacity: 0.7 }}
              required
            />
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 rounded-full bg-gradient-to-r from-violet-500 to-pink-400 text-white font-bold hover:from-violet-600 hover:to-pink-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? 'Creating Account...' : 'Create Account ✨'}
            </button>
          </form>
        )}

        {/* Login Form */}
        {activeTab === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              value={loginData.email} 
              onChange={e => handleInputChange('login', 'email', e.target.value)} 
              placeholder="Email 📧" 
              type="email" 
              className="w-full p-4 rounded-full bg-white/30 backdrop-blur-md outline-none font-marker" 
              style={{ opacity: 0.7 }}
              required
            />
            <input 
              value={loginData.password} 
              onChange={e => handleInputChange('login', 'password', e.target.value)} 
              placeholder="Password 🔒" 
              type="password" 
              className="w-full p-4 rounded-full bg-white/30 backdrop-blur-md outline-none font-marker" 
              style={{ opacity: 0.7 }}
              required
            />
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 rounded-full bg-gradient-to-r from-violet-500 to-pink-400 text-white font-bold hover:from-violet-600 hover:to-pink-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? 'Logging In...' : 'Login 💖'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
