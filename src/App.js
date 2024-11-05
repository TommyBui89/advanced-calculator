import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import SideMenu from './components/SideMenu/SideMenu';
import Dashboard from './components/Dashboard/Dashboard';
import NormalCalculator from './components/NormalCalculator/NormalCalculator';
import CurrencyExchange from './components/CurrencyExchange/CurrencyExchangeCalculator';
import TemperatureConverter from './components/TemperatureConverter/TemperatureConverter';
import LoanCalculator from './components/LoanCalculator/LoanCalculator';
import TimeZoneConverter from './components/TimeZoneConverter/TimeZoneConverter';
import UnitConverter from './components/UnitConverter/UnitConverter';
import GradeCalculator from './components/GradeCalculator/GradeCalculator';
import CryptoPrices from './components/CryptoPrices/CryptoPrices';
import CryptoCurrencies from './components/CryptoPrices/CryptoCurrencies';
import CryptoDetails from './components/CryptoPrices/CryptoDetails';
import './App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import 'react-toggle/style.css';

const App = () => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
    };

    const closeMenu = () => {
        setIsMenuVisible(false);
    };

    return (
        <div className={`app ${theme}`}>
            <Router>
                <SideMenu toggleTheme={toggleTheme} theme={theme} isMenuVisible={isMenuVisible} closeMenu={closeMenu} />
                <div className="main-content">
                    <Header toggleMenu={toggleMenu} isMenuVisible={isMenuVisible} />
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
                            <Route path="/crypto" element={<CryptoPrices />} />
                            <Route path="/crypto/cryptocurrencies" element={<CryptoCurrencies />} />
                            <Route path="/crypto/:coinId" element={<CryptoDetails />} />
                        </Routes>
                    </div>
                </div>
            </Router>
        </div>
    );
};

const Header = ({ toggleMenu, isMenuVisible }) => {
    const location = useLocation();
    const routeNameMap = {
        '/': 'Dashboard',
        '/normal': 'Normal Calculator',
        '/currency': 'Currency Exchange',
        '/temperature': 'Temperature Converter',
        '/loan': 'Loan Calculator',
        '/timezone': 'Time Zone Converter',
        '/unit': 'Unit Converter',
        '/grade': 'Grade Calculator',
        '/crypto': 'Crypto Prices'
    };

    return (
        <header className="header">
            <button className="menu-toggle" onClick={toggleMenu}>
                <FontAwesomeIcon icon={isMenuVisible ? faTimes : faBars} />
            </button>
            <h1>{routeNameMap[location.pathname] || 'Dashboard'}</h1>
        </header>
    );
};

export default App;
