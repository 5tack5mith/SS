import React from 'react'
import { PolaroidCard } from './PolaroidCard'

const features = [
  { id: 'memory-tree', icon: '🌳', title: 'Memory Tree', rotation: '-rotate-6' },
  { id: 'notes', icon: '📝', title: 'Notes', rotation: 'rotate-3' },
  { id: 'date-ideas', icon: '💡', title: 'Date Ideas', rotation: '-rotate-2' },
  { id: 'quizzes', icon: '🎯', title: 'Quizzes', rotation: 'rotate-1' },
]

export function FeaturePolaroids({ theme }) {
  return (
    <div className="relative w-full flex items-center justify-end pr-28">
      <div className="grid grid-cols-2 gap-8 transform translate-y-6">
        {features.map((f)=> (
          <div key={f.id} className={`transform ${f.rotation}`}>
            <PolaroidCard
              title={f.title}
              icon={f.icon}
              navigateTo={`/${f.id}`}
              theme={theme}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
