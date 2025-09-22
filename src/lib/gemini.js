import { GoogleGenerativeAI } from '@google/generative-ai'

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY

console.log('Gemini API Key loaded:', API_KEY ? 'Yes (hidden)' : 'No - missing!')

if (!API_KEY) {
  console.error('VITE_GEMINI_API_KEY is not set in environment variables')
}

const genAI = new GoogleGenerativeAI(API_KEY)

export async function askGemini(prompt) {
  try {
    console.log('Calling Gemini API with prompt:', prompt)
    
    if (!API_KEY) {
      throw new Error('API key not configured. Please add VITE_GEMINI_API_KEY to your .env file.')
    }
    
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    console.log('Gemini response received:', text)
    return text
  } catch (error) {
    console.error('Detailed Gemini API error:', error)
    
    if (error.message.includes('API key')) {
      throw new Error('API key not configured. Please add VITE_GEMINI_API_KEY to your .env file.')
    } else if (error.message.includes('quota')) {
      throw new Error('API quota exceeded. Please check your Google AI Studio usage.')
    } else if (error.message.includes('permission')) {
      throw new Error('API permission denied. Please check your API key.')
    } else {
      throw new Error(`Failed to generate content: ${error.message}`)
    }
  }
}
