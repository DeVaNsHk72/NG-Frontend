import React, { useEffect, useState } from 'react';
import Logo from '../logo.svg';
import { Link } from 'react-router-dom';
import { div } from 'p5';

function About() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='bg-[#001128] overscroll-auto'>
    <div className="bg-[#001128] min-h-screen flex flex-col items-center text-white">
      <div className='bg-white/10 align-center backdrop-blur-md  fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-3.5
                
            border border-white/30 
            rounded-xl        
            shadow-lg mt-5 mx-5'>
          <div className="flex items-center">
            <img src={Logo} alt="Logo" className="h-[20px] md:h-[27px]" />
          </div>

          {/* Hamburger Icon for mobile and iPads */}
          <div className="lg:hidden flex px-2 py-1 ">
            <button onClick={toggleMenu} className="text-white text-3xl focus:outline-none">
              <i className={`bi ${isMenuOpen ? 'bi-x' : 'bi-list'}`}></i>
            </button>
          </div>

          {/* Links for larger screens & dropdown for smaller screens and iPads */}
          <nav className={`flex-col z-10 rounded-2xl  lg:flex-row bg-[#132f56] lg:bg-transparent lg:flex ${isMenuOpen ? 'flex' : 'hidden'} lg:gap-10 gap-5 lg:static absolute  w-full lg:w-auto top-[70px] left-0 px-4 lg:px-0 py-5 lg:py-0`}>


            <Link
              to='/about'
              className={`cursor-pointer text-white text-lg md:text-xl hover:text-blue-600`}
            >
              About
            </Link>
            <Link
              to='/notes'
              className={`cursor-pointer text-white text-lg md:text-xl hover:text-blue-600`}
            >
              Notes
            </Link>

            <Link
              to='/pyq'
              className={`cursor-pointer text-white text-lg md:text-xl hover:text-blue-600`}
            >
              PYQ
            </Link>

            {/* <Link
              to='/pyq2'
              className={`cursor-pointer text-white text-lg md:text-xl hover:text-green-400`}
            >
              2nd Year PYQ's
            </Link> */}

            <Link
              to='/lab'
              className={`cursor-pointer text-white text-lg md:text-xl hover:text-blue-600`}
            >
              Lab
            </Link>
          </nav>
        </div>

      <div className="flex w-full bg-[#001128] flex-col z-10 transition-all duration-700 ease-in-out animate-fade-in-slide-up items-center mt-[130px]  md:mt-[130px] px-4">
        {/* Title */}
        <h1 className="text-3xl md:text-5xl text-center text-blue-300">About NoteGo</h1>

        {/* Main Paragraph */}
        <p className="mt-6 sm:mt-10 max-w-4xl  text-white sm:text-lg md:text-xl text-center">
          NoteGo is a platform designed to make learning more accessible and effective for students. 
          It combines professor-curated student notes with relevant YouTube tutorials, creating a streamlined 
          learning experience. Whether you're preparing for exams, working on assignments, or looking for 
          additional resources, NoteGo is here to help you succeed. 
          <span > NoteGo is officially approved by BMSCE.</span>
        </p>

        {/* Mission Statement */}
        <p className="mt-4 sm:mt-5 max-w-4xl sm:text-lg md:text-xl text-center">
          Our mission is to provide high-quality, easily accessible learning materials for college students. 
          We believe that having all the resources in one place can help students study smarter and faster, 
          giving them more time to focus on what really matters.
        </p>

        {/* Vision Title */}
        <h1 className="text-3xl text-blue-300 md:text-5xl italic font-bold text-center mt-10">Our Vision</h1>

        {/* Vision Description */}
        <p className="mt-4 sm:mt-5 max-w-4xl text-base sm:text-lg italic md:text-xl text-white text-center">
          Whether you're studying computer science, electrical engineering, mechanical engineering, or 
          any other field, our platform covers a wide range of subjects and clusters, allowing you to 
          find the materials you need for your course.
        </p>

        {/* Made By Section */}
        <p className="mt-4 sm:mt-5 max-w-4xl text-base italic sm:text-lg md:text-xl text-white text-center">
          Made By: Vinayak Rodd, Devansh Khetan, Utkarsh Chaurasia, Rishi Raj, Utkarsh Sinha
        </p>

        <p className="mt-4 sm:mt-5 max-w-4xl text-base italic sm:text-lg md:text-xl text-white text-center">
          Contributors: Nihal Ahamed, Rishika Nayana Shakthi, Ashmit Gupta, Aakanshya Agarwal, Punarnava Viswanath
        </p>
      </div>

      {/* Footer */}
      <footer className="bg-[#001128] w-full text-white flex justify-between">
              {/* main content */}
              <div
                className="
          max-w-7xl mx-auto
          grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
          place-items-center       /* centers each cell horizontally & vertically  */
          gap-y-12 lg:gap-y-0 lg:gap-x-12
          px-6 py-12
        "
              >
                {/* ─────────── NoteGo blurb ─────────── */}
                <div className="w-full max-w-xs text-center">
                  <h2 className="text-lg font-semibold mb-4">NoteGo</h2>
                  <p className="text-sm leading-relaxed opacity-90">
                    One-stop hub for notes, tutorials &amp; PYQs,<br />
                    built by students for students.
                  </p>
                </div>
      
                {/* ─────────── Quick Links ─────────── */}
                <div className="w-full max-w-xs text-center">
                  <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
                  <ul className="space-y-2">
                    <li><Link to="/about" className="hover:underline">About</Link></li>
                    <li><Link to="/contact" className="hover:underline">Contact</Link></li>
                    <li><Link to="/privacypolicy" className="hover:underline">Privacy Policy</Link></li>
                    <li><Link to="/tnc" className="hover:underline">Terms &amp; Conditions</Link></li>
                  </ul>
                </div>
      
                {/* ─────────── Navigate To ─────────── */}
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
            {/* copy‑right strip */}
            <div className="border-t w-full text-white bg-[#001128] border-white/10">
              <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 px-6 py-4 text-xs md:text-sm">
                <i className="bi bi-c-circle" /> 2025 by NoteGo
              </div>
            </div>
    </div>
    </div>
  );
}

export default About;
