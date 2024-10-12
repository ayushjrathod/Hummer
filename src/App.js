import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Hero from './Hero';
import Results from './Results';
import SongPage from './SongPage';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/results" element={<Results />} />
          <Route path="/song/:name" element={<SongPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
