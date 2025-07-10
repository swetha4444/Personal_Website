import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// 🔹 Simulated job input (or pass as a prop)
const job = {
  company: 'Stark Industries',
  role: 'Lead AI Architect',
  period: '2022 - Present',
  description: 'Developed AI systems for global security.',
};

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
const StationBoard = ({ job }) => (
  <div className="station-board">
    <div className="station-title">NOW ARRIVING:</div>
    <div className="station-role">{job.role}</div>
    <div className="station-company">@ {job.company}</div>
    <div className="station-period">{job.period}</div>
    <div className="station-desc">{job.description}</div>

    <style>{`
      .station-board {
        position: absolute;
        top: 20%;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.85);
        padding: 1.5rem 2rem;
        border: 1px solid #00ff00;
        color: #00ff00;
        font-family: 'Courier New', monospace, sans-serif;
        text-align: center;
        box-shadow: 0 0 20px #00ff00;
        z-index: 9999;
        animation: fadeIn 1s ease-out forwards;
        max-width: 90vw;
      }

      .station-title {
        font-size: 1rem;
        opacity: 0.7;
        margin-bottom: 0.5rem;
      }

      .station-role {
        font-size: 2rem;
        font-weight: bold;
      }

      .station-company {
        font-size: 1.2rem;
        margin-top: 0.3rem;
      }

      .station-period {
        font-size: 0.9rem;
        margin-top: 0.3rem;
        opacity: 0.8;
      }

      .station-desc {
        margin-top: 1rem;
        font-size: 0.95rem;
        line-height: 1.4;
      }

      @keyframes fadeIn {
        from { opacity: 0; transform: translate(-50%, 10%); }
        to { opacity: 1; transform: translate(-50%, 0); }
      }
    `}</style>
  </div>
);

// 🔹 Full tunnel + board component
const GridTunnel = ({ job: jobProp }) => {
  const [showStation, setShowStation] = useState(false);
  const jobData = jobProp || job;

  useEffect(() => {
    const timer = setTimeout(() => setShowStation(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="grid-tunnel-container">
      <Canvas
        camera={{ fov: 90, position: [0, 0, 0] }}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1,
        }}
      >
        <color attach="background" args={['black']} />
        <TunnelBoxes />
        <EffectComposer>
          <Bloom intensity={2.0} luminanceThreshold={0} radius={0.8} />
        </EffectComposer>
      </Canvas>

      {showStation && <StationBoard job={jobData} />}

      <style>{`
        .grid-tunnel-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: black;
          overflow: hidden;
          z-index: 0;
        }
      `}</style>
    </div>
  );
};

export default GridTunnel;
