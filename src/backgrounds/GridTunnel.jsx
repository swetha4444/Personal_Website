import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Html } from '@react-three/drei';

// 🔹 Glowing grid boxes
function TunnelBoxes() {
  const groupRef = useRef();
  const speed = 1.5;

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.z += speed;
      if (groupRef.current.position.z > 20) {
        groupRef.current.position.z = 0;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: 100 }).map((_, i) => (
        <mesh key={i} position={[0, 0, -i * 20]}>
          <boxGeometry args={[50, 50, 2]} />
          <meshBasicMaterial
            color="#00ff00"
            wireframe
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

// 🔹 Matrix-style job display
const StationBoard = ({ job }) => {
    if (!job) return null; // Don't render if there's no job data
    return (
        <div className="station-board">
            <div className="station-title">NOW ARRIVING:</div>
            <div className="station-role">{job.role}</div>
            <div className="station-company">@ {job.company}</div>
            <div className="station-period">{job.period}</div>
        </div>
    );
};

// 🔹 Full tunnel + board component
const GridTunnel = ({ job }) => {
  const [showStation, setShowStation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowStation(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="grid-tunnel-container">
      <Canvas camera={{ fov: 90, position: [0, 0, 5] }}>
        <color attach="background" args={['black']} />
        <TunnelBoxes />
        <EffectComposer>
          <Bloom intensity={2.0} luminanceThreshold={0} radius={0.8} />
        </EffectComposer>

        {showStation && (
          <Html center style={{ pointerEvents: 'none', width: '100vw' }}>
            <StationBoard job={job} />
          </Html>
        )}
      </Canvas>

      <style>{`
        .grid-tunnel-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: black;
          z-index: 50;
        }
        .station-board {
          background: rgba(0, 0, 0, 0.85);
          padding: 1.5rem 2rem;
          border: 1px solid #00ff00;
          color: #00ff00;
          font-family: 'Courier New', monospace, sans-serif;
          text-align: center;
          box-shadow: 0 0 20px #00ff00;
          animation: fadeIn 1s ease-out forwards;
          max-width: 600px;
          margin: 0 auto;
        }
        .station-title { font-size: 1rem; opacity: 0.7; margin-bottom: 0.5rem; }
        .station-role { font-size: 2rem; font-weight: bold; }
        .station-company { font-size: 1.2rem; margin-top: 0.3rem; }
        .station-period { font-size: 0.9rem; margin-top: 0.3rem; opacity: 0.8; }
        .station-desc { margin-top: 1rem; font-size: 0.95rem; line-height: 1.4; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default GridTunnel;
