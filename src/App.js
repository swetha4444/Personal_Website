import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Layout from './components/Layout';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Menu from './pages/Menu'; 
import About from './pages/About'; 
import Research from './pages/Research';  
import Experience from './pages/Experience'; 
import VolumeControl from './components/VolumeControl';
import CustomCursor from './components/CustomCursor'; 

function AppContent() {
  const audioRef = useRef(null);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    // Don't play music on home page
    if (isHomePage) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      return;
    }

    const audio = audioRef.current;
    if (!audio) return;

    // Set the initial volume before the first play
    audio.volume = 0.2;

    const playAudio = async () => {
      try {
        await audio.play();
        document.removeEventListener('click', playAudio);
        document.removeEventListener('keydown', playAudio);
      } catch (error) {
        console.error("Audio playback failed:", error);
      }
    };

    // Listen for the first user interaction to start the music.
    document.addEventListener('click', playAudio, { once: true });
    document.addEventListener('keydown', playAudio, { once: true });

    return () => {
      document.removeEventListener('click', playAudio);
      document.removeEventListener('keydown', playAudio);
    };
  }, [isHomePage]);

  return (
    <>
      <CustomCursor />
      <audio
        ref={audioRef}
        src={process.env.PUBLIC_URL + "/music/matrix-bg.mp3"}
        autoPlay={!isHomePage}
        loop
        controls={false}
        style={{ display: "none" }}
      />
      {!isHomePage && <VolumeControl audioRef={audioRef} />}
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} /> 
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} /> 
          <Route path="/research" element={<Research />} />
          <Route path="/work" element={<Experience />} />
        </Routes>
      </Layout>
    </>
  );
}

function App() {
  return (
    <Router basename="/Personal_Website">
      <AppContent />
    </Router>
  );
}

export default App;