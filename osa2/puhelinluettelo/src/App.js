import {useState} from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {id: '1', name: 'Arto Hellas'}
  ])
  const [newName, setNewName] = useState('')

  const addContact = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      id: persons.length + 1,
    }

    setPersons(persons.concat(person))
    setNewName('')
  }

  const handleInputNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addContact}>
        <div>
          name: <input onChange={handleInputNameChange} value={newName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      <ul>
        {persons.map(person =>
          <li key={person.id}>{person.id}, {person.name}</li>
        )}
      </ul>
    </div>
  )
}

export default App