import { useState } from "react";

const Filter = ({filterValue, handleFilterChange}) => {
  return (
    <div>
      filter shown with<input value={filterValue} onChange={handleFilterChange}/>
    </div>
  )
}

const AddPerson = ({handleSubmitForm, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return (
    <div>
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
    </div>
  )
}

const Person = ({person}) => {
  return (
<div>{person.name} {person.number}</div>
  )
}

const Show = ({persons, filterValue}) => {
  return (
    <div>
      {persons
        .filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()))
        .map(person=> <Person key={person.id} person = {person} />)}
    </div>
  )
}

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
      <Filter 
        filterValue={filterValue} 
        handleFilterChange={handleFilterChange}
        />
      <h2>add a new</h2>
      <AddPerson 
        handleSubmitForm={handleSubmitForm} 
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        />
      <h2>Numbers</h2>
      <Show 
        persons = {persons} 
        filterValue={filterValue}
      />     
    </div>
  )
}

export default App;
