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
  const { data, isPending, isError } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAllAnecdotes,
  })

  if (isPending) {
    return <blockquote>Loading data...</blockquote>
  }

  if (isError) {
    return <blockquote>Anecdotes service not available due to problems in server</blockquote>
  }

  return data.map((anecdote) => <Anecdote key={anecdote.id} anecdote={anecdote} />)
}
