const Anecdote = ({ anecdote }) => {
  const handleVote = (anecdote) => () => {}

  return (
    <>
      <p>{anecdote.content}</p>
      <p>
        <span>Has {anecdote.votes}</span> &nbsp;
        <button onClick={handleVote(anecdote.id)}>Vote</button>
      </p>
    </>
  )
}

export const AnecdoteList = ({ anecdotes }) =>
  anecdotes.map((anecdote) => <Anecdote key={anecdote.id} anecdote={anecdote} />)
