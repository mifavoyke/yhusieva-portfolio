'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, useGLTF } from '@react-three/drei'
import { Suspense, useRef } from 'react'
import * as THREE from 'three'

function Model() {
    const groupRef = useRef<THREE.Group>(null)
    const { scene } = useGLTF('/models/model2.glb')

    // Move the model down slightly
    scene.position.y = 0.6

    // Animate rotation and float
    useFrame((state, delta) => {
        if (groupRef.current) {
            // slow spin
            groupRef.current.rotation.y += delta * 0.5
            // floating effect (sine wave)
            groupRef.current.position.y = -2 + Math.sin(state.clock.elapsedTime) * 0.1
        }
    })

    return (
        <group ref={groupRef} scale={1.5}>
            <primitive object={scene} />
        </group>
    )
}

export default function Avatar() {
    return (
        <div className="w-full h-screen">
            <Canvas camera={{ position: [0, 0, 3] }} gl={{ alpha: true }}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
                <Suspense fallback={null}>
                    <Model />
                    <Environment preset="sunset" />
                </Suspense>
                <OrbitControls enableZoom={false} />
            </Canvas>
        </div>
    )
}
