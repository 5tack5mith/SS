import React, { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

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
  
  // Only show non-zero values and add "together 💞" at the end
  return parts.length ? `${parts.join(' ')} together 💞` : ''
}

export default function HeroCounter(){
  const [you,setYou] = useState('You 💌')
  const [them,setThem] = useState('Them 💌')
  const [date,setDate] = useState('')
  const [together,setTogether] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    // Load profile from Supabase only (no localStorage fallback)
    loadUserData()
  },[])

  const loadUserData = async () => {
    try {
      // Fetch from Supabase
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('you_name, them_name, start_date')
          .eq('id', user.id)
          .maybeSingle()
        
        if (profileError) {
          // 406/No row is not a crash; show defaults
          console.warn('Profile fetch error:', profileError)
        }
        if (profileData) {
          const youName = profileData.you_name || 'You 💌'
          const themName = profileData.them_name || 'Them 💌'
          const startDate = profileData.start_date || ''
          
          setYou(youName)
          setThem(themName)
          setDate(startDate)
          setTogether(calculateTogetherTime(startDate))
        }
      }
    } catch (error) {
      console.error('Error loading user data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="glass-card p-8 rounded-3xl shadow-xl max-w-lg text-center">
        <h2 className="text-3xl mb-4 font-marker">Loading... ✨</h2>
      </div>
    )
  }

  return (
    <div className="glass-card p-8 rounded-3xl shadow-xl max-w-lg text-center">
      <h2 className="text-3xl mb-4 font-marker">{you} 💌 💕 {them} 💌</h2>
      <p className="text-lg font-marker">{together}</p>
    </div>
  )
}
