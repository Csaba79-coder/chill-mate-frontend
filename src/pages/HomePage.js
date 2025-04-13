import React from "react";
import { useNavigate } from "react-router-dom"; // importáld a useNavigate hook-ot
import "../styles/HomePage.css";

function HomePage() {
    const navigate = useNavigate(); // a navigációs hook beállítása

    const goToActivities = () => {
        navigate('/activities'); // ide irányít át az Activity gomb
    }

    const goToCities = () => {
        navigate('/cities'); // ide irányít át a City gomb
    }

    return (
        <div className="home-page">
            {/* Button container */}
            <div className="button-container">
                <button onClick={goToActivities} className="activity-button">
                    Tevékenység
                </button>
                <button onClick={goToCities} className="city-button">
                    Város
                </button>
            </div>

            <header className="home-header">
                <img src={require("../assets/pannon-logo.png")} alt="Suli Logo" className="home-logo" />
                <h1>Üdvözöllek a Chill Mate alkalmazásban!</h1>
                <p>Ez egy webalkalmazás, ami segít a felhasználók kezelésében és megjeleníti az adatbázis tartalmát.</p>
            </header>
        </div>
    );
}

export default HomePage;
