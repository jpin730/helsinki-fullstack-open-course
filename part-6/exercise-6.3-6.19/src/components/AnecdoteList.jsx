import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, onVote }) => (
  <>
    <p>{anecdote.content}</p>
    <p>
      <span>Has {anecdote.votes}</span>&nbsp;
      <button onClick={onVote}>Vote</button>
    </p>
  </>
)

export const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector((state) => [...state].sort((a, b) => b.votes - a.votes))

  const handleVote = (id) => () => dispatch(voteAnecdote(id))

  return (
    <>
      {anecdotes.map((anecdote) => (
        <Anecdote key={anecdote.id} anecdote={anecdote} onVote={handleVote(anecdote.id)} />
      ))}
    </>
  )
}
