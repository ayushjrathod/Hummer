import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Hero from './Hero';
import Results from './Results';
import Songs from './Songs';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/results" element={<Results />} />
          <Route path="/song/:name" element={<Songs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
