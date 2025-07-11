import React, { useRef } from 'react';
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