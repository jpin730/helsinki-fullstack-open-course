import { createSlice } from '@reduxjs/toolkit'

import { SliceName } from '../consts/SliceName'
import loginService from '../services/login'
import usersService from '../services/users'

const userSlice = createSlice({
  name: SliceName.User,
  initialState: { logged: null, list: [], current: null },
  reducers: {
    setLoggedUser: (state, action) => ({ ...state, logged: action.payload }),
    logout: (state) => ({ ...state, logged: null }),
    setUsers: (state, action) => ({ ...state, list: action.payload }),
    setCurrentUser: (state, action) => ({ ...state, current: action.payload }),
    clearCurrentUser: (state) => ({ ...state, current: null }),
  },
})

export const { setLoggedUser, logout, clearCurrentUser } = userSlice.actions

const { setUsers, setCurrentUser } = userSlice.actions

export const login =
  ({ username, password }) =>
  async (dispatch) => {
    const user = await loginService.login({ username, password })
    dispatch(setLoggedUser(user))
  }

export const initializeUsers = () => async (dispatch) => {
  const users = await usersService.getAll()
  dispatch(setUsers(users))
}

export const initializeUserById = (id) => async (dispatch) => {
  const user = await usersService.getById(id)
  dispatch(setCurrentUser(user))
}

export const userReducer = userSlice.reducer
