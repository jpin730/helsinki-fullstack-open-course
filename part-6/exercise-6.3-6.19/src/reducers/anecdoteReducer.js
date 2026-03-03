import { createSlice } from '@reduxjs/toolkit'

import anecdotesService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote: (state, action) => {
      const id = action.payload.id
      return state.map((a) => (a.id === id ? { ...a, votes: a.votes + 1 } : a))
    },
    createAnecdote: (state, action) => [...state, action.payload],
    setAnecdotes: (_, action) => action.payload,
  },
})

const { setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const { voteAnecdote, createAnecdote } = anecdoteSlice.actions

export const anecdoteReducer = anecdoteSlice.reducer
