import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SideMenu from './components/SideMenu/SideMenu';
import Dashboard from './components/Dashboard/Dashboard';
import NormalCalculator from './components/NormalCalculator/NormalCalculator';
import CurrencyExchange from './components/CurrencyExchange/CurrencyExchangeCalculator';
import TemperatureConverter from './components/TemperatureConverter/TemperatureConverter';
import LoanCalculator from './components/LoanCalculator/LoanCalculator';
import TimeZoneConverter from './components/TimeZoneConverter/TimeZoneConverter';
import UnitConverter from './components/UnitConverter/UnitConverter';
import GradeCalculator from './components/GradeCalculator/GradeCalculator';
import './App.css';

const App = () => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <div className={`app ${theme}`}>
            <Router>
                <SideMenu toggleTheme={toggleTheme} theme={theme} />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/normal" element={<NormalCalculator />} />
                        <Route path="/currency" element={<CurrencyExchange />} />
                        <Route path="/temperature" element={<TemperatureConverter />} />
                        <Route path="/loan" element={<LoanCalculator theme={theme} />} />
                        <Route path="/timezone" element={<TimeZoneConverter />} />
                        <Route path="/unit" element={<UnitConverter />} />
                        <Route path="/grade" element={<GradeCalculator />} />
                    </Routes>
                </div>
            </Router>
        </div>
    );
};

export default App;
