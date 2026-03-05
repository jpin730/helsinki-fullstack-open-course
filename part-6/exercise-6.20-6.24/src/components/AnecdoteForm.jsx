import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'

import { NotificationContext } from '../contexts/NotificationContext'
import { createAnecdote } from '../services/anecdotes'

export const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const { showNotification } = useContext(NotificationContext)

  const createAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (createdAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(createdAnecdote))
      showNotification(`You created '${createdAnecdote.content}'`)
    },
  })

  const handleCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value.trim()
    event.target.anecdote.value = ''
    createAnecdoteMutation.mutate(content)
  }

  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={handleCreate}>
        <input name="anecdote" />
        <button type="submit">Create</button>
      </form>
    </>
  )
}
