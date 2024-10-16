import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function SongPage() {
  const location = useLocation();
  const [track, setTrack] = useState(null);

  useEffect(() => {
    const fetchTrackData = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/song/${location.pathname.split('/')[2]}`,
          { mode: 'cors' }
        );
        const data = await res.json();
        setTrack(data);
      } catch (err) {
        console.error('Error fetching track data:', err);
      }
    };

    fetchTrackData();
  }, [location.pathname]); // Added dependency for pathname

  if (!track) {
    return <div>No track info available</div>; // Handle case when track is not loaded yet
  }

  return (
    <div className="flex flex-col items-center text-center mt-4">
      <Link
        to="/"
        className="absolute top-[10px] left-[20px] invert brightness-200 text-2xl font-black cursor-pointer mb-4 p-2.5 rounded transition-opacity duration-300 ease-in-out hover:opacity-60"
      >
        Home
      </Link>
      <img
        src={track.album_image}
        alt="Album"
        className="w-[400px] h-auto rounded-2xl mt-12 mb-4"
      />
      <h3 className="font-semibold text-2xl text-white text-center">
        {`${track.track} - ${track.artist}`}
      </h3>
      <h4 className="font-semibold text-xl text-white opacity-60 text-center mb-4 shadow-md">
        {track.album}
      </h4>
      <audio controls src={track.track_url} className="m-4 rounded-xl" />
    </div>
  );
}

export default SongPage;
