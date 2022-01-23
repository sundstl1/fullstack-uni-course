import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Weather = ({city}) =>{
    const [WeatherData, setWeatherData] = useState(undefined)
    useEffect(() => {
        axios
          .get('http://api.weatherstack.com/current',
          {params: {access_key: process.env.REACT_APP_WEATHER_KEY, query: city }})
          .then(response => {
            setWeatherData(response.data)
          })
      }, [])
    
    if (WeatherData !== undefined){
        return (
            <div>
                <h2>
                    Weather in {WeatherData.location.name}
                </h2>
                <p>
                    <b>temperature:</b> {WeatherData.current.temperature} Celcius
                </p>
                <img
                    src={WeatherData.current.weather_icons}
                />
                <p>
                    <b>wind:</b> {WeatherData.current.wind_speed} mph direction {WeatherData.current.wind_dir}
                </p>
            </div>
        )
    }
    else{
        return(
            <div>
                <p>
                    Loading weather data...
                </p>
            </div>
        )
    }
    
}

export default Weather

