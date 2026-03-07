import { useContext } from 'react'
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'
import { useDispatch } from 'react-redux'

import { NotificationContext } from '../contexts/NotificationContext'
import { clearNotification } from '../reducers/notificationReducer'

export const Notification = () => {
  const dispatch = useDispatch()

  const { notification } = useContext(NotificationContext)

  const handleClose = () => {
    dispatch(clearNotification())
  }

  const bg = notification?.isError ? 'danger' : 'success'
  const header = notification?.isError ? 'Error' : 'Success'

  return (
    <ToastContainer position="bottom-center" className="p-3">
      <Toast bg={bg} show={!!notification} onClose={handleClose} animation={false} autohide={false}>
        <Toast.Header>
          <strong className="me-auto">{header}</strong>
        </Toast.Header>
        <Toast.Body className="text-white fw-semibold">{notification?.message}</Toast.Body>
      </Toast>
    </ToastContainer>
  )
}
