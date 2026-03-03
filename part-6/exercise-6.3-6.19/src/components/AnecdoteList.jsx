import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch()

  const handleVote = (id) => () => {
    dispatch(voteAnecdote(id))
    dispatch(setNotification(`You voted '${anecdote.content}'`))
  }

  return (
    <>
      <p>{anecdote.content}</p>
      <p>
        <span>Has {anecdote.votes}</span>&nbsp;
        <button onClick={handleVote(anecdote.id)}>Vote</button>
      </p>
    </>
  )
}

export const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    const filteredAnecdotes = anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase()),
    )
    return filteredAnecdotes.toSorted((a, b) => b.votes - a.votes)
  })

  return anecdotes.map((anecdote) => <Anecdote key={anecdote.id} anecdote={anecdote} />)
}
