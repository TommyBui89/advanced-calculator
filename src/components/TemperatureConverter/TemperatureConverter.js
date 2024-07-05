import React, { useState } from 'react';
import './TemperatureConverter.css';

const TemperatureConverter = () => {
    const [inputValue, setInputValue] = useState('');
    const [result, setResult] = useState('');
    const [isCelsius, setIsCelsius] = useState(true);

    const handleConvert = () => {
        if (isCelsius) {
            const fahr = (inputValue * 9/5) + 32;
            setResult(`${fahr.toFixed(2)} °F`);
        } else {
            const cels = (inputValue - 32) * 5/9;
            setResult(`${cels.toFixed(2)} °C`);
        }
    };

    const handleClear = () => {
        setInputValue('');
        setResult('');
    };

    const toggleConversion = () => {
        setIsCelsius(!isCelsius);
        setInputValue('');
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
            </div>
        </div>
    );
};

export default TemperatureConverter;
