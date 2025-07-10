import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import MatrixRain from '../backgrounds/matrixRain';
import MatrixSection from '../components/MatrixSection';

const menuItems = [
	{
		title: 'About Me',
		path: '/about',
		model: `${process.env.PUBLIC_URL}/models/sentinelle-matrix.glb`,
		scale: 0.5, // Custom scale for this model
	},
	{
		title: 'Projects',
		path: '/projects',
		model: `${process.env.PUBLIC_URL}/models/computer.glb`,
		scale: 3.2, // Custom scale for this model
	},
	{
		title: 'Work Experience',
		path: '/work',
		model: `${process.env.PUBLIC_URL}/models/matrix_band.glb`,
		scale: 0.8, // Custom scale for this model
	},
	{
		title: 'Research',
		path: '/research',
		model: `${process.env.PUBLIC_URL}/models/ctlu-f28.glb`,
		scale: 0.1, // Custom scale for this model
	},
];


function ModelInline({ modelPath, scale }) {
	const { scene } = useGLTF(modelPath);
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

export default function Menu() {
	const [page, setPage] = useState(0);
	const navigate = useNavigate();

	// Play wepon.mp3 for arrows
	const playArrowSound = useCallback(() => {
		const audio = new Audio(`${process.env.PUBLIC_URL}/music/wepon.mp3`);
		audio.play();
	}, []);

	// Play click.mp3 for ENTER
	const playEnterSound = useCallback(() => {
		const audio = new Audio(`${process.env.PUBLIC_URL}/music/click.mp3`);
		audio.play();
	}, []);

	const paginate = useCallback(
		(newDirection) => {
			playArrowSound();
			setPage((prevPage) => (prevPage + newDirection + menuItems.length) % menuItems.length);
		},
		[playArrowSound]
	);

	const handleEnter = useCallback(
		(path) => {
			playEnterSound();
			setTimeout(() => navigate(path), 150);
		},
		[playEnterSound, navigate]
	);

	// useEffect for keyboard navigation
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === 'ArrowLeft') {
				paginate(-1);
			} else if (e.key === 'ArrowRight') {
				paginate(1);
			}
		};

		window.addEventListener('keydown', handleKeyDown);

		// Cleanup function to remove the event listener
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [paginate]);

	return (
		<div className="relative min-h-screen w-screen overflow-hidden">
			<MatrixRain />
			<main className="relative z-10 flex flex-col items-center justify-center min-h-screen w-screen h-screen p-4">
				<MatrixSection className="w-full max-w-4xl flex flex-col items-center justify-center bg-transparent border-[#5dff4e]/50 shadow-2xl p-8 rounded-2xl">
					<h1 className="text-4xl md:text-5xl font-extrabold text-[#5dff4e] mb-2 text-center matrix-font tracking-widest drop-shadow-lg">
						ENTER A MATRIX
					</h1>
					<p className="text-lg text-[#baffc9] matrix-font tracking-wider mb-6">
						Swetha Saseendran's Portfolio Website
					</p>

					<div
						className="relative w-full h-[26rem] flex items-center justify-center"
						style={{ perspective: '1200px' }}
					>
						{menuItems.map((item, index) => {
							const offset = index - page;
							const isVisible = Math.abs(offset) <= 1; // Only show center and adjacent cards

							const animate = {
								x: `${offset * 35}%`, // Adjust spacing between cards
								rotateY: offset * -45, // Angle of side cards
								scale: offset === 0 ? 1 : 0.7, // Center card is larger
								zIndex: menuItems.length - Math.abs(offset),
								opacity: isVisible ? 1 - Math.abs(offset) * 0.5 : 0, // Fade out side cards
							};

							return (
								<motion.div
									key={index}
									animate={animate}
									transition={{ type: 'spring', stiffness: 200, damping: 25 }}
									style={{ transformStyle: 'preserve-3d' }}
									className="absolute w-full h-full p-4 bg-black/60 backdrop-blur-sm border-2 border-[#5dff4e]/40 rounded-xl flex flex-col items-center text-center shadow-lg shadow-[#5dff4e]/20"
								>
									<h2 className="text-3xl font-bold text-[#5dff4e] mb-4 matrix-font tracking-wider">
										{item.title}
									</h2>
									<div className="w-full flex-1 h-0 mb-4">
										<Canvas camera={{ position: [0, 0, 5], fov: 50 }} style={{ width: '100%', height: '100%' }}>
											<ambientLight intensity={2.2} color="#59ff14" />
											<directionalLight position={[5, 5, 5]} intensity={2.5} color="#39ff14" />
											<Suspense fallback={<LoadingFallback />}>
												<ModelInline modelPath={item.model} scale={item.scale} />
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
									<button
										onClick={() => offset === 0 && handleEnter(item.path)}
										className={`matrix-btn w-full px-6 py-2 font-bold text-[#5dff4e] text-lg rounded-lg matrix-font relative overflow-hidden ${
											offset !== 0 ? 'pointer-events-none' : ''
										}`}
									>
										<span className="relative z-10 tracking-widest">ENTER</span>
										<span className="matrix-btn-glow"></span>
									</button>
								</motion.div>
							);
						})}
					</div>

					<div className="flex items-center justify-between w-full max-w-xs mt-8">
						<button
							onClick={() => paginate(-1)}
							className="p-3 rounded-full text-[#5dff4e] border-2 border-[#5dff4e]/50 hover:bg-[#5dff4e]/20 transition"
						>
							<FaChevronLeft size={20} />
						</button>
						<span className="text-lg font-mono text-[#5dff4e]">
							{page + 1} / {menuItems.length}
						</span>
						<button
							onClick={() => paginate(1)}
							className="p-3 rounded-full text-[#5dff4e] border-2 border-[#5dff4e]/50 hover:bg-[#5dff4e]/20 transition"
						>
							<FaChevronRight size={20} />
						</button>
					</div>
				</MatrixSection>
			</main>
		</div>
	);
}