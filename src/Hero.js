import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import WebRecorder from './WebRecorder';

const Hero = () => {
  const [songs, setSongs] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [visibleSongs, setVisibleSongs] = useState(10);
  const [loading, setLoading] = useState(true); // added loading state

  useEffect(() => {
    console.log('Backend URL:', process.env.REACT_APP_BACKEND_URL);
    setLoading(true); // start loading
    fetch(`${process.env.REACT_APP_BACKEND_URL}/songs`, {
      mode: 'cors',
    })
      .then((res) => res.json())
      .then((data) => {
        setSongs(data);
        setLoading(false); // end loading
      });
  }, []);

  const toggleShowAll = () => {
    setShowAll(!showAll);
    setVisibleSongs(showAll ? 10 : songs.length);
  };

  return (
    <div className="flex items-center justify-around mt-24">
      <WebRecorder />
      <div className="text-white text-xl font-medium w-1/2 h-screen pt-24">
        <h2 className="text-left text-2xl mb-4">Songs in database:</h2>
        {loading ? (
          <div className="text-center py-10">
            {/* Enhanced loading spinner */}
            <span className="animate-spin inline-block mr-2 border-4 border-t-transparent rounded-full w-8 h-8 border-white"></span>
            <span>Loading...</span>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap gap-4">
              {songs.slice(0, visibleSongs).map((song, index) => (
                <div
                  key={index}
                  className="bg-[rgba(210,135,154,0.079)] rounded-lg p-2.5 shadow-md text-center flex flex-col items-center transform transition duration-300 hover:scale-105"
                >
                  <Link
                    to={`/song/${song.track}`}
                    className="text-sm text-[#ddd] m-0"
                  >
                    {song.track} - {song.artist}
                  </Link>
                </div>
              ))}
            </div>
            <div className="">
              {songs.length > 10 && (
                <button
                  className="text-white text-sm font-medium rounded-lg p-2 bg-[#641131] mt-4 cursor-pointer transition-colors duration-300 ease-in-out hover:bg-[#76325d]"
                  onClick={toggleShowAll}
                >
                  {showAll ? 'Show less' : 'Show all'}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Hero;
