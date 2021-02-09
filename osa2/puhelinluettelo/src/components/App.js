import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilterValue, setNewFilterValue] = useState('')

  const filteredPersons = persons.filter(person => person.name.includes(newFilterValue))

  useEffect(() => {
    const eventHandler = response => {
      setPersons(response.data)
    }
  
    const promise = axios.get('http://localhost:3001/persons')
    promise.then(eventHandler)
  }, [])

  const addPerson = (event) => {
      event.preventDefault()
      
      const personObject = {
        name: newName,
        number: newNumber
      }

      if (persons.map(person => person.name).includes(newName)) {
          alert(`${newName} is already added to phonebook`);
      } else {
        setPersons(persons.concat(personObject))
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
      setNewFilterValue(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <InputField text={'filter shown with '} val={newFilterValue} handle={handleFilterChange} />
      
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <InputField text={'name: '} val={newName} handle={handleNameChange} />
        <InputField text={'number: '} val={newNumber} handle={handleNumberChange} />
        <div><button type="submit">add</button></div>
      </form>
      
      <h2>Numbers</h2>
      <ListPersons persons={filteredPersons} />
    </div>
  )

}

const InputField = ({text, val, handle}) => {
    return (
        <div>
            {text} <input 
                value={val}  
                onChange={handle}          
            />
        </div>
    )
}

const ListPersons = ({persons}) => {
    return ( 
        <div>
            {persons.map(person => <Person key={person.name} person={person} />)}
        </div>
    )
}

const Person = ({person}) => {
    return(
        <div>{person.name} {person.number}</div>
    )
  }


export default App