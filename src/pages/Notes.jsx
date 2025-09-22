import React, { useState } from 'react'
import starry from '../assets/StarryNightResized.png'
import sunset from '../assets/Romantic_sunset.png'

export default function Notes(){
  const [theme,setTheme] = useState('starry')
  const bgStyle = theme === 'starry' ? { backgroundImage: `url(${starry})`, backgroundSize: 'cover' } : { backgroundImage: `url(${sunset})`, backgroundSize: 'cover' }

  React.useEffect(()=>{
    const saved = localStorage.getItem('theme')
    if (saved === 'starry' || saved === 'sunset') setTheme(saved)
  },[])

  const choose = (t)=>{ setTheme(t); try { localStorage.setItem('theme', t) } catch {} }

  return (
    <div style={bgStyle} className='min-h-screen w-full bg-center bg-cover transition-all duration-500'>
      <div className='absolute top-6 right-6 z-40 flex gap-2'>
        <button onClick={()=>choose('starry')} className={`px-4 py-2 rounded-full ${theme==='starry' ? 'bg-white text-black' : 'bg-white/30 text-white'}`}>Starry Love 🌌</button>
        <button onClick={()=>choose('sunset')} className={`px-4 py-2 rounded-full ${theme==='sunset' ? 'bg-white text-black' : 'bg-white/30 text-white'}`}>Sunset Romance 🌅</button>
      </div>

      <div className='min-h-screen flex items-center justify-center px-6'>
        <div className='glass-card p-10 rounded-3xl shadow-2xl max-w-2xl w-full text-center'>
          <h1 className='text-3xl font-marker mb-2'>Notes 📝</h1>
          <p className='text-white/80 font-marker' style={{opacity:0.8}}>Coming soon...</p>
        </div>
      </div>
    </div>
  )
}


