import React, { useEffect, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import Logo from '../logo-fim.svg';
import Teamwork from '../Union.svg';
import { Link } from 'react-router-dom';
import VantaGlobe from './VantaGlobe'

function FrontPage() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  const [isOpenPYQ, setIsOpenPYQ] = useState(false);

  return (
    <div className="bg-transparent min-h-screen flex flex-col items-center">
      <VantaGlobe />
      {/* Navbar */}
      <div className=" w-full flex justify-between z-50 items-center  px-4 md:px-10 py-6 mt-4">

        <div className='bg-white/10 align-center backdrop-blur-md  fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-3.5
                
            border border-white/30 
            rounded-xl        
            shadow-lg mt-5 mx-5'>
          <div className="flex items-center">
            <img src={Logo} alt="Logo" className="h-[32px] md:h-[40px]" />
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
      </div>


      {/* Main Content */}
      <div className="relative z-1 md:px-10 pt-[170px]">
        <h1 className="[word-spacing:-0.4em] text-7xl md:text-9xl text-center text-white mb-6">
          We make<br />
          studying<br />
          easy!
        </h1>
      </div>
      <div className='flex flex-col transition-all   duration-700 ease-in-out animate-fade-in-slide-up  items-center mt-[20px] md:mt-[50px] px-4'>
        {/* Fixed space for text */}



        <div className='flex flex-row gap-5 md:gap-10  lg:gap-20 mt-8'>
          <Link to='/notes' className='h-[35px] md:h-[40px] w-[100px] md:w-[130px] cursor-pointer rounded-full bg-white hover:bg-blue-300 transition duration-300'>
            <div className='text-black font-semibold text-xl md:text-2xl mt-[2px] ml-[20px] md:ml-[30px]'>Notes</div>
          </Link>

          
          <Link to='/pyq' className='h-[35px] md:h-[40px] w-[100px] md:w-[130px] cursor-pointer rounded-full bg-white hover:bg-blue-300 transition duration-300'>
            <div className='text-black font-semibold text-center text-xl md:text-2xl mt-[2px] '>PYQ</div>
          </Link>
          {/* 
          <Link to='/lab' className='h-[35px] md:h-[40px] w-[100px] md:w-[130px] cursor-pointer border-2 border-white rounded-full bg-black hover:bg-green-400 hover:text-black transition duration-300'>
            <div className='text-white font-semibold text-xl md:text-2xl mt-[2px] ml-[30px] md:ml-[40px]'>Lab</div>
          </Link> */}
        </div>



        <div className=' transition-all mt-14  
            rounded-xl duration-700 ease-in-out animate-fade-in-slide-up flex flex-col lg:flex-row items-center justify-center w-full  gap-[20px] lg:gap-[100px] px-4 py-4'>
          <div className='flex flex-col items-center justify-center
  backdrop-blur-none    
   md:bg-transparent
   md:border-none
  rounded px-5 py-5
  w-full lg:w-1/2 z-50'>
            <div className='text-lg text-white md:text-2xl font-medium text-justify'>
              A learning hub where you access the best, high-quality notes crafted by professors through their students. We've collected these valuable resources and paired them with relevant YouTube tutorials to streamline your learning.
            </div>
            <div className='text-lg md:text-2xl italic text-blue-300 font-medium text-justify mt-4'>
              Whether you're preparing for CIE's or SEE's, NoteGo brings together expert knowledge and visual guides to help you learn faster and smarter. Dive in and elevate your study experience.
            </div>
          </div>
        </div>

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

      {/* <div className='mb-[50px] '></div> */}
    </div>

  );
}

export default FrontPage;
