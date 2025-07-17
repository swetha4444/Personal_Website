import React, { useRef, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Menu from './pages/Menu'; 
import About from './pages/About'; 
import Research from './pages/Research';  
import Experience from './pages/Experience'; 
import VolumeControl from './components/VolumeControl'; 

function App() {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set the initial volume before the first play
    audio.volume = 0.2; // Initial volume set to 10%

    const playAudio = async () => {
      try {
        await audio.play();
        // If playback is successful, we don't need this listener anymore.
        document.removeEventListener('click', playAudio);
        document.removeEventListener('keydown', playAudio);
      } catch (error) {
        console.error("Audio playback failed:", error);
        // Autoplay was prevented. The user can still start it via the volume control.
      }
    };

    // Listen for the first user interaction to start the music.
    document.addEventListener('click', playAudio, { once: true });
    document.addEventListener('keydown', playAudio, { once: true });

    return () => {
      document.removeEventListener('click', playAudio);
      document.removeEventListener('keydown', playAudio);
    };
  }, []);

  return (
    <Router basename="/Personal_Website">
      <audio
        ref={audioRef}
        src={process.env.PUBLIC_URL + "/music/matrix-bg.mp3"}
        autoPlay
        loop
        controls={false}
        style={{ display: "none" }}
      />
      <VolumeControl audioRef={audioRef} />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} /> 
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} /> 
          <Route path="/research" element={<Research />} />
          <Route path="/work" element={<Experience />} />
          {/* Add other routes for /work, /research here */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;