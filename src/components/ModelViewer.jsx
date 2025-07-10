import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function Model({ modelPath, scale }) {
  const { scene } = useGLTF(modelPath);

  // Use a lighter neon green shade
  scene.traverse((child) => {
    if (child.isMesh && child.material) {
      child.material.emissive && (child.material.emissive.set('#baffc9'));
      child.material.emissiveIntensity = 1.5;
      child.material.color && (child.material.color.set('#baffc9'));
    }
  });

  return <primitive object={scene} scale={scale} position={[0, 0, 0]} />;
}

function LoadingFallback() {
  return (
    <mesh visible={false}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial wireframe />
    </mesh>
  );
}

// Accept scale as a prop, with a default value of 1.5
export default function ModelViewer({ modelPath, scale = 1.5 }) {
  return (
    <div className="w-full h-full min-h-0 min-w-0">
      <Canvas style={{ width: '100%', height: '100%' }} camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={2.2} color="#baffc9" />
        <directionalLight position={[5, 5, 5]} intensity={2.5} color="#baffc9" />
        <Suspense fallback={<LoadingFallback />}>
          <Model modelPath={modelPath} scale={scale} />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={1.5}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 2.5}
        />
      </Canvas>
    </div>
  );
}