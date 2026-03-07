import { useState } from 'react'
import Button from 'react-bootstrap/Button'

import { TogglableContext } from '../contexts/TogglableContext'

const CancelButton = ({ toggleVisibility }) => (
  <Button onClick={toggleVisibility} variant="light">
    Cancel
  </Button>
)

export const Togglable = ({ children, label, labelVariant }) => {
  const [isVisible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible(!isVisible)

  return (
    <TogglableContext.Provider
      value={{
        toggleVisibility,
        cancelButton: <CancelButton toggleVisibility={toggleVisibility} />,
      }}
    >
      <div style={{ display: isVisible ? 'none' : '' }}>
        <Button onClick={toggleVisibility} variant={labelVariant ?? 'secondary'}>
          {label}
        </Button>
      </div>
      <div style={{ display: isVisible ? '' : 'none' }}>{children}</div>
    </TogglableContext.Provider>
  )
}
