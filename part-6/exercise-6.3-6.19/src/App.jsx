import { useDispatch, useSelector } from 'react-redux'
import { createAnecdote, voteAnecdote } from './reducers/anecdoteReducer'

export const App = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => [...state].sort((a, b) => b.votes - a.votes))

  const handleAnecdoteVote = (id) => () => dispatch(voteAnecdote(id))

  const handleAnecdoteCreation = (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    dispatch(createAnecdote(content))
  }

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

      <form onSubmit={handleAnecdoteCreation}>
        <p>
          <input name="content" />
        </p>
        <button>Create</button>
      </form>
    </main>
  )
}
