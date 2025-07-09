import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

function SentinelleModel() {
  const { scene } = useGLTF(process.env.PUBLIC_URL + "/models/sentinelle-matrix.glb");
  const ref = useRef();

  // Slowly rotate the model around the Y axis
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.003;
    }
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={0.7}            // Slightly larger
      position={[0, -2.2, 0]} // Lower the model to fit full height
    />
  );
}

export default function SentinelleScene() {
  return (
    <div
      style={{
        width: "320px",      // Wider container
        height: "520px",     // Taller container
        background: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Canvas camera={{ position: [0, 0, 14], fov: 40 }}> {/* Pull camera back */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <Suspense fallback={null}>
          <SentinelleModel />
        </Suspense>
      </Canvas>
    </div>
  );
}