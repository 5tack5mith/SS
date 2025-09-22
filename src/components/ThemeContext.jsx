import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const ThemeContext = createContext({ theme: 'starry', toggle: () => {}, setTheme: () => {} })

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('starry')

  useEffect(() => {
    try {
      const saved = localStorage.getItem('theme')
      if (saved === 'starry' || saved === 'sunset') setTheme(saved)
    } catch {}
  }, [])

  const toggle = () => setTheme(prev => {
    const next = prev === 'starry' ? 'sunset' : 'starry'
    try { localStorage.setItem('theme', next) } catch {}
    return next
  })

  const value = useMemo(() => ({ theme, toggle, setTheme: (t) => {
    try { localStorage.setItem('theme', t) } catch {}
    setTheme(t)
  }}), [theme])

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)


