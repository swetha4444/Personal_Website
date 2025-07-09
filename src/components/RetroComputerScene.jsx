import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";

function RetroComputerModel() {
  const { scene } = useGLTF(process.env.PUBLIC_URL + "/models/computer.glb");
  const ref = useRef();

  // No auto-rotation, user can rotate with mouse

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={9}
      position={[-1, -2.2, 0.5]}
    />
  );
}

export default function RetroComputerScene() {
  return (
    <div
      style={{
        width: "420px",
        height: "520px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Canvas camera={{ position: [0, 0, 14], fov: 80 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[15, 10, 10]} intensity={1} />
        <Suspense fallback={null}>
          <RetroComputerModel />
          <OrbitControls enablePan={false} enableZoom={false} />
        </Suspense>
      </Canvas>
    </div>
  );
}