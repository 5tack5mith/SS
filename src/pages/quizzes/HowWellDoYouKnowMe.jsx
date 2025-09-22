import React, { useState } from 'react'
import starry from '../../assets/StarryNightResized.png'
import sunset from '../../assets/Romantic_sunset.png'
import { askGemini } from '../../lib/gemini'

export default function HowWellDoYouKnowMe(){
  const [theme,setTheme] = useState('starry')
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState('')
  const [error, setError] = useState('')
  const bgStyle = theme === 'starry' ? { backgroundImage: `url(${starry})`, backgroundSize: 'cover' } : { backgroundImage: `url(${sunset})`, backgroundSize: 'cover' }

  React.useEffect(()=>{
    const saved = localStorage.getItem('theme')
    if (saved === 'starry' || saved === 'sunset') setTheme(saved)
  },[])

  const choose = (t)=>{ setTheme(t); try { localStorage.setItem('theme', t) } catch {} }

  const generateQuiz = async () => {
    setLoading(true)
    setError('')
    setQuestions('')
    
    try {
      const prompt = "Generate 3 fun 'How well do you know me?' questions for couples."
      const response = await askGemini(prompt)
      setQuestions(response)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={bgStyle} className='min-h-screen w-full bg-center bg-cover transition-all duration-500'>
      <div className='absolute top-6 right-6 z-40 flex gap-2'>
        <button onClick={()=>choose('starry')} className={`px-4 py-2 rounded-full ${theme==='starry' ? 'bg-white text-black' : 'bg-white/30 text-white'}`}>Starry Love 🌌</button>
        <button onClick={()=>choose('sunset')} className={`px-4 py-2 rounded-full ${theme==='sunset' ? 'bg-white text-black' : 'bg-white/30 text-white'}`}>Sunset Romance 🌅</button>
      </div>

      <div className='min-h-screen flex items-center justify-center px-6 py-12'>
        <div className='glass-card p-10 rounded-3xl shadow-2xl max-w-4xl w-full'>
          <h1 className='text-4xl font-marker mb-8 text-center'>💕 How Well Do You Know Me?</h1>
          
          <div className='text-center mb-8'>
            <button 
              onClick={generateQuiz}
              disabled={loading}
              className='px-8 py-4 rounded-full bg-gradient-to-r from-violet-500 to-pink-400 text-white font-bold hover:from-violet-600 hover:to-pink-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
            >
              {loading ? 'Loading...' : 'Generate Quiz'}
            </button>
          </div>

          {error && (
            <div className='mb-4 p-4 rounded-full bg-red-500/30 text-red-100 text-center font-marker'>
              {error}
            </div>
          )}

          {questions && (
            <div className='bg-white/10 backdrop-blur-md rounded-2xl p-6 max-h-96 overflow-y-auto'>
              <pre className='text-white font-marker whitespace-pre-wrap text-left'>{questions}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
