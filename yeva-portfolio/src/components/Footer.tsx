// src/components/Footer.tsx

import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="w-full text-neutral-400 text-sm">
      {/* Gradient separator line */}
      <div className="h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-fuchsia-500 opacity-30"></div>

      {/* Footer content */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-6 px-8 bg-zinc-950/80 backdrop-blur-sm">
        <span>@2025 Portfolio. Made with love and lots of coffee.</span>
        <div className="flex gap-6 text-xl">
          <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/your-username" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition">
            <FaLinkedin />
          </a>
          <a href="mailto:your@email.com" className="hover:text-fuchsia-400 transition">
            <FaEnvelope />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
