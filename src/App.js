import logo from './logo.svg';
import './App.css';
import MatrixBackground from './components/particles';
import MatrixRain from './components/matrixRain'

function App() {
  return (
    <div>
      {/* <MatrixBackground  id="matrix-bg"/> */}
      <MatrixRain/>
      <h1 className="text-white">hello</h1>
     
    </div>
  );
}

export default App;