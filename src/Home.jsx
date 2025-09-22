import React from 'react'
import HeroCounter from './components/HeroCounter'
import { FeaturePolaroids } from './components/FeaturePolaroids'
import { useTheme } from './components/ThemeContext'
import BackgroundWrapper from './components/BackgroundWrapper'

export default function Home(){
  const { theme, setTheme } = useTheme()
  const choose = (t)=> setTheme(t)

  return (
    <BackgroundWrapper>
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
    </BackgroundWrapper>
  )
}
