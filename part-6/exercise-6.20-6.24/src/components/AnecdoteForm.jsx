import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createAnecdote } from '../services/anecdotes'

export const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const createAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (createdAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(createdAnecdote))
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
