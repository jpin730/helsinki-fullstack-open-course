import { createSlice } from '@reduxjs/toolkit'

import { SliceName } from '../consts/SliceName'
import loginService from '../services/login'

const userSlice = createSlice({
  name: SliceName.User,
  initialState: null,
  reducers: {
    setUser: (_, action) => action.payload,
    logout: () => null,
  },
})

export const { setUser, logout } = userSlice.actions

export const login =
  ({ username, password }) =>
  async (dispatch) => {
    const user = await loginService.login({ username, password })
    dispatch(setUser(user))
  }

export const userReducer = userSlice.reducer
