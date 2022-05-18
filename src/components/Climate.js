import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Climate.css';

function Climate() {

    const [weather, setWeather] = useState({});
    const [TempC, setTempC] = useState(0)

    useEffect(() => {
        function success(pos) {
            var crd = pos.coords;
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=f9d41ea0759acb79c354107f6299624f`).then(res => { setWeather(res.data); setTempC(res.data.main?.temp - 273.15) })
        }

        function error(err) {
            alert(`ERROR(${err.code}): ${err.message}`);
        }

        navigator.geolocation.getCurrentPosition(success, error);
    }, [])

    return (
        <div className='card-container'>
            <h1>Climate App</h1>
            <div className="card-city">
                <h2>{weather?.name} , {weather?.sys?.country}</h2>
            </div>
            <div className="card-description">
                <div className="card-img">

                    <img src={`http://openweathermap.org/img/wn/${weather?.weather?.[0].icon}@2x.png`} alt="climate icon" />

                </div>
                <div className="card-info">
                    <li>{weather.weather?.[0].description}</li>
                    <li>Humedad: {weather?.main?.humidity} G/M³</li>
                    <li>Presion: {weather?.main?.pressure} Pa</li>
                </div>
            </div>

            
                <p id='temperature'>Temperatura: {Math.round(TempC)} °C</p>
            

        </div>
    );
}

export default Climate;