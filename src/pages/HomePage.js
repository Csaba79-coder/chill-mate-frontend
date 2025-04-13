import React from "react";
import { useNavigate } from "react-router-dom"; // importáld a useNavigate hook-ot
import "../styles/HomePage.css";

function HomePage() {
    const navigate = useNavigate(); // a navigációs hook beállítása

    return (
        <div className="home-page">
            <header className="home-header">
                <img src={require("../assets/pannon-logo.png")} alt="Suli Logo" className="home-logo" />
                <h1>Üdvözöllek a Chill Mate alkalmazásban!</h1>
                <p>Ez egy webalkalmazás, ami segít a felhasználók kezelésében és megjeleníti az adatbázis tartalmát.</p>
            </header>
        </div>
    );
}

export default HomePage;
