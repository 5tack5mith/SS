import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export function PolaroidQuizCard({ emoji, label, route, theme, tilt }) {
  const [isAnimating, setIsAnimating] = useState(false)
  const navigate = useNavigate()
  
  const bg = theme === 'starry' ? 'bg-white/20' : 'bg-white/30'
  
  const handleClick = () => {
    console.log('Quiz polaroid clicked, starting animation...')
    setIsAnimating(true)
    
    // Navigate after animation completes
    setTimeout(() => {
      console.log('Animation complete, navigating to:', route)
      navigate(route)
    }, 600)
  }
  
  return (
    <motion.button
      onClick={handleClick}
      disabled={isAnimating}
      className={`polaroid ${bg} p-6 w-64 h-80 text-left disabled:pointer-events-none relative transform ${tilt}`}
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.2, rotate: 5 }}
      animate={isAnimating ? {
        scale: 3,
        position: 'fixed',
        left: '50%',
        top: '50%',
        zIndex: 9999
      } : {
        scale: 1,
        position: 'relative',
        zIndex: 1
      }}
      transition={{
        duration: 0.6,
        ease: "easeInOut"
      }}
      style={isAnimating ? {
        transform: 'translate(-50%, -50%)'
      } : {}}
    >
      <div className="text-6xl mb-4">{emoji}</div>
      <div className="text-xl font-marker">{label}</div>
    </motion.button>
  )
}
