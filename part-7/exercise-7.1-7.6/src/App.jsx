import { useRef, useState } from 'react'
import { Route, Routes, useMatch, useNavigate } from 'react-router'

import { About } from './components/About'
import { Anecdote } from './components/Anecdote'
import { AnecdoteList } from './components/AnecdoteList'
import { CreateNew } from './components/CreateNew'
import { Footer } from './components/Footer'
import { Menu } from './components/Menu'
import { Notification } from './components/Notification'
import { ANECDOTES } from './const/anecdotes'
import { Path } from './const/path'

const NOTIFICATION_TIMEOUT_IN_SECONDS = 5

export const App = () => {
  const navigate = useNavigate()

  const [anecdotes, setAnecdotes] = useState(ANECDOTES)
  const [notification, setNotification] = useState(null)

  const notificationTimeoutRef = useRef(null)

  const anecdoteWithIdMatch = useMatch(Path.AnecdoteWithId)

  const anecdote = anecdoteWithIdMatch
    ? anecdotes.find((note) => note.id === Number(anecdoteWithIdMatch.params.id))
    : null

  const addNewAnecdote = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    navigate(Path.Anecdotes)
    notify(`A new anecdote "${anecdote.content}" created!`)
  }

  const vote = (id) => {
    setAnecdotes(anecdotes.map((a) => (a.id === id ? { ...a, votes: a.votes + 1 } : a)))
  }

  const notify = (message) => {
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current)
    }

    setNotification(message)

    notificationTimeoutRef.current = setTimeout(() => {
      setNotification(null)
    }, NOTIFICATION_TIMEOUT_IN_SECONDS * 1000)
  }

  return (
    <div>
      <h1>Software anecdotes</h1>

      <Menu />

      <Notification notification={notification} />

      <hr />

      <Routes>
        <Route path={Path.AnecdoteWithId} element={<Anecdote anecdote={anecdote} />} />
        <Route path={Path.Anecdotes} element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path={Path.About} element={<About />} />
        <Route path={Path.CreateNew} element={<CreateNew onCreate={addNewAnecdote} />} />
      </Routes>

      <Footer />
    </div>
  )
}
