import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link, Navigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative w-full bg-white shadow-md z-50">
      {/* Top bar for logo and desktop menu */}
      <div className="flex justify-between items-center py-6 px-8 md:px-32 bg-gradient-to-r from-white to bg-orange-100 drop-shadow-md">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <img
            src={logo}
            alt="Logo"
            className="w-52 hover:scale-105 transition-transform"
          />
        </a>

        {/* Desktop Menu */}
        <ul className="hidden xl:flex items-center gap-10 font-semibold text-gray-700">
          <li className="cursor-pointer hover:text-sky-500 transition-colors">
            Home
          </li>
          <li className="cursor-pointer hover:text-sky-500 transition-colors">
            About
          </li>
          <li className="cursor-pointer hover:text-sky-500 transition-colors">
            <Link to="/AdminPanel">Administration</Link>
          </li>
          <li className="cursor-pointer hover:text-sky-500 transition-colors">
            Faculties
          </li>
          <li className="cursor-pointer hover:text-sky-500 transition-colors">
            Alumni
          </li>
        </ul>

        {/* Hamburger Menu for Mobile */}
        <button
          className="xl:hidden text-3xl focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label="Toggle menu"
        >
          <i className={`bx ${isMenuOpen ? "bx-x" : "bx-menu"}`}></i>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`absolute top-full left-0 w-full bg-white flex flex-col items-center gap-4 py-4 shadow-md xl:hidden transition-all duration-300 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <a
          href="#"
          className="block w-full text-center py-2 hover:bg-sky-100 text-gray-700 hover:text-sky-500 transition-colors"
        >
          Home
        </a>
        <a
          href="#"
          className="block w-full text-center py-2 hover:bg-sky-100 text-gray-700 hover:text-sky-500 transition-colors"
        >
          About
        </a>
        <a
          href="#"
          className="block w-full text-center py-2 hover:bg-sky-100 text-gray-700 hover:text-sky-500 transition-colors"
        >
          Administration
        </a>
        <a
          href="#"
          className="block w-full text-center py-2 hover:bg-sky-100 text-gray-700 hover:text-sky-500 transition-colors"
        >
          Faculties
        </a>
        <a
          href="#"
          className="block w-full text-center py-2 hover:bg-sky-100 text-gray-700 hover:text-sky-500 transition-colors"
        >
          Alumni
        </a>
      </div>
    </header>
  );
};

export default Header;
