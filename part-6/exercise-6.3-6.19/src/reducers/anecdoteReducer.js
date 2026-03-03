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
    appendAnecdote: (state, action) => [...state, action.payload],
    setAnecdotes: (_, action) => action.payload,
  },
})

const { setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const createdAnecdote = await anecdotesService.create(content)
    dispatch(appendAnecdote(createdAnecdote))
  }
}

export const { voteAnecdote } = anecdoteSlice.actions

export const anecdoteReducer = anecdoteSlice.reducer
