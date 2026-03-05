import { useState } from 'react'
import { Route, Routes, useMatch, useNavigate } from 'react-router'

import { About } from './components/About'
import { Anecdote } from './components/Anecdote'
import { AnecdoteList } from './components/AnecdoteList'
import { CreateNew } from './components/CreateNew'
import { Footer } from './components/Footer'
import { Menu } from './components/Menu'
import { Path } from './const/path'

export const App = () => {
  const navigate = useNavigate()

  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1,
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2,
    },
  ])

  const [notification, setNotification] = useState('')

  const anecdoteWithIdMatch = useMatch(Path.AnecdoteWithId)

  const anecdote = anecdoteWithIdMatch
    ? anecdotes.find((note) => note.id === Number(anecdoteWithIdMatch.params.id))
    : null

  const addNewAnecdote = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    navigate(Path.Anecdotes)
  }

  const vote = (id) => {
    setAnecdotes(anecdotes.map((a) => (a.id === id ? { ...a, votes: a.votes + 1 } : a)))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>

      <Menu />

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
