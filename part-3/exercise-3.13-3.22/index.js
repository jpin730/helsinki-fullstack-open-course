const express = require('express')
const morgan = require('morgan')

process.loadEnvFile()

const HTTP_STATUS = require('./consts/http-status')
const PERSONS = require('./consts/persons')

const Person = require('./models/person')

const app = express()

app.use(express.json())

// Manual CORS middleware
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')

//   // Handle preflight requests
//   if (req.method === 'OPTIONS') {
//     return res.sendStatus(200)
//   }

//   next()
// })

app.use(express.static('public'))

morgan.token('body', (req) =>
  req.body && Object.keys(req.body).length > 0 ? JSON.stringify(req.body) : ''
)

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

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

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = PERSONS.find((p) => p.id === id)

  if (person == null) {
    return response.status(HTTP_STATUS.NOT_FOUND).end()
  }

  response.json(person)
})

app.post('/api/persons', (request, response) => {
  const { name, number } = request.body

  if (name == null || number == null) {
    return response.status().json({ error: 'name or number is missing' })
  }

  const nameExists = PERSONS.some((p) => p.name === name)

  if (nameExists) {
    return response
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ error: 'name must be unique' })
  }

  const id = (Math.random() * 1000000).toFixed(0)
  const newPerson = { id, name, number }
  PERSONS.push(newPerson)

  response.status(HTTP_STATUS.CREATED).json(newPerson)
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

const PORT = process.env.PORT ?? 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
