import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (content) => ({ content, id: getId(), votes: 0 })

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote: (state, action) => {
      const id = action.payload.id
      return state.map((a) => (a.id === id ? { ...a, votes: a.votes + 1 } : a))
    },
    createAnecdote: (state, action) => [...state, asObject(action.payload)],
    setAnecdotes: (_, action) => action.payload,
  },
})

export const { voteAnecdote, createAnecdote, setAnecdotes } = anecdoteSlice.actions

export const anecdoteReducer = anecdoteSlice.reducer
