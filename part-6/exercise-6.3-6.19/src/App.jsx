import { useSelector } from 'react-redux'

export const App = () => {
  const anecdotes = useSelector((state) => state)

  const vote = (id) => {
    // TODO: dispatch an action to update the store
    // eslint-disable-next-line no-console
    console.log('vote', id)
  }

  return (
    <main>
      <h2>Anecdotes</h2>

      <hr />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <p>{anecdote.content}</p>
          <p>
            <span>has {anecdote.votes}</span>&nbsp;
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </p>
        </div>
      ))}

      <hr />

      <h2>Create new</h2>

      <form>
        <p>
          <input />
        </p>
        <button>Create</button>
      </form>
    </main>
  )
}
