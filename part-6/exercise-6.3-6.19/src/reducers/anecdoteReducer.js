import { createSlice } from '@reduxjs/toolkit'

import anecdotesService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes: (_, action) => action.payload,
    appendAnecdote: (state, action) => [...state, action.payload],
    updateAnecdote: (state, action) =>
      state.map((a) => (a.id === action.payload.id ? action.payload : a)),
  },
})

const { setAnecdotes, appendAnecdote, updateAnecdote } = anecdoteSlice.actions

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

export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const anecdote = getState().anecdotes.find((a) => a.id === id)
    const updatedAnecdote = await anecdotesService.update(id, {
      ...anecdote,
      votes: anecdote.votes + 1,
    })
    dispatch(updateAnecdote(updatedAnecdote))
  }
}

export const anecdoteReducer = anecdoteSlice.reducer
