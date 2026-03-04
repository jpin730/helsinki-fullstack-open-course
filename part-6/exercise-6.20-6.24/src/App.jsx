import { AnecdoteForm } from './components/AnecdoteForm'
import { AnecdoteList } from './components/AnecdoteList'
import { Notification } from './components/Notification'

export const App = () => {
  return (
    <main>
      <h1>Anecdote app</h1>
      <Notification />
      <hr />
      <AnecdoteForm />
      <hr />
      <AnecdoteList />
    </main>
  )
}
