'use client'

import BackgroundGlow from '../components/BackgroundGlow'
import Avatar from '../components/Avatar'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="relative w-full min-h-screen text-neutral-200 overflow-hidden">
      <BackgroundGlow />

      {/* HERO */}
      <section className="flex flex-col-reverse md:flex-row justify-center items-center gap-10">
        <div className="w-full md:w-1/2 flex justify-center">
          <Avatar />
        </div>

        {/* About */}
        <div className="w-full md:w-1/2 text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-10 bg-gradient-to-r from-pink-500 via-purple-500 to-fuchsia-500 text-transparent bg-clip-text">
            Welcome to my world
          </h1>

          <p className="text-lg leading-relaxed text-neutral-300 whitespace-pre-line mb-10 w-150">
            Hi, I'm Yeva, a software engineer.
            {"\n\n"}
            I love building immersive digital experiences and solving beautiful, messy problems. This portfolio is my playground.
          </p>

          {/* Button */}
          <Link href="/projects">
            <button className="px-8 py-3 text-lg border border-fuchsia-400/30 text-white rounded-lg shadow-[0_0_20px_#f0abfc44] hover:shadow-[0_0_30px_#f0abfcaa] transition duration-200">
              See my projects →
            </button>
          </Link>
        </div>
      </section>
      {/* CONTACT */}
      <section className="py-24 px-10 text-center relative z-10">
        <div className="max-w-2xl mx-auto bg-zinc-900/80 p-8 rounded-2xl border border-fuchsia-400/20 shadow-[0_0_30px_#f0abfc33] text-purple-400">
          <h2 className="text-3xl font-semibold mb-6">Contact Me</h2>

          <p className="text-base text-neutral-300 mb-4">
            I'd love to hear from you, whether it's a project, opportunity, or just a friendly cyber wave.
          </p>

          <div className="mt-6 space-y-4 text-left">
            <p>
              <b className="text-fuchsia-400">Email:</b>{' '}
              <a
                href="mailto:husievayeva@gmail.com"
                className="hover:text-fuchsia-300 transition"
              >
                husievayeva@gmail.com
              </a>
            </p>

            <p>
              <b className="text-fuchsia-400">GitHub:</b>{' '}
              <a
                href="https://github.com/mifavoyke"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-fuchsia-300 transition"
              >
                github.com/mifavoyke
              </a>
            </p>

            <p>
              <b className="text-fuchsia-400">LinkedIn:</b>{' '}
              <a
                href="https://www.linkedin.com/in/yeva-husieva/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-fuchsia-300 transition"
              >
                linkedin.com/in/yeva-husieva
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
