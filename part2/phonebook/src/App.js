import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setNewFilterValue] = useState('')

  const handleSubmitForm = (event) => {
    event.preventDefault()
    
    const found = persons.find(person => person.name === newName)
    if (found){
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const newPersonsObject = {
        name: newName,
        number: newNumber,
        id: persons[persons.length-1].id + 1
      }
      setPersons(persons.concat(newPersonsObject))
    }

    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    const str = event.target.value
    setNewFilterValue(str)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with<input value={filterValue} onChange={handleFilterChange}/>
      <h2>add a new</h2>
      <form onSubmit={handleSubmitForm}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      
      {persons
        .filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()))
        .map(person=><div key={person.id}>{person.name} {person.number}</div>)}
      
    </div>
  )
}

export default App;
