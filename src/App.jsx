import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LaunchScreen from './LaunchScreen'
import Home from './Home'

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LaunchScreen/>} />
        <Route path='/home' element={<Home/>} />
      </Routes>
    </BrowserRouter>
  )
}
