import { createSlice } from '@reduxjs/toolkit'

import { SliceName } from '../consts/SliceName'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: SliceName.Blog,
  initialState: { list: [], current: null },
  reducers: {
    setBlogs: (state, action) => ({
      ...state,
      list: action.payload.toSorted((a, b) => b.likes - a.likes),
    }),
    appendBlog: (state, action) => ({
      ...state,
      list: [...state.list, action.payload].toSorted((a, b) => b.likes - a.likes),
    }),
    updateBlog: (state, action) => ({
      ...state,
      current: action.payload,
      list: state.list
        .map((b) => (b.id === action.payload.id ? action.payload : b))
        .toSorted((a, b) => b.likes - a.likes),
    }),
    deleteBlog: (state, action) => ({
      ...state,
      list: state.list.filter((b) => b.id !== action.payload),
    }),
    setCurrentBlog: (state, action) => ({
      ...state,
      current: action.payload,
    }),
    clearCurrentBlog: (state) => ({
      ...state,
      current: null,
    }),
  },
})

const { setBlogs, appendBlog, deleteBlog, setCurrentBlog } = blogSlice.actions

export const { clearCurrentBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const initializeBlogById = (id) => {
  return async (dispatch) => {
    const blog = await blogService.getById(id)
    dispatch(setCurrentBlog(blog))
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
