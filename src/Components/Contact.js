import React, { useEffect, useState } from 'react';
import Logo from '../logo.svg';
import { Link } from 'react-router-dom';

function Contact() {


  
  useEffect(()=>{

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  },[])

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
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

      {/* Contact Section */}
      <div className="flex flex-col transition-all z-10  duration-700 ease-in-out animate-fade-in-slide-up  items-center mt-[130px] md:mt-[150px] px-4">
        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-bold text-center">Contact Us</h1>

        {/* Contact Info */}
        <p className="mt-6 sm:mt-10 max-w-4xl text-base sm:text-lg md:text-xl text-center">
          We’d love to hear from you! Whether you have a quick question about navigating NoteGo, detailed feedback on how we can improve, or a partnership idea that could help students worldwide, feel free to reach out—no concern is too small, and no vision is too big. Our friendly, real‑human team monitors every message and strives to respond within 24 hours on weekdays, offering clear guidance, addressing technical hiccups, or simply brainstorming new features together. From professors looking to share curated notes, to developers suggesting integrations, to students requesting that one must‑have tutorial before exams, we welcome it all with open inboxes and open minds. Your insights drive our roadmap and help us transform last‑minute study chaos into an organized, stress‑free experience for the 5 k+ learners who trust NoteGo each month—so drop us a line and let’s shape the future of study together.









Ask ChatGPT

        </p>

        {/* Email */}
        <p className="mt-4 sm:mt-5 max-w-4xl text-base sm:text-lg md:text-xl text-center">
          Email us at: <a href="mailto:notego.bmsce@gmail.com" className="text-blue-300">notego.bmsce@gmail.com</a>
        </p>
      </div>

      

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
  );
}

export default Contact;