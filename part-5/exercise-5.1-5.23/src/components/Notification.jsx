export const Notification = ({ notification }) => {
  if (!notification) {
    return null
  }

  return (
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
}
