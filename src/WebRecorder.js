import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [searchText, setSearchText] = useState('Search');
  const [isClicked, setIsClicked] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const micButtonRef = useRef(null);
  const playbackRef = useRef(null);
  const navigate = useNavigate();

  let canRecord = false;
  let recorder = null;
  let chunks = [];

  useEffect(() => {
    const micButton = micButtonRef.current;
    const playback = playbackRef.current;

    // setupAudio: Request access to the user's microphone and call setupStream with the audio stream.
    const setupAudio = async () => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
          });
          setupStream(stream);
        } catch (err) {
          console.error(err);
        }
      }
    };

    // setupStream: Initialize MediaRecorder, collect audio data into chunks, and process into an audio blob when recording stops.
    const setupStream = (stream) => {
      recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/mp3; codecs=opus' });
        setAudioBlob(blob);
        chunks = [];
        const audioURL = window.URL.createObjectURL(blob);
        playback.src = audioURL;
      };
      canRecord = true;
    };

    // toggleMic: Start or stop audio recording based on recorder's state and update mic button appearance.
    const toggleMic = () => {
      if (!canRecord) return;
      if (recorder.state === 'inactive') {
        recorder.start();
        micButton.classList.add('is-recording');
      } else {
        recorder.stop();
        micButton.classList.remove('is-recording');
      }
    };

    micButton.addEventListener('click', toggleMic);
    setupAudio();

    return () => {
      micButton.removeEventListener('click', toggleMic);
    };
  }, [audioBlob]);

  const handleTestQuery = async () => {
    const randomIndex = Math.floor(Math.random() * 17);
    const audioModule = await import(`./assets/${randomIndex}.mp3`);
    const response = await fetch(audioModule.default);
    const blob = await response.blob();
    setAudioBlob(blob);
    const audioURL = window.URL.createObjectURL(blob);
    playbackRef.current.src = audioURL;
  };

  // handleButtonClick: Send the audio blob to the backend for processing and navigate to the results page.
  const handleButtonClick = async () => {
    setIsClicked(true);
    setSearchText('Searching ...');
    const formData = new FormData();
    formData.append('audioFile', audioBlob, 'recording.mp3');

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/upload`,
        {
          method: 'POST',
          body: formData,
          mode: 'cors',
        }
      );

      const jsonData = await response.json();
      navigate('/results', { state: { trackInfo: jsonData.tracks } });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <main className="flex flex-col">
      <button
        className="mic-toggle relative mx-20 my-12 block w-44 h-44 rounded-full bg-white bg-opacity-10"
        ref={micButtonRef}
      >
        <span className="relative z-10 text-white text-8xl p-4 material-icons">
          mic
        </span>
      </button>
      <div className="flex mx-6 flex-col controls-container items-center gap-4">
        <button
          className="random-hum bg-white bg-opacity-90 shadow-lg rounded-lg text-sm font-medium p-3 flex flex-col items-center cursor-pointer transition-colors duration-300 ease-in-out hover:bg-opacity-70"
          onClick={handleTestQuery}
        >
          Random hum
        </button>
        <audio
          className="playback shadow-lg rounded-2xl"
          controls
          ref={playbackRef}
        ></audio>
        <button
          className={`search-button py-2 px-4 bg-[#641131] text-white text-sm font-medium rounded-lg h-[50px] cursor-pointer transition-colors duration-300 ease-in-out hover:bg-[#76325d] ${isClicked ? 'bg-[#76325d]' : ''}`}
          onClick={handleButtonClick}
        >
          {searchText}
        </button>
      </div>
    </main>
  );
}

export default Home;
