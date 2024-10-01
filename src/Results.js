import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Results() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  const location = useLocation();
  const { trackInfo } = location.state || { trackInfo: [] };

  if (!trackInfo || trackInfo.length === 0) {
    return <div>No track info available</div>;
  }

  return (
    <div>
      <div className="flex flex-col items-center text-center mt-4">
        <button
          className="absolute top-[100px] left-[70px] invert brightness-200 text-3xl font-black cursor-pointer mb-4 p-2.5 rounded transition-opacity duration-300 ease-in-out hover:opacity-60"
          onClick={handleBackClick}
        >
          ⬅
        </button>
        <img
          src={trackInfo[0].album_image}
          alt="Album"
          className="w-[400px] h-auto rounded-2xl mt-12 mb-4"
        />
        <h3 className="font-semibold text-2xl text-white text-center">{`${trackInfo[0].track} - ${trackInfo[0].artist}`}</h3>
        <h4 className="font-semibold text-xl text-white opacity-60 text-center mb-4 shadow-md">
          {trackInfo[0].album}
        </h4>
        <audio controls src={trackInfo[0].track_url} className="m-4" />
      </div>
      <div className="font-medium text-xl text-white text-left ml-40 mb-4">
        Other Matches :
      </div>
      <div className="flex justify-start items-center flex-wrap gap-4 mx-40">
        {trackInfo.slice(1, 5).map((track, index) => (
          <div
            key={index}
            className="bg-[rgba(210,135,154,0.079)] rounded-lg p-2.5 shadow-md text-center flex flex-col items-center"
          >
            <p className="text-sm text-[#ddd] m-0">
              {track.track} - {track.artist}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Results;
