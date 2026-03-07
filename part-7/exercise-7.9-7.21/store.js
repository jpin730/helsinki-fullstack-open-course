import { configureStore } from '@reduxjs/toolkit'

import { notificationReducer } from './src/reducers/notificationReducer'

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
  },
})
