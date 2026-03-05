import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'

import { NotificationContext } from '../contexts/NotificationContext'
import { getAllAnecdotes, updateAnecdote } from '../services/anecdotes'

const Anecdote = ({ anecdote }) => {
  const queryClient = useQueryClient()
  const { showNotification } = useContext(NotificationContext)

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      queryClient.setQueryData(['anecdotes'], (oldAnecdotes) =>
        oldAnecdotes.map((a) => (a.id === updatedAnecdote.id ? updatedAnecdote : a)),
      )
      showNotification(`You voted '${anecdote.content}'`)
    },
  })

  const handleVote = (anecdote) => () => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  return (
    <>
      <p>{anecdote.content}</p>
      <p>
        <span>Has {anecdote.votes}</span> &nbsp;
        <button onClick={handleVote(anecdote)}>Vote</button>
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
