import React, { useEffect, useState } from 'react'

function calculateTogetherTime(startDate) {
  if (!startDate) return ''
  const start = new Date(startDate)
  const now = new Date()

  let years = now.getFullYear() - start.getFullYear()
  let months = now.getMonth() - start.getMonth()
  let days = now.getDate() - start.getDate()

  if (days < 0) {
    months -= 1
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate()
    days += prevMonth
  }
  if (months < 0) {
    years -= 1
    months += 12
  }

  const parts = []
  if (years > 0) parts.push(`${years} year${years > 1 ? 's' : ''}`)
  if (months > 0) parts.push(`${months} month${months > 1 ? 's' : ''}`)
  if (days > 0) parts.push(`${days} day${days > 1 ? 's' : ''}`)
  return parts.length ? `💖 ${parts.join(' ')} Together` : ''
}

export default function HeroCounter(){
  const [you,setYou] = useState('You 💌')
  const [them,setThem] = useState('Them 💌')
  const [date,setDate] = useState('')
  const [together,setTogether] = useState('')

  useEffect(()=>{
    const y = localStorage.getItem('you')
    const t = localStorage.getItem('them')
    const d = localStorage.getItem('date')
    if(y) setYou(y)
    if(t) setThem(t)
    if(d) { setDate(d); setTogether(calculateTogetherTime(d)) }
  },[])

  return (
    <div className="glass-card p-8 rounded-3xl shadow-xl max-w-lg text-center">
      <h2 className="text-3xl mb-4 font-marker">{you}  💕  {them}</h2>
      <p className="text-lg font-marker">{together}</p>
    </div>
  )
}
