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
  },
})

export const { setLoggedUser, logout } = userSlice.actions

const { setUsers } = userSlice.actions

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

export const userReducer = userSlice.reducer
