const JSON_SERVER_BASE_URL = import.meta.env.VITE_JSON_SERVER_BASE_URL

const baseUrl = `${JSON_SERVER_BASE_URL}/anecdotes`

export const getAllAnecdotes = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }

  return response.json()
}

export const createAnecdote = async (content) => {
  const anecdote = { content, votes: 0 }

  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(anecdote),
  })

  if (!response.ok) {
    throw new Error('Failed to create anecdote')
  }

  return response.json()
}

export const updateAnecdote = async (anecdote) => {
  const response = await fetch(`${baseUrl}/${anecdote.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(anecdote),
  })

  if (!response.ok) {
    throw new Error('Failed to update anecdote')
  }

  return response.json()
}
