import { useDispatch } from 'react-redux'

import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import anecdotesService from '../services/anecdotes'

export const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleCreate = async (event) => {
    event.preventDefault()
    const content = event.target.content.value.trim()
    event.target.content.value = ''

    const createdAnecdote = await anecdotesService.create(content)

    dispatch(createAnecdote(createdAnecdote))
    dispatch(setNotification(`You created '${content}'`))
  }

  return (
    <>
      <h2>Create new</h2>

      <form onSubmit={handleCreate}>
        <p>
          <input name="content" />
        </p>
        <button>Create</button>
      </form>
    </>
  )
}
