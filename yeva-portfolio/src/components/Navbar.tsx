// src/components/Navbar.tsx

'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx'; // optional for neat class handling

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

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

        {/* Projects Tab + Dropdown */}
        <li
          className="relative"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <span className="relative px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer group">
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 blur-sm transition duration-300"></span>
            <span className="relative z-10 text-neutral-200 group-hover:text-white">PROJECTS</span>
          </span>

          {showDropdown && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-transparent border border-zinc-700 shadow-2xl rounded-xl py-3 px-6 space-y-2 min-w-[200px] z-50"
            >
              {/* Project Link Items */}
              <li className="relative group">
                <Link href="/projects/project1">
                  <span className="relative block px-3 py-2 rounded-md text-neutral-200 transition duration-200 cursor-pointer">
                    <span className="absolute inset-0 rounded-md pointer-events-none bg-gradient-to-r from-fuchsia-500/40 via-pink-500/20 to-transparent blur-md opacity-70 group-hover:opacity-100 transition duration-300"></span>
                    <span className="relative z-10 group-hover:text-white">Project One</span>
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/projects/project2">
                  <span className="relative block px-3 py-2 rounded-md text-neutral-200 transition duration-200 cursor-pointer">
                    <span className="absolute inset-0 rounded-md pointer-events-none bg-gradient-to-r from-purple-500/40 via-blue-500/20 to-transparent blur-md opacity-70 group-hover:opacity-100 transition duration-300"></span>
                    <span className="relative z-10 hover:text-white">Project Two</span>
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/projects/project3">
                  <span className="relative block px-3 py-2 rounded-md text-neutral-200 transition duration-200 cursor-pointer">
                    <span className="absolute inset-0 rounded-md pointer-events-none bg-gradient-to-r from-pink-600/40 via-violet-600/20 to-transparent blur-md opacity-70 group-hover:opacity-100 transition duration-300"></span>
                    <span className="relative z-10 hover:text-white">Project Three</span>
                  </span>
                </Link>
              </li>
            </motion.ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
