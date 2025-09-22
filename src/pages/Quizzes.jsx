import React from 'react'
import { PolaroidQuizCard } from '../components/PolaroidQuizCard'
import { useTheme } from '../components/ThemeContext'
import BackgroundWrapper from '../components/BackgroundWrapper'

const quizTypes = [
  { emoji: '📸', label: 'Would You Rather', route: '/quizzes/would-you-rather', tilt: '-rotate-6' },
  { emoji: '👀', label: "Who's More Likely", route: '/quizzes/whos-more-likely', tilt: 'rotate-3' },
  { emoji: '💕', label: 'How Well Do You Know Me?', route: '/quizzes/how-well-do-you-know-me', tilt: '-rotate-2' },
  { emoji: '🤔', label: 'If You...', route: '/quizzes/if-you', tilt: 'rotate-1' },
]

export default function Quizzes(){
  const { theme, setTheme } = useTheme()
  const choose = (t)=> setTheme(t)

  return (
    <BackgroundWrapper>
      <div className='absolute top-6 right-6 z-40 flex gap-2'>
        <button onClick={()=>choose('starry')} className={`px-4 py-2 rounded-full ${theme==='starry' ? 'bg-white text-black' : 'bg-white/30 text-white'}`}>Starry Love 🌌</button>
        <button onClick={()=>choose('sunset')} className={`px-4 py-2 rounded-full ${theme==='sunset' ? 'bg-white text-black' : 'bg-white/30 text-white'}`}>Sunset Romance 🌅</button>
      </div>

      <div className='min-h-screen flex items-center justify-center px-6'>
        <div className='glass-card p-12 rounded-3xl shadow-2xl max-w-4xl w-full'>
          <h1 className='text-4xl font-marker mb-8 text-center'>Choose Your Quiz 🎯</h1>
          
          <div className="relative w-full flex items-center justify-center">
            <div className="grid grid-cols-2 gap-8 transform translate-y-6">
              {quizTypes.map((quiz, index) => (
                <div key={index}>
                  <PolaroidQuizCard
                    emoji={quiz.emoji}
                    label={quiz.label}
                    route={quiz.route}
                    theme={theme}
                    tilt={quiz.tilt}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </BackgroundWrapper>
  )
}


