import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator, faExchangeAlt, faThermometerHalf, faDollarSign, faClock, faRuler, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css';

const calculators = [
    { path: '/normal', icon: faCalculator, name: 'Normal Calculator' },
    { path: '/currency', icon: faExchangeAlt, name: 'Currency Exchange' },
    { path: '/temperature', icon: faThermometerHalf, name: 'Temperature Converter' },
    { path: '/loan', icon: faDollarSign, name: 'Loan Calculator' },
    { path: '/timezone', icon: faClock, name: 'Time Zone Converter' },
    { path: '/unit', icon: faRuler, name: 'Unit Converter' },
    { path: '/grade', icon: faGraduationCap, name: 'Grade Calculator' },
];

const Dashboard = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCalculators = calculators.filter(calculator =>
        calculator.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="dashboard">
            <h2>Welcome to the Calculator Dashboard</h2>
            <p>Select a calculator from the menu or search below.</p>
            <input
                type="text"
                placeholder="Search for a calculator..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar"
            />
            <div className="calculator-grid">
                {filteredCalculators.map((calculator, index) => (
                    <Link to={calculator.path} key={index} className="calculator-card">
                        <FontAwesomeIcon icon={calculator.icon} size="2x" />
                        <span>{calculator.name}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
