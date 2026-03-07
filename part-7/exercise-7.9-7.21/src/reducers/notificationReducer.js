import { createSlice } from '@reduxjs/toolkit'

import { SliceName } from '../consts/SliceName'

const notificationSlice = createSlice({
  name: SliceName.Notification,
  initialState: null,
  reducers: {
    setNotification: (_, action) => action.payload,
    clearNotification: () => null,
  },
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const notificationReducer = notificationSlice.reducer
