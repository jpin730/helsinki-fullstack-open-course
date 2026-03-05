import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext, useRef } from 'react'

import { NotificationContext } from '../contexts/NotificationContext'
import { createAnecdote } from '../services/anecdotes'

export const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const { showNotification } = useContext(NotificationContext)
  const inputRef = useRef()

  const createAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (createdAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(createdAnecdote))
      inputRef.current.value = ''
      showNotification(`You created '${createdAnecdote.content}'`)
    },
    onError: (error) => {
      showNotification(error.message)
    },
  })

  const handleCreate = (event) => {
    event.preventDefault()
    const content = inputRef.current.value.trim()
    createAnecdoteMutation.mutate(content)
  }

  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={handleCreate}>
        <input name="anecdote" ref={inputRef} />
        <button type="submit">Create</button>
      </form>
    </>
  )
}
