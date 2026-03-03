import { AnecdoteForm } from './components/AnecdoteForm'
import { AnecdoteList } from './components/AnecdoteList'
import { Filter } from './components/Filter'
import { Notification } from './components/Notification'

export const App = () => {
  return (
    <main>
      <h2>Anecdotes</h2>
      <Notification />
      <hr />
      <Filter />
      <AnecdoteList />
      <hr />
      <AnecdoteForm />
    </main>
  )
}
