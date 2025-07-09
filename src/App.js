import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import Home from './pages/Home';
import Projects from './pages/Projects';

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
          <Route path="/Personal_Website/projects" element={<Projects />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;