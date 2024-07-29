import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator, faExchangeAlt, faThermometerHalf, faDollarSign, faHome, faClock, faRuler, faGraduationCap, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import Toggle from 'react-toggle';
import './SideMenu.css';
import 'react-toggle/style.css';

const SideMenu = ({ toggleTheme, theme, isMenuVisible, closeMenu }) => {
    return (
        <div className={`side-menu ${isMenuVisible ? 'visible' : 'hidden'}`}>
            <ul>
                <li>
                    <NavLink to="/" className={({ isActive }) => "menu-link" + (isActive ? " active" : "")} onClick={closeMenu}>
                        <FontAwesomeIcon icon={faHome} />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/normal" className={({ isActive }) => "menu-link" + (isActive ? " active" : "")} onClick={closeMenu}>
                        <FontAwesomeIcon icon={faCalculator} />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/currency" className={({ isActive }) => "menu-link" + (isActive ? " active" : "")} onClick={closeMenu}>
                        <FontAwesomeIcon icon={faExchangeAlt} />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/temperature" className={({ isActive }) => "menu-link" + (isActive ? " active" : "")} onClick={closeMenu}>
                        <FontAwesomeIcon icon={faThermometerHalf} />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/loan" className={({ isActive }) => "menu-link" + (isActive ? " active" : "")} onClick={closeMenu}>
                        <FontAwesomeIcon icon={faDollarSign} />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/timezone" className={({ isActive }) => "menu-link" + (isActive ? " active" : "")} onClick={closeMenu}>
                        <FontAwesomeIcon icon={faClock} />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/unit" className={({ isActive }) => "menu-link" + (isActive ? " active" : "")} onClick={closeMenu}>
                        <FontAwesomeIcon icon={faRuler} />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/grade" className={({ isActive }) => "menu-link" + (isActive ? " active" : "")} onClick={closeMenu}>
                        <FontAwesomeIcon icon={faGraduationCap} />
                    </NavLink>
                </li>
            </ul>
            <div className="theme-toggle-container">
                <Toggle
                    defaultChecked={theme === 'dark'}
                    icons={{
                        checked: <FontAwesomeIcon icon={faMoon} className="toggle-icon" />,
                        unchecked: <FontAwesomeIcon icon={faSun} className="toggle-icon" />,
                    }}
                    onChange={toggleTheme}
                />
            </div>
        </div>
    );
};

export default SideMenu;
