export const AnecdoteList = ({ anecdotes }) => (
  <main>
    <h2>Anecdotes</h2>

    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>{anecdote.content}</li>
      ))}
    </ul>
  </main>
)
