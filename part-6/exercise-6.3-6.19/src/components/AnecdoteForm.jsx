import { useDispatch } from 'react-redux'

import { createAnecdote } from '../reducers/anecdoteReducer'

export const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleCreation = (event) => {
    event.preventDefault()
    const content = event.target.content.value.trim()
    event.target.content.value = ''
    dispatch(createAnecdote(content))
  }

  return (
    <>
      <h2>Create new</h2>

      <form onSubmit={handleCreation}>
        <p>
          <input name="content" />
        </p>
        <button>Create</button>
      </form>
    </>
  )
}
