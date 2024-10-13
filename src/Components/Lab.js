
import 'bootstrap-icons/font/bootstrap-icons.min.css';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../logo.svg';
import axios from 'axios';


function Lab() {

    const [LabRelatedPdf,setLabRelatedPdf] = useState([])

    useEffect(()=>{

        window.scroll({
            top:0,
            behavior:'smooth'
        })


        axios.post("https://notego-backend-final.onrender.com//api/LabVideos")
        .then(response=>{

            console.log(response.data)
          setLabRelatedPdf(response.data)
        
        })
        .catch(err=>{

          console.log(err)
        })


    },[])



  return (
    <div className='bg-black min-h-screen gap-[20px] flex flex-col  '>
<div className='flex flex-col lg:flex-row gap-8 mx-auto max-w-screen-lg'>
    <Link   to = '/' ><img
        src={Logo}
        alt="Logo"
      
        className='h-10 mx-4 my-4 cursor-pointer'
    /></Link>

<Link
  to='/notes'
  className='h-12 hover:ring-4 hover:ring-blue-500  cursor-pointer relative min-w-xs max-w-xs bg-[#20C030] rounded-full flex items-center justify-between px-4 mx-1 my-4'
>
  <div className="text-white text-base mx-4 sm:text-lg md:text-xl font-medium">
    Back To Notes
  </div>
  <div className="bg-[#20C030] w-10 h-10 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center ">
    <i className="bi bi-caret-left-fill text-white text-sm sm:text-base md:text-lg"></i>
  </div>
</Link>

</div>

<div className='flex flex-col'>

<div className={`mt-5  transition-all   duration-700 ease-in-out  animate-fade-in-slide-up  `}>

<h1 className='text-white font-semibold text-center text-2xl' >Lab Resources</h1>
<div className="flex flex-row gap-2 bg-gray-900 border-2 mt-4 rounded-lg shadow-lg p-4 mx-auto w-full max-w-3xl">
    <div className="flex flex-row justify-between items-center w-full">
  <div className="text-white text-center flex-1" style={{ maxWidth: '350px' }}>
    Subject Name
  </div>
  


  
  {/* Container for Expand and Reduce Icons */}
  <div  className="flex flex-col items-center flex-none">
    
    <span className="text-white mt-1">YoutubeLink</span> {/* Added Expand label */}
  </div>

</div>
</div>

{LabRelatedPdf.map((pdf,index)=>
  <div key={pdf.index} className="transition-all duration-500 ease-in-out opacity-100 translate-y-0 animate-fade-in-slide-up mt-2">
    <div className="flex flex-col gap-2 bg-black border-2 rounded-lg shadow-lg p-4 mx-auto w-full max-w-3xl">
    <div className="flex flex-row justify-between items-center w-full">
  <div className="text-white text-center flex-1" style={{ maxWidth: '350px' }}>
    {pdf.SubjectName}
  </div>

  {/* Container for Expand and Reduce Icons */}
  <div className="text-center md:text-left">
            <a href={pdf.YoutubeLink} target="_blank" rel="noopener noreferrer" className="text-black cursor-pointer">
              <i className="bi bi-youtube text-[#FF3131]" style={{ fontSize: '35px' }}></i>
            </a>
          </div>
</div>


    </div>
  </div>
  )}
</div>


<div className='mb-[200px]'>

</div>

<div className='bg-black min-w-full h-auto lg:h-[380px] transition-all duration-500 ease-in-out  animate-fade-in-slide-up  flex flex-col lg:flex-row gap-10 lg:gap-[150px] px-4 py-10'>
        <div className='flex flex-col gap-[30px] w-full lg:w-[300px]'>
          <img src={Logo} alt="Logo" className='h-[30px] lg:h-[40px] mt-[20px] lg:mt-[50px]' />
          <div className='text-sm md:text-md font-instrument ml-[0px] lg:ml-[50px] text-white text-justify'>
            NoteGo brings together professor-curated student notes with relevant 
            YouTube tutorials for fast and efficient learning.
          </div>
        </div>

        <div className='flex flex-col gap-[30px] w-full lg:w-[300px]'>
          <h1 className='text-[#20C030] text-xl md:text-2xl mt-[20px] lg:mt-[60px]'>Quick Links</h1>
          <div className='flex flex-col'>
            <Link to = '/about' className='text-white text-base md:text-lg cursor-pointer'>About</Link>
            {/* <h1 className='text-white text-base md:text-lg cursor-pointer'>Contact</h1> */}
            <Link to='/Contact' className='text-white text-base md:text-lg cursor-pointer'>Contact</Link>
            <Link to = '/PrivacyPolicy' className='text-white text-base md:text-lg cursor-pointer'>Privacy Policy</Link>
            <Link to = '/Tnc' className='text-white text-base md:text-lg cursor-pointer'>Terms And Conditions</Link>
            <Link to = '/notes' className='text-white text-base md:text-lg cursor-pointer'>Notes</Link>
            <Link to='/pyq' className='text-white text-base md:text-lg cursor-pointer'>PYQ</Link>
            <Link to='/lab' className='text-white text-base md:text-lg cursor-pointer'>Lab</Link>
          </div>
        </div>

        <div className='flex flex-col gap-[30px] w-full lg:w-[200px]'>
          <h1 className='text-[#20C030] text-xl md:text-2xl mt-[20px] lg:mt-[60px]'>Navigate To</h1>
          <div className='flex flex-col'>
            <Link to='/CSCluster' className='text-white text-base md:text-lg cursor-pointer'>CS Cluster</Link>
            <Link to='/ECCluster' className='text-white text-base md:text-lg cursor-pointer'>Electrical Cluster</Link>
            <Link to='/MECluster' className='text-white text-base md:text-lg cursor-pointer'>Mechanical Cluster</Link>
          </div>
        </div>

        <div className='flex flex-row gap-[5px] mt-[60px]'>
          <i className="bi bi-c-circle text-white" style={{ fontSize: '20px' }}></i>
          <h1 className='text-white text-sm md:text-lg'>2024 by NoteGo</h1>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Lab