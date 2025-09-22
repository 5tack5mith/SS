import React from 'react'
import { useTheme } from './ThemeContext'
import starry from '../assets/StarryNightResized.png'
import sunset from '../assets/Romantic_sunset.png'

const BackgroundWrapper = ({ children, className = '' }) => {
  const { theme } = useTheme()
  const bg = theme === 'sunset' ? sunset : starry

  return (
    <div 
      className={`min-h-screen w-full bg-center bg-cover transition-all duration-500 ${className}`}
      style={{ backgroundImage: `url(${bg})` }}
    >
      {children}
    </div>
  )
}

export default BackgroundWrapper


