import {useEffect, useState} from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import PersonsService from './services/PersonsService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    PersonsService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

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
    }

    PersonsService
      .create(person)
      .then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
      })
  }

  const handlePersonRemove = (id) => {
    const removable = persons.find(person => person.id === id)
    if (window.confirm(`Do you want to remove ${removable.name}?`)) {
      PersonsService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
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
        onRemove={handlePersonRemove}
      />

    </div>
  )
}

export default App