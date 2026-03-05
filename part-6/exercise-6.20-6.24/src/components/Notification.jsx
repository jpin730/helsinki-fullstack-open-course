import { useContext } from 'react'

import { NotificationContext } from '../contexts/NotificationContext'

export const Notification = () => {
  const { notification } = useContext(NotificationContext)

  return notification && <blockquote>{notification}</blockquote>
}
