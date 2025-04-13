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
                    <li><Link to="/activities">Aktivitások</Link></li>
                    <li><Link to="/cities">Városok</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
