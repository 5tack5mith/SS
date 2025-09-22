import { useState, useEffect } from 'react'
import { askGemini } from '../lib/gemini'

const QuizPage = ({ title, emoji, prompt }) => {
  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [answers, setAnswers] = useState([])

  const generateQuiz = async () => {
    setLoading(true)
    setError(null)
    try {
      const quizData = await askGemini(prompt)
      setQuestions(quizData)
      setCurrentQuestion(0)
      setSelectedOption(null)
      setAnswers([])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleOptionSelect = (optionIndex) => {
    setSelectedOption(optionIndex)
  }

  const handleNextQuestion = () => {
    if (selectedOption !== null) {
      const newAnswers = [...answers, selectedOption]
      setAnswers(newAnswers)
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedOption(null)
      }
    }
  }

  const resetQuiz = () => {
    setQuestions([])
    setCurrentQuestion(0)
    setSelectedOption(null)
    setAnswers([])
    setError(null)
  }

  const isQuizComplete = currentQuestion === questions.length - 1 && selectedOption !== null

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              {emoji} {title}
            </h1>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-white/80 text-lg">Generating your quiz...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center">
              <p className="text-red-300 mb-4">{error}</p>
              <button
                onClick={generateQuiz}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
              >
                Try Again
              </button>
            </div>
          )}

          {/* No Questions State */}
          {!loading && !error && questions.length === 0 && (
            <div className="text-center">
              <p className="text-white/80 text-lg mb-6">
                Ready to test your knowledge? Let's generate some fun questions!
              </p>
              <button
                onClick={generateQuiz}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 transform hover:scale-105 text-lg"
              >
                Generate Quiz ✨
              </button>
            </div>
          )}

          {/* Quiz Questions */}
          {questions.length > 0 && !loading && (
            <div>
              {/* Progress Indicator */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/80 text-sm">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                  <span className="text-white/60 text-sm">
                    {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Question */}
              <div className="mb-8">
                <h2 className="text-2xl font-medium text-white mb-6 text-center leading-relaxed">
                  {questions[currentQuestion]?.question}
                </h2>

                {/* Options */}
                <div className="space-y-3">
                  {questions[currentQuestion]?.options?.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleOptionSelect(index)}
                      className={`w-full p-4 rounded-2xl text-left transition-all duration-300 transform hover:scale-[1.02] ${
                        selectedOption === index
                          ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                          : 'bg-white/10 hover:bg-white/20 text-white/90 hover:text-white border border-white/20'
                      }`}
                    >
                      <span className="font-medium">{option}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Next Button */}
              <div className="text-center">
                {isQuizComplete ? (
                  <div>
                    <p className="text-2xl font-bold text-white mb-4">Quiz Complete! 🎉</p>
                    <button
                      onClick={resetQuiz}
                      className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
                    >
                      Take Another Quiz
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    disabled={selectedOption === null}
                    className={`px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                      selectedOption !== null
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white'
                        : 'bg-white/20 text-white/50 cursor-not-allowed'
                    }`}
                  >
                    {currentQuestion === questions.length - 1 ? 'Finish Quiz 🎯' : 'Next Question →'}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default QuizPage
