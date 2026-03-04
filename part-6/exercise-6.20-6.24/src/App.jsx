import { AnecdoteForm } from './components/AnecdoteForm'
import { AnecdoteList } from './components/AnecdoteList'
import { Notification } from './components/Notification'

export const App = () => {
  const handleVote = (anecdote) => {
    console.log('vote')
  }

  const anecdotes = [
    {
      content: 'If it hurts, do it more often',
      id: '47145',
      votes: 0,
    },
  ]

  return (
    <main>
      <h1>Anecdote app</h1>
      <Notification />
      <hr />
      <AnecdoteForm />
      <hr />
      <AnecdoteList anecdotes={anecdotes} />
    </main>
  )
}
