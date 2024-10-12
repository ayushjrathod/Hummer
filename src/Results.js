import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Results() {
  const location = useLocation();
  const { trackInfo } = location.state || { trackInfo: [] };

  if (!trackInfo || trackInfo.length === 0) {
    return <div>No track info available</div>;
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center text-center mt-4">
        <Link
          to="/"
          className="absolute top-[10px] left-[20px] invert brightness-200 text-2xl font-black cursor-pointer mb-4 p-2.5 rounded transition-opacity duration-300 ease-in-out hover:opacity-60"
        >
          Home
        </Link>
        <div className="flex">
          <img
            src={trackInfo[0].album_image}
            alt="Album"
            className="w-[400px] h-[400px] rounded-2xl mt-12 mb-4"
          />
          <div className="flex flex-col my-48 mx-8">
            <h3 className="font-semibold text-2xl text-white text-center">{`${trackInfo[0].track} - ${trackInfo[0].artist}`}</h3>
            <h4 className="font-semibold text-xl text-white opacity-60 text-center mb-4 shadow-md">
              {trackInfo[0].album}
            </h4>
            <audio
              controls
              src={trackInfo[0].track_url}
              className="m-4 rounded-xl"
            />
          </div>
        </div>
      </div>
      <span className="font-medium text-xl text-white text-left ml-40 my-8">
        Other Matches :
      </span>
      <div className="ml-40 flex justify-start items-center flex-wrap gap-4 my-2">
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
