import { useState, useEffect } from "react";
import personServices from './services/persons'

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
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setNewFilterValue] = useState('')

  useEffect(()=>{
    personServices
    .getAll()
    .then(initialPersons=>{
      setPersons(initialPersons);
    })
  }, [])

  const handleSubmitForm = (event) => {
    event.preventDefault()
    
    const found = persons.find(person => person.name === newName)
    if (found){
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const newPersonsObject = {
        name: newName,
        number: newNumber
      }
      personServices
      .create(newPersonsObject)
      .then(newPerson => {
        setPersons(persons.concat(newPerson))
      })
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
