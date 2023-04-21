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

const Person = ({person, deletePersonHandler}) => {
  return (
    <div>
      {person.name} 
      {person.number} 
      <button onClick={() => deletePersonHandler(person.id)}>delete</button>
    </div>
  )
}

const Show = ({persons, filterValue, deletePersonHandler}) => {
  return (
    <div>
      {persons
        .filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()))
        .map(person=> <Person key={person.id} person = {person} deletePersonHandler={deletePersonHandler}/>)}
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
      if (found.number !== newNumber) {
        const confirmed = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
        if (confirmed){
          const updatedPersonObject = {
            ...found,
            number: newNumber
          }

          personServices
          .update(found.id, updatedPersonObject)
          .then(updatedPerson => {
            setPersons(persons.map(p => p.id !== found.id ? p : updatedPerson))
          })
      }
      }
      
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

  const deletePersonHandler = (id) => {
    const person = persons.find(p => p.id === id)
    const confirmed = window.confirm(`Delete ${person.name} ?`)
    if (confirmed){
      personServices
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
      })
    }
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
        deletePersonHandler={deletePersonHandler}
      />     
    </div>
  )
}

export default App;
