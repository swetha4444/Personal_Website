import React, { useRef, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Html } from "@react-three/drei";
import { FaLightbulb, FaLaptopCode, FaAward, FaGithub, FaLinkedin, FaFileDownload } from "react-icons/fa";
import NavBar from "../components/navbar";
import SkillsPopup from "../components/SkillsPopup";

function RoomModel({ lightsOn }) {
  const { scene, nodes } = useGLTF(process.env.PUBLIC_URL + "/models/about.glb");

  // Log the nodes to find the name of your object
  console.log(nodes);

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
  const [showSkills, setShowSkills] = useState(false);
  const audioRef = useRef(null);
  const skillsAudioRef = useRef(null);

  const handleLightToggle = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    setLightsOn((v) => !v);
  };

  const handleSkillsClick = () => {
    if (skillsAudioRef.current) {
      skillsAudioRef.current.currentTime = 0;
      skillsAudioRef.current.play();
    }
    setShowSkills(true);
  };

  const handleCertificationsClick = () => {
    alert("Existing Certifications yet to be added!");
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
      {/* Lightbulb button in the bottom left */}
      <div className="fixed bottom-8 left-8 z-30">
        <button
          className="group relative bg-black/60 rounded-full p-3 border-2 border-[#5dff4e] shadow-lg hover:bg-[#222] transition-all"
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
          <audio ref={audioRef} src={process.env.PUBLIC_URL + "/music/light-switch.mp3"} preload="auto" />
          <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 bg-[#111]/90 text-[#5dff4e] text-xs font-mono px-3 py-1 rounded shadow-lg transition pointer-events-none z-50">
            {lightsOn ? "Turn Lights Off" : "Turn Lights On"}
          </span>
        </button>
      </div>
      {/* Control buttons at the bottom center */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4">
        <button
          className="group relative bg-black/60 rounded-full p-3 border-2 border-[#5dff4e] shadow-lg hover:bg-[#222] transition-all"
          style={{ pointerEvents: "auto" }}
          onClick={handleSkillsClick}
          aria-label="View my skills"
        >
          <FaLaptopCode size={28} className="text-[#5dff4e] drop-shadow-[0_0_8px_#5dff4e]" />
          <audio ref={skillsAudioRef} src={process.env.PUBLIC_URL + "/music/click.mp3"} preload="auto" />
          <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 bg-[#111]/90 text-[#5dff4e] text-xs font-mono px-3 py-1 rounded shadow-lg transition pointer-events-none z-50">
            View my skills
          </span>
        </button>
        <button
          className="group relative bg-black/60 rounded-full p-3 border-2 border-[#5dff4e] shadow-lg hover:bg-[#222] transition-all"
          style={{ pointerEvents: "auto" }}
          onClick={handleCertificationsClick}
          aria-label="View certifications"
        >
          <FaAward  size={28} className="text-[#5dff4e] drop-shadow-[0_0_8px_#5dff4e]" />
          <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 bg-[#111]/90 text-[#5dff4e] text-xs font-mono px-3 py-1 rounded shadow-lg transition pointer-events-none z-50">
            View my certifications
          </span>
        </button>
        {/* Social and Resume Links */}
        <a
            href="https://github.com/swetha4444"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-black/60 rounded-full p-3 border-2 border-[#5dff4e] shadow-lg hover:bg-[#222] transition-all"
            aria-label="GitHub Profile"
        >
            <FaGithub size={28} className="text-[#5dff4e] drop-shadow-[0_0_8px_#5dff4e]" />
            <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 bg-[#111]/90 text-[#5dff4e] text-xs font-mono px-3 py-1 rounded shadow-lg transition pointer-events-none z-50">
                Go to my GitHub
            </span>
        </a>
        <a
            href="https://www.linkedin.com/in/swetha-saseendran-794749194/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-black/60 rounded-full p-3 border-2 border-[#5dff4e] shadow-lg hover:bg-[#222] transition-all"
            aria-label="LinkedIn Profile"
        >
            <FaLinkedin size={28} className="text-[#5dff4e] drop-shadow-[0_0_8px_#5dff4e]" />
            <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 bg-[#111]/90 text-[#5dff4e] text-xs font-mono px-3 py-1 rounded shadow-lg transition pointer-events-none z-50">
                Go to my LinkedIn
            </span>
        </a>
        <a
            href={process.env.PUBLIC_URL + "/resume/Swetha_Saseendran_Resume.pdf"}
            download
            className="group relative bg-black/60 rounded-full p-3 border-2 border-[#5dff4e] shadow-lg hover:bg-[#222] transition-all"
            aria-label="Download Resume"
        >
            <FaFileDownload size={28} className="text-[#5dff4e] drop-shadow-[0_0_8px_#5dff4e]" />
            <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 bg-[#111]/90 text-[#5dff4e] text-xs font-mono px-3 py-1 rounded shadow-lg transition pointer-events-none z-50">
                Download my Resume
            </span>
        </a>
      </div>
      {/* About text directly over the model, no background */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
        <div className="max-w-2xl mx-auto mt-32 pointer-events-auto px-4">
          <h1 className="text-4xl font-bold text-[#5dff4e] mb-4 text-center matrix-font animate-typing">
            About Me
          </h1>
          <p className="text-green-200 text-lg mb-4 text-center font-[JetBrains_Mono,monospace]">
            I thrive at the intersection of artificial intelligence and software engineering, architecting intelligent systems from the ground up. My journey spans the full development lifecycle, from crafting intuitive web and Android applications to deploying scalable solutions on AWS. My passion lies in creating a powerful synergy between these domains, focusing on code automation and building reusable components that work seamlessly across platforms. From high-level system design to hands-on implementation and cloud deployment, I am dedicated to developing end-to-end solutions that are not only intelligent but also robust, efficient, and user-friendly.
          </p>

          <footer className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 text-xs text-[#5dff4e] text-center matrix-font font-bold bg-black/60 px-4 py-2 rounded-full shadow-lg pointer-events-auto">
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
      <SkillsPopup open={showSkills} onClose={() => setShowSkills(false)} />
    </div>
  );
}