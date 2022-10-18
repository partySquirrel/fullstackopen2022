import {useState} from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {id: '1', name: 'Arto Hellas', number: '12345'}
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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

  return (
    <div>
      <h2>Phonebook</h2>
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
        {persons.map(person =>
          <li key={person.id}>{person.id}, {person.name}, {person.number}</li>
        )}
      </ul>
    </div>
  )
}

export default App