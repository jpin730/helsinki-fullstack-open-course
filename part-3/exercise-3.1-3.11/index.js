const express = require('express')
const HTTP_STATUS = require('./consts/http-status')
const PERSONS = require('./consts/persons')

const app = express()

app.get('/api', (_, response) => {
  response.send('Hello  World!')
})

app.get('/api/info', (_, response) => {
  const date = new Date()
  response.send(
    `<p>Phonebook has info for ${PERSONS.length} people</p><p>${date}</p>`
  )
})

app.get('/api/persons', (_, response) => {
  response.json(PERSONS)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = PERSONS.find((p) => p.id === id)

  if (person == null) {
    return response.status(HTTP_STATUS.NOT_FOUND).end()
  }

  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const personIndex = PERSONS.findIndex((p) => p.id === id)

  if (personIndex === -1) {
    return response.status(HTTP_STATUS.NOT_FOUND).end()
  }

  PERSONS.splice(personIndex, 1)
  response.status(HTTP_STATUS.NO_CONTENT).end()
})

const PORT = 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
