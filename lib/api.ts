// Use relative URLs for same-origin requests, or absolute URL if backend is separated
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' ? '' : 'http://localhost:3000')

export const api = {
  baseURL: API_BASE_URL,
  
  async getFAQs() {
    const response = await fetch(`${API_BASE_URL}/api/faqs`)
    if (!response.ok) throw new Error('Failed to fetch FAQs')
    return response.json()
  },

  async query(question: string) {
    const response = await fetch(`${API_BASE_URL}/api/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question }),
    })
    if (!response.ok) throw new Error('Failed to query')
    return response.json()
  },
}

