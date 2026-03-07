import { useContext } from 'react'

import { TogglableContext } from '../contexts/TogglableContext'

export const useTogglable = () => useContext(TogglableContext)
