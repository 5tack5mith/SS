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
    const enhancedPrompt = `${prompt}

Return strictly as JSON in the format:
[{"question":"...","options":["...","..."]}]

Make sure the JSON is valid and properly formatted.`
    
    const result = await model.generateContent(enhancedPrompt)
    const response = await result.response
    const text = response.text()
    
    console.log('Gemini response received:', text)
    
    // Robust JSON extraction: strip code fences/prose and extract the first JSON array/object
    const cleaned = (() => {
      let t = text.trim()
      // Remove markdown code fences if present
      if (t.startsWith('```')) {
        t = t.replace(/^```[a-zA-Z]*\n?/,'').replace(/```\s*$/,'').trim()
      }
      // Try to extract the first JSON array
      const firstBracket = t.indexOf('[')
      const lastBracket = t.lastIndexOf(']')
      if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
        return t.slice(firstBracket, lastBracket + 1)
      }
      // Fallback: try to extract the first JSON object
      const firstBrace = t.indexOf('{')
      const lastBrace = t.lastIndexOf('}')
      if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        return `[${t.slice(firstBrace, lastBrace + 1)}]`
      }
      return t
    })()

    let parsed = JSON.parse(cleaned)
    // Normalize to expected shape
    if (!Array.isArray(parsed)) parsed = [parsed]
    parsed = parsed.map((item) => ({
      question: String(item.question || ''),
      options: Array.isArray(item.options) ? item.options.map(String) : [],
    })).filter(q => q.question && q.options.length > 0)
    return parsed
  } catch (error) {
    console.error('Detailed Gemini API error:', error)
    
    if (error.message.includes('API key')) {
      throw new Error('API key not configured. Please add VITE_GEMINI_API_KEY to your .env file.')
    } else if (error.message.includes('quota')) {
      throw new Error('API quota exceeded. Please check your Google AI Studio usage.')
    } else if (error.message.includes('permission')) {
      throw new Error('API permission denied. Please check your API key.')
    } else if (error.message.includes('JSON')) {
      throw new Error('Failed to parse quiz data. Please try again.')
    } else {
      throw new Error(`Failed to generate content: ${error.message}`)
    }
  }
}
