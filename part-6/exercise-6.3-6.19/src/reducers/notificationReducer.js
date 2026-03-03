import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification: (_, action) => action.payload,
    clearNotification: () => null,
  },
})

const { setNotification, clearNotification } = notificationSlice.actions

let timeoutId = null

export const showNotification = (message, duration) => {
  return (dispatch) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    dispatch(setNotification(message))

    timeoutId = setTimeout(() => {
      dispatch(clearNotification())
      timeoutId = null
    }, duration * 1000)
  }
}

export const notificationReducer = notificationSlice.reducer
