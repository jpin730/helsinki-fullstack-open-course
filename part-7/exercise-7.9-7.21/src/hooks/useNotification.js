import { useDispatch, useSelector } from 'react-redux'

import { useRef } from 'react'
import { setNotification } from '../reducers/notificationReducer'

const DEFAULT_DURATION_IN_SECONDS = 5

export const useNotification = () => {
  const dispatch = useDispatch()

  const notification = useSelector((state) => state.notification)

  const timeoutIdRef = useRef(null)

  const notify = (message, isError = false) => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current)
    }

    dispatch(setNotification({ message, isError }))

    timeoutIdRef.current = setTimeout(() => {
      dispatch(setNotification(null))
      timeoutIdRef.current = null
    }, DEFAULT_DURATION_IN_SECONDS * 1000)
  }

  const notifyError = (message) => notify(message, true)

  return { notification, notify, notifyError }
}
