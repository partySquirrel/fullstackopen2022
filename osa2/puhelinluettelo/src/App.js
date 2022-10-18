import {useState} from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    {id: 1, name: 'Arto Hellas', number: '040-123456'},
    {id: 2, name: 'Ada Lovelace', number: '39-44-5323523'},
    {id: 3, name: 'Dan Abramov', number: '12-43-234345'},
    {id: 4, name: 'Mary Poppendieck', number: '39-23-6423122'}
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const validate = () => {
    if (newName.trim().length < 1) {
      return {valid: false, errorMessage: 'Name field is empty'}
    }

    if (newNumber.trim().length < 1) {
      return {valid: false, errorMessage: 'Number field is empty'}
    }

    if (persons.find(person => person.name === newName)) {
      return {valid: false, errorMessage: `${newName} is already added to phonebook`}
    }

    return {valid: true, errorMessage: ''}
  }

  const addContact = (event) => {
    event.preventDefault()

    let {valid, errorMessage} = validate()
    if (!valid) {
      alert(errorMessage)
      return
    }

    const person = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    setPersons(persons.concat(person))
    setNewName('')
    setNewNumber('')
  }

  const handleInputNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleInputNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter onChange={handleFilterChange} value={newFilter}/>

      <h2>Add new</h2>
      <PersonForm
        onSubmit={addContact}
        onNameChange={handleInputNameChange}
        newName={newName}
        onNumberChange={handleInputNumberChange}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filter={newFilter}
      />

    </div>
  )
}

export default App