import {useEffect, useState} from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import PersonsService from './services/PersonsService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

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

    return {valid: true, errorMessage: null}
  }

  const addContact = (event) => {
    event.preventDefault()

    let {valid, errorMessage} = validate()
    if (!valid) {
      setErrorMessage(errorMessage)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      return
    }

    const existing = persons.find(person => person.name === newName)
    if (existing) {
      if (!window.confirm(`Update number for existing contact ${existing.name}?`)) {
        return
      }

      const updated = {
        ...existing,
        number: newNumber
      }
      PersonsService
        .update(existing.id, updated)
        .then(response => {
          setPersons(persons.map(person => person.id === response.id ? response : person))
          setNewName('')
          setNewNumber('')

          setSuccessMessage(
            `Person '${response.name}' number updated to server`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })

    } else {
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

          setSuccessMessage(
            `Person '${response.name}' added to server`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)

        })
    }
  }

  const handlePersonRemove = (id) => {
    const removable = persons.find(person => person.id === id)
    if (window.confirm(`Do you want to remove ${removable.name}?`)) {
      PersonsService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setSuccessMessage(
            `Person '${removable.name}' removed from server`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(
            `Person '${removable.name}' was already removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
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

      <Notification message={errorMessage} severity="error"/>
      <Notification message={successMessage} severity="success"/>

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