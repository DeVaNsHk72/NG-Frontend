import React, { useEffect, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import Logo from '../logo-fim.svg';
import Teamwork from '../Union.svg';
import { Link } from 'react-router-dom';

function FrontPage() {
  


  const images = [
    '/images/firsthome.svg',
    '/images/secondhome.svg',
    '/images/thirdhome.svg',
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const fullText = [
    { text: 'Everything you need ', color: 'text-white', fontStyle: 'font-normal' },
    { text: 'at one place ', color: 'text-white', fontStyle: 'font-normal' },
    { text: 'to ace college ', color: 'text-[#20C030]', fontStyle: 'font-semibold italic' },
    { text: 'academics.', color: 'text-[#20C030]', fontStyle: 'font-semibold italic' },
  ];

  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length && subIndex < fullText[index].text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + fullText[index].text[subIndex]);
        setSubIndex(subIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else if (subIndex === fullText[index]?.text?.length) {
      if (index < fullText.length - 1) {
        setTimeout(() => {
          setIndex(index + 1);
          setSubIndex(0);
          setDisplayedText('');
        }, 500);
      } else {
        setTimeout(() => {
          setIndex(0);
          setSubIndex(0);
          setDisplayedText('');
        }, 1000);
      }
    }
  }, [index, subIndex, fullText]);


  const GotoPYQ = () => {
    alert('Coming Soon');
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-zinc-950 min-h-screen flex flex-col items-center">
      {/* Navbar */}
      <div className="w-full flex justify-between z-50 items-center px-4 md:px-20 py-6 mt-4">
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="h-[45px] md:h-[55px]" />
        </div>
 
        {/* Hamburger Icon for mobile and iPads */}
        <div className="lg:hidden flex">
          <button onClick={toggleMenu} className="text-white text-3xl focus:outline-none">
            <i className={`bi ${isMenuOpen ? 'bi-x' : 'bi-list'}`}></i>
          </button>
        </div>

        {/* Links for larger screens & dropdown for smaller screens and iPads */}
        <nav className={`flex-col z-10 lg:flex-row lg:flex ${isMenuOpen ? 'flex' : 'hidden'} lg:gap-10 gap-5 lg:static absolute bg-zinc-950 w-full lg:w-auto top-[70px] left-0 px-4 lg:px-0 py-5 lg:py-0`}>
          

          <Link
            to = '/about'
            className={`cursor-pointer text-white text-lg md:text-2xl hover:text-green-400`}
          >
            About
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
            1st Year PYQ's
          </Link>

          <Link
            to = '/pyq2'
            className={`cursor-pointer text-white text-lg md:text-2xl hover:text-green-400`}
          >
            2nd Year PYQ's
          </Link>

          <Link
            to = '/lab'
            className={`cursor-pointer text-white text-lg md:text-2xl hover:text-green-400`}
          >
            Lab
          </Link>
        </nav>
      </div>


      {/* Main Content */}
      <div className='flex flex-col transition-all     duration-700 ease-in-out animate-fade-in-slide-up  items-center mt-[20px] md:mt-[50px] px-4'>
        {/* Fixed space for text */}
        <div className='text-center text-white text-2xl md:text-4xl max-w-full md:max-w-4xl font-mono mb-6 md:mb-10 h-[80px] md:h-[100px]'>
          {fullText.slice(0, index + 1).map((item, idx) => (
            <span key={idx} className={`${item.color} ${item.fontStyle}`}>
              {index === idx ? displayedText : item.text}
            </span>
          ))}
        </div>
        {/* Image */}
        <div className='mt-0 '>
          <img className='w-[200px] md:w-[300px] lg:w-[400px] h-[190px] md:h-[220px] lg:h-[400px]' src={images[currentImageIndex]} alt="Slideshow" />
        </div>

        {/* Buttons */}
        {/* <div className='flex flex-row gap-5 md:gap-10 lg:gap-20 mt-8'>
          <Link  to = '/notes' className='h-[35px] md:h-[40px] w-[100px] md:w-[130px] cursor-pointer rounded-full bg-white hover:bg-gray-200 transition duration-300'>
            <div className='text-black font-semibold text-xl md:text-2xl mt-[2px] ml-[20px] md:ml-[30px]'>Notes</div>
          </Link>
          <Link  to='/pyq' className='h-[35px] md:h-[40px] w-[100px] md:w-[130px] cursor-pointer border-2 border-white rounded-full bg-black hover:bg-green-400 hover:text-black transition duration-300'>
            <div className='text-white font-semibold text-xl md:text-2xl mt-[2px] ml-[20px] md:ml-[40px]'>1st YearPYQ's</div>
          </Link>
          <Link  to='/pyq2' className='h-[35px] md:h-[40px] w-[100px] md:w-[130px] cursor-pointer border-2 border-white rounded-full bg-black hover:bg-green-400 hover:text-black transition duration-300'>
            <div className='text-white font-semibold text-xl md:text-2xl mt-[2px] ml-[20px] md:ml-[40px]'>2nd Year PYQ's</div>
          </Link>




          <Link  to='/lab' className='h-[35px] md:h-[40px] w-[100px] md:w-[130px] cursor-pointer border-2 border-white rounded-full bg-black hover:bg-green-400 hover:text-black transition duration-300'>
            <div className='text-white font-semibold text-xl md:text-2xl mt-[2px] ml-[30px] md:ml-[40px]'>Lab</div>
          </Link>
        </div> */}
       <div className='flex flex-row gap-5 md:gap-10 lg:gap-20 mt-8'>
  <Link to='/notes' className='h-[35px] md:h-[40px] w-[100px] md:w-[130px] cursor-pointer rounded-full bg-white hover:bg-gray-200 transition duration-300'>
    <div className='text-black font-semibold text-xl md:text-2xl mt-[2px] ml-[20px] md:ml-[30px]'>Notes</div>
  </Link>

  <div className="relative group z-50"> {/* Increased z-index */}
    <div className='h-[35px] md:h-[40px] w-[100px] md:w-[130px] cursor-pointer border-2 border-white rounded-full bg-black hover:bg-green-400 hover:text-black transition duration-300 flex items-center justify-center'>
      <div className='text-white font-semibold text-xl md:text-2xl mt-[2px]'>PYQ's</div>
      <i className="bi bi-chevron-down text-white ml-2"></i> {/* Add an icon for better indication */}
    </div>
    <div className="absolute hidden group-hover:block bg-zinc-800 border border-gray-200 rounded-md mt-2 shadow-lg transition-all duration-300 ease-in-out z-50"> {/* Added z-index and kept position */}
      <Link to='/pyq' className='block px-4 py-2 text-white hover:bg-green-400 hover:text-black transition duration-300'>1st Year PYQ's</Link>
      <Link to='/pyq2' className='block px-4 py-2 text-white hover:bg-green-400 hover:text-black transition duration-300'>2nd Year PYQ's</Link>
    </div>
  </div>

  <Link to='/lab' className='h-[35px] md:h-[40px] w-[100px] md:w-[130px] cursor-pointer border-2 border-white rounded-full bg-black hover:bg-green-400 hover:text-black transition duration-300'>
    <div className='text-white font-semibold text-xl md:text-2xl mt-[2px] ml-[30px] md:ml-[40px]'>Lab</div>
  </Link>
</div>



<div className='bg-white transition-all z-10 duration-700 ease-in-out animate-fade-in-slide-up flex flex-col lg:flex-row items-center justify-center w-full mt-[50px] gap-[20px] lg:gap-[100px] px-4 py-10'>
  <div className='flex flex-col justify-center w-full lg:w-[50%]'>
    <div className='text-lg md:text-2xl font-medium text-justify'>
      A learning hub where you access the best, high-quality notes crafted by professors through their students. We've collected these valuable resources and paired them with relevant YouTube tutorials to streamline your learning.
    </div>
    <div className='text-lg md:text-2xl italic text-[#20C030] font-medium text-justify mt-4'>
      Whether you're preparing for CIE's or SEE's, NoteGo brings together expert knowledge and visual guides to help you learn faster and smarter. Dive in and elevate your study experience.
    </div>
  </div>
  <div className='flex justify-center lg:justify-end w-full lg:w-[50%] mt-[20px] lg:mt-0'>
    <img src={Teamwork} className='w-[250px] md:w-[350px] lg:w-[400px] h-[250px] md:h-[350px] lg:h-[400px]' />
  </div>
</div>

</div>


      {/* Footer */}
      <div className='bg-black  transition-all     duration-700 ease-in-out animate-fade-in-slide-up  min-w-full h-auto lg:h-[480px] flex flex-col lg:flex-row gap-10 lg:gap-[150px] px-4 py-10'>
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
            <Link to='/pyq' className='text-white text-base md:text-lg cursor-pointer'>1st Year PYQ</Link>
            <Link to='/pyq2' className='text-white text-base md:text-lg cursor-pointer'>2nd Year PYQ</Link>
            <Link to='/lab' className='text-white text-base md:text-lg cursor-pointer'>Lab</Link>
        
          </div>
        </div>

        <div className='flex flex-col gap-[30px] w-full lg:w-[200px]'>
          <h1 className='text-[#20C030] text-xl md:text-2xl mt-[10px] lg:mt-[30px]'>Navigate To</h1>
          <div className='flex flex-col gap-[20px]  '>
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

export default FrontPage;