import React from 'react'

const features = [
  { id: 'memory-tree', icon: '🌳', title: 'Memory Tree', rotation: '-rotate-6' },
  { id: 'notes', icon: '📝', title: 'Notes', rotation: 'rotate-3' },
  { id: 'date-ideas', icon: '💡', title: 'Date Ideas', rotation: '-rotate-2' },
  { id: 'quizzes', icon: '🎯', title: 'Quizzes', rotation: 'rotate-1' },
]

export function FeaturePolaroids({ theme }) {
  const bg = theme === 'starry' ? 'bg-white/20' : 'bg-white/30'
  return (
    <div className="relative w-full flex items-center justify-end pr-28">
      <div className="grid grid-cols-2 gap-8 transform translate-y-6">
        {features.map((f)=> (
          <div key={f.id} className={`polaroid ${bg} p-6 w-64 h-80 transform ${f.rotation} transition-all duration-300 hover:scale-105 hover:z-20`}>
            <div className="text-6xl mb-4">{f.icon}</div>
            <div className="text-xl font-marker">{f.title}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
