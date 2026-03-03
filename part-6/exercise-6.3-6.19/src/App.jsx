import { AnecdoteForm } from './components/AnecdoteForm'
import { AnecdoteList } from './components/AnecdoteList'

export const App = () => {
  return (
    <main>
      <h2>Anecdotes</h2>
      <hr />
      <AnecdoteList />
      <hr />
      <AnecdoteForm />
    </main>
  )
}
