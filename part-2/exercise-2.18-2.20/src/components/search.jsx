import { useEffect, useState } from 'react'
import useDebounce from '../hooks/useDebounce'

const Search = ({ id, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 500)

  useEffect(() => {
    onSearch(debouncedSearch.trim())
  }, [debouncedSearch, onSearch])

  return <input id={id} onChange={(e) => setSearchTerm(e.target.value)} />
}

export default Search
