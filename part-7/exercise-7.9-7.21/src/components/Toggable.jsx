import { useState } from 'react'
import { Button } from 'react-bootstrap'

import { TogglableContext } from '../contexts/TogglableContext'

export const Togglable = ({ children, label }) => {
  const [isVisible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible(!isVisible)

  const CancelButton = () => (
    <Button onClick={toggleVisibility} variant="light">
      Cancel
    </Button>
  )

  return (
    <TogglableContext.Provider value={{ toggleVisibility, cancelButton: <CancelButton /> }}>
      <div style={{ display: isVisible ? 'none' : '' }}>
        <Button onClick={toggleVisibility}>{label}</Button>
      </div>
      <div style={{ display: isVisible ? '' : 'none' }}>{children}</div>
    </TogglableContext.Provider>
  )
}
