const Person = ({person}) => <span>{person.name}, {person.number}</span>

const Persons = ({persons, filter, onRemove}) => {
  const personsToShow = filter.length > 0
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()) === true)
    : persons

  const handleRemove = (id) => {
    onRemove(id);
  }

  return (
    <ul>
      {personsToShow.map(person =>
        <li key={person.id}>
          <Person person={person}/>
          <button onClick={() =>handleRemove(person.id)}>remove</button>
        </li>
      )}
    </ul>
  )
}

export default Persons