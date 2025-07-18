// src/components/BackgroundGlow.tsx

'use client'

import { useEffect, useRef } from 'react'

const BackgroundGlow = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const numDots = 8
    const dots = Array.from({ length: numDots }, () => {
      const div = document.createElement('div')
      div.className =
        'absolute rounded-full blur-3xl opacity-20 animate-float-slow'
      div.style.width = '600px'
      div.style.height = '600px'

      const colors = [
        'from-pink-500',
        'from-purple-600',
        'from-fuchsia-500',
        'from-red-600',
      ]

      const randomColour =
        colors[Math.floor(Math.random() * colors.length)]

      div.classList.add(`bg-gradient-to-br`, randomColour, 'to-transparent')

      div.style.left = `${Math.random() * 100}%`
      div.style.top = `${Math.random() * 100}%`
      container.appendChild(div)

      return div
    })

    return () => {
      dots.forEach((dot) => dot.remove())
    }
  }, [])

  return <div ref={containerRef} className="absolute inset-0 -z-10 overflow-hidden" />
}

export default BackgroundGlow
