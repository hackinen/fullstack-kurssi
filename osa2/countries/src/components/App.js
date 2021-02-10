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

            <WeatherDisplay country={country} />

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

const WeatherDisplay = ({country}) => {
    const [weather, setWeather] = useState({
        current: {
          temperature: "",
          weather_icons: [
            ""
          ],
          wind_speed: "",
          wind_dir: "",
        }})

    const api_key = process.env.REACT_APP_API_KEY

    useEffect(() => {
        axios
          .get('http://api.weatherstack.com/current?access_key=' + api_key + '&query=' + country.capital)
          .then(response => {
            setWeather(response.data)
            console.log(response.data)
          })
    }, [country.name])

    return (
        <div>
            <h2>Weather in {country.capital}</h2>
                <div><b>temperature:</b> {weather.current.temperature} Celsius</div>
                <img 
                    src={weather.current.weather_icons}
                    alt="something went wrong"
                    width="80"    
                />
                <div><b>wind:</b> {weather.current.wind_speed} mph direction {weather.current.wind_dir}</div>
        </div>
    )

}


export default App