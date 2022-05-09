import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Climate.css';

function Climate() {

    const [weather, setWeather] = useState({});
    const [TempK,setTempK] = useState(0)
    const [TempC,setTempC] = useState(0)
    function success(pos) {
        var crd = pos.coords;
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=f9d41ea0759acb79c354107f6299624f`).then(res => {setWeather(res.data);setTempK(res.data.main?.temp);setTempC(res.data.main?.temp)})
    }

    console.log(TempK)

    function error(err) {
        alert(`ERROR(${err.code}): ${err.message}`);
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success, error);
    }, [])

    function changeTempFar (){
        setTempC((TempK - 273.15) * 9/5 + 32)
    }
    
    function changeTempCelcius (){
        setTempC(TempK - 273.15)
    }
    

    //console.log('cuando se ejecuta')
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
                    <li>humidity: {weather?.main?.humidity}</li>
                    <li>pressure: {weather?.main?.pressure}</li>
                </div>
            </div>
            <p id='temperature'>Temperature:{Math.round(TempC)}</p>

            <button onClick={changeTempFar} className='btn'>
                Temperature °F
            </button>
            <button onClick={changeTempCelcius} className='btn'>
                Temperature °C
            </button>
        </div>
    );
}

export default Climate;