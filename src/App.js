import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Menu from './pages/Menu'; // Import the new Menu page
import About from './pages/About'; // Import the About page
import Research from './pages/Research'; // Import the Research page
import Experience from './pages/Experience'; // Import the Experience page

function App() {
  return (
    <Router basename="/Personal_Website">
      <audio
        src={process.env.PUBLIC_URL + "music/matrix-bg.mp3"}
        autoPlay
        loop
        controls={false}
        style={{ display: "none" }}
      />
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