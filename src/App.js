import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";

function App() {
    const [data, setData] = useState({});
    const [town, setTown] = useState('');
    const [weatherData, setWeatherData] = useState(null);

    const key = 'c4485375129772c86210d851b7043410';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${town}&units=metric&appid=${key}&lang=ua`;
    const searchWeather = (event) => {
        if (event.key === 'Enter') {
            // fetch(url)
            //     .then((response) => response.json())
            //     .then((response) => {
            //         setData(response);
            //     })
            axios.get(url).then((response) => {
                setData(response.data)
            });
            setTown('');
        }

    }

    // Ефект для отримання даних погоди після завантаження компонента
    useEffect(() => {
        // Функція для виклику API та отримання даних погоди
        const fetchWeatherData = async () => {
            try {
                // Використовуйте API для отримання даних погоди
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Kyiv&units=metric&appid=c4485375129772c86210d851b7043410&lang=ua`);
                const data = await response.json();

                // Встановлюємо отримані дані в стан
                setWeatherData(data);
            } catch (error) {
                console.error('Помилка при отриманні даних погоди:', error);
            }
        };

        // Викликаємо функцію для отримання даних при завантаженні компонента
        fetchWeatherData();
    }, []);
    return (
        <div className="App">
            <div className="inp-field">
                <input type="text"
                       value={town}
                       onChange={(event) => setTown(event.target.value)}
                       placeholder="Please Enter location"
                       onKeyDown={searchWeather}/>
            </div>
            <div className="container">
                <div className="header">
                    <div className="city">
                        <p>{data.name}</p>
                    </div>
                    <div className="temp">
                        {data.main ? (
                            <h1>{data.main.temp.toFixed()}°C</h1>
                        ) : null}
                    </div>
                    <div className="desc">
                        {data.weather ? (<p>{data.weather[0].description}</p>) : null}
                    </div>
                    {data.name !== undefined
                        && (
                            <div className="footer">
                                <div className="feels">
                                    {data.main ? (
                                        <p className="bold">
                                            Відчувається як
                                            {data.main.feels_like.toFixed()}°C
                                        </p>
                                    ) : null}
                                </div>
                                <div className="humidity">
                                    {data.main ? (
                                        <p className="bold">
                                            Вологість
                                            {data.main.humidity}%
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        )}
                </div>

                {weatherData ? (
                    <div>
                        {weatherData.main ? (
                            <p>Температура: {weatherData.main.temp.toFixed()}°C</p>
                        ) : null}

                        <p>{weatherData.name}</p>
                    </div>
                ) : (
                    <p>Завантаження даних...</p>
                )}
            </div>
        </div>
    );
}

export default App;
