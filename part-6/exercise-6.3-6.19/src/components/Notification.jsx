import { useSelector } from 'react-redux'

export const Notification = () => {
  const notification = useSelector((state) => state.notification)

  return notification && <blockquote>{notification}</blockquote>
}
