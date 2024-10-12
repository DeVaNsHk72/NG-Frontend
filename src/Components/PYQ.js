

import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import _ from 'lodash';

import debounce from 'lodash.debounce';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import Logo from '../logo.svg';


function PYQ() {

  const [PhysicsCycle,setPhysicsCycle] = useState(false)
  const [ChemistryCycle,setChemistryCycle] = useState(false)
  const [CSRelatedPdf,setCSRelatedPdf] = useState([])
  const [Sem1,setSem1] = useState(0)
  const [Sem2,setSem2] = useState(0)


  const[ShowSubjectsClicked,setShowSubjectsClicked] = useState(false)
  

  const SelectPhysicsCycle=()=>{


    setShowSubjectsClicked(false)

    SearchedSubject.current.value = ""

    setPhysicsCycle(true)
    setChemistryCycle(false)

    setCSRelatedPdf([])
    
  }

  
  const SelectChemistryCycle=()=>{


    setShowSubjectsClicked(false)

    SearchedSubject.current.value = ""

    setPhysicsCycle(false)
    setChemistryCycle(true)

    setCSRelatedPdf([])
    
  }


  const ShowSelectedCycleRelatedPdf = ()=>{


    setShowSubjectsClicked(false)

    SearchedSubject.current.value = ""

    setCSRelatedPdf([])

    var Sem="";
    if(Sem1)
        Sem = "1CS"
    else
    if(Sem2)
        Sem = "2CS"

    if((Sem1 || Sem2) && PhysicsCycle){

      setShowSubjectsClicked(true)

        var myData = {Category:"CS",Sem:Sem}
        axios.post("https://notego-backend.onrender.com/api/PhysicsCycle/GetAllModules",myData)
        .then(response=>{

          setCSRelatedPdf(response.data)
          console.log(response.data)

          if(response.data.length){
            window.scrollTo({
              top: 300,
              left: 0,
              behavior: 'smooth'
            });
          }

          
          setTimeout(()=>{

            if(response.data.length === 0){
              
              setCSRelatedPdf([])
              SearchedSubject.current.value = ""

          }

          },1000)

          
          if(response.data.length === 0){
            window.scrollTo({
              top: 0,
              behavior: 'smooth' // Enables smooth scrolling
            });

            setErrVal(true)
            setTimeout(()=>{


              setErrVal(false)

            },1000)

          }
        })  
    }

    else
    if((Sem1 || Sem2) && ChemistryCycle){

      setShowSubjectsClicked(true)


        var myData = {Category:"CS",Sem:Sem}
        axios.post("https://notego-backend.onrender.com/api/ChemistryCycle/GetAllModules",myData)
        .then(response=>{

          setCSRelatedPdf(response.data)
          console.log(response.data)

          if(response.data.length){
            window.scrollTo({
              top: 300,
              left: 0,
              behavior: 'smooth'
            });
          }

          
          setTimeout(()=>{

            if(response.data.length === 0){
              
              setCSRelatedPdf([])
              SearchedSubject.current.value = ""

          }

          },1000)

          
          if(response.data.length === 0){
            window.scrollTo({
              top: 0,
              behavior: 'smooth' // Enables smooth scrolling
            });

            setErrVal(true)
            setTimeout(()=>{


              setErrVal(false)

            },1000)

          }
        })
    }
    else
      alert("Select the Semester and Cycle")



  }



  const[ErrVal,setErrVal] = useState(false)


  const SelectSem = (Sem) =>{


    setShowSubjectsClicked(false)

    SearchedSubject.current.value = ""

    if(Sem === 1){
      setSem1(1)
      setSem2(0)
    }
    else
    if(Sem === 2){
      setSem1(0)
      setSem2(1)
    }

    setCSRelatedPdf([])
  }

  var SearchedSubject = useRef("")
  const handleInputChange = useCallback(

    debounce(() => {

      setSem1(false)
      setSem2(false)
      setPhysicsCycle(false)
      setChemistryCycle(false)

      const input = SearchedSubject.current.value

      if(input === "" || input.length === 0)
          setCSRelatedPdf([])

      if (input.length) {
      
          if (input.trim() === '') {
  
            setTimeout(()=>{
  
                setCSRelatedPdf([])
                SearchedSubject.current.value = ""
  
            },1000)
            
  
            setErrVal(true)
              setTimeout(()=>{
  
  
              setErrVal(false)
  
              },1000)
  
          }

        else {

          var searchTerm

          setCSRelatedPdf([])

          searchTerm = { SubjectName:input };

          axios.post("https://notego-backend.onrender.com/api/GetPhysicsCycleSubjects", searchTerm)
          .then(response1 => {
            const physicsCycleData = response1.data;

            // Second API call for Chemistry Cycle
            setTimeout(() => {
              axios.post("https://notego-backend.onrender.com/api/GetChemistryCycleSubjects", searchTerm)
                .then(response2 => {
                  const chemistryCycleData = response2.data;

                  // Combine both API results
                  const combinedData = [...physicsCycleData, ...chemistryCycleData];

                  // Remove duplicates based on SubjectNumber
                  const uniqueData = _.uniqBy(combinedData, (item) => `${item.SubjectName}-${item.code}`);

                  if(uniqueData.length){
                    window.scrollTo({
                      top: 300,
                      left: 0,
                      behavior: 'smooth'
                    });
                    setFadeIn(true)
                    setCSRelatedPdf(uniqueData);
                  }

                  setTimeout(()=>{

                    if(uniqueData.length === 0){
                      
                      setCSRelatedPdf([])
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

                    },1000)

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

  const isFirstRender = useRef(true)

  useEffect(()=>{

      isFirstRender.current = false
  },[])


  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Enables smooth scrolling
    });
  }, []); // Empty dependency array to run only on mount



const [fadeIn,setFadeIn] = useState(false)

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

<div className='flex transition-all     duration-700 ease-in-out animate-fade-in-slide-up  flex-col'>
    <div className='text-white text-3xl mt-6 flex justify-center'>
      <span className='text-center'>Previous Year Questions</span>
    </div>

    {/* Flex container for all option buttons in a single line */}
    <div className='flex justify-center gap-2 flex-col mx-auto'>
      
      <h1 className='text-white text-2xl font-instrument mx-auto mt-4'>Select Cycle</h1>
      <div className='flex flex-row gap-4'>
        <div
            onClick={SelectPhysicsCycle}
            className={`h-10 w-full max-w-xs mt-[20px] hover:ring-4 hover:ring-teal-400 cursor-pointer hover:shadow-custom rounded-full ${PhysicsCycle ? 'bg-[#20C030]' : 'bg-white' }`}
        >
            <div className={`text-xl w-full font-medium mx-2 my-1 ${PhysicsCycle ? 'text-white':'text-black'}`}>P-Cycle</div>
        </div>

        <div
            onClick={SelectChemistryCycle}
            className={`h-10 w-full max-w-xs mt-[20px] hover:ring-4 hover:ring-teal-400 cursor-pointer hover:shadow-custom rounded-full  ${ChemistryCycle ? 'bg-[#20C030]' : 'bg-white' }`}
        >
            <div className={`text-xl w-full font-medium mx-2 my-1 ${ChemistryCycle ? 'text-white':'text-black'}`}>C-Cycle</div>
        </div>
      </div>
    
      
      <h1 className='text-white text-2xl font-instrument mx-auto mt-4'>Select Semester</h1>
      <div className='flex flex-row gap-4'>
        <div
            onClick={() => SelectSem(1)}
            className={`h-10 w-full max-w-xs mt-[20px] hover:ring-4 hover:ring-teal-400 cursor-pointer hover:shadow-custom rounded-full ${Sem1 ? 'bg-[#20C030]' : 'bg-white' }`}
        >
            <div className={`text-xl font-medium mx-4 my-1 ${Sem1 ? 'text-white':'text-black'}`}>Sem1</div>
        </div>

        <div
            onClick={() => SelectSem(2)}
            className={`h-10 w-full max-w-xs hover:ring-4 hover:ring-teal-400 mt-[20px] cursor-pointer hover:shadow-custom rounded-full  ${Sem2 ? 'bg-[#20C030]' : 'bg-white' }`}
        >
            <div className={`text-xl font-medium mx-4 my-1 ${Sem2 ? 'text-white':'text-black'}`}>Sem2</div>
        </div>
      </div>
    </div>


    
    

<div className="flex flex-col items-center  justify-center mt-10 ">
      <input
        autoFocus
        
        ref={SearchedSubject}
        onKeyUp={getSearchedSubject} 
        className="h-[40px] w-80 max-w-[500px] placeholder:text-black border-2 border-black rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#20C030] focus:border-transparent"
        placeholder="Search Your Subject"
      />

{!isFirstRender.current &&  SearchedSubject.current.value.length !== 0 && CSRelatedPdf.length === 0
  
  ||(ShowSubjectsClicked && (( PhysicsCycle && (Sem1 || Sem2)) || (ChemistryCycle && (Sem1 || Sem2))) && CSRelatedPdf.length === 0) ?
      

      <div className='flex flex-row gap-2'>
          <div className='text-lg text-white font-medium mt-12' >Loading</div>
          <div className="flex items-center justify-center mt-12  space-x-2">
        
            <PulseLoader color="#36d7b7" size={10} margin={2} />
          </div>
      </div>
   :null
  
    }
    
    </div>

    <div className='flex flex-col self-center gap-4 mt-5'>
      <div
          onClick={ShowSelectedCycleRelatedPdf}
          className='h-10 hover:ring-4 hover:ring-blue-500 ml-[30px]  rounded-2xl hover:shadow-custom cursor-pointer  w-64 max-w-md sm:max-w-xs bg-[#20C030] flex items-center justify-center'
      >
          <div className='text-white font-medium text-lg sm:text-xl'>Show Subjects</div>
      </div>

      <div className={`flex text-white justify-center items-center duration-1000 transition-all border-red-600  ease-in-out border-2 rounded-full mt-10 h-[40px] w-80 shadow-custom self-center font-medium ${ErrVal ? 'opacity-100':'opacity-0'}`}>
        Search Results: Subject Not Found
      </div>
    </div>


{CSRelatedPdf.length ?
<div className={`mt-5  transition-all   duration-700 ease-in-out  animate-fade-in-slide-up  ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5' } `}>

<div className="flex flex-col gap-4 border-2 bg-[#20C030] rounded-md shadow-lg p-4 justify-between w-full  md:w-3/5 lg:w-3/4  max-w-3xl mx-auto">
  <div className="flex flex-row justify-between  font-semibold">
    <div className="flex-1 text-white text-center">Contents</div>

  </div>
</div>


{/* Header for Subject Name, CIE PdfLink, and SEE PdfLink */}
<div className="flex flex-col gap-2 bg-black border-2 rounded-lg shadow-lg p-4 mx-auto w-full max-w-3xl">
  <div className="grid grid-cols-3 space-x-20  w-full mx-auto justify-between items-center">
    {/* Subject Name */}
    <div className="text-white text-center flex-1" style={{ maxWidth: '350px' }}>
      Subject Name
    </div>


  
    {/* CIE PdfLink */}
    <div className='flex justify-center items-center space-x-5 flex-row gap-3'>
      <div className="text-center">
        <span className="text-white text-sm">CIE1</span>
      </div>

      <div className="text-center">
        <span className="text-white text-sm">CIE2</span>
      </div>

      <div className="text-center">
        <span className="text-white text-sm">CIE3</span>
      </div>
    </div>

    {/* SEE PdfLink */}
    <div className="text-center">
      <span className="text-white text-sm">SEE</span>
    </div>
  </div>
</div>

{/* Loop for PDFs */}
{CSRelatedPdf.length > 0 && CSRelatedPdf.map((pdf, index) => (
  <div key={pdf.SubjectNumber} className="transition-all duration-500 ease-in-out opacity-100 translate-y-0 animate-fade-in-slide-up mt-2">
    <div className="flex flex-col  bg-black border-2 rounded-lg shadow-lg p-4 mx-auto w-full max-w-3xl">
      <div className="grid grid-cols-3 space-x-20 w-full mx-auto justify-between items-center">
        {/* Subject Name */}
        <div className="text-white text-center flex-1" style={{ maxWidth: '350px' }}>
          {pdf.SubjectName}
        </div>

        {/* CIE PdfLink */}
        <div className='flex justify-center items-center space-x-3 flex-row gap-2' >
          <div className="text-center">
            <a href={pdf.CIE1} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
              <i className="bi bi-file-earmark-pdf-fill text-white" style={{ fontSize: '40px' }}></i>
            </a>
          </div>

          <div className="text-center">
            <a href={pdf.CIE2} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
              <i className="bi bi-file-earmark-pdf-fill text-white" style={{ fontSize: '40px' }}></i>
            </a>
          </div>

          <div className="text-center">
            <a href={pdf.CIE3} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
              <i className="bi bi-file-earmark-pdf-fill text-white" style={{ fontSize: '40px' }}></i>
            </a>
          </div>
        </div>

        {/* SEE PdfLink */}
        <div className="text-center">
          <a href={pdf.PYQLink} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
            <i className="bi bi-file-earmark-pdf-fill text-white" style={{ fontSize: '40px' }}></i>
          </a>
        </div>
      </div>
    </div>
  </div>
))}


</div>
:null}



</div>


<div className='mb-[200px]'>

</div>
<div className='bg-black min-w-full h-auto lg:h-[380px] flex flex-col lg:flex-row gap-10 lg:gap-[150px] px-4 py-10'>
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
          <div className='flex flex-col'>
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
          <div className='flex flex-col'>
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
  )
}

export default PYQ