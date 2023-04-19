import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas'}
  ])
  const [newName, setNewName] = useState('')


  const handleSubmitForm = (event) => {
    event.preventDefault()
    
    const found = persons.find(person => person.name === newName)
    if (found){
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const newPersonsObject = {
        name: newName
      }
      setPersons(persons.concat(newPersonsObject))
    }

    
    setNewName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmitForm}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      
      {persons.map(person=><div key={person.name}>{person.name}</div>)}
      
    </div>
  )
}

export default App;
