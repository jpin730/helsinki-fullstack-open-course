import { useDispatch } from 'react-redux'

import { setFilter } from '../reducers/filterReducer'

export const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const filter = event.target.value
    dispatch(setFilter(filter.trim()))
  }

  return (
    <label>
      Filter <input onChange={handleChange} />
    </label>
  )
}
