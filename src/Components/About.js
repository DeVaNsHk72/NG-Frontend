import React, { useEffect, useState } from 'react';
import Logo from '../logo.svg';
import { Link } from 'react-router-dom';
function About() {


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
    <div className="bg-black min-h-screen  flex flex-col items-center text-white">

    
<div className='bg-black w-full flex  transition-all  z-50   duration-700 ease-in-out animate-fade-in-slide-up justify-between items-center px-4 md:px-20 py-6 '>
        <Link to = '/' className='flex items-center'>
          <img src={Logo} alt="Logo" className='h-[30px] md:h-[40px]' />
        </Link>

        {/* Hamburger Icon for mobile and iPads */}
        <div className='lg:hidden flex'>
          <button onClick={toggleMenu} className='text-white text-3xl focus:outline-none'>
            <i className={`bi ${isMenuOpen ? 'bi-x' : 'bi-list'}`}></i> {/* Toggling icon from "hamburger" to "close" */}
          </button>
        </div>

        {/* Links for larger screens & dropdown for smaller screens and iPads */}
        <nav className={`flex-col lg:flex-row lg:flex ${isMenuOpen ? 'flex' : 'hidden'} lg:gap-10 gap-5 lg:static absolute bg-zinc-950 w-full lg:w-auto top-[70px] left-0 px-4 lg:px-0 py-5 lg:py-0 z-50`}>
          <Link
            to = '/'
            className={`cursor-pointer text-white text-lg md:text-2xl hover:text-green-400`}
          >
            Home
          </Link>

          <Link
            to = '/notes'
            className={`cursor-pointer text-white text-lg md:text-2xl hover:text-green-400`}
          >
            Notes
          </Link>

          <Link
            to = '/pyq'
            className={`cursor-pointer text-white text-lg md:text-2xl hover:text-green-400`}
          >
            PYQ'S
          </Link>

          <Link
            to = '/lab'
            className={`cursor-pointer text-white text-lg md:text-2xl hover:text-green-400`}
          >
            Lab
          </Link>

        </nav>
      </div>
      
<div className="flex flex-col   z-10  transition-all     duration-700 ease-in-out animate-fade-in-slide-up items-center mt-10 md:mt-20 px-4">
  {/* Title */}
  <h1 className="text-3xl md:text-5xl font-bold text-center">About NoteGo</h1>

  {/* Main Paragraph */}
  <p className="mt-6 sm:mt-10 max-w-4xl text-base sm:text-lg md:text-xl text-center">
    NoteGo is a platform designed to make learning more accessible and effective for students. 
    It combines professor-curated student notes with relevant YouTube tutorials, creating a streamlined 
    learning experience. Whether you're preparing for exams, working on assignments, or looking for 
    additional resources, NoteGo is here to help you succeed.
  </p>

  {/* Mission Statement */}
  <p className="mt-4 sm:mt-5 max-w-4xl text-base sm:text-lg md:text-xl text-center">
    Our mission is to provide high-quality, easily accessible learning materials for college students. 
    We believe that having all the resources in one place can help students study smarter and faster, 
    giving them more time to focus on what really matters.
  </p>

  {/* Vision Title */}
  <h1 className="text-3xl text-[#20C030] md:text-5xl italic font-bold text-center mt-10">Our Vision</h1>

  {/* Vision Description */}
  <p className="mt-4 sm:mt-5 max-w-4xl text-base sm:text-lg italic md:text-xl text-[#20C030] text-center">
    Whether you're studying computer science, electrical engineering, mechanical engineering, or 
    any other field, our platform covers a wide range of subjects and clusters, allowing you to 
    find the materials you need for your course.
  </p>

  {/* Made By Section */}
  <p className="mt-4 sm:mt-5 max-w-4xl text-base italic sm:text-lg md:text-xl text-[#20C030] text-center">
    Made By: Vinayak Rod, Devansh Khetan, Utkarsh Chaurasia, Rishi Raj, Utkarsh Sinha
  </p>

  <p className="mt-4 sm:mt-5 max-w-4xl text-base italic sm:text-lg md:text-xl text-[#20C030] text-center">
    Contributors: Nihal Ahamed, Rishika Nayana Shakthi, Ashmit Gupta, Aakanshya Agarwal, Punarnava Viswanath
  </p>
</div>
{/* Footer */}
<div className='bg-black min-w-full h-auto lg:h-[480px] transition-all     duration-700 ease-in-out animate-fade-in-slide-up  flex flex-col lg:flex-row gap-10 lg:gap-[150px] px-4 py-10'>
        <div className='flex flex-col gap-[30px] w-full lg:w-[300px]'>
          <img src={Logo} alt="Logo" className='h-[30px] lg:h-[40px] mt-[10px] lg:mt-[20px]' />
          <div className='text-sm md:text-md font-instrument ml-[0px] lg:ml-[50px] text-white text-justify'>
            NoteGo brings together professor-curated student notes with relevant 
            YouTube tutorials for fast and efficient learning.
          </div>

          <div className='text-sm italic md:text-md font-instrument ml-[0px] lg:ml-[50px] text-white text-justify'>
            Disclaimer: While the notes on this website are curated to assist in your studies, we advise students to 
            first refer to their professor's notes and resources. This is particularly important for theory-intensive
            subjects.
          </div>
        </div>

        <div className='flex flex-col gap-[30px] w-full lg:w-[300px]'>
          <h1 className='text-[#20C030] text-xl md:text-2xl mt-[10px] lg:mt-[30px]'>Quick Links</h1>
          <div className='flex flex-col gap-[20px]'>
            <Link to = '/about' className='text-white text-base md:text-lg cursor-pointer'>About</Link>
            <Link to = '/Contact' className='text-white text-base md:text-lg cursor-pointer'>Contact</Link>
            {/* <h1 className='text-white text-base md:text-lg cursor-pointer'>Contact</h1> */}
            <Link to = '/PrivacyPolicy' className='text-white text-base md:text-lg cursor-pointer'>Privacy Policy</Link>
            <Link to = '/Tnc' className='text-white text-base md:text-lg cursor-pointer'>Terms And Conditions</Link>
            <Link to = '/notes' className='text-white text-base md:text-lg cursor-pointer'>Notes</Link>
            <Link to='/pyq' className='text-white text-base md:text-lg cursor-pointer'>PYQ</Link>
            <Link to='/lab' className='text-white text-base md:text-lg cursor-pointer'>Lab</Link>
          </div>
        </div>

        <div className='flex flex-col gap-[30px] w-full lg:w-[200px]'>
          <h1 className='text-[#20C030] text-xl md:text-2xl mt-[10px] lg:mt-[30px]'>Navigate To</h1>
          <div className='flex flex-col gap-[20px]'>
            <Link to = '/CSCluster' className='text-white text-base md:text-lg cursor-pointer'>CS Cluster</Link>
            <Link to = '/ECCluster'  className='text-white text-base md:text-lg cursor-pointer'>Electrical Cluster</Link>
            <Link to = '/MECluster'  className='text-white text-base md:text-lg cursor-pointer'>Mechanical Cluster</Link>
          </div>
        </div>

        <div className='flex flex-row gap-[5px] mt-[30px]'>
          <i className="bi bi-c-circle text-white" style={{ fontSize: '20px' }}></i>
          <h1 className='text-white text-sm md:text-lg'>2024 by NoteGo</h1>
        </div>
      </div>

      <div className='mb-[50px]'></div>
    </div>
  );
}

export default About;
