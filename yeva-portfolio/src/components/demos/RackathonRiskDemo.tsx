'use client'

import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import { OrbitControls } from '@react-three/drei'

type Point = [number, number, number]

// Generate a smooth-ish random risk curve (0–100%) over 10 years (x-axis)
function generateRiskCurve(years = 10, steps = 100): Point[] {
  const points: Point[] = []
  let risk = 5 + Math.random() * 5 // start around 5–10%
  const drift = 0.02

  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * years
    // Random walk with upward drift
    risk = Math.min(100, Math.max(0, risk + (Math.random() * 2 - 1) * drift + drift * 2))
    points.push([x, risk, 0])
  }

  return points
}

export default function RackathonRiskDemo() {
  const [riskCurve, setRiskCurve] = useState<Point[]>([])

  useEffect(() => {
    // Generate once on mount
    setRiskCurve(generateRiskCurve())
  }, [])

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden bg-black">
      <Canvas camera={{ position: [5, 50, 100], fov: 30 }}>
        <color attach="background" args={['#111']} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 1, 0]} intensity={0.8} />

        {riskCurve.length > 0 && (
          <Line points={riskCurve} color="hotpink" lineWidth={2} />
        )}

        <OrbitControls enablePan={false} />
      </Canvas>
      <div className="p-4 text-white">
        Projected recurrence risk curve (randomised for real-time demo). Y-axis = % risk, X-axis = years.
      </div>
    </div>
  )
}
