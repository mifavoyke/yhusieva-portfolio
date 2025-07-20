// src/components/Navbar.tsx

'use client';

import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="w-full flex justify-center py-6 relative bg-transparent font-semibold z-50">
      <ul className="flex gap-10 text-base">
        {/* Home Tab */}
        <li>
          <Link href="/">
            <span className="relative px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer group">
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 blur-sm transition duration-300"></span>
              <span className="relative z-10 text-neutral-200 group-hover:text-white">HOME</span>
            </span>
          </Link>
        </li>

        {/* Projects Tab */}
          <Link href="/projects">
          <span className="relative px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer group">
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 blur-sm transition duration-300"></span>
            <span className="relative z-10 text-neutral-200 group-hover:text-white">PROJECTS</span>
          </span> 
          </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
