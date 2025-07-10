import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

function TunnelBoxes() {
  const groupRef = useRef()
  const speed = 1.5

  useFrame(() => {
    groupRef.current.position.z += speed
    if (groupRef.current.position.z > 20) {
      groupRef.current.position.z = 0
    }
  })

  return (
    <group ref={groupRef}>
      {Array.from({ length: 100 }).map((_, i) => (
        <mesh key={i} position={[0, 0, -i * 20]}>
          <boxGeometry args={[50, 50, 2]} />
          <meshBasicMaterial
            color="#00ff00"
            wireframe
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
    </group>
  )
}

const FullGridTunnel = () => {
  return (
    <Canvas
      camera={{ fov: 90, position: [0, 0, 0] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'black',
      }}
    >
      <color attach="background" args={['black']} />
      <TunnelBoxes />

      {/* ✨ Real glow effect */}
      <EffectComposer>
        <Bloom
          intensity={2.0}
          luminanceThreshold={0}
          luminanceSmoothing={0.2}
          radius={1.0}
        />
      </EffectComposer>
    </Canvas>
  )
}

export default FullGridTunnel;
