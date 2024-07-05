import React, { useState, useEffect } from 'react';
import './TimeZoneConverter.css';

const TimeZoneConverter = () => {
    const [time, setTime] = useState('');
    const [fromTimeZone, setFromTimeZone] = useState('UTC');
    const [toTimeZone, setToTimeZone] = useState('UTC');
    const [convertedTime, setConvertedTime] = useState('');
    const [currentTimes, setCurrentTimes] = useState({});

    const timeZones = [
        { value: 'UTC', label: 'UTC' },
        { value: 'America/New_York', label: 'New York (GMT-4)' },
        { value: 'America/Chicago', label: 'Chicago (GMT-5)' },
        { value: 'America/Denver', label: 'Denver (GMT-6)' },
        { value: 'America/Los_Angeles', label: 'Los Angeles (GMT-7)' },
        { value: 'Asia/Kolkata', label: 'India (GMT+5:30)' },
        { value: 'Europe/London', label: 'London (GMT+1)' },
        { value: 'Europe/Berlin', label: 'Berlin (GMT+2)' },
        { value: 'Australia/Sydney', label: 'Sydney (GMT+10)' },
        { value: 'Asia/Tokyo', label: 'Tokyo (GMT+9)' },
        { value: 'Asia/Shanghai', label: 'Shanghai (GMT+8)' },
        { value: 'Europe/Paris', label: 'Paris (GMT+2)' },
        { value: 'Europe/Rome', label: 'Rome (GMT+2)' },
        { value: 'Europe/Moscow', label: 'Moscow (GMT+3)' },
        { value: 'America/Sao_Paulo', label: 'Sao Paulo (GMT-3)' },
        { value: 'Africa/Cairo', label: 'Cairo (GMT+2)' },
        { value: 'Africa/Johannesburg', label: 'Johannesburg (GMT+2)' },
        { value: 'Asia/Dubai', label: 'Dubai (GMT+4)' },
        { value: 'Asia/Jakarta', label: 'Jakarta (GMT+7)' },
        { value: 'America/Toronto', label: 'Toronto (GMT-4)' },
        { value: 'America/Vancouver', label: 'Vancouver (GMT-7)' },
        { value: 'America/Mexico_City', label: 'Mexico City (GMT-6)' },
        { value: 'America/Bogota', label: 'Bogota (GMT-5)' },
        { value: 'Asia/Seoul', label: 'Seoul (GMT+9)' },
        { value: 'Asia/Singapore', label: 'Singapore (GMT+8)' },
        { value: 'Europe/Istanbul', label: 'Istanbul (GMT+3)' },
        { value: 'Asia/Ho_Chi_Minh', label: 'Ho Chi Minh (GMT+7)' },
        { value: 'America/Argentina/Buenos_Aires', label: 'Buenos Aires (GMT-3)' },
        { value: 'Pacific/Auckland', label: 'Auckland (GMT+12)' },
        { value: 'Pacific/Honolulu', label: 'Honolulu (GMT-10)' },
        { value: 'America/Phoenix', label: 'Phoenix (GMT-7)' },
        { value: 'America/Anchorage', label: 'Anchorage (GMT-8)' },
        { value: 'Africa/Nairobi', label: 'Nairobi (GMT+3)' },
        { value: 'Europe/Madrid', label: 'Madrid (GMT+2)' },
        { value: 'Europe/Amsterdam', label: 'Amsterdam (GMT+2)' },
        { value: 'Europe/Brussels', label: 'Brussels (GMT+2)' },
        { value: 'Asia/Manila', label: 'Manila (GMT+8)' },
        { value: 'Asia/Hong_Kong', label: 'Hong Kong (GMT+8)' },
        { value: 'Asia/Bangkok', label: 'Bangkok (GMT+7)' },
        { value: 'America/Lima', label: 'Lima (GMT-5)' },
        { value: 'Europe/Warsaw', label: 'Warsaw (GMT+2)' },
        { value: 'Europe/Zurich', label: 'Zurich (GMT+2)' },
        { value: 'Asia/Kuala_Lumpur', label: 'Kuala Lumpur (GMT+8)' },
        { value: 'Asia/Riyadh', label: 'Riyadh (GMT+3)' },
        { value: 'Asia/Tehran', label: 'Tehran (GMT+3:30)' },
        { value: 'Asia/Karachi', label: 'Karachi (GMT+5)' },
    ];

    const handleConvert = () => {
        const fromDate = new Date(`1970-01-01T${time}:00Z`);
        const fromOffset = new Date().toLocaleString('en-US', { timeZone: fromTimeZone }).split(', ')[1].slice(9);
        const toOffset = new Date().toLocaleString('en-US', { timeZone: toTimeZone }).split(', ')[1].slice(9);

        fromDate.setHours(fromDate.getHours() + parseInt(fromOffset) - parseInt(toOffset));
        setConvertedTime(fromDate.toTimeString().slice(0, 5));
    };

    const updateCurrentTimes = () => {
        const newCurrentTimes = {};
        timeZones.forEach(zone => {
            newCurrentTimes[zone.label] = new Date().toLocaleTimeString('en-US', { timeZone: zone.value });
        });
        setCurrentTimes(newCurrentTimes);
    };

    useEffect(() => {
        updateCurrentTimes();
        const interval = setInterval(updateCurrentTimes, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="converter-container">
            <h2>Time Zone Converter</h2>
            <div className="converter">
                <div className="input-group">
                    <div className="input-container">
                        <label>Time</label>
                        <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="time-input"
                        />
                    </div>
                    <div className="input-container">
                        <label>From Time Zone</label>
                        <select
                            value={fromTimeZone}
                            onChange={(e) => setFromTimeZone(e.target.value)}
                        >
                            {timeZones.map((zone) => (
                                <option key={zone.value} value={zone.value}>
                                    {zone.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="switch-container" onClick={handleConvert}>
                        <span className="switch-button">⇆</span>
                    </div>
                    <div className="input-container">
                        <label>To Time Zone</label>
                        <select
                            value={toTimeZone}
                            onChange={(e) => setToTimeZone(e.target.value)}
                        >
                            {timeZones.map((zone) => (
                                <option key={zone.value} value={zone.value}>
                                    {zone.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="input-container">
                        <label>Converted Time</label>
                        <input
                            type="text"
                            value={convertedTime}
                            readOnly
                        />
                    </div>
                </div>
                <div className="button-group">
                    <button onClick={handleConvert} className="convert-button">Convert</button>
                </div>
            </div>
            <h3>Current Times in Various Time Zones</h3>
            <div className="current-times">
                {Object.entries(currentTimes).map(([zone, time]) => (
                    <div key={zone} className="time-zone">
                        <strong>{zone}</strong>: {time}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TimeZoneConverter;