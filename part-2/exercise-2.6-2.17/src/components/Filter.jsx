import { useState } from 'react'

export const Filter = ({ onChange }) => {
  const [filter, setFilter] = useState('')

  const handleChange = ({ target: { value } }) => {
    setFilter(value)
    onChange(value)
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="filter">Filter shown with</label>
      <input id="filter" value={filter} onChange={handleChange} />
    </form>
  )
}
