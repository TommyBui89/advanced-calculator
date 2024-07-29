import React, { useState, useEffect } from 'react';
import './TemperatureConverter.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Include Font Awesome

const API_KEY = '3392050a32b01f736d9f74976944fcc2';

const predefinedLocations = [
    { name: 'New York', latitude: 40.7128, longitude: -74.0060 },
    { name: 'London', latitude: 51.5074, longitude: -0.1278 },
    { name: 'Tokyo', latitude: 35.6895, longitude: 139.6917 },
    { name: 'Sydney', latitude: -33.8688, longitude: 151.2093 },
    { name: 'Paris', latitude: 48.8566, longitude: 2.3522 },
    { name: 'Los Angeles', latitude: 34.0522, longitude: -118.2437 },
    { name: 'Chicago', latitude: 41.8781, longitude: -87.6298 },
    { name: 'Houston', latitude: 29.7604, longitude: -95.3698 },
    { name: 'Miami', latitude: 25.7617, longitude: -80.1918 },
    { name: 'Toronto', latitude: 43.651070, longitude: -79.347015 },
    { name: 'Vancouver', latitude: 49.2827, longitude: -123.1207 },
    { name: 'Mexico City', latitude: 19.4326, longitude: -99.1332 },
    { name: 'São Paulo', latitude: -23.5505, longitude: -46.6333 },
    { name: 'Buenos Aires', latitude: -34.6037, longitude: -58.3816 },
    { name: 'Rio de Janeiro', latitude: -22.9068, longitude: -43.1729 },
    { name: 'Johannesburg', latitude: -26.2041, longitude: 28.0473 },
    { name: 'Cape Town', latitude: -33.9249, longitude: 18.4241 },
    { name: 'Dubai', latitude: 25.276987, longitude: 55.296249 },
    { name: 'Hong Kong', latitude: 22.3193, longitude: 114.1694 },
    { name: 'Singapore', latitude: 1.3521, longitude: 103.8198 },
    { name: 'Bangkok', latitude: 13.7563, longitude: 100.5018 },
    { name: 'Kuala Lumpur', latitude: 3.1390, longitude: 101.6869 },
    { name: 'Mumbai', latitude: 19.0760, longitude: 72.8777 },
    { name: 'Delhi', latitude: 28.7041, longitude: 77.1025 },
    { name: 'Shanghai', latitude: 31.2304, longitude: 121.4737 },
    { name: 'Beijing', latitude: 39.9042, longitude: 116.4074 },
    { name: 'Moscow', latitude: 55.7558, longitude: 37.6173 },
    { name: 'Istanbul', latitude: 41.0082, longitude: 28.9784 },
    { name: 'Rome', latitude: 41.9028, longitude: 12.4964 },
    { name: 'Berlin', latitude: 52.5200, longitude: 13.4050 },
    { name: 'Madrid', latitude: 40.4168, longitude: -3.7038 },
    { name: 'Barcelona', latitude: 41.3851, longitude: 2.1734 },
    { name: 'Athens', latitude: 37.9838, longitude: 23.7275 },
    { name: 'Lisbon', latitude: 38.7223, longitude: -9.1393 },
    { name: 'Vienna', latitude: 48.2082, longitude: 16.3738 },
    { name: 'Zurich', latitude: 47.3769, longitude: 8.5417 },
    { name: 'Cairo', latitude: 30.0444, longitude: 31.2357 },
    { name: 'Nairobi', latitude: -1.2921, longitude: 36.8219 },
    { name: 'Seoul', latitude: 37.5665, longitude: 126.9780 },
    { name: 'Manila', latitude: 14.5995, longitude: 120.9842 },
    { name: 'Jakarta', latitude: -6.2088, longitude: 106.8456 },
    { name: 'Lagos', latitude: 6.5244, longitude: 3.3792 },
    { name: 'Lima', latitude: -12.0464, longitude: -77.0428 },
    { name: 'Bogotá', latitude: 4.7110, longitude: -74.0721 },
    { name: 'Santiago', latitude: -33.4489, longitude: -70.6693 },
    { name: 'Havana', latitude: 23.1136, longitude: -82.3666 },
];

const getWeatherIcon = (description) => {
    const desc = description.toLowerCase();
    if (desc.includes('clear')) return 'fas fa-sun';
    if (desc.includes('clouds')) return 'fas fa-cloud';
    if (desc.includes('rain')) return 'fas fa-cloud-rain';
    if (desc.includes('snow')) return 'fas fa-snowflake';
    if (desc.includes('thunderstorm')) return 'fas fa-bolt';
    if (desc.includes('mist') || desc.includes('fog')) return 'fas fa-smog';
    return 'fas fa-question';
};

const TemperatureConverter = () => {
    const [inputValue, setInputValue] = useState('');
    const [result, setResult] = useState('');
    const [isCelsius, setIsCelsius] = useState(true);
    const [weather, setWeather] = useState(null);
    const [weatherData, setWeatherData] = useState([]);
    const [isWeatherCelsius, setIsWeatherCelsius] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleConvert = () => {
        if (isCelsius) {
            const fahr = (inputValue * 9 / 5) + 32;
            setResult(`${fahr.toFixed(2)} °F`);
        } else {
            const cels = (inputValue - 32) * 5 / 9;
            setResult(`${cels.toFixed(2)} °C`);
        }
    };

    const handleClear = () => {
        setInputValue('');
        setResult('');
        setWeather(null);
    };

    const toggleConversion = () => {
        if (isCelsius) {
            const fahr = (inputValue * 9 / 5) + 32;
            setInputValue(fahr.toFixed(2));
            setResult('');
        } else {
            const cels = (inputValue - 32) * 5 / 9;
            setInputValue(cels.toFixed(2));
            setResult('');
        }
        setIsCelsius(!isCelsius);
        setIsWeatherCelsius(!isWeatherCelsius);
    };

    const fetchWeather = (latitude, longitude, locationName) => {
        setLoading(true);
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`)
            .then(response => response.json())
            .then(data => {
                if (data.main) {
                    const weatherInfo = {
                        name: data.name || locationName,
                        tempCelsius: data.main.temp,
                        tempFahrenheit: (data.main.temp * 9 / 5) + 32,
                        description: data.weather[0].description,
                    };
                    setWeather(weatherInfo);
                    setInputValue(isWeatherCelsius ? data.main.temp : ((data.main.temp * 9 / 5) + 32).toFixed(2));
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                setLoading(false);
            });
    };

    const handleGetCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchWeather(latitude, longitude, 'Current Location');
                },
                (error) => {
                    console.error('Error getting location:', error);
                }
            );
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    };

    const fetchAllWeather = async () => {
        setLoading(true);
        const weatherPromises = predefinedLocations.map(loc =>
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${loc.latitude}&lon=${loc.longitude}&units=metric&appid=${API_KEY}`)
                .then(response => response.json())
                .then(data => ({
                    name: loc.name,
                    temp: data.main.temp,
                    description: data.weather[0].description,
                }))
        );

        const weatherResults = await Promise.all(weatherPromises);
        setWeatherData(weatherResults);
        setLoading(false);
    };

    useEffect(() => {
        fetchAllWeather();
        const interval = setInterval(fetchAllWeather, 60000); // Update weather every minute
        return () => clearInterval(interval);
    }, []);

    const handleWeatherItemClick = (data) => {
        const tempFahrenheit = (data.temp * 9 / 5) + 32;
        setInputValue(isWeatherCelsius ? data.temp : tempFahrenheit.toFixed(2));
        setWeather({
            ...data,
            tempCelsius: data.temp,
            tempFahrenheit: tempFahrenheit
        });
    };

    const toggleWeatherUnit = () => {
        setIsCelsius(!isCelsius);
        setIsWeatherCelsius(!isWeatherCelsius);
        setInputValue(prevValue => isWeatherCelsius ? ((prevValue * 9 / 5) + 32).toFixed(2) : ((prevValue - 32) * 5 / 9).toFixed(2));
        setResult('');
    };

    return (
        <div className="converter-container">
            <h2>{isCelsius ? "Celsius to Fahrenheit" : "Fahrenheit to Celsius"} Converter</h2>
            <div className="converter">
                <div className="input-group">
                    <div className="input-container">
                        <label>{isCelsius ? "From Celsius" : "From Fahrenheit"}</label>
                        <input
                            type="number"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder={isCelsius ? "Enter Celsius" : "Enter Fahrenheit"}
                        />
                    </div>
                    <div className="switch-container" onClick={toggleConversion}>
                        <span className="switch-button">⇆</span>
                    </div>
                    <div className="input-container">
                        <label>{isCelsius ? "To Fahrenheit" : "To Celsius"}</label>
                        <input
                            type="text"
                            value={result}
                            readOnly
                            placeholder={isCelsius ? "Fahrenheit" : "Celsius"}
                        />
                    </div>
                </div>
                <div className="button-group">
                    <button onClick={handleConvert} className="convert-button">Convert</button>
                    <button onClick={handleClear} className="clear-button">Clear</button>
                </div>
                <div className="button-group">
                    <button onClick={handleGetCurrentLocation} className="location-button">Get Current Location Weather</button>
                </div>
            </div>
            {loading ? (
                <div className="loading-spinner">
                    <i className="fas fa-spinner fa-spin"></i>
                </div>
            ) : weather && (
                <div className="weather-info">
                    <h2>Current Weather</h2>
                    <p><strong>Location:</strong> <i className={getWeatherIcon(weather.description)}></i> {weather.name}</p>
                    <p><strong>Temperature:</strong> 
                        {weather.tempCelsius !== undefined && weather.tempCelsius.toFixed(2)} °C / {weather.tempFahrenheit !== undefined && weather.tempFahrenheit.toFixed(2)} °F
                    </p>
                    <p><strong>Weather:</strong> {weather.description}</p>
                </div>
            )}
            <div>
                <h2>Weather in Various Locations</h2>
                <button onClick={toggleWeatherUnit} className="toggle-weather-unit">
                    Show in {isWeatherCelsius ? 'Fahrenheit' : 'Celsius'}
                </button>
            </div>
            <div className="weather-list">
                {weatherData.map((data, index) => (
                    <div key={index} className="weather-item" onClick={() => handleWeatherItemClick(data)}>
                        <i className={getWeatherIcon(data.description)}></i> <strong>{data.name}</strong>: {isWeatherCelsius ? data.temp : (data.temp * 9 / 5 + 32).toFixed(2)} °{isWeatherCelsius ? 'C' : 'F'}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TemperatureConverter;
