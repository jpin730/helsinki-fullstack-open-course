const JSON_SERVER_BASE_URL = import.meta.env.VITE_JSON_SERVER_BASE_URL

const baseUrl = `${JSON_SERVER_BASE_URL}/anecdotes`

export const getAllAnecdotes = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }

  return response.json()
}
