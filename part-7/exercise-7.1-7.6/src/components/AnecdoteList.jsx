import { Link } from 'react-router'
import { Path } from '../const/path'

export const AnecdoteList = ({ anecdotes }) => {
  const getAnecdoteUrl = (id) => Path.AnecdoteWithId.replace(':id', id)

  return (
    <main>
      <h2>Anecdotes</h2>

      <ul>
        {anecdotes.map((anecdote) => (
          <li key={anecdote.id}>
            <Link to={getAnecdoteUrl(anecdote.id)}>{anecdote.content}</Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
