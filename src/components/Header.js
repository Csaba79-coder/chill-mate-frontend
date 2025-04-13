import React from "react";
import { Link } from "react-router-dom"; // Navigációhoz
import "../styles/Header.css";

function Header() {
    return (
        <header className="header">
            <img src={require("../assets/pannon-logo.png")} alt="Suli Logo" className="logo" />
            <nav>
                <ul>
                    <li><Link to="/">Főoldal</Link></li>
                    <li><Link to="/activities">Tevékenységek</Link></li>
                    <li><Link to="/cities">Városok</Link></li>
                    <li><Link to="/hobbies">Kedvenc időtöltés</Link></li>
                    <li><Link to="/movies">Filmek</Link></li>
                    <li><Link to="/music-genres">Zenei műfajok</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
