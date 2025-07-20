import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../logo-fim.svg';
import VantaGlobe from './VantaGlobe';

// ────────────────────────────────────────────────
// SHARED ICON COMPONENT
// ────────────────────────────────────────────────
const LogoIcon = ({ className }) => <img src={Logo} alt="NoteGo logo" className={className} />;

// ────────────────────────────────────────────────
// HEADER – permanent dark styling, no `dark:` utilities
// ────────────────────────────────────────────────
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="align-center backdrop-blur-md fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 h-16 border-b border-slate-700">
      <Link to="/" className="flex items-center gap-2 text-xl font-bold text-white">
        <LogoIcon className="h-[32px] md:h-[37px] pt-2 text-blue-400" />
      </Link>

      <nav
        className={`flex-col z-10 lg:flex-row bg-[#001128] lg:bg-transparent lg:flex ${isMenuOpen ? 'flex' : 'hidden'} lg:gap-8 gap-5 lg:static absolute w-full lg:w-auto top-full left-0 lg:top-auto lg:left-auto px-6 lg:px-0 py-5 lg:py-0 shadow-lg lg:shadow-none border-b border-slate-700 lg:border-none`}
      >
        <Link to="/about" onClick={() => setIsMenuOpen(false)} className="cursor-pointer text-white text-lg md:text-xl hover:text-blue-500">About</Link>
        <Link to="/notes" onClick={() => setIsMenuOpen(false)} className="cursor-pointer text-white text-lg md:text-xl hover:text-blue-500">Notes</Link>
        <Link to="/pyq" onClick={() => setIsMenuOpen(false)} className="cursor-pointer text-white text-lg md:text-xl hover:text-blue-500">PYQ</Link>
        <Link to="/lab" onClick={() => setIsMenuOpen(false)} className="cursor-pointer text-white text-lg md:text-xl hover:text-blue-500">Lab</Link>
      </nav>

      <button onClick={toggleMenu} className="lg:hidden text-white text-3xl px-2 py-1 focus:outline-none">
        <i className={`bi ${isMenuOpen ? 'bi-x' : 'bi-list'}`} />
      </button>
    </header>
  );
};

// ────────────────────────────────────────────────
// FOOTER – permanent dark styling
// ────────────────────────────────────────────────
const Footer = () => (
  <footer className="bg-slate-800 border-t border-slate-700 py-6">
    <div className="container mx-auto px-4 text-center text-slate-400">
      <p>&copy; {new Date().getFullYear()} NoteGo. All Rights Reserved.</p>
    </div>
  </footer>
);

// ────────────────────────────────────────────────
// YEAR CARD – permanent dark styling
// ────────────────────────────────────────────────
const YearCard = ({ to, title, description, iconClass }) => (
  <Link
    to={to}
    className="group bg-slate-800 border border-slate-700 rounded-xl shadow-lg hover:shadow-blue-500/30 hover:-translate-y-2 p-8 text-center transition-all duration-300 w-full max-w-sm"
  >
    <div className="flex justify-center items-center mb-6">
      <div className="bg-blue-900/50 p-5 rounded-full group-hover:bg-blue-800/80 transition-colors duration-300">
        <i className={`${iconClass} text-5xl text-blue-400`} />
      </div>
    </div>
    <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
    <p className="text-slate-400">{description}</p>
    <div className="mt-6 text-blue-400 font-semibold group-hover:text-blue-500 transition-colors">
      Proceed <i className="bi bi-arrow-right-circle-fill ml-1" />
    </div>
  </Link>
);

// ────────────────────────────────────────────────
// MAIN COMPONENT – permanent dark styling
// ────────────────────────────────────────────────
export default function PYQSelector() {
  return (
    <div className="flex flex-col text-slate-200  ">
      {/* Decorative background animation */}
      <VantaGlobe />

      <Header />

      {/* Content */}
      <main className="flex-1 min-h-screen flex flex-col items-center justify-center p-4 pt-24 md:p-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">Select Your Year</h1>
          <p className="mt-4 text-lg text-slate-400">Choose the relevant academic year to find your notes</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 w-full items-center justify-center">
          <YearCard
            to="/firstyearnotes"
            title="1st Year Notes"
            description="For Semesters 1 & 2. Filter by P‑Cycle or C‑Cycle."
            iconClass="bi bi-file-earmark-text"
          />
          <YearCard
            to="/senioryearnotes"
            title="2nd / 3rd / 4th Year Notes"
            description="For Semesters 3 and above. Filter by academic branch."
            iconClass="bi bi-file-earmark-spreadsheet-fill"
          />
        </div>
      </main>

      {/* Site‑wide footer */}
      <footer className="bg-[#001128] w-full text-white flex justify-between">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-y-12 lg:gap-y-0 lg:gap-x-12 px-6 py-12">
          {/* NoteGo blurb */}
          <div className="w-full max-w-xs text-center">
            <h2 className="text-lg font-semibold mb-4">NoteGo</h2>
            <p className="text-sm leading-relaxed opacity-90">
              One‑stop hub for notes, tutorials &amp; PYQs,<br />built by students for students.
            </p>
          </div>

          {/* Quick Links */}
          <div className="w-full max-w-xs text-center">
            <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:underline">About</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact</Link></li>
              <li><Link to="/privacypolicy" className="hover:underline">Privacy Policy</Link></li>
              <li><Link to="/tnc" className="hover:underline">Terms &amp; Conditions</Link></li>
            </ul>
          </div>

          {/* Navigate To */}
          <div className="w-full max-w-xs text-center">
            <h2 className="text-lg font-semibold mb-4">Navigate To</h2>
            <ul className="space-y-2">
              <li><Link to="/notes" className="hover:underline">Notes</Link></li>
              <li><Link to="/pyq" className="hover:underline">PYQ</Link></li>
              <li><Link to="/lab" className="hover:underline">Lab</Link></li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Copyright strip */}
      <div className="border-t w-full text-white bg-[#001128] border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 px-6 py-4 text-xs md:text-sm">
          <i className="bi bi-c-circle" /> 2025 by NoteGo
        </div>
      </div>
    </div>
  );
}