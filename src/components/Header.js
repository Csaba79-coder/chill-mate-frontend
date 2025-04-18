import React from "react";
import {NavLink} from "react-router-dom";
import "../styles/Header.css";

function Header() {
    return (
        <header className="header">
            <img src={require("../assets/pannon-logo.png")} alt="Suli Logo" className="logo" />
            <nav>
                <ul>
                    <li><NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Főoldal</NavLink></li>
                    <li><NavLink to="/activities" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Események</NavLink></li>
                    <li><NavLink to="/cities" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Városok</NavLink></li>
                    <li><NavLink to="/hobbies" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Hobbik</NavLink></li>
                    <li><NavLink to="/movies" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Filmek</NavLink></li>
                    <li><NavLink to="/music-genres" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Zenei műfajok</NavLink></li>
                    <li><NavLink to="/sports" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Sportok</NavLink></li>
                    <li><NavLink to="/users" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Emberek</NavLink></li>
                    <li><NavLink to="/connections" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Kapcsolatok</NavLink></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
