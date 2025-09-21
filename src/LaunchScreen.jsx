import launchBg from "./assets/StarryNightResized.png";
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LaunchScreen(){
  const [you,setYou] = useState('')
  const [them,setThem] = useState('')
  const [date,setDate] = useState('')
  const navigate = useNavigate()

  useEffect(()=>{
    const savedYou = localStorage.getItem('you')
    const savedThem = localStorage.getItem('them')
    const savedDate = localStorage.getItem('date')
    if(savedYou) setYou(savedYou)
    if(savedThem) setThem(savedThem)
    if(savedDate) setDate(savedDate)
  },[])

  function start(){
    localStorage.setItem('you', you || 'You 💌')
    localStorage.setItem('them', them || 'Them 💌')
    localStorage.setItem('date', date || '')
    navigate('/home')
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${launchBg})` }}
    >
      <div className="glass-card rounded-3xl p-12 w-[720px] shadow-2xl">
        <h1 className="text-4xl text-center font-marker mb-6">Welcome to the Stars ✨</h1>
        <div className="space-y-4">
          <input value={you} onChange={e=>setYou(e.target.value)} placeholder="You 💌" className="w-full p-4 rounded-full bg-white/30 backdrop-blur-md outline-none" />
          <input value={them} onChange={e=>setThem(e.target.value)} placeholder="Them 💌" className="w-full p-4 rounded-full bg-white/30 backdrop-blur-md outline-none" />
          <input value={date} onChange={e=>setDate(e.target.value)} placeholder="When it Started 💞" type="date" className="w-full p-4 rounded-full bg-white/30 backdrop-blur-md outline-none" />
          <button onClick={start} className="w-full py-4 rounded-full bg-gradient-to-r from-violet-500 to-pink-400 text-white font-bold">Let's Get Writing ✍️💕</button>
        </div>
      </div>
    </div>
  )
}
