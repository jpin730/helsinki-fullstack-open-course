import Search from './components/search'

const App = () => {
  const handleSearch = (searchTerm) => {
    console.log('Searching for:', searchTerm)
  }
  return (
    <main>
      <h1>Rest Countries</h1>

      <label htmlFor="search">
        Find countries
        <Search id="search" onSearch={handleSearch} />
      </label>
    </main>
  )
}

export default App
