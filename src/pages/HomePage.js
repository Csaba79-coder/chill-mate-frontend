import React from "react";
import { useNavigate } from "react-router-dom"; // importáld a useNavigate hook-ot
import "../styles/HomePage.css";

function HomePage() {
    const navigate = useNavigate(); // a navigációs hook beállítása

    const goToActivities = () => {
        navigate('/activities'); // ide irányít át a gomb
    }

    return (
        <div className="home-page">
            <header className="home-header">
                <img src={require("../assets/pannon-logo.png")} alt="Suli Logo" className="home-logo" />
                <h1>Üdvözöllek a Chill Mate alkalmazásban!</h1>
                <p>Ez egy webalkalmazás, ami segít a felhasználók kezelésében és megjeleníti az adatbázis tartalmát.</p>
                {/* Gomb hozzáadása a link helyett */}
                <button onClick={goToActivities} className="activity-button">
                    Activity
                </button>
            </header>
        </div>
    );
}

export default HomePage;
