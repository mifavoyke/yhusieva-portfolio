// components/demos/PhiloDemo.tsx
'use client'

import React, { useEffect, useRef, useState } from 'react'

type State = 'thinking' | 'hungry' | 'eating' | 'sleeping' | 'dead'

type Philosopher = {
  id: number
  state: State
  lastAteAt: number // ms timestamp
  timesEaten: number
}

type ScenarioKey = 'die' | 'live' | 'eatN'

/**
 * Philo Demo
 * - Simulates dining philosophers using timers (not real threads).
 * - Copy/paste into components/demos/PhiloDemo.tsx and import it.
 */
export default function PhiloDemo(): JSX.Element {
  // UI controls
  const [scenario, setScenario] = useState<ScenarioKey>('live')
  const [num, setNum] = useState<number>(5)
  const [timeToDie, setTimeToDie] = useState<number>(800) // ms
  const [timeToEat, setTimeToEat] = useState<number>(150) // ms
  const [timeToSleep, setTimeToSleep] = useState<number>(200) // ms
  const [timesMustEat, setTimesMustEat] = useState<number | null>(3)
  const [running, setRunning] = useState(false)
  const [log, setLog] = useState<string[]>([])

  // Simulation state
  const philosophersRef = useRef<Philosopher[]>([])
  const forksRef = useRef<boolean[]>([]) // true = fork available
  const timersRef = useRef<number[]>([]) // setTimeout ids
  const tickRef = useRef<number | null>(null)
  const [, forceRerender] = useState(0)
  const startedAtRef = useRef<number>(0)

  // Helper logging
  function pushLog(s: string) {
    setLog((l) => [new Date().toLocaleTimeString() + ' › ' + s, ...l].slice(0, 200))
  }

  // Reset / initialiser
  function initSimulation() {
    // cancel timers
    timersRef.current.forEach((id) => clearTimeout(id))
    timersRef.current = []
    if (tickRef.current) {
      clearInterval(tickRef.current)
      tickRef.current = null
    }
    const n = Math.max(1, Math.floor(num))
    philosophersRef.current = Array.from({ length: n }).map((_, i) => ({
      id: i,
      state: 'thinking' as State,
      lastAteAt: Date.now(),
      timesEaten: 0,
    }))
    forksRef.current = Array.from({ length: n }).map(() => true)
    startedAtRef.current = Date.now()
    setLog([])
    forceRerender((v) => v + 1)
  }

  // Utility: index helpers for forks
  const leftFork = (i: number) => i
  const rightFork = (i: number, n = philosophersRef.current.length) => (i + 1) % n

  // Try to pick up forks for philosopher i (naive: pick left then right)
  function tryEat(i: number) {
    const n = philosophersRef.current.length
    if (philosophersRef.current[i].state === 'dead') return
    // If either fork missing, become hungry and retry later
    if (!forksRef.current[leftFork(i)] || !forksRef.current[rightFork(i, n)]) {
      philosophersRef.current[i].state = 'hungry'
      scheduleTry(i, 50 + Math.random() * 100) // jittered retry
      return
    }

    // Acquire forks (set as unavailable)
    forksRef.current[leftFork(i)] = false
    forksRef.current[rightFork(i, n)] = false
    philosophersRef.current[i].state = 'eating'
    philosophersRef.current[i].lastAteAt = Date.now()
    philosophersRef.current[i].timesEaten += 1
    pushLog(`Philosopher ${i} started eating (times eaten: ${philosophersRef.current[i].timesEaten})`)

    // schedule stop eating
    const t = window.setTimeout(() => {
      // release forks
      forksRef.current[leftFork(i)] = true
      forksRef.current[rightFork(i, n)] = true
      philosophersRef.current[i].state = 'sleeping'
      pushLog(`Philosopher ${i} finished eating, now sleeping`)
      forceRerender((v) => v + 1)
      // schedule think after sleep
      const sleepId = window.setTimeout(() => {
        philosophersRef.current[i].state = 'thinking'
        // if scenario says they should try to eat some times and reached it, stop trying
        if (scenario === 'eatN' && timesMustEat != null) {
          if (philosophersRef.current.every((p) => p.timesEaten >= timesMustEat)) {
            pushLog('All philosophers reached required times eaten. Stopping simulation.')
            stopSimulation()
            return
          }
        }
        // otherwise schedule hungry (try to eat) soon
        philosophersRef.current[i].state = 'hungry'
        scheduleTry(i, 50 + Math.random() * 300)
        forceRerender((v) => v + 1)
      }, timeToSleep)
      timersRef.current.push(sleepId)
      forceRerender((v) => v + 1)
    }, timeToEat)
    timersRef.current.push(t)
    forceRerender((v) => v + 1)
  }

  function scheduleTry(i: number, delay = 100) {
    const id = window.setTimeout(() => {
      // if dead, abort
      if (philosophersRef.current[i].state === 'dead') return
      tryEat(i)
    }, delay)
    timersRef.current.push(id)
  }

  // Starvation check
  function startTick() {
    if (tickRef.current) clearInterval(tickRef.current)
    tickRef.current = window.setInterval(() => {
      const now = Date.now()
      for (const p of philosophersRef.current) {
        if (p.state === 'dead') continue
        if (now - p.lastAteAt > timeToDie) {
          p.state = 'dead'
          pushLog(`💀 Philosopher ${p.id} died (last ate ${(now - p.lastAteAt) | 0} ms ago)`)
          // stop everything on death for deterministic demonstration (like mandatory part)
          stopSimulation()
          forceRerender((v) => v + 1)
          return
        }
      }
      forceRerender((v) => v + 1)
    }, 60)
  }

  // Start simulation according to scenario preset / parameters
  function startSimulation() {
    initSimulation()
    setRunning(true)
    pushLog('Simulation started: scenario=' + scenario)

    // Scenario presets (adjust times to make dying likely / unlikely)
    if (scenario === 'die') {
      // tighten windows to encourage starvation
      setTimeout(() => {
        // immediately set hungry and try to eat (race conditions)
        philosophersRef.current.forEach((p, i) => {
          p.state = 'hungry'
          scheduleTry(i, Math.random() * 50)
        })
      }, 30)
    } else if (scenario === 'live') {
      // start with staggered thinking → hungry
      philosophersRef.current.forEach((p, i) => {
        p.state = 'thinking'
        const d = 200 + i * 80
        scheduleTry(i, d)
      })
    } else if (scenario === 'eatN') {
      // everybody tries to eat until they reach target
      philosophersRef.current.forEach((p, i) => {
        p.state = 'hungry'
        scheduleTry(i, i * 30)
      })
    }

    // Start starvation-monitor tick
    startTick()
  }

  function stopSimulation() {
    setRunning(false)
    // clear timers
    timersRef.current.forEach((id) => clearTimeout(id))
    timersRef.current = []
    if (tickRef.current) {
      clearInterval(tickRef.current)
      tickRef.current = null
    }
    pushLog('Simulation stopped')
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopSimulation()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // UI helpers
  const philosophers = philosophersRef.current
  const forks = forksRef.current
  const n = Math.max(1, philosophers.length || num)

  // Provide quick presets
  function applyPreset(s: ScenarioKey) {
    setScenario(s)
    if (s === 'die') {
      setNum(5)
      setTimeToDie(700)
      setTimeToEat(200)
      setTimeToSleep(120)
      setTimesMustEat(null)
    } else if (s === 'live') {
      setNum(5)
      setTimeToDie(2000)
      setTimeToEat(200)
      setTimeToSleep(200)
      setTimesMustEat(null)
    } else if (s === 'eatN') {
      setNum(5)
      setTimeToDie(2000)
      setTimeToEat(150)
      setTimeToSleep(120)
      setTimesMustEat(3)
    }
  }

  // Render helpers for geometry (SVG)
  const size = 300
  const center = size / 2
  const radius = 110
  function posFor(i: number, total: number) {
    const ang = (i / total) * Math.PI * 2 - Math.PI / 2
    return { x: center + radius * Math.cos(ang), y: center + radius * Math.sin(ang), ang }
  }

  return (
    <div className="p-4 bg-neutral-900 rounded-lg text-neutral-100">
      <div className="flex gap-4 mb-3">
        <div className="space-y-2">
          <div className="flex gap-2">
            <button
              className="px-3 py-1 bg-fuchsia-700 rounded"
              onClick={() => applyPreset('die')}
              disabled={running}
            >
              Preset: Die
            </button>
            <button
              className="px-3 py-1 bg-emerald-600 rounded"
              onClick={() => applyPreset('live')}
              disabled={running}
            >
              Preset: Live
            </button>
            <button
              className="px-3 py-1 bg-amber-600 rounded"
              onClick={() => applyPreset('eatN')}
              disabled={running}
            >
              Preset: Eat N
            </button>
          </div>

          <div className="flex gap-2 items-center">
            <label className="text-sm">Philosophers</label>
            <input
              type="number"
              value={num}
              onChange={(e) => setNum(Math.max(1, Number(e.target.value)))}
              className="w-20 px-2 py-1 rounded bg-neutral-800 text-sm"
              disabled={running}
            />
          </div>

          <div className="flex gap-2 items-center">
            <label className="text-sm">time_to_die (ms)</label>
            <input
              type="number"
              value={timeToDie}
              onChange={(e) => setTimeToDie(Math.max(10, Number(e.target.value)))}
              className="w-28 px-2 py-1 rounded bg-neutral-800 text-sm"
            />
          </div>

          <div className="flex gap-2 items-center">
            <label className="text-sm">time_to_eat (ms)</label>
            <input
              type="number"
              value={timeToEat}
              onChange={(e) => setTimeToEat(Math.max(10, Number(e.target.value)))}
              className="w-28 px-2 py-1 rounded bg-neutral-800 text-sm"
            />
          </div>

          <div className="flex gap-2 items-center">
            <label className="text-sm">time_to_sleep (ms)</label>
            <input
              type="number"
              value={timeToSleep}
              onChange={(e) => setTimeToSleep(Math.max(10, Number(e.target.value)))}
              className="w-28 px-2 py-1 rounded bg-neutral-800 text-sm"
            />
          </div>

          <div className="flex gap-2 items-center">
            <label className="text-sm">times_must_eat (optional)</label>
            <input
              type="number"
              value={timesMustEat ?? ''}
              onChange={(e) =>
                setTimesMustEat(e.target.value === '' ? null : Math.max(0, Number(e.target.value)))
              }
              className="w-28 px-2 py-1 rounded bg-neutral-800 text-sm"
            />
          </div>

          <div className="flex gap-2 mt-2">
            <button
              className="px-3 py-1 bg-sky-600 rounded"
              onClick={() => {
                initSimulation()
                startSimulation()
              }}
              disabled={running}
            >
              Start
            </button>
            <button
              className="px-3 py-1 bg-rose-600 rounded"
              onClick={() => stopSimulation()}
              disabled={!running}
            >
              Stop
            </button>
            <button
              className="px-3 py-1 bg-gray-600 rounded"
              onClick={() => {
                stopSimulation()
                initSimulation()
                setLog([])
              }}
            >
              Reset
            </button>
          </div>
        </div>

        {/* Visualiser */}
        <div>
          <svg width={size} height={size} style={{ background: '#0b1020', borderRadius: 8 }}>
            {/* table center */}
            <circle cx={center} cy={center} r={radius - 40} fill="#071026" stroke="#123" />
            {/* forks as little lines between philosophers */}
            {Array.from({ length: Math.max(1, num) }).map((_, i) => {
              const total = Math.max(1, philosophers.length || num)
              const p1 = posFor(i, total)
              const p2 = posFor((i + 1) % total, total)
              // fork position is mid between p1 and p2
              const fx = (p1.x + p2.x) / 2
              const fy = (p1.y + p2.y) / 2
              const forkTaken = forks[i] === false // if fork array exists and false -> taken
              return (
                <line
                  key={'fork' + i}
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke={forkTaken ? '#ff7b7b' : '#8bd4ff'}
                  strokeWidth={forkTaken ? 4 : 2}
                  strokeLinecap="round"
                />
              )
            })}

            {/* philosophers */}
            {Array.from({ length: Math.max(1, num) }).map((_, i) => {
              const total = Math.max(1, philosophers.length || num)
              const p = posFor(i, total)
              const ph = philosophers[i] ?? { state: 'thinking', timesEaten: 0, lastAteAt: Date.now() }
              const color =
                ph.state === 'eating'
                  ? '#7effa0'
                  : ph.state === 'thinking'
                  ? '#a0c9ff'
                  : ph.state === 'hungry'
                  ? '#ffd57a'
                  : ph.state === 'sleeping'
                  ? '#caa8ff'
                  : ph.state === 'dead'
                  ? '#ff6b6b'
                  : '#aaa'
              return (
                <g key={'p' + i}>
                  <circle cx={p.x} cy={p.y} r={18} fill={color} stroke="#0b0f1a" strokeWidth={2} />
                  <text x={p.x} y={p.y + 5} textAnchor="middle" fontSize={10} fill="#041022">
                    {i}
                  </text>
                  <text x={p.x} y={p.y + 30} textAnchor="middle" fontSize={10} fill="#eee">
                    {ph.timesEaten}
                  </text>
                </g>
              )
            })}

            {/* small center label */}
            <text x={center} y={center} fontSize={12} fill="#88c" textAnchor="middle">
              Dining Table
            </text>
          </svg>
        </div>
      </div>

      {/* status / logs */}
      <div className="flex gap-4 mt-3">
        <div className="w-1/3">
          <h4 className="text-sm text-neutral-300">Status</h4>
          <div className="bg-neutral-800 p-2 mt-2 rounded h-35 overflow-y-auto text-xs">
            {philosophers.length === 0 ? (
              <div>Not started</div>
            ) : (
              philosophers.map((p) => (
                <div key={'st' + p.id}>
                  #{p.id} — {p.state} — ate {p.timesEaten} — last {((Date.now() - p.lastAteAt) / 1000).toFixed(1)}s
                </div>
              ))
            )}
          </div>
        </div>

        <div className="flex-1">
          <h4 className="text-sm text-neutral-300">Event Log</h4>
          <div className="bg-neutral-800 p-2 mt-2 rounded h-35 overflow-y-auto text-xs">
            {log.length === 0 ? <div className="text-neutral-500">No events yet</div> : log.map((l, i) => <div key={i}>{l}</div>)}
          </div>
        </div>
      </div>
    </div>
  )
}
