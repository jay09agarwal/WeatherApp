import './WeatherStyle.scss'
import { useState } from "react";

export default function Weather() {
    const [city, setCity] = useState(null);
    const [temp, setTemp] = useState(null);
    const [min_temp, setMinTemp] = useState(null);
    const [max_temp, setMaxTemp] = useState(null);
    const [weather, setWeather]= useState(null);
    const [windSpeed, setWindSpeed]= useState(null);
    const [lat, setLat]= useState(null);
    const [lon, setLon]= useState(null);
    const [image,setImage] = useState(null);
    const [searchCity, setSearchCity] = useState('');

    const fetchWApi = async () => {
        if (!searchCity.trim()) {
            alert("Please enter a city name");
            return;
        }

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=94b26ac9e743a4835c2d6807122adf83&units=metric`;
            const res = await fetch(url);
            const jsonData = await res.json();

            if (jsonData.cod !== 200) {
                alert("City not found!");
                return;
            }

            setCity(jsonData.name);
            setTemp(jsonData.main.temp);
            setMinTemp(jsonData.main.temp_min);
            setMaxTemp(jsonData.main.temp_max);
            setWeather(jsonData.weather[0].main);
            setWindSpeed(jsonData.wind.speed);
            setLat(jsonData.coord.lat);
            setLon(jsonData.coord.lon);
            setImage(jsonData.weather[0].icon);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    let i = `./${image}.png`;
    const my_icon = { background: i };

    return (
        <div id="main">
            <div>
                <input
                    type="search"
                    placeholder="Enter City"
                    value={searchCity}
                    onChange={(event) => setSearchCity(event.target.value)}
                />
                <button onClick={fetchWApi} id='searchBtn'>Search</button>
            </div>
            <div>
                <h1 className='city'>{city}</h1>
                <div className='temp'>
                    <h1>{temp}</h1>
                    <div>
                        <h3>Max Temperature : {max_temp}</h3>
                        <h3>Min Temperature : {min_temp}</h3>
                    </div>
                </div>
                <div>
                    <h2>{weather}<div style={my_icon}></div></h2>
                </div>
            </div>
            <div className='extra'>
                <div>
                    <h2>Wind Speed:<br />{windSpeed} kmph</h2>
                </div>
                <div>
                    <h2>Latitude:<br />{lat}</h2>
                </div>
                <div>
                    <h2>Longitude:<br />{lon}</h2>
                </div>
            </div>
        </div>
    );
}
