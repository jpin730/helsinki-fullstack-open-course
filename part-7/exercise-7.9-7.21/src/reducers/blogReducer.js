import { createSlice } from '@reduxjs/toolkit'

import { SliceName } from '../const/SliceName'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: SliceName.Blog,
  initialState: [],
  reducers: {
    setBlogs: (_, action) => action.payload.toSorted((a, b) => b.likes - a.likes),
  },
})

const { setBlogs } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const blogReducer = blogSlice.reducer
