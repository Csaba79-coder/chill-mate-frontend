import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import ActivityPage from './pages/ActivityPage'; // ActivityPage importálása
import CityPage from './pages/CityPage'; // CityPage importálása

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/activities" element={<ActivityPage />} />
                    <Route path="/cities" element={<CityPage />} /> {/* Új route a városoknak */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
