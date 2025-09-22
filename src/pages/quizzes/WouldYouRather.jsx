import { useTheme } from '../../components/ThemeContext'
import BackgroundWrapper from '../../components/BackgroundWrapper'
import { useNavigate } from 'react-router-dom'
import QuizPage from '../../components/QuizPage'
import starry from '../../assets/StarryNightResized.png'
import sunset from '../../assets/Romantic_sunset.png'

const WouldYouRather = () => {
  const navigate = useNavigate()
  const { theme, setTheme } = useTheme()
  const choose = (t)=> setTheme(t)

  return (
    <BackgroundWrapper>
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-10">
        <div className="bg-white/10 backdrop-blur-md rounded-full p-2 border border-white/20">
          <button
            onClick={() => choose('starry')}
            className={`w-8 h-8 rounded-full mx-1 transition-all duration-300 ${
              theme === 'starry' 
                ? 'ring-2 ring-white shadow-lg' 
                : 'hover:scale-110'
            }`}
            style={{
              backgroundImage: `url(${starry})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
            title="Starry Love Theme"
          />
          <button
            onClick={() => choose('sunset')}
            className={`w-8 h-8 rounded-full mx-1 transition-all duration-300 ${
              theme === 'sunset' 
                ? 'ring-2 ring-white shadow-lg' 
                : 'hover:scale-110'
            }`}
            style={{
              backgroundImage: `url(${sunset})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
            title="Sunset Romance Theme"
          />
        </div>
      </div>

      {/* Back Button */}
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={() => navigate('/quizzes')}
          className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-4 py-2 rounded-full border border-white/20 transition-all duration-300 transform hover:scale-105"
        >
          ← Back
        </button>
      </div>

      <QuizPage
        title="Would You Rather"
        emoji="📸"
        prompt="Generate 5 'Would You Rather' questions for couples with 2 fun options each."
      />
    </BackgroundWrapper>
  )
}

export default WouldYouRather
