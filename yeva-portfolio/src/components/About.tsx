'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function About() {
  const [typedText, setTypedText] = useState('')
  const fullText = `Hi, I'm Yeva — a software engineer with a taste for sleek design, elegant code, and a touch of cyberpunk flair.

I love building immersive digital experiences and solving beautiful, messy problems. This portfolio is my playground.`

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      setTypedText((prev) => prev + fullText[index])
      index++
      if (index >= fullText.length) clearInterval(interval)
    }, 25)

    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <p className="text-lg leading-relaxed text-neutral-300 whitespace-pre-line mb-6">
        {typedText}
        <span className="animate-pulse">|</span>
      </p>

      {/* Button */}
      <Link href="/projects">
        <button className="px-6 py-2 border border-fuchsia-400/30 text-white rounded-lg shadow-[0_0_15px_#f0abfc44] hover:shadow-[0_0_25px_#f0abfcaa] transition duration-200">
          See my projects →
        </button>
      </Link>
    </div>
  )
}
