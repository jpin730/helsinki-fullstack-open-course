import { createSlice } from '@reduxjs/toolkit'

import { SliceName } from '../const/SliceName'

const DEFAULT_DURATION_IN_SECONDS = 5

const notificationSlice = createSlice({
  name: SliceName.Notification,
  initialState: null,
  reducers: {
    setNotification: (_, action) => action.payload,
    clearNotification: () => null,
  },
})

const { setNotification, clearNotification } = notificationSlice.actions

let timeoutId = null

export const showNotification = (
  message,
  isError = false,
  duration = DEFAULT_DURATION_IN_SECONDS,
) => {
  return (dispatch) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    dispatch(setNotification({ message, isError }))

    timeoutId = setTimeout(() => {
      dispatch(clearNotification())
      timeoutId = null
    }, duration * 1000)
  }
}

export const notificationReducer = notificationSlice.reducer
