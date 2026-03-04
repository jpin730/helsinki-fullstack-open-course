import { useQuery } from '@tanstack/react-query'
import { getAllAnecdotes } from '../services/anecdotes'

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

export const AnecdoteList = () => {
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAllAnecdotes,
  })

  if (result.isLoading) {
    return <blockquote>Loading data...</blockquote>
  }

  const anecdotes = result.data

  return anecdotes.map((anecdote) => <Anecdote key={anecdote.id} anecdote={anecdote} />)
}
