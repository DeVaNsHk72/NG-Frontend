
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import _ from 'lodash';
import React, {  useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../logo.svg';

function Notes() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
   


    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };




    return (
        <div className='flex flex-col min-h-screen bg-white gap-[10px]'>

            {/* Navbar */}
            <div className='bg-black w-full flex justify-between items-center px-4 md:px-20 py-6 '>
                <Link to='/' className='flex items-center'>
                    <img src={Logo} alt="Logo" className='h-[30px] md:h-[40px]' />
                </Link>

                {/* Hamburger Icon for mobile and iPads */}
                <div className='lg:hidden flex'>
                    <button onClick={toggleMenu} className='text-white text-3xl focus:outline-none'>
                        <i className={`bi ${isMenuOpen ? 'bi-x' : 'bi-list'}`}></i>
                    </button>
                </div>

                {/* Links for larger screens & dropdown for smaller screens and iPads */}
                <nav className={`flex-col lg:flex-row lg:flex ${isMenuOpen ? 'flex' : 'hidden'} lg:gap-10 gap-5 lg:static absolute bg-zinc-950 w-full lg:w-auto top-[70px] left-0 px-4 lg:px-0 py-5 lg:py-0 z-50`}>
                    <Link to='/' className={`cursor-pointer text-white text-lg md:text-2xl hover:text-green-400`}>Home</Link>
                    <Link to='/about' className={`cursor-pointer text-white text-lg md:text-2xl hover:text-green-400`}>About</Link>
                    <Link to='/pyq' className={`cursor-pointer text-white text-lg md:text-2xl hover:text-green-400`}>1st Year PYQ'S</Link>
                    <Link to='/pyq2' className={`cursor-pointer text-white text-lg md:text-2xl hover:text-green-400`}>2nd Year PYQ'S</Link>
                    <Link to='/lab' className={`cursor-pointer text-white text-lg md:text-2xl hover:text-green-400`}>LAB</Link>
                </nav>
            </div>

        

                <div className="text-[#20C030] text-4xl mt-10 font-instrument w-full text-center transition-all     duration-700 ease-in-out animate-fade-in-slide-up ">
                    Select the Cluster
                </div>
              
            

                <div className="text-[#20C030] text-3xl mt-10 font-instrument w-full text-center transition-all     duration-700 ease-in-out animate-fade-in-slide-up">
                    1st Year
                </div> 

                 <Link
                 to = '/pyq'
                 className="flex self-center mt-5 shadow-custom-gray hover:ring-4 hover:ring-teal-400 flex-col gap-2 cursor-pointer bg-black rounded-3xl h-[50px] w-80 sm:w-[250px] md:w-[300px]  "
                >
                 <h1 className="text-3xl sm:text-4xl text-center text-[#20C030] ">PYQ'S</h1>
               
               </Link>

            <div>
             <div className={`flex flex-row transition-all flex-wrap  justify-center items-center  duration-100 ease-in-out  animate-fade-in-slide-up  gap-10 mt-10  `}>
    
            
             {/* CS Cluster Card */}
             <Link
               to = '/CSCluster'
               className="flex shadow-custom-gray hover:ring-4 hover:ring-teal-400 flex-col gap-2 cursor-pointer bg-black rounded-3xl h-[50px] w-80 sm:w-[250px] md:w-[300px]  "
              >
               <h1 className="text-3xl sm:text-4xl text-center text-[#20C030] ">CS Cluster</h1>
             
             </Link>
         
             {/* ECE Cluster Card */}
             <Link
               to = '/ECCluster'
               className="flex  shadow-custom-gray hover:ring-4 hover:ring-teal-400 flex-col gap-2 cursor-pointer bg-black rounded-3xl h-[50px] w-80 sm:w-[250px] md:w-[300px] shadow-custom "
             >
               <h1 className="text-3xl sm:text-4xl text-center text-[#20C030] ">EE Cluster</h1>
            
             </Link>
         
             {/* ME Cluster Card */}
             <Link
               to = '/MECluster'
               className="flex shadow-custom-gray  hover:ring-4 hover:ring-teal-400  flex-col gap-2 cursor-pointer bg-black rounded-3xl h-[50px] w-80 sm:w-[250px] md:w-[300px] shadow-custom "
             >
               <h1 className="text-3xl sm:text-4xl text-center text-[#20C030] ">Mech. Cluster</h1>
            
             </Link>
            </div>
         
                <div className="text-[#20C030] self-center text-3xl mt-14 font-instrument w-full text-center transition-all     duration-700 ease-in-out animate-fade-in-slide-up">
                    2nd Year
                </div> 

                 <div className="flex justify-center items-center">
                 <Link
                   to='/pyq2'
                   className="flex self-center mt-5 shadow-custom-gray hover:ring-4 hover:ring-teal-400 flex-col gap-2 cursor-pointer bg-black rounded-3xl h-[50px] w-80 sm:w-[250px] md:w-[300px] mx-auto"
                 >
                   <h1 className="text-3xl sm:text-4xl text-center text-[#20C030]">PYQ'S</h1>
                 </Link>
               </div>
          
            
            <div className={`flex flex-row transition-all flex-wrap  justify-center items-center  duration-100 ease-in-out  animate-fade-in-slide-up  gap-10 mt-10  `}>
    
            
         
               <Link
               to = '/CSE2'
               className="flex shadow-custom-gray  hover:ring-4 hover:ring-teal-400  flex-col gap-2 cursor-pointer bg-black rounded-3xl h-[50px] w-80 sm:w-[250px] md:w-[300px] shadow-custom "
             >
               <h1 className="text-3xl sm:text-4xl text-center text-[#20C030] ">CSE</h1>
            
             </Link>
         
             {/* CS Cluster Card */}
             <Link
               to = '/ISE2'
               className="flex shadow-custom-gray hover:ring-4 hover:ring-teal-400 flex-col gap-2 cursor-pointer bg-black rounded-3xl h-[50px] w-80 sm:w-[250px] md:w-[300px]  "
              >
               <h1 className="text-3xl sm:text-4xl text-center text-[#20C030] ">ISE</h1>
             
             </Link>
         
             {/* ECE Cluster Card */}
             <Link
               to = '/ECE2'
               className="flex  shadow-custom-gray hover:ring-4 hover:ring-teal-400 flex-col gap-2 cursor-pointer bg-black rounded-3xl h-[50px] w-80 sm:w-[250px] md:w-[300px] shadow-custom "
             >
               <h1 className="text-3xl sm:text-4xl text-center text-[#20C030] ">ECE</h1>
            
             </Link>
         
             {/* ME Cluster Card */}
             <Link
               to = '/ETE2'
               className="flex shadow-custom-gray  hover:ring-4 hover:ring-teal-400  flex-col gap-2 cursor-pointer bg-black rounded-3xl h-[50px] w-80 sm:w-[250px] md:w-[300px] shadow-custom "
             >
               <h1 className="text-3xl sm:text-4xl text-center text-[#20C030] ">ETE</h1>
            
             </Link>
           </div>
        </div>


            <div className='mb-[50px]'></div>
            <div className='bg-black min-w-full h-auto lg:h-[480px] flex flex-col lg:flex-row gap-10 lg:gap-[150px] px-4 py-10'>
                <div className='flex flex-col gap-[30px] w-full lg:w-[300px]'>
                    <img src={Logo} alt="Logo" className='h-[30px] lg:h-[40px] mt-[10px] lg:mt-[20px]' />
                    <div className='text-sm md:text-md font-instrument ml-[0px] lg:ml-[50px] text-white text-justify'>
                        NoteGo brings together professor-curated student notes with relevant
                        YouTube tutorials for fast and efficient learning.
                    </div>

                    <div className='text-sm italic md:text-md font-instrument ml-[0px] lg:ml-[50px] text-white text-justify'>
                        Disclaimer: While the notes and videos on this website are curated to assist in your studies, we advise students to
                        first refer to their professor's notes and lectures. This is particularly important for theory-intensive
                        subjects.
                    </div>
                </div>

                

                <div className='flex flex-col gap-[30px] w-full lg:w-[300px]'>
                    <h1 className='text-[#20C030] text-xl md:text-2xl mt-[10px] lg:mt-[30px]'>Quick Links</h1>
                    <div className='flex flex-col gap-[20px]'>
                        <Link to='/about' className='text-white text-base md:text-lg cursor-pointer'>About</Link>
                        <Link to='/Contact' className='text-white text-base md:text-lg cursor-pointer'>Contact</Link>
                        <Link to='/PrivacyPolicy' className='text-white text-base md:text-lg cursor-pointer'>Privacy Policy</Link>
                        <Link to='/Tnc' className='text-white text-base md:text-lg cursor-pointer'>Terms And Conditions</Link>
                        <Link to='/notes' className='text-white text-base md:text-lg cursor-pointer'>Notes</Link>
                        <Link to='/pyq' className='text-white text-base md:text-lg cursor-pointer'>PYQ</Link>
                        <Link to='/lab' className='text-white text-base md:text-lg cursor-pointer'>Lab</Link>
                    </div>
                </div>

                <div className='flex flex-col gap-[30px] w-full lg:w-[200px]'>
                    <h1 className='text-[#20C030] text-xl md:text-2xl mt-[10px] lg:mt-[30px]'>Navigate To</h1>
                    <div className='flex flex-col gap-[20px]'>
                        <Link to='/CSCluster' className='text-white text-base md:text-lg cursor-pointer'>CS Cluster</Link>
                        <Link to='/ECCluster' className='text-white text-base md:text-lg cursor-pointer'>Electrical Cluster</Link>
                        <Link to='/MECluster' className='text-white text-base md:text-lg cursor-pointer'>Mechanical Cluster</Link>
                    </div>
                </div>

                <div className='flex flex-row gap-[5px] mt-[30px]'>
                    <i className="bi bi-c-circle text-white" style={{ fontSize: '20px' }}></i>
                    <h1 className='text-white text-sm md:text-lg'>2024 by NoteGo</h1>
                </div>
            </div>

        </div>
    );
}

export default Notes;