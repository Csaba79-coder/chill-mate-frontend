import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import ActivityPage from './pages/ActivityPage';
import CityPage from './pages/CityPage';
import Header from "./components/Header";
import Footer from "./components/Footer";
import HobbyPage from "./pages/HobbyPage";
import MoviePage from "./pages/MoviePage";
import MusicGenrePage from "./pages/MusicGenrePage";
import SportPage from "./pages/SportPage";

function App() {
    return (
        <Router>
            <div className="App">
                <Header /> {}
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/index.html" element={<HomePage />} /> {}
                    <Route path="/activities" element={<ActivityPage />} />
                    <Route path="/cities" element={<CityPage />} />
                    <Route path="/hobbies" element={<HobbyPage />} />
                    <Route path="/movies" element={<MoviePage />} />
                    <Route path="/music-genres" element={<MusicGenrePage />} />
                    <Route path="/sports" element={<SportPage />} />
                    <Route path="*" element={<HomePage />} />
                </Routes>
                <Footer /> {}
            </div>
        </Router>
    );
}

export default App;
