// components/demos/MiniRTDemo.tsx
'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Suspense } from 'react'

export default function MiniRTDemo() {
  return (
    <div className="w-full h-96 rounded-lg overflow-hidden bg-black">
      <Canvas
        shadows
        camera={{ position: [3, 2, 5], fov: 40 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={4}
          color="#95C7FF"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        <Suspense fallback={null}>
          {/* Lollipop stick */}
          <mesh position={[0, -0.5, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.1, 0.1, 2.6, 32]} />
            <meshStandardMaterial color="#d1d5db" roughness={0.4} metalness={0.1} />
          </mesh>

          {/* Lollipop top (full sphere) */}
          <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
            <sphereGeometry args={[0.6, 32, 32]} />
            <meshStandardMaterial color="#e20057" metalness={0.2} roughness={0.5} />
          </mesh>

          {/* Cylinder around the top (horizontal) */}
          <mesh
            position={[0, 0.5, 0]}
            castShadow
            receiveShadow
            rotation={[0, Math.PI / 2, 0]} // Rotate 90deg around Y to make horizontal
          >
            <cylinderGeometry args={[0.7, 0.7, 0.15, 32]} />
            <meshStandardMaterial color="#06b6d4" metalness={0.5} roughness={0.3} />
          </mesh>

          {/* Room walls and floor - from miniRT pl definitions */}

          {/* Floor: pl 0,60,0 normal 0,-1,0 */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} receiveShadow>
            <planeGeometry args={[12, 12]} />
            <meshStandardMaterial color={'#2a1c3d'} />
          </mesh>

          {/* Left wall: pl 50,0,0 normal -1,0,0 */}
          <mesh rotation={[0, Math.PI / 2, 0]} position={[-6, 3, 0]} receiveShadow>
            <planeGeometry args={[12, 12]} />
            <meshStandardMaterial color={'#4a2c5a'} />
          </mesh>

          {/* Right wall: pl -50,0,0 normal 1,0,0 */}
          <mesh rotation={[0, -Math.PI / 2, 0]} position={[6, 3, 0]} receiveShadow>
            <planeGeometry args={[12, 12]} />
            <meshStandardMaterial color={'#3d2847'} />
          </mesh>

          {/* Back wall: pl 0,0,-20 normal 0,0,1 */}
          <mesh rotation={[0, 0, 0]} position={[0, 3, -6]} receiveShadow>
            <planeGeometry args={[12, 12]} />
            <meshStandardMaterial color={'#1e3a4a'} />
          </mesh>

          {/* Front wall: pl 0,0,50 normal 0,0,-1 */}
          <mesh rotation={[0, Math.PI, 0]} position={[0, 3, 6]} receiveShadow>
            <planeGeometry args={[12, 12]} />
            <meshStandardMaterial color={'#2c4a5a'} />
          </mesh>
        </Suspense>

        <OrbitControls enablePan={false} />
      </Canvas>
    </div>
  )
}
