require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Contact = require('./models/contact')

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('body', (req, _) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/', (req, res) => {
  res.send('<h1>Hi!</h1>')
})

app.get('/info', (req, res) => {
  //const info = `Phonebook has info for ${persons.length} people.`
  const info = `Phonebook has info for TODO people.`
  const date = new Date()
  res.send(`<p>${info}</p><p>${date}</p>`)
})

app.get('/api/persons', (req, res) => {
  Contact.find({}).then(result => {
  res.json(result)
  })
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).json({
      error: 'name is missing'
    })
  }
  /*else if (persons.find(p => p.name === body.name)) {
    return res.status(400).json({
      error: 'name must be unique'
    })
  }*/

  if (!body.number) {
    return res.status(400).json({
      error: 'number is missing'
    })
  }

  const person = new Contact({
    name: body.name,
    number: body.number,
  })

  person.save().then(result => {
    res.status(201).json(result)
  })
})

app.get('/api/persons/:id', (req, res) => {
  Contact.findById(req.params.id).then(result => {
    res.json(result)
    if (result) {
      res.json(result)
    } else {
      res.status(404).end()
    }
  })
})

app.delete('/api/persons/:id', (req, res) => {
  //const id = Number(req.params.id)
  //persons = persons.filter(p => p.id !== id)

  res.status(204).end()
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'})
}
app.use(unknownEndpoint)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})