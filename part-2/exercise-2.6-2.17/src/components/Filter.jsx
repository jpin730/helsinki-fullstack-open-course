export const Filter = ({ filter, onChange }) => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="filter">Filter shown with</label>
      <input id="filter" value={filter} onChange={({ target }) => onChange(target.value)} />
    </form>
  )
}
