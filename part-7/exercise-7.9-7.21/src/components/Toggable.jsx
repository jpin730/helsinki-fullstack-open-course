import { useState } from 'react'

import { TogglableContext } from '../contexts/TogglableContext'

export const Togglable = ({ children, label }) => {
  const [isVisible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible(!isVisible)

  return (
    <TogglableContext.Provider value={{ toggleVisibility }}>
      <div>
        <div style={{ display: isVisible ? 'none' : '' }}>
          <button onClick={toggleVisibility}>{label}</button>
        </div>
        <div style={{ display: isVisible ? '' : 'none' }}>
          {children}
          <button onClick={toggleVisibility}>Cancel</button>
        </div>
      </div>
    </TogglableContext.Provider>
  )
}
