import React, { useEffect, useState } from 'react'
import HeroCounter from './components/HeroCounter'
import { FeaturePolaroids } from './components/FeaturePolaroids'
import starry from './assets/StarryNightResized.png'
import sunset from './assets/Romantic_sunset.png'

export default function Home(){
  const [theme,setTheme] = useState('starry')

  useEffect(()=>{
    const saved = localStorage.getItem('theme')
    if (saved === 'starry' || saved === 'sunset') setTheme(saved)
  },[])
  
  const choose = (t)=>{
    setTheme(t)
    try { localStorage.setItem('theme', t) } catch {}
  }
  const bgStyle = theme === 'starry' ? { backgroundImage: `url(${starry})`, backgroundSize: 'cover' } : { backgroundImage: `url(${sunset})`, backgroundSize: 'cover' }

  return (
    <div style={bgStyle} className='min-h-screen w-full bg-center bg-cover transition-all duration-500'>
      <div className='absolute top-6 right-6 z-40 flex gap-2'>
        <button onClick={()=>choose('starry')} className={`px-4 py-2 rounded-full ${theme==='starry' ? 'bg-white text-black' : 'bg-white/30 text-white'}`}>Starry Love 🌌</button>
        <button onClick={()=>choose('sunset')} className={`px-4 py-2 rounded-full ${theme==='sunset' ? 'bg-white text-black' : 'bg-white/30 text-white'}`}>Sunset Romance 🌅</button>
      </div>

      <div className='max-w-6xl mx-auto py-24 flex items-start justify-between px-8'>
        <div className='w-1/2 flex items-start justify-start'>
          <HeroCounter />
        </div>
        <div className='w-1/2'>
          <FeaturePolaroids theme={theme} />
        </div>
      </div>
    </div>
  )
}
