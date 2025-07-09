import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";

// Green matrix overlay component
function MatrixOverlay() {
  return (
    <div
      style={{
        pointerEvents: "none",
        position: "absolute",
        inset: 0,
        zIndex: 10,
        opacity: 0.18,
        mixBlendMode: "screen",
        background:
          "repeating-linear-gradient(120deg, #5dff4e22 0px, #5dff4e33 2px, transparent 4px, transparent 8px)",
      }}
    />
  );
}

function RetroComputerModel() {
  const { scene } = useGLTF(process.env.PUBLIC_URL + "/models/computer.glb");
  const ref = useRef();

  // Set initial rotation slightly to the left
  React.useEffect(() => {
    if (ref.current) {
      ref.current.rotation.y = -0.4; // negative = left, positive = right
    }
  }, []);

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
        position: "relative", // Needed for overlay
      }}
    >
      <Canvas camera={{ position: [0, 0, 14], fov: 80 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[15, 10, 10]} intensity={1} />
        <Suspense fallback={null}>
          <RetroComputerModel />
          {/* Manual rotation enabled, pan/zoom disabled */}
          <OrbitControls enablePan={false} enableZoom={false} />
        </Suspense>
      </Canvas>
      <MatrixOverlay />
    </div>
  );
}