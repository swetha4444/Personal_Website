import React, { useRef, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Html } from "@react-three/drei";
import { FaLightbulb } from "react-icons/fa";
import NavBar from "../components/Navbar";

function RoomModel({ lightsOn }) {
  const { scene } = useGLTF(process.env.PUBLIC_URL + "/models/about.glb");
  // Store original colors/emissives only once
  React.useEffect(() => {
    scene.traverse((obj) => {
      if (obj.isMesh && obj.material) {
        const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
        materials.forEach((mat) => {
          if (mat.color && !mat.userData.originalColor) {
            mat.userData.originalColor = mat.color.clone();
          }
          if (mat.emissive && !mat.userData.originalEmissive) {
            mat.userData.originalEmissive = mat.emissive.clone();
          }
        });
      }
    });
  }, [scene]);

  React.useEffect(() => {
    scene.traverse((obj) => {
      if (obj.isLight) obj.intensity = lightsOn ? 0.7 : 0.05; // Lower intensity for lights off
      if (obj.isMesh && obj.material) {
        const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
        materials.forEach((mat) => {
          if (mat.color && mat.userData.originalColor) {
            mat.color.copy(mat.userData.originalColor);
            if (!lightsOn) mat.color.multiplyScalar(0.4); // Darken non-glowing materials more
          }
          if (mat.emissive && mat.userData.originalEmissive) {
            mat.emissive.copy(mat.userData.originalEmissive);
            if (!lightsOn) mat.emissive.multiplyScalar(0.2); // Dim glowing materials more
          }
        });
      }
    });
  }, [lightsOn, scene]);

  return <primitive object={scene} />;
}

export default function About() {
  const [lightsOn, setLightsOn] = useState(false);
  const audioRef = useRef(null);

  const handleLightToggle = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    setLightsOn((v) => !v);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* 3D Room Background */}
      <Canvas camera={{ position: [0, 1.5, 5], fov: 60 }}>
        <color attach="background" args={["#101214"]} />
        <ambientLight intensity={0.02} />
        <Suspense fallback={null}>
          <RoomModel lightsOn={lightsOn} />
          <Environment preset="warehouse" background={false} />
        </Suspense>
        <OrbitControls enablePan={false} enableZoom={false} maxPolarAngle={Math.PI / 2.1} />
      </Canvas>

      {/* Overlay UI */}
      <div className="absolute top-0 left-0 w-full z-20">
        <NavBar />
      </div>
      {/* Light toggle icon at the bottom center */}
      <button
        className="fixed bottom-24 left-1/2 -translate-x-1/2 z-30 bg-black/60 rounded-full p-3 border-2 border-[#5dff4e] shadow-lg hover:bg-[#222] transition-all"
        style={{ pointerEvents: "auto" }}
        onClick={handleLightToggle}
        aria-label={lightsOn ? "Turn lights off" : "Turn lights on"}
      >
        <FaLightbulb
          size={28}
          className={lightsOn ? "text-[#5dff4e] drop-shadow-[0_0_8px_#5dff4e]" : "text-gray-500"}
          style={{
            filter: lightsOn ? "drop-shadow(0 0 8px #5dff4e)" : "none",
            transition: "color 0.2s, filter 0.2s"
          }}
        />
        {/* Audio element for light switch */}
        <audio ref={audioRef} src={process.env.PUBLIC_URL + "/music/light-switch.mp3"} preload="auto" />
      </button>
      {/* About text directly over the model, no background */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
        <div className="max-w-lg mx-auto mt-32 pointer-events-auto">
          <h1 className="text-4xl font-bold text-[#5dff4e] mb-4 text-center font-[JetBrains_Mono,monospace] animate-typing">
            About Me
          </h1>
          <p className="text-green-200 text-lg mb-4 text-center font-[JetBrains_Mono,monospace]">
            Welcome to my digital room! I’m Swetha, a passionate developer and researcher.<br />
            This interactive 3D space is built with Blender, React, and Three.js.<br />
          </p>

          <footer className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 text-xs text-[#5dff4e] text-center font-[JetBrains_Mono,monospace] font-bold bg-black/60 px-4 py-2 rounded-full shadow-lg pointer-events-auto">
            {lightsOn
              ? "💡 Lights are ON. Enjoy the details of the room!"
              : "🌑 Lights are OFF. Click to turn them back on."}
          </footer>
          <style>{`
            @keyframes typing {
              from { opacity: 0; transform: translateY(40px);}
              to { opacity: 1; transform: translateY(0);}
            }
            .animate-typing {
              animation: typing 1.2s cubic-bezier(0.22,1,0.36,1) both;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}