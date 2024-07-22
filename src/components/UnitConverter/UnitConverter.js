import React, { useState, useEffect, useCallback } from 'react';
import './UnitConverter.css';

const unitCategories = {
    length: {
        units: [
            { value: 'meters', label: 'Meters' },
            { value: 'kilometers', label: 'Kilometers' },
            { value: 'centimeters', label: 'Centimeters' },
            { value: 'inches', label: 'Inches' },
            { value: 'feet', label: 'Feet' },
        ],
        conversion: {
            meters: { meters: 1, kilometers: 0.001, centimeters: 100, inches: 39.3701, feet: 3.28084 },
            kilometers: { meters: 1000, kilometers: 1, centimeters: 100000, inches: 39370.1, feet: 3280.84 },
            centimeters: { meters: 0.01, kilometers: 0.00001, centimeters: 1, inches: 0.393701, feet: 0.0328084 },
            inches: { meters: 0.0254, kilometers: 0.0000254, centimeters: 2.54, inches: 1, feet: 0.0833333 },
            feet: { meters: 0.3048, kilometers: 0.0003048, centimeters: 30.48, inches: 12, feet: 1 },
        },
    },
    weight: {
        units: [
            { value: 'grams', label: 'Grams' },
            { value: 'kilograms', label: 'Kilograms' },
            { value: 'milligrams', label: 'Milligrams' },
            { value: 'ounces', label: 'Ounces' },
            { value: 'pounds', label: 'Pounds' },
        ],
        conversion: {
            grams: { grams: 1, kilograms: 0.001, milligrams: 1000, ounces: 0.035274, pounds: 0.00220462 },
            kilograms: { grams: 1000, kilograms: 1, milligrams: 1000000, ounces: 35.274, pounds: 2.20462 },
            milligrams: { grams: 0.001, kilograms: 0.000001, milligrams: 1, ounces: 0.000035274, pounds: 0.00000220462 },
            ounces: { grams: 28.3495, kilograms: 0.0283495, milligrams: 28349.5, ounces: 1, pounds: 0.0625 },
            pounds: { grams: 453.592, kilograms: 0.453592, milligrams: 453592, ounces: 16, pounds: 1 },
        },
    },
    volume: {
        units: [
            { value: 'liters', label: 'Liters' },
            { value: 'milliliters', label: 'Milliliters' },
            { value: 'cubic_meters', label: 'Cubic Meters' },
            { value: 'gallons', label: 'Gallons' },
            { value: 'cups', label: 'Cups' },
        ],
        conversion: {
            liters: { liters: 1, milliliters: 1000, cubic_meters: 0.001, gallons: 0.264172, cups: 4.22675 },
            milliliters: { liters: 0.001, milliliters: 1, cubic_meters: 0.000001, gallons: 0.000264172, cups: 0.00422675 },
            cubic_meters: { liters: 1000, milliliters: 1000000, cubic_meters: 1, gallons: 264.172, cups: 4226.75 },
            gallons: { liters: 3.78541, milliliters: 3785.41, cubic_meters: 0.00378541, gallons: 1, cups: 16 },
            cups: { liters: 0.236588, milliliters: 236.588, cubic_meters: 0.000236588, gallons: 0.0625, cups: 1 },
        },
    },
};

const UnitConverter = () => {
    const [conversions, setConversions] = useState({
        length: { fromUnit: 'meters', toUnit: 'kilometers', value: '', result: '' },
        weight: { fromUnit: 'grams', toUnit: 'kilograms', value: '', result: '' },
        volume: { fromUnit: 'liters', toUnit: 'milliliters', value: '', result: '' },
    });

    const handleConvert = useCallback((category) => {
        const { fromUnit, toUnit, value } = conversions[category];
        if (value) {
            const conversionRate = unitCategories[category].conversion[fromUnit][toUnit];
            const convertedValue = parseFloat(value) * conversionRate;
            setConversions(prev => ({
                ...prev,
                [category]: {
                    ...prev[category],
                    result: convertedValue.toFixed(2),
                }
            }));
        } else {
            setConversions(prev => ({
                ...prev,
                [category]: {
                    ...prev[category],
                    result: '',
                }
            }));
        }
    }, [conversions]);

    useEffect(() => {
        Object.keys(conversions).forEach(category => handleConvert(category));
    }, [conversions, handleConvert]);

    const handleChange = (category, field, value) => {
        setConversions(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [field]: value,
            }
        }));
    };

    const handleSwitchUnits = (category) => {
        setConversions(prev => ({
            ...prev,
            [category]: {
                fromUnit: prev[category].toUnit,
                toUnit: prev[category].fromUnit,
                value: prev[category].result,
                result: prev[category].value,
            }
        }));
    };

    return (
        <div className="converter-container">
            {Object.keys(unitCategories).map(category => (
                <div key={category} className="converter">
                    <h3>{category.charAt(0).toUpperCase() + category.slice(1)} Converter</h3>
                    <div className="input-group">
                        <div className="input-container">
                            <label>Value</label>
                            <input
                                type="number"
                                value={conversions[category].value}
                                onChange={(e) => handleChange(category, 'value', e.target.value)}
                                placeholder="Enter value"
                            />
                        </div>
                        <div className="input-container">
                            <label>From Unit</label>
                            <select
                                value={conversions[category].fromUnit}
                                onChange={(e) => handleChange(category, 'fromUnit', e.target.value)}
                            >
                                {unitCategories[category].units.map((unit) => (
                                    <option key={unit.value} value={unit.value}>
                                        {unit.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="switch-container" onClick={() => handleSwitchUnits(category)}>
                            <span className="switch-button">⇆</span>
                        </div>
                        <div className="input-container">
                            <label>Result</label>
                            <input
                                type="text"
                                value={conversions[category].result}
                                readOnly
                            />
                        </div>
                        <div className="input-container">
                            <label>To Unit</label>
                            <select
                                value={conversions[category].toUnit}
                                onChange={(e) => handleChange(category, 'toUnit', e.target.value)}
                            >
                                {unitCategories[category].units.map((unit) => (
                                    <option key={unit.value} value={unit.value}>
                                        {unit.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UnitConverter;
