import { ERROR_MESSAGE_PREFIX } from '../consts/error-message-prefix'

export const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  const className = message.startsWith(ERROR_MESSAGE_PREFIX) ? 'message error' : 'message'
  const displayMessage = message.replace(ERROR_MESSAGE_PREFIX, '')

  return <div className={className}>{displayMessage}</div>
}
