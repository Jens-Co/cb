import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const externalLinks = [
    { name: "Discord", href: "https://discord.gg/5PzMkyK" },
    { name: "CloudBurst Forum", href: "https://cloudburstmc.org/articles/" },
  ];

  const internalLinks = [
    { name: "Cloudburst", path: "/cloudburst" },
    { name: "Nukkit", path: "/nukkit" },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="h-10 w-auto mr-3" />
          </Link>

          <div className="hidden sm:flex space-x-6 items-center">
            {internalLinks.map(({ name, path }) => (
              <Link
                key={name}
                to={path}
                className="px-4 py-2 rounded-md text-gray-600 hover:text-gray-900 hover:border-b-2 hover:border-gray-400 transition"
              >
                {name}
              </Link>
            ))}
            {externalLinks.map(({ name, href }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-md text-gray-600 hover:text-gray-900 hover:border-b-2 hover:border-gray-400 transition"
              >
                {name}
              </a>
            ))}
          </div>

          <button
            className="sm:hidden flex items-center p-2 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden px-4 pb-4 space-y-2 border-t border-gray-200">
          {internalLinks.map(({ name, path }) => (
            <Link
              key={name}
              to={path}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 rounded-md text-gray-600 hover:text-gray-900 hover:border-l-4 hover:border-gray-400 transition"
            >
              {name}
            </Link>
          ))}
          {externalLinks.map(({ name, href }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 rounded-md text-gray-600 hover:text-gray-900 hover:border-l-4 hover:border-gray-400 transition"
            >
              {name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
