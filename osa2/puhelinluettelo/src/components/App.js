import React, { useState, useEffect } from 'react'
import axios from 'axios'
import peopleService from '../services/people'
import people from '../services/people'
import '../index.css'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilterValue, setNewFilterValue] = useState('')
  const [notification, setNotification] = useState(null)
  const [messageType, setmessageType] = useState("notification")
  const filteredPersons = persons.filter(person => person.name.includes(newFilterValue))

  useEffect(() => {
    const eventHandler = initialNotes => {
      setPersons(initialNotes)
    }
  
    peopleService.getAll().then(eventHandler)
  }, [])

  const addPerson = (event) => {
      event.preventDefault()
      
      const personObject = {
        name: newName,
        number: newNumber
      }

      if (persons.map(person => person.name).includes(newName)) {
          const replace = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
          const thisPerson = persons.find(p => p.name == newName)
          const updatedPerson = {...thisPerson, number: newNumber}

          if (replace) {
            peopleService
              .update(updatedPerson.id, updatedPerson)
              .then(data => {
                peopleService.getAll().then((updated) => setPersons(updated))
                showNotification(`Updated the number of ${updatedPerson.name}`,"notification")
              })
              showNotification(`Information of ${updatedPerson.name} has already been removed from server`,"error")
      
          }
      } else {
        peopleService
          .create(personObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
          })

        showNotification(`Added ${personObject.name}`,"notification")
      }

      setNewName('')
      setNewNumber('')
      
  }

  const showNotification = (message, type) => {
    setmessageType(type)
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const deletePerson = (person) => {
    const confirmed = window.confirm(`Delete ${person.name}`)

    if (confirmed) {
      peopleService
      .remove(person.id)
      .then(data => {
        peopleService.getAll().then((updatedPersons) => setPersons(updatedPersons))
        showNotification(`${person.name} removed succesfully`,"notification")
      })
      .catch(error => {
        showNotification(`Information of ${person.name} has already been removed from server`,"error")
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
      setNewFilterValue(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} messageType={messageType} />
      <InputField text={'filter shown with '} val={newFilterValue} handle={handleFilterChange} />
      
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <InputField text={'name: '} val={newName} handle={handleNameChange} />
        <InputField text={'number: '} val={newNumber} handle={handleNumberChange} />
        <div><button type="submit">add</button></div>
      </form>
      
      <h2>Numbers</h2>
      <ListPersons persons={filteredPersons} deletePerson={deletePerson} />
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

const ListPersons = ({persons, deletePerson}) => {
    return ( 
        <div>
            {persons.map(person => 
              <Person 
                key={person.name}
                person={person} 
                deleteThisPerson={() => deletePerson(person)}
            />)}
        </div>
    )
}

const Person = ({person, deleteThisPerson}) => {
    return(
        <div>
          {person.name + " "} 
          {person.number}
          <button onClick={deleteThisPerson}>delete</button>
        </div>
    )
}

const Notification = ({ message, messageType }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={messageType}>
      {message}
    </div>
  )
}

export default App