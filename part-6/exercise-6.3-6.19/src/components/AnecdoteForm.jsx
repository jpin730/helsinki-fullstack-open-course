import { useDispatch } from 'react-redux'

import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

export const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleCreate = async (event) => {
    event.preventDefault()
    const content = event.target.content.value.trim()
    event.target.content.value = ''

    dispatch(createAnecdote(content))
    dispatch(showNotification(`You created '${content}'`, 5))
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
