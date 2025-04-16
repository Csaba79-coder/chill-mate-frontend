import React from "react";
import "../styles/HomePage.css";

function HomePage() {

    return (
        <div className="home-page">
            <header className="home-header">
                <h1>Üdvözöllek a Chill Mate alkalmazásban!</h1>
                <img src={require(`../assets/pannon-logo.png`)} alt="Suli Logo" className="home-logo" />
                <p id="home-description">Ez egy webalkalmazás, ami segít a felhasználók kezelésében és megjeleníti az adatbázis tartalmát.</p>
            </header>
        </div>
    );
}

export default HomePage;
