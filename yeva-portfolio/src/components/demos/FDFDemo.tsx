// components/demos/FdFDemo.tsx
'use client'

import { Canvas } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import maps from './maps.json'

// Derive type from JSON keys
type MapKey = keyof typeof maps

export default function FdFDemo({ mapKey }: { mapKey: MapKey }) {
  const map = maps[mapKey]
  const rows = map.length
  const cols = map[0].length

  const points: [number, number, number][][] = []
  for (let y = 0; y < rows; y++) {
    const row: [number, number, number][] = []
    for (let x = 0; x < cols; x++) {
      const z = map[y][x]
      // Fix orientation: swap x/y and invert y axis
      const isoX = -(y - x) * Math.SQRT1_2 * 1.5
      const isoY = -(x + y) * Math.SQRT1_2 * 0.5 + z * 0.8
      row.push([isoX, isoY, 0])
    }
    points.push(row)
  }

  const lines: { pts: [number, number, number][], color: string }[] = [];
  let maxZ = -Infinity;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (map[y][x] > maxZ) maxZ = map[y][x];
    }
  }
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const z1 = map[y][x];
      if (x < cols - 1) {
        const z2 = map[y][x + 1];
        const color = Math.max(z1, z2) === 0 ? '#985400' : '#f21111';
        lines.push({ pts: [points[y][x], points[y][x + 1]], color });
      }
      if (y < rows - 1) {
        const z2 = map[y + 1][x];
        const color = Math.max(z1, z2) === 0 ? '#985400' : '#f21111';
        lines.push({ pts: [points[y][x], points[y + 1][x]], color });
      }
    }
  }

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden bg-black">
      <Canvas camera={{ position: [0, 0, 12], fov: 90 }}>
        <ambientLight intensity={0.5} />
        <color attach="background" args={['#000']} />
        {lines.map((line, i) => (
          <Line key={i} points={line.pts as any} color={line.color} lineWidth={1} />
        ))}
      </Canvas>
    </div>
  )
}
