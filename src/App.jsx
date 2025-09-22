import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LaunchScreen from './LaunchScreen'
import Home from './Home'
import MemoryTree from './pages/MemoryTree'
import Notes from './pages/Notes'
import Quizzes from './pages/Quizzes'
import DateIdeas from './pages/DateIdeas'
import WouldYouRather from './pages/quizzes/WouldYouRather'
import WhosMoreLikely from './pages/quizzes/WhosMoreLikely'
import HowWellDoYouKnowMe from './pages/quizzes/HowWellDoYouKnowMe'
import IfYou from './pages/quizzes/IfYou'
import { ThemeProvider } from './components/ThemeContext'

export default function App(){
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LaunchScreen/>} />
          <Route path='/home' element={<Home/>} />
          <Route path='/memory-tree' element={<MemoryTree/>} />
          <Route path='/notes' element={<Notes/>} />
          <Route path='/quizzes' element={<Quizzes/>} />
          <Route path='/date-ideas' element={<DateIdeas/>} />
          <Route path='/quizzes/would-you-rather' element={<WouldYouRather/>} />
          <Route path='/quizzes/whos-more-likely' element={<WhosMoreLikely/>} />
          <Route path='/quizzes/how-well-do-you-know-me' element={<HowWellDoYouKnowMe/>} />
          <Route path='/quizzes/if-you' element={<IfYou/>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
