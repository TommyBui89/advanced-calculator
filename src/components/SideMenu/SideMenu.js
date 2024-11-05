import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalculator, faExchangeAlt, faThermometerHalf, faDollarSign,
  faHome, faClock, faRuler, faGraduationCap, faSun, faMoon
} from '@fortawesome/free-solid-svg-icons';
import { faBitcoin } from '@fortawesome/free-brands-svg-icons';
import Toggle from 'react-toggle';
import './SideMenu.css';
import 'react-toggle/style.css';

const SideMenu = ({ toggleTheme, theme, isMenuVisible, closeMenu }) => {
  return (
    <div className={`side-menu ${isMenuVisible ? 'visible' : 'hidden'}`}>
      <ul>
        <li className="tooltip">
          <NavLink to="/" onClick={closeMenu}>
            <FontAwesomeIcon icon={faHome} />
          </NavLink>
          <span className="tooltiptext">Home</span>
        </li>
        <li className="tooltip">
          <NavLink to="/normal" onClick={closeMenu}>
            <FontAwesomeIcon icon={faCalculator} />
          </NavLink>
          <span className="tooltiptext">Calculator</span>
        </li>
        <li className="tooltip">
          <NavLink to="/currency" onClick={closeMenu}>
            <FontAwesomeIcon icon={faExchangeAlt} />
          </NavLink>
          <span className="tooltiptext">Currency Exchange</span>
        </li>
        <li className="tooltip">
          <NavLink to="/temperature" onClick={closeMenu}>
            <FontAwesomeIcon icon={faThermometerHalf} />
          </NavLink>
          <span className="tooltiptext">Temperature</span>
        </li>
        <li className="tooltip">
          <NavLink to="/loan" onClick={closeMenu}>
            <FontAwesomeIcon icon={faDollarSign} />
          </NavLink>
          <span className="tooltiptext">Loan Calculator</span>
        </li>
        <li className="tooltip">
          <NavLink to="/timezone" onClick={closeMenu}>
            <FontAwesomeIcon icon={faClock} />
          </NavLink>
          <span className="tooltiptext">Time Zone</span>
        </li>
        <li className="tooltip">
          <NavLink to="/unit" onClick={closeMenu}>
            <FontAwesomeIcon icon={faRuler} />
          </NavLink>
          <span className="tooltiptext">Unit Converter</span>
        </li>
        <li className="tooltip">
          <NavLink to="/grade" onClick={closeMenu}>
            <FontAwesomeIcon icon={faGraduationCap} />
          </NavLink>
          <span className="tooltiptext">Grade Calculator</span>
        </li>
        <li className="tooltip">
          <NavLink to="/crypto" onClick={closeMenu}>
            <FontAwesomeIcon icon={faBitcoin} />
          </NavLink>
          <span className="tooltiptext">Crypto Tracker</span>
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
