import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Results from './Results';
import WebRecorder from './WebRecorder';

function App() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    console.log('Backend URL:', process.env.REACT_APP_BACKEND_URL);
    fetch(`${process.env.REACT_APP_BACKEND_URL}/songs`, {
      mode: 'cors',
    })
      .then((res) => res.json())
      .then((data) => {
        setSongs(data);
      });
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route
            path="/"
            element={
              <div className="flex h-screen items-center">
                <WebRecorder />
                <div className="text-white text-xl font-medium">
                  <h2 className="text-left text-2xl">Songs in database:</h2>
                  <div className="flex justify-start items-center flex-wrap gap-4">
                    {songs.map((song, index) => (
                      <div
                        key={index}
                        className="bg-[rgba(210,135,154,0.079)] rounded-lg p-2.5 shadow-md text-center flex flex-col items-center"
                      >
                        <p className="text-sm text-[#ddd] m-0">
                          {song.track} - {song.artist}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            }
          />
          <Route path="/results" element={<Results />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
