import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator, faExchangeAlt, faThermometerHalf, faDollarSign, faHome, faClock, faRuler, faGraduationCap, faTint, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import './SideMenu.css';

const SideMenu = ({ toggleTheme, theme }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleMenu = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={`side-menu ${isExpanded ? '' : 'collapsed'}`}>
            <button className="menu-toggle" onClick={toggleMenu}>
                <FontAwesomeIcon icon={isExpanded ? faTimes : faBars} />
            </button>
            <ul>
                <li><Link to="/" className="menu-link"><FontAwesomeIcon icon={faHome} /><span>Home</span></Link></li>
                <li><Link to="/normal" className="menu-link"><FontAwesomeIcon icon={faCalculator} /><span>Normal Calculator</span></Link></li>
                <li><Link to="/currency" className="menu-link"><FontAwesomeIcon icon={faExchangeAlt} /><span>Currency Exchange</span></Link></li>
                <li><Link to="/temperature" className="menu-link"><FontAwesomeIcon icon={faThermometerHalf} /><span>Temperature Converter</span></Link></li>
                <li><Link to="/loan" className="menu-link"><FontAwesomeIcon icon={faDollarSign} /><span>Loan Calculator</span></Link></li>
                <li><Link to="/timezone" className="menu-link"><FontAwesomeIcon icon={faClock} /><span>Time Zone Converter</span></Link></li>
                <li><Link to="/unit" className="menu-link"><FontAwesomeIcon icon={faRuler} /><span>Unit Converter</span></Link></li>
                <li><Link to="/grade" className="menu-link"><FontAwesomeIcon icon={faGraduationCap} /><span>Grade Calculator</span></Link></li>
            </ul>
            <div className="theme-toggle-container">
                <label className="theme-toggle-label">
                    <input
                        type="checkbox"
                        id="theme-toggle"
                        className="theme-toggle-checkbox"
                        onChange={toggleTheme}
                        checked={theme === 'dark'}
                    />
                    <span className="theme-toggle-inner">
                        <span className="icon sun-icon">☀️</span>
                        <span className="theme-toggle-switch" />
                        <span className="icon moon-icon">🌙</span>
                    </span>
                </label>
                {isExpanded && <span className="theme-toggle-text">{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>}
            </div>
        </div>
    );
};

export default SideMenu;
