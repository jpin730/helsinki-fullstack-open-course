import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearNotification } from '../reducers/notificationReducer'

const TIMEOUT_IN_SECONDS = 5

export const Notification = () => {
  const notification = useSelector((state) => state.notification)

  const dispatch = useDispatch()

  const timeoutRef = useRef(null)

  useEffect(
    function handleTimeout() {
      if (notification == null) {
        return
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        dispatch(clearNotification())
      }, TIMEOUT_IN_SECONDS * 1000)
    },
    [dispatch, notification],
  )

  return notification && <blockquote>{notification}</blockquote>
}
