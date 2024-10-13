import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import _ from 'lodash';
import debounce from 'lodash.debounce';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import Logo from '../logo.svg';

function Notes() {

   


    var SearchedSubject = useRef("")

    const [SearchedRelatedPdf,setSearchedRelatedPdf] = useState([])


    const [fadeIn,setFadeIn] = useState(false)

    const [ErrVal,setErrVal] = useState(false)



    const handleInputChange = useCallback(
      debounce(() => {
  
        var input = SearchedSubject.current.value
  
        if(input === "" || input.length === 0)
            setSearchedRelatedPdf([])
  
        if (input.length) {
        
          if (input.trim() === '') {

            setTimeout(()=>{

                setSearchedRelatedPdf([])
                SearchedSubject.current.value = ""

            },1000)

            setErrVal(true)
              setTimeout(()=>{


              setErrVal(false)

              },2500)

          }
  
          else {
            
            setFadeIn(false)
            var searchTerm
    
            setSearchedRelatedPdf([])
  
            searchTerm = { SubjectName:input };
            
            axios.post("https://notego-backend-final.onrender.com/api/GetPhysicsCycleSubjects", searchTerm)
            .then(response1 => {
              const physicsCycleData = response1.data;
  
              // Second API call for Chemistry Cycle
              setTimeout(() => {
                axios.post("https://notego-backend-final.onrender.com/api/GetChemistryCycleSubjects", searchTerm)
                  .then(response2 => {
                    const chemistryCycleData = response2.data;

                    // Combine both API results
                    const combinedData = [...physicsCycleData, ...chemistryCycleData];

                    // Remove duplicates based on SubjectNumber
                    const uniqueData = _.uniqBy(combinedData, (item) => `${item.SubjectName}-${item.code}`);


                  if(uniqueData.length){
                    window.scrollTo({
                      top: 300,
                      behavior: 'smooth' // Enables smooth scrolling
                    });
                    setFadeIn(true)
                    setSearchedRelatedPdf(uniqueData);
                    setSelectedSubjectNumber([])
                    setSelectedSubjectNumber(uniqueData)
                   
                  }
                  

                    setTimeout(()=>{
                      if(uniqueData.length === 0){


                        setSearchedRelatedPdf([])
                        SearchedSubject.current.value = ""


                    }

                    },1000)

                    if(uniqueData.length === 0){
                      window.scrollTo({
                        top: 0,
                        behavior: 'smooth' // Enables smooth scrolling
                      });

                      setErrVal(true)
                      setTimeout(()=>{


                        setErrVal(false)

                      },2500)

                    }

                  })
                  .catch(err => {
                    console.error(err);
                  });
              }, 500); // Delay for Chemistry Cycle reques
  
                      
                  // 2-second delay
                  })
  
            .catch(err => {
              console.log(err);
            });
          }
        }
      }, 200), // 200 ms delay
      []
    );
  
  
  
    useEffect(() => {
      return () => {
        handleInputChange.cancel(); // Cancel any pending debounced calls on unmount
      };
    }, [handleInputChange]);
    
  
    const getSearchedSubject = () => {
      handleInputChange();
    };
  
  
    useEffect(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // Enables smooth scrolling
      });
    }, []); // Empty dependency array to run only on mount
  
  

  const [SelectedSubjectNumber,setSelectedSubjectNumber] = useState([])


const [isMenuOpen, setIsMenuOpen] = useState(false);

const toggleMenu = () => {
  setIsMenuOpen(!isMenuOpen);
};



useEffect(() => {

  setTimeout(()=>{
      
  if(SearchedSubject.current.value.length === 0)
    setSearchedRelatedPdf([])
    
  },100)

  setTimeout(()=>{
      
    if(SearchedSubject.current.value.length === 0)
      setSearchedRelatedPdf([])
      
    },100)

 
}, [SearchedSubject]);

const isFirstRender = useRef(true)

useEffect(()=>{

    isFirstRender.current = false
}, []);

const handleToggle = (subjectNumber) => {

  setSelectedSubjectNumber((prev) => {
    // Check if the subject is already in the array
    const existingSubject = prev.find(sub => sub.SubjectNumber === subjectNumber);
    
    if (existingSubject) {
      // If it exists, toggle its state
      return prev.map(sub =>
        sub.SubjectNumber === subjectNumber
          ? { ...sub, State: existingSubject.State === 0 ? 1 : 0 } // Toggle between 0 and 1
          : sub
      );
    } else {
      // If it doesn't exist, add it with state 1 (expanded)
      return [...prev, { SubjectNumber: subjectNumber, State: 1 }];
    }
  });

  console.log("Toggled subject:", subjectNumber);
  console.log(SelectedSubjectNumber);
};


  return (

    <div className='flex flex-col min-h-screen bg-white gap-[10px]'>

       {/* Navbar */}
      <div className='bg-black w-full flex justify-between items-center px-4 md:px-20 py-6 '>
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
            to = '/about'
            className={`cursor-pointer text-white text-lg md:text-2xl hover:text-green-400`}
          >
            About
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
            LAB
          </Link>

        </nav>
      </div>


    
      <div className="flex flex-col items-center   justify-center mt-10 ">
      <input
        
        
        ref={SearchedSubject}
        onKeyUp={getSearchedSubject} 
        className="h-[40px] w-80 max-w-[500px] placeholder:text-black border-2 z-10  rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus: ring-offset-0"
        placeholder="Search Your Subject"
      />

    {!isFirstRender.current &&  SearchedSubject.current.value.length !== 0 && SearchedRelatedPdf.length === 0 ?
      

      <div className='flex flex-row gap-2'>
          <div className='text-lg text-black font-medium mt-12' >Loading</div>
          <div className="flex items-center justify-center mt-12  space-x-2">
        
            <PulseLoader color="#36d7b7" size={10} margin={2} />
          </div>
      </div>
   : ErrVal ? 
      
  <div className={`flex text-black justify-center items-center duration-1000 transition-all border-red-600  ease-in-out border-2 rounded-full mt-10 h-[40px] w-80 shadow-custom self-center font-medium ${ErrVal ? 'opacity-100':'opacity-0'}`}>
    Search Results: Subject Not Found
  </div>:null

  
    }

  
    </div>

    {SearchedRelatedPdf.length === 0?
      <div className="text-[#20C030] text-4xl mt-10 font-instrument w-full text-center ">
        Select the Cluster
      </div>
      :null
    }

      {SearchedRelatedPdf.length === 0 ? (
  <div className="flex flex-wrap justify-center transition-all     duration-700 ease-in-out animate-fade-in-slide-up  gap-10 mt-10">
    {/* CS Cluster Card */}
    <Link
      to = '/CSCluster'
      className="flex shadow-custom-gray hover:ring-4 justify-center items-center hover:ring-teal-400 flex-col gap-2 cursor-pointer bg-black rounded-3xl h-[50px] w-80 sm:w-[250px] md:w-[300px]  p-4"
     >
      <h1 className="text-3xl sm:text-4xl text-center text-[#20C030]  ">CS Cluster</h1>
      
    </Link>

    {/* ECE Cluster Card */}
    <Link
      to = '/ECCluster'
      className="flex  shadow-custom-gray hover:ring-4 justify-center items-center hover:ring-teal-400 flex-col gap-2 cursor-pointer bg-black rounded-3xl h-[50px] w-80 sm:w-[250px] md:w-[300px] shadow-custom p-4"
    >
      <h1 className="text-3xl sm:text-4xl text-center text-[#20C030]  ">EE Cluster</h1>
     
    </Link>

    {/* ME Cluster Card */}
    <Link
      to = '/MECluster'
      className="flex shadow-custom-gray  hover:ring-4 justify-center items-center hover:ring-teal-400  flex-col gap-2 cursor-pointer bg-black rounded-3xl h-[50px] w-80 sm:w-[250px] md:w-[300px] shadow-custom p-4"
    >
      <h1 className="text-3xl sm:text-4xl text-center text-[#20C030]  ">Mech. Cluster</h1>
      
    </Link>
  </div>
) : (
  <div className={`mt-8  transition-all     duration-700 ease-in-out animate-fade-in-slide-up   ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5' } `}>


<div className="flex flex-col gap-4 border-2 bg-amber-100 rounded-md shadow-lg p-4 justify-between w-full  md:w-3/5 lg:w-3/4  max-w-3xl mx-auto">
  <div className="flex flex-row justify-between text-black font-semibold">
    <div className="flex-1 text-center">Contents</div>

  </div>
</div>

<div className="flex flex-row gap-2 bg-gray-900 border-2 mt-2 rounded-lg shadow-lg p-4 mx-auto w-full max-w-3xl">
    <div className="flex flex-row justify-between items-center w-full">
  <div className="text-white text-center flex-1" style={{ maxWidth: '350px' }}>
    Subject Name
  </div>
  
  <div  className="flex flex-col items-center flex-none">
    
    <span className="text-white text-sm mt-1">Expand/Reduce</span> {/* Added Expand label */}
  </div>

</div>
</div>

{SearchedRelatedPdf.map((pdf) => (
  
  <div>
    {pdf.Modules.length ? 
  <div key={pdf.SubjectNumber} className={` transition-all  duration-700 ease-in-out  transform bg-white  ` } >
    <div className="flex flex-col gap-2 bg-black border-2 rounded-lg shadow-lg p-4 mx-auto w-full max-w-3xl">
    <div onClick={()=>handleToggle(pdf.SubjectNumber)}  className="flex flex-row justify-between items-center w-full bg-black cursor-pointer">
  <div className="text-white text-center flex-1" style={{ maxWidth: '350px' }}>
    {pdf.SubjectName}
  </div>
  
  {/* Container for Expand and Reduce Icons */}
  <div  className="flex flex-col items-center flex-none">
    {/* Down Arrow (Expand) */}
    <i
      className={` text-3xl text-white cursor-pointer ${SelectedSubjectNumber.some(sub => sub.SubjectNumber === pdf.SubjectNumber && sub.State === 1)  ? 'bi bi-arrow-up-circle-fill' : 'bi-arrow-down-circle-fill'} `}
    ></i>
  </div>


</div>

{SelectedSubjectNumber.some(sub => sub.SubjectNumber === pdf.SubjectNumber) ?
  <div className={`flex flex-col gap-5 mt-2  overflow-auto  transition-all duration-700 ease-in-out bg-black 
    ${SelectedSubjectNumber.some(sub => sub.SubjectNumber === pdf.SubjectNumber && sub.State === 1)  ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'} `}>
    {/* Header Row */}

    {pdf.Modules.length ? 
    <div>
    <div className={` gap-2 bg-[#545454] border-2 border-white rounded-xl shadow-lg p-2 justify-between w-full transition-opacity duration-700 ease-in-out grid grid-cols-4 `}>
      <div className="text-white text-center md:text-left">Module No.</div>
      <div className="text-white text-center md:text-left">Module Name</div>
      <div className="text-white text-center md:text-left">PDF Link</div>
      <div className="text-white text-center md:text-left">YouTube Link</div>
       
    </div>

    {/* Module Rows */}
    <div className={`flex flex-col   transition-all  duration-700 ease-in-out transform ${ SelectedSubjectNumber.some(sub => sub.SubjectNumber === pdf.SubjectNumber && sub.State === 1)  ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
      {pdf.Modules.map((module) => (
        <div key={module.ModuleNum} className="grid grid-cols-4 gap-2 bg-black border-2 border-white rounded-2xl shadow-lg p-2 w-full mx-auto">
          <div className="text-white text-center ml-4 md:text-left">{module.ModuleNum}</div>
          <div className="text-white text-center md:text-left">{module.ModuleName}</div>

          <div className="text-center flex flex-row flex-wrap gap-1 md:text-left">
            {module.PdfLink.map((pdfLink, index) => (
              <div>
                {module.PdfLink !== "" ?
              <a key={index} href={pdfLink} target="_blank" rel="noopener noreferrer" className="text-black cursor-pointer">
                <i className="bi bi-file-earmark-pdf-fill text-white" style={{ fontSize: '35px' }}></i>
              </a>:null}
              </div>
            ))}
          </div>

          <div className="text-center flex flex-row flex-wrap gap-1 md:text-left">
            <div>
          {module.YoutubeLink !== "" ?
            <a href={module.YoutubeLink} target="_blank" rel="noopener noreferrer" className="text-black cursor-pointer">
              <i className="bi bi-youtube text-[#FF3131]" style={{ fontSize: '35px' }}></i>
            </a>:null}
            </div>
          </div>
          


        </div>
      ))}
    </div>
    </div>
    :null}
  </div>
:null}


    </div>
  </div>:null}
  </div>
))}


  </div>
  
)}

   
        <div className='mb-[100px]' ></div>

     
    </div>

  
  
   
  )
}

export default Notes