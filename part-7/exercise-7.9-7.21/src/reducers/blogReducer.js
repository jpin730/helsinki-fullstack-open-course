import { createSlice } from '@reduxjs/toolkit'

import { SliceName } from '../const/SliceName'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: SliceName.Blog,
  initialState: [],
  reducers: {
    setBlogs: (_, action) => action.payload.toSorted((a, b) => b.likes - a.likes),
    appendBlog: (state, action) => [...state, action.payload],
  },
})

const { setBlogs, appendBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = ({ title, author, url, token }) => {
  return async (dispatch) => {
    const blog = await blogService.create({ title, author, url }, token)
    dispatch(appendBlog(blog))
    return blog
  }
}

export const blogReducer = blogSlice.reducer
