import React from "react";
import "../styles/Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} - Daniel Pocz-Nagy, Csaba Vadasz</p>
                <img src={require("../assets/chill-mates.png")} alt="Chill Logo" className="chill-logo" />
            </div>
        </footer>
    );
}

export default Footer;