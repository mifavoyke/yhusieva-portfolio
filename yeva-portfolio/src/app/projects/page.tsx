'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const projects = {
  featured: [
    {
      title: 'Cosmic Portfolio',
      description: 'A 3D interactive site showcasing my projects and skills in a galaxy theme.',
      date: 'May-June 2025',
      hours: 45,
      tech: ['Next.js', 'Three.js', 'Framer Motion', 'TailwindCSS'],
    },
    {
      title: 'AI Travel Planner',
      description: 'A smart planner that suggests itineraries using OpenAI and Google Maps.',
      date: 'April 2025',
      hours: 35,
      tech: ['React', 'Node.js', 'Express', 'OpenAI API'],
    },
  ],
  hackathons: [
    {
      title: 'HackFit',
      description: 'Fitness gamification tracker made in 36 hours for a wellness hackathon.',
      date: 'Nov 2024',
      hours: 36,
      tech: ['React', 'Firebase', 'Chart.js'],
    },
    {
      title: 'CodeBuddy',
      description: 'A matchmaking app for coding partners built in 24 hours.',
      date: 'Feb 2025',
      hours: 24,
      tech: ['Vue.js', 'Supabase', 'TailwindCSS'],
    },
  ],
  other: [
    {
      title: 'Mini Shell',
      description: 'A custom UNIX shell built in C for a system programming course.',
      date: 'Jan-Feb 2024',
      hours: 50,
      tech: ['C', 'POSIX', 'Bash'],
    },
    {
      title: 'BookSwap',
      description: 'A book exchange web app for students.',
      date: 'Oct 2023',
      hours: 30,
      tech: ['Django', 'PostgreSQL', 'Bootstrap'],
    },
  ],
}

function ProjectCard({ project, floating = false }: any) {
  const [flipped, setFlipped] = useState(false)

  return (
    <motion.div
      className={`relative w-72 h-72 text-white cursor-pointer ${floating ? 'animate-floating' : ''
        } group`}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        className="absolute w-full h-full rounded-xl bg-[radial-gradient(circle_at_center,_#e879f9,_#9333ea)] opacity-90 shadow-[0_0_40px_#e879f988] group-hover:shadow-[0_0_60px_#e879f9cc] transform-style-preserve-3d"
        style={{
          backfaceVisibility: 'hidden',
        }}
      >
        <div className="flex flex-col items-center justify-center h-full text-center p-4">
          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
          <p className="text-sm text-fuchsia-200">{project.description}</p>
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
        <p className="text-sm mb-1">🛠 Tech used:</p>
        <ul className="list-disc list-inside text-sm text-fuchsia-300">
          {project.tech.map((tool: string, idx: number) => (
            <li key={idx}>{tool}</li>
          ))}
        </ul>
      </motion.div>
      {/* Shadow underneath */}
      {floating && (
        <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-56 h-2 bg-gradient-radial from-pink-400/40 to-transparent blur-2xl" />
      )}
    </motion.div>
  )
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen px-6 py-16 bg-zinc-950 text-white">
      <section className="mb-20">
        <h2 className="text-3xl font-semibold text-pink-400 mb-10 text-center">
          Featured Projects
        </h2>
        <div className="flex flex-wrap justify-center gap-10">
          {projects.featured.map((project, idx) => (
            <ProjectCard key={idx} project={project} floating />
          ))}
        </div>
      </section>

      <section className="mb-20">
        <h2 className="text-2xl font-semibold text-purple-400 mb-8 text-center">
          Hackathons
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {projects.hackathons.map((project, idx) => (
            <ProjectCard key={idx} project={project} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-fuchsia-400 mb-8 text-center">
          Other Projects
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {projects.other.map((project, idx) => (
            <ProjectCard key={idx} project={project} />
          ))}
        </div>
      </section>
    </main>
  )
}
