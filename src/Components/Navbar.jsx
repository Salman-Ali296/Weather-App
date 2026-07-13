import React, { useState } from 'react';
import './Navbar.css';
import searchIcon from '../assets/Assets/search.png';
import logoIcon from '../assets/Assets/logo.png';

const Navbar = ({ onSearch, date, location }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        if (searchTerm.trim()) {
            onSearch(searchTerm);
            setSearchTerm('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <nav className="navbar">
            <div className="nav-brand">
                <img src={logoIcon} alt="Atmosphere Logo" className="nav-logo" />
                <h1>Atmosphere</h1>
            </div>

            <div className="nav-search">
                <input
                    type="text"
                    placeholder="Search city..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <img
                    src={searchIcon}
                    alt="Search"
                    onClick={handleSearch}
                    className="nav-search-icon"
                />
            </div>

            <div className="nav-info">
                {location && <span className="nav-location">{location}</span>}
                <span className="nav-date">{date}</span>
            </div>
        </nav>
    );
};

export default Navbar;
