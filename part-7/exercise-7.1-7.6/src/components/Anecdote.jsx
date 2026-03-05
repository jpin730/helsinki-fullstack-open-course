export const Anecdote = ({ anecdote }) => {
  if (anecdote == null) {
    return <blockquote>Anecdote not found</blockquote>
  }

  return (
    <main>
      <h2>{anecdote.content}</h2>

      <p>Has {anecdote.votes} votes</p>

      <p>
        For more info see&nbsp;
        <a href={anecdote.info} target="_blank" rel="noopener noreferrer">
          {anecdote.info}
        </a>
      </p>
    </main>
  )
}
