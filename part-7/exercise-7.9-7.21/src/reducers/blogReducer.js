import { createSlice } from '@reduxjs/toolkit'

import { SliceName } from '../const/SliceName'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: SliceName.Blog,
  initialState: [],
  reducers: {
    setBlogs: (_, action) => action.payload.toSorted((a, b) => b.likes - a.likes),
    appendBlog: (state, action) => [...state, action.payload],
    updateBlog: (state, action) =>
      state
        .map((b) => (b.id === action.payload.id ? action.payload : b))
        .toSorted((a, b) => b.likes - a.likes),
    deleteBlog: (state, action) => state.filter((b) => b.id !== action.payload),
  },
})

const { setBlogs, appendBlog, deleteBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = ({ title, author, url }, token) => {
  return async (dispatch) => {
    const createdBlog = await blogService.create({ title, author, url }, token)
    dispatch(appendBlog(createdBlog))
    return createdBlog
  }
}

export const likeBlog = ({ id, user, likes, author, title, url }) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.updateById(id, {
      user: user.id,
      likes: likes + 1,
      author,
      title,
      url,
    })
    dispatch(blogSlice.actions.updateBlog(updatedBlog))
    return updatedBlog
  }
}

export const deleteBlogById = (id, token) => {
  return async (dispatch) => {
    await blogService.deleteById(id, token)
    dispatch(deleteBlog(id))
  }
}

export const blogReducer = blogSlice.reducer
