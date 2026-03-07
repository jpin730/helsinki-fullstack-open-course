import { createSlice } from '@reduxjs/toolkit'

import { SliceName } from '../consts/SliceName'
import loginService from '../services/login'

const userSlice = createSlice({
  name: SliceName.User,
  initialState: { logged: null, list: [], current: null },
  reducers: {
    setLoggedUser: (state, action) => ({ ...state, logged: action.payload }),
    logout: (state) => ({ ...state, logged: null }),
  },
})

export const { setLoggedUser, logout } = userSlice.actions

export const login =
  ({ username, password }) =>
  async (dispatch) => {
    const user = await loginService.login({ username, password })
    dispatch(setLoggedUser(user))
  }

export const userReducer = userSlice.reducer
