'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import BackgroundGlow from '../../components/BackgroundGlow'
import projects from './projects.json'

function ProjectCard({ project, floating = false, highlighted = false }: any) {
  const [flipped, setFlipped] = useState(false)

  return (
    <motion.div
      className={`relative ${highlighted ? 'w-85 h-85' : 'w-75 h-75'} text-white cursor-pointer ${floating ? 'animate-floating' : ''} group`}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        className={`absolute w-full h-full rounded-xl ${floating
          ? 'bg-[radial-gradient(circle_at_center,_#D74CEC,_#9333ea,_#0a0a0a00)]'
          : project.color === 'neon-border'
            ? 'bg-zinc-950 border border-fuchsia-400/30 shadow-[0_0_15px_#f0abfc44] hover:shadow-[0_0_25px_#f0abfcaa]'
            : project.color
          } opacity-90 shadow-inner transform-style-preserve-3d`}
        style={{
          backfaceVisibility: 'hidden',
        }}
      >
        <div className="flex flex-col items-center justify-center h-full text-center p-4">
          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
          <p className="text-sm text-fuchsia-200 mb-3">{project.description}</p>
          <div className="flex flex-wrap justify-center gap-x-2 text-sm text-fuchsia-300">
            {project.tech.join(' • ')}
          </div>
        </div>
      </motion.div>
      <motion.div
        animate={{ rotateY: flipped ? 0 : 180 }}
        transition={{ duration: 0.6 }}
        className="absolute w-full h-full rounded-xl bg-zinc-900/80 text-neutral-200 p-4 transform rotateY-180"
        style={{
          backfaceVisibility: 'hidden',
        }}
      >
        <p className="text-sm mb-1 text-purple-400">{project.date}</p>
        <p className="text-sm mb-3">⏱ {project.hours} hours</p>
        {project.link && (
          <a
            href={project.link}
            className="inline-block mt-2 text-sm text-pink-400 hover:text-fuchsia-300 transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            🔗 View More
          </a>
        )}
        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            className="mt-2 w-full h-45 rounded-md object-cover"
          />
        )}
      </motion.div>
    </motion.div>
  )
}

export default function ProjectsPage() {
  return (
    <div className="relative w-full min-h-screen text-neutral-200 overflow-hidden">
      <BackgroundGlow />
      <main className="min-h-screen px-6 py-16 text-white">
        {/* Featured */}
        <section className="mb-28 relative">
          <h2 className="text-3xl font-semibold text-pink-400 mb-10 text-center">
            Featured Projects
          </h2>
          <div className="flex flex-wrap justify-center gap-20 relative z-10">
            {projects.featured.map((project, idx) => (
              <div key={idx} className="relative">
                <ProjectCard
                  project={project}
                  floating
                  highlighted={idx < 2}
                />
                {idx < 2 && (
                  <div className="absolute -bottom-15 left-1/2 -translate-x-1/2 w-55 h-7 bg-[radial-gradient(ellipse_at_center,_#F03C54cc,_#f0abfc,_#0a0a0a00)] blur-xl rounded-full z-0" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Hackathons */}
        <section className="mb-20">
          <h2 className="text-2xl font-semibold text-purple-400 mb-8 text-center">
            Hackathons
          </h2>
          <div className="flex flex-wrap justify-center gap-12">
            {projects.hackathons.map((project, idx) => (
              <ProjectCard
                key={idx}
                project={{
                  ...project,
                  color: 'bg-[radial-gradient(circle_at_center,_#ec4899,_#ec489999,_#0a0a0a00)]',
                }}
              />
            ))}
          </div>
        </section>

        {/* Other */}
        <section>
          <h2 className="text-2xl font-semibold text-fuchsia-400 mb-8 text-center">
            Other Projects
          </h2>
          <div className="flex flex-wrap justify-center gap-12">
            {projects.other.map((project, idx) => (
              <ProjectCard
                key={idx}
                project={{
                  ...project,
                  color: 'neon-border',
                }}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
