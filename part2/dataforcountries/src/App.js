import { useState, useEffect } from "react"
import axios from 'axios'
const SingleCountry = ({country}) => {
  const api_key = process.env.REACT_APP_API_KEY
  const [lat, lng] = country.capitalInfo.latlng
  const [temp, setTemp] = useState(null)
  const [wind, setWind] = useState(null)
  const [icon, setIcon] = useState(null)

  useEffect(()=> {
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}&units=metric`)
    .then(response => {
        setTemp(response.data.main.temp)
        setWind(response.data.wind.speed)
        setIcon(response.data.weather[0].icon)
    })
  }, [])
  
  if (!icon){
    return null
  }
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div className="information">
        <div>capital {country.capital}</div>
        <div>area {country.area}</div>
      </div>
      <h3>languages</h3>
      <ul>
        {Object.values(country.languages).map(l => <li key={l}>{l}</li>)}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      <h2>Weather in {country.capital}</h2>
      <div>temperature {temp} Celcius</div>
      <div><img src= {`https://openweathermap.org/img/wn/${icon}@2x.png`}/></div>
      <div>wind {wind} m/s</div>
    </div>
  )
}

const Country = ({c}) => {
  const [show, setShow] = useState(false)
  const handleShowClick = () => {
    setShow(!show)
  }

  return (
    <div>
      {c.name.common}
      <button onClick={handleShowClick}>{show ? "hide": "show"}</button>
      {show ? <SingleCountry country={c}/> : null}
    </div>
  )
}



const Countries = ({filteredCountries}) => {
  if (!filteredCountries){
    return null
  }
  const totalCountriesFound = filteredCountries.length
  if (totalCountriesFound > 10){
    return (
      <div>Too many matches, specify another filter</div>
    )
  } else if (totalCountriesFound > 1 && totalCountriesFound <= 10){
    return (
      <div>
        {filteredCountries.map(c => <div key={c.name.official}><Country c={c}/></div>)}
      </div>
    )
  } else if (totalCountriesFound === 1){
    return (
      <SingleCountry country = {filteredCountries[0]}/>
    )
  }

}

const App = () => {
  const [value, setValue] = useState('')
  const [filteredCountries, setFilteredCountries] = useState(null)

  useEffect(()=>{
    if (value){
      axios
      .get('https://restcountries.com/v3.1/all?fields=name,flags,languages,area,capital,capitalInfo')
      .then(response => {
        const allCountries = response.data
        const filteredCountries = allCountries.filter(c => c.name.common.toLowerCase().includes(value))
        setFilteredCountries(filteredCountries)        
      })
    } else {
      setFilteredCountries(null)
    }
  }, [value])

  const handleValue = (event) => {
    setValue(event.target.value)
  }


  return (
    <div>
      find countries <input value={value} onChange={handleValue} />
      <Countries filteredCountries = {filteredCountries}/>
    </div>
  )
}

export default App