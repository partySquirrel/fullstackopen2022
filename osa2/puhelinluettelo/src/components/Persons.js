const Person = ({person}) => <span>{person.name}, {person.number}</span>

const Persons = ({persons, filter}) => {
  const personsToShow = filter.length > 0
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()) === true)
    : persons

  return (
    <ul>
      {personsToShow.map(person =>
        <li key={person.id}><Person person={person}/></li>
      )}
    </ul>
  )
}

export default Persons