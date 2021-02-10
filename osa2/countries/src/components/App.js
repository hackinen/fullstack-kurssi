import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [newFilterValue, setNewFilterValue] = useState('')

  const filteredCountries = countries.filter(country => country.name.includes(newFilterValue))

  useEffect(() => {
    const eventHandler = response => {
        console.log(response.data)
      setCountries(response.data)
    }
  
    const promise = axios.get('https://restcountries.eu/rest/v2/all')
    promise.then(eventHandler)
  }, [])


  const handleFilterChange = (event) => {
      setNewFilterValue(event.target.value)
  }

  return (
    <div>
      <h2>Countries</h2>
      <InputField text={'find countries: '} val={newFilterValue} handle={handleFilterChange} />
      
      <ListCountries countries={filteredCountries} setNewFilterValue={setNewFilterValue}/>
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

const ListCountries = ({countries, setNewFilterValue}) => {
    if (countries.length > 10) {
        return (<div>Too many countries, specify another filter</div>)
    } else if (countries.length === 1) {
        return ( 
            <div>
                <ShowOneCountry country={countries[0]}/>
            </div>
        )
    } else {
        return ( 
            <div>
                {countries.map(country => <Country key={country.name} country={country} setNewFilterValue={setNewFilterValue} />)}
            </div>
        )
    }
    
}

const ShowOneCountry = ({country}) => {
    return (
        <div>
            <h1>{country.name}</h1>
                <div>capital {country.capital}</div>
                <div>population {country.population}</div>
            
            <h2>languages</h2>
                <ul>
                    {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
                </ul>

            <img 
                src={country.flag}
                alt="something went wrong"
                width="200"    
            />

        </div>
    )
}

const Country = ({country, setNewFilterValue}) => {

    return(
        <div>
            {country.name + " "}
            <button 
                type="button"
                onClick={(event) => {
                    setNewFilterValue(country.name)
                }}
            >show
            </button>
        </div>
    )
  }


export default App