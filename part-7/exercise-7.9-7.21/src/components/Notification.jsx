import { useNotification } from '../hooks/useNotification'

export const Notification = () => {
  const { notification } = useNotification()

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
