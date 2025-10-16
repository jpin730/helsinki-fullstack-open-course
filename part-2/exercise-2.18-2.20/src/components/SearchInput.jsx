const SearchInput = ({ id, onSearch }) => {
  const handleChange = (e) => {
    onSearch(e.target.value.trim())
  }

  return <input id={id} onChange={handleChange} />
}

export default SearchInput
