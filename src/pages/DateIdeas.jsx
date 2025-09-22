import React, { useState } from 'react'
import { useTheme } from '../components/ThemeContext'
import BackgroundWrapper from '../components/BackgroundWrapper'
import Dropdown from '../components/Dropdown'
import { askGeminiText } from '../lib/gemini'

export default function DateIdeas(){
  const { theme, setTheme } = useTheme()
  const choose = (t)=> setTheme(t)

  const [budget, setBudget] = useState('')
  const [vibe, setVibe] = useState('')
  const [idea, setIdea] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const budgetOptions = [
    { value: 'Low (< ₹500)', label: 'Low (< ₹500)' },
    { value: 'Medium (₹500–2000)', label: 'Medium (₹500–2000)' },
    { value: 'High (> ₹2000)', label: 'High (> ₹2000)' },
  ]

  const vibeOptions = [
    { value: 'Romantic ❤️', label: 'Romantic ❤️' },
    { value: 'Adventurous 🏞️', label: 'Adventurous 🏞️' },
    { value: 'Chill 😌', label: 'Chill 😌' },
    { value: 'Creative 🎨', label: 'Creative 🎨' },
  ]

  const generateIdea = async () => {
    setLoading(true)
    setError('')
    setIdea('')
    try {
      const prompt = `Suggest 1 unique and creative date idea for a couple with a ${budget} budget and a ${vibe} vibe. Keep it fun, thoughtful, and realistic. Return a concise, friendly description in 2-4 sentences.`
      const text = await askGeminiText(prompt)
      setIdea(text)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const disabled = !budget || !vibe || loading

  return (
    <BackgroundWrapper>
      <div className='absolute top-6 right-6 z-40 flex gap-2'>
        <button onClick={()=>choose('starry')} className={`px-4 py-2 rounded-full ${theme==='starry' ? 'bg-white text-black' : 'bg-white/30 text-white'}`}>Starry Love 🌌</button>
        <button onClick={()=>choose('sunset')} className={`px-4 py-2 rounded-full ${theme==='sunset' ? 'bg-white text-black' : 'bg-white/30 text-white'}`}>Sunset Romance 🌅</button>
      </div>

      <div className='min-h-screen flex items-center justify-center px-6'>
        <div className='glass-card p-10 rounded-3xl shadow-2xl max-w-2xl w-full'>
          <h1 className='text-3xl font-marker mb-6 text-center'>💡 Date Ideas</h1>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
            <Dropdown
              label='Budget 💸'
              options={budgetOptions}
              value={budget}
              onChange={setBudget}
            />
            <Dropdown
              label='Vibe ✨'
              options={vibeOptions}
              value={vibe}
              onChange={setVibe}
            />
          </div>

          {error && (
            <div className='mb-4 p-3 rounded-2xl bg-red-500/30 text-red-100 text-center font-marker'>
              {error}
            </div>
          )}

          <div className='text-center mb-6'>
            <button
              onClick={generateIdea}
              disabled={disabled}
              className={`px-8 py-4 rounded-full font-bold transition-all duration-300 transform hover:scale-105 ${
                disabled
                  ? 'bg-white/20 text-white/50 cursor-not-allowed'
                  : 'bg-gradient-to-r from-violet-500 to-pink-400 text-white hover:from-violet-600 hover:to-pink-500 shadow-lg'
              }`}
            >
              {loading ? 'Loading...' : 'Get Date Idea'}
            </button>
          </div>

          {idea && (
            <div className='bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10'>
              <p className='text-white text-lg leading-relaxed whitespace-pre-wrap'><span className='mr-2'>🌟</span>{idea}</p>
            </div>
          )}
        </div>
      </div>
    </BackgroundWrapper>
  )
}


