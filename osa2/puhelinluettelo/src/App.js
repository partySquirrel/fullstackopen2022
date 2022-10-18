import {useState} from 'react'

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

  const personsToShow = newFilter.length > 0
    ? persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()) === true)
    : persons

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        Filter shown with <input onChange={handleFilterChange} value={newFilter}/>
      </div>

      <h2>Add new</h2>
      <form onSubmit={addContact}>
        <div>
          name: <input onChange={handleInputNameChange} value={newName}/>
        </div>
        <div>
          number: <input onChange={handleInputNumberChange} value={newNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person =>
          <li key={person.id}>{person.id}, {person.name}, {person.number}</li>
        )}
      </ul>
    </div>
  )
}

export default App