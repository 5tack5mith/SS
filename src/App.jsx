import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LaunchScreen from './LaunchScreen'
import Home from './Home'
import MemoryTree from './pages/MemoryTree'
import Notes from './pages/Notes'
import Quizzes from './pages/Quizzes'
import DateIdeas from './pages/DateIdeas'

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LaunchScreen/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/memory-tree' element={<MemoryTree/>} />
        <Route path='/notes' element={<Notes/>} />
        <Route path='/quizzes' element={<Quizzes/>} />
        <Route path='/date-ideas' element={<DateIdeas/>} />
      </Routes>
    </BrowserRouter>
  )
}
