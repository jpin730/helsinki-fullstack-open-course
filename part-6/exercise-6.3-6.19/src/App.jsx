import { useDispatch, useSelector } from 'react-redux'
import { AnecdoteForm } from './components/AnecdoteForm'
import { voteAnecdote } from './reducers/anecdoteReducer'

export const App = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => [...state].sort((a, b) => b.votes - a.votes))

  const handleAnecdoteVote = (id) => () => dispatch(voteAnecdote(id))

  return (
    <main>
      <h2>Anecdotes</h2>

      <hr />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <p>{anecdote.content}</p>
          <p>
            <span>Has {anecdote.votes}</span>&nbsp;
            <button onClick={handleAnecdoteVote(anecdote.id)}>Vote</button>
          </p>
        </div>
      ))}

      <hr />

      <h2>Create new</h2>

      <AnecdoteForm />
    </main>
  )
}
