import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import ActivityPage from './pages/ActivityPage'; // ezt mindjárt csináljuk

function App() {
  return (
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/activities" element={<ActivityPage />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
