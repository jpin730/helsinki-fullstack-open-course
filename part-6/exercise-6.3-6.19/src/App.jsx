import { AnecdoteForm } from './components/AnecdoteForm'
import { AnecdoteList } from './components/AnecdoteList'
import { Filter } from './components/Filter'

export const App = () => {
  return (
    <main>
      <h2>Anecdotes</h2>
      <hr />
      <Filter />
      <AnecdoteList />
      <hr />
      <AnecdoteForm />
    </main>
  )
}
