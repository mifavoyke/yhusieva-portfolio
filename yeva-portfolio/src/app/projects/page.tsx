'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import BackgroundGlow from '../../components/BackgroundGlow'
import projects from './projects.json'
import dynamic from 'next/dynamic'
const MinishellDemo = dynamic(() => import('../../components/demos/MinishellTerminal'), {
  ssr: false,
})
import MiniRTDemo from '../../components/demos/MiniRTDemo'
import FdFDemo from '../../components/demos/FDFDemo'
import RackathonRiskDemo from '../../components/demos/RackathonRiskDemo'

/** ====================================================================================== */
// MODAL
function ProjectModal({ project, onClose }: any) {
  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-lg flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative w-[90%] max-w-4xl bg-white/5 backdrop-blur-2xl rounded-2xl border border-fuchsia-300/30 shadow-[0_0_40px_#f0abfc66] p-8 text-center text-neutral-100"
      >
        {/* Close Button */}
        <button
          className="absolute top-5 right-6 text-fuchsia-300 hover:text-pink-400 text-2xl font-bold opacity-50"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Title */}
        <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-fuchsia-500 to-purple-400 text-transparent bg-clip-text">{project.title}</h3>

        {/* Text content above demo */}
        <div className="space-y-2 mb-6 text-base">
          <p className="text-neutral-200">{project.description}</p>
          <p className="text-sm text-purple-300">{project.date} | {project.hours} hours | {project.team ? 'Team Project (2 devs)' : 'Solo Project'}</p>
          <p className="text-sm text-neutral-300">
            <span className="text-pink-300">{project.tech.join(', ')}</span>
          </p>
        </div>

        {/* Demo section */}
        {project.demo && (
          <div className="mb-6">
            <h4 className="text-lg font-medium text-fuchsia-400 mb-2">Live Demo</h4>
            <div className="bg-zinc-800/70 p-4 rounded-lg text-sm text-neutral-200 shadow-inner">
              {project.title.toLowerCase() === "minishell" ? (
                <MinishellDemo />
              ) : project.title.toLowerCase() === "minirt" ? (
                <MiniRTDemo />
              ) : project.title.toLowerCase() === "fdf" ? (
                <FdFDemo mapKey="42" />
              ) : project.title.toLowerCase() === "pushswap" ? (
                <p>{project.demo}</p>
              ) : project.title.toLowerCase() === "philosophers" ? (
                <p>{project.demo}</p>
              ) : project.title.toLowerCase() === "rackaton" ? (
                <RackathonRiskDemo />
              ) : project.title.toLowerCase() === "greehack" ? (
                <p>{project.demo}</p>
              ) : (
                <p>{project.demo}</p>
              )}
            </div>
          </div>
        )}

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-pink-400 hover:text-fuchsia-300 transition"
          >
            🔗 View on GitHub
          </a>
        )}
      </motion.div>
    </motion.div>
  )
}

/** ====================================================================================== */
// PROJECT CARD
function ProjectCard({ project, floating = false, highlighted = false, onClick }: any) {
  return (
    <motion.div
      className={`relative ${highlighted ? 'w-85 h-85' : 'w-75 h-75'} cursor-pointer group transition-all duration-300 ease-in-out ${floating ? 'animate-floating' : ''}`}
      onClick={onClick}
    >
      <div
        className={`absolute w-full h-full rounded-xl ${floating
          ? 'bg-[radial-gradient(circle_at_center,_#D74CEC,_#9333ea,_#0a0a0a00)]'
          : project.color === 'neon-border'
            ? 'bg-zinc-950 border border-fuchsia-400/30 shadow-[0_0_15px_#f0abfc44] hover:shadow-[0_0_25px_#f0abfcaa]'
            : project.color
          } opacity-90 shadow-inner`}
      >
        <div className="flex flex-col items-center justify-center h-full text-center p-4">
          {/* Project title */}
          <h3 className={`text-xl font-bold mb-3 ${highlighted ? 'text-purple-200' : 'bg-gradient-to-r from-fuchsia-500 via-pink-400 to-purple-400 text-transparent bg-clip-text'}`}>
            {project.title}
          </h3>

          {/* Project image */}
          {project.image && (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-50 object-cover rounded-lg shadow-md hover:shadow-fuchsia-500/50 transition"
            />
          )}
        </div>
      </div>
    </motion.div>
  )
}

/** ====================================================================================== */
// MAIN PAGE
export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<any>(null)

  return (
    <div className="relative w-full min-h-screen text-neutral-200 overflow-hidden">
      <BackgroundGlow />
      <main className="min-h-screen px-6 py-16 text-white">

        {/* Featured */}
        <section className="mb-28 relative">
          <h2 className="text-3xl font-semibold text-purple-400 mb-10 text-center">
            Featured Projects
          </h2>
          <div className="flex flex-wrap justify-center gap-20 relative z-10">
            {projects.featured.map((project, idx) => (
              <div key={idx} className="relative">
                <ProjectCard
                  project={project}
                  floating
                  highlighted={idx < 2}
                  onClick={() => setSelectedProject(project)}
                />
                {idx < 2 && (
                  <div className="absolute -bottom-15 left-1/2 -translate-x-1/2 w-55 h-7 bg-[radial-gradient(ellipse_at_center,_#F03C54cc,_#f0abfc99,_#0a0a0a00)] blur-xl rounded-full z-0" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Hackathons */}
        <section className="mb-20">
          <h2 className="text-2xl font-semibold text-pink-400 mb-8 text-center">
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
                onClick={() => setSelectedProject(project)}
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
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </section>
      </main>

      {/* MODAL */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  )
}
