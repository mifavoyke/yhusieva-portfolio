'use client'

import { Canvas } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import { useState, useMemo } from 'react'
import maps from './maps.json'

// Derive type from JSON keys
type MapKey = keyof typeof maps

export default function FdFDemo() {
  const [selectedMap, setSelectedMap] = useState<MapKey>('42')
  const [altitude, setAltitude] = useState(1)

  const map = maps[selectedMap]
  const rows = map.length
  const cols = map[0].length

  // Precompute points and lines
  const lines = useMemo(() => {
    const points: [number, number, number][][] = []
    for (let y = 0; y < rows; y++) {
      const row: [number, number, number][] = []
      for (let x = 0; x < cols; x++) {
        const z = map[y][x] * altitude
        const isoX = -(y - x) * Math.SQRT1_2 * 1.5
        const isoY = -(x + y) * Math.SQRT1_2 * 0.5 + z * 0.8
        row.push([isoX, isoY, 0])
      }
      points.push(row)
    }

    const lines: { pts: [number, number, number][], color: string }[] = []
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const z1 = map[y][x] * altitude
        if (x < cols - 1) {
          const z2 = map[y][x + 1] * altitude
          const color = Math.max(z1, z2) === 0 ? '#985400' : '#f21111'
          lines.push({ pts: [points[y][x], points[y][x + 1]], color })
        }
        if (y < rows - 1) {
          const z2 = map[y + 1][x] * altitude
          const color = Math.max(z1, z2) === 0 ? '#985400' : '#f21111'
          lines.push({ pts: [points[y][x], points[y + 1][x]], color })
        }
      }
    }

    return lines
  }, [map, rows, cols, altitude])

  return (
    <div className="w-full">
      {/* Controls */}
      <div className="flex items-center gap-4 mb-2 text-sm">
        <label className="text-neutral-200">
          Map:
          <select
            value={selectedMap}
            onChange={(e) => setSelectedMap(e.target.value as MapKey)}
            className="ml-2 bg-neutral-800 text-neutral-100 px-2 py-1 rounded"
          >
            {Object.keys(maps).map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
        </label>

        <label className="text-neutral-200">
          Altitude: 
          <input
            type="range"
            min="0.2"
            max="3"
            step="0.1"
            value={altitude}
            onChange={(e) => setAltitude(Number(e.target.value))}
            className="ml-2"
          />
          <span className="ml-2">{altitude.toFixed(1)}x</span>
        </label>
      </div>

      {/* 3D Canvas */}
      <div className="w-full h-96 rounded-lg overflow-hidden bg-black">
        <Canvas camera={{ position: [0, 0, 12], fov: 90 }}>
          <ambientLight intensity={0.5} />
          <color attach="background" args={['#000']} />
          {lines.map((line, i) => (
            <Line key={i} points={line.pts as any} color={line.color} lineWidth={1} />
          ))}
        </Canvas>
      </div>
    </div>
  )
}
