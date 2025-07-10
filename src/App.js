import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Menu from './pages/Menu'; // Import the new Menu page
import About from './pages/About'; // Import the About page
import Research from './pages/Research'; // Import the Research page

function App() {
  return (
    <Router>
      <audio
        src={process.env.PUBLIC_URL + "music/matrix-bg.mp3"}
        autoPlay
        loop
        controls={false}
        style={{ display: "none" }}
      />
      <Layout>
        <Routes>
          <Route path="/Personal_Website" element={<Home />} />
          <Route path="/Personal_Website/menu" element={<Menu />} /> 
          <Route path="/Personal_Website/projects" element={<Projects />} />
          <Route path="/Personal_Website/about" element={<About />} /> 
          <Route path="/Personal_Website/research" element={<Research />} />
          {/* Add other routes for /work, /research here */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;