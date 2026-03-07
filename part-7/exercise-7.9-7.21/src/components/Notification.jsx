import { useSelector } from 'react-redux'

export const Notification = () => {
  const notification = useSelector((state) => state.notification)

  return (
    notification && (
      <p
        style={{
          border: notification.isError ? '2px solid red' : '2px solid green',
          color: notification.isError ? 'red' : 'green',
          borderRadius: '5px',
          padding: '10px',
        }}
      >
        {notification.message}
      </p>
    )
  )
}
