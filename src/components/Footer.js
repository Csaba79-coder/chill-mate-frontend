import React from "react";
import "../styles/Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} - Daniel Pocz, Csaba Vadasz</p>
        </footer>
    );
}

export default Footer;