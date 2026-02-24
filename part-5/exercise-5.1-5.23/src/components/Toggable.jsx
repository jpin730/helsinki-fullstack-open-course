import { useImperativeHandle, useState } from 'react'

export const Togglable = ({ children, ref, label }) => {
  const [isVisible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible(!isVisible)

  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  })

  return (
    <div>
      <div style={{ display: isVisible ? 'none' : '' }}>
        <button onClick={toggleVisibility}>{label}</button>
      </div>
      <div style={{ display: isVisible ? '' : 'none' }}>
        {children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  )
}
