const express = require('express')
const morgan = require('morgan')

if (process.env.NODE_ENV !== 'production') {
  process.loadEnvFile()
}

const HTTP_STATUS = require('./consts/http-status')
const PERSONS = require('./consts/persons')

const Person = require('./models/person')

const requestLogger = require('./utils/request-logger')
const errorHandler = require('./utils/error-handler')

const app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(morgan(requestLogger))

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
  Person.find({}).then((persons) => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then((person) => {
    if (person) {
      return response.json(person)
    }

    response.status(HTTP_STATUS.NOT_FOUND).end()
  }).catch((error) => next(error))
})

app.post('/api/persons', (request, response) => {
  const { name, number } = request.body

  if (name == null || number == null) {
    return response.status().json({ error: 'name or number is missing' })
  }

  // TODO: Check if name already exists in the database
  // const nameExists = PERSONS.some((p) => p.name === name)

  // if (nameExists) {
  //   return response
  //     .status(HTTP_STATUS.BAD_REQUEST)
  //     .json({ error: 'name must be unique' })
  // }

  const newPerson = new Person({
    name,
    number
  })

  newPerson.save().then((savedPerson) => {
    response.status(HTTP_STATUS.CREATED).json(savedPerson)
  })
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

app.use(errorHandler)

const PORT = process.env.PORT ?? 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
