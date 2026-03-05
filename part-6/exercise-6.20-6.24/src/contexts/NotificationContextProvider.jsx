import { useCallback, useReducer, useRef } from 'react'

import { NotificationContext } from './NotificationContext'

const NotificationActionType = {
  SetNotification: 'SET_NOTIFICATION',
  ClearNotification: 'CLEAR_NOTIFICATION',
}

const INITIAL_NOTIFICATION_STATE = null

const notificationReducer = (state, action) => {
  switch (action.type) {
    case NotificationActionType.SetNotification:
      return action.payload
    case NotificationActionType.ClearNotification:
      return null
    default:
      return state
  }
}

export const NotificationContextProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(notificationReducer, INITIAL_NOTIFICATION_STATE)
  const timeoutRef = useRef(null)

  const showNotification = useCallback((message, timeoutSeconds = 5) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    dispatch({ type: NotificationActionType.SetNotification, payload: message })

    timeoutRef.current = setTimeout(() => {
      dispatch({ type: NotificationActionType.ClearNotification })
    }, timeoutSeconds * 1000)
  }, [])

  return (
    <NotificationContext.Provider value={{ notification, showNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}
