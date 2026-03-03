import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AnecdoteForm } from './components/AnecdoteForm'
import { AnecdoteList } from './components/AnecdoteList'
import { Filter } from './components/Filter'
import { Notification } from './components/Notification'
import { setAnecdotes } from './reducers/anecdoteReducer'
import anecdotesService from './services/anecdotes'

export const App = () => {
  const dispatch = useDispatch()

  useEffect(
    function initializeAnecdotes() {
      anecdotesService.getAll().then((anecdotes) => dispatch(setAnecdotes(anecdotes)))
    },
    [dispatch],
  )

  return (
    <main>
      <h2>Anecdotes</h2>
      <Notification />
      <hr />
      <Filter />
      <AnecdoteList />
      <hr />
      <AnecdoteForm />
    </main>
  )
}
