

import axios from 'axios'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import _ from 'lodash';

import debounce from 'lodash.debounce'
import React, { useEffect, useRef, useState,useCallback } from 'react';
import Logo from '../logo.svg';
import { Link } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';


function CSCluster() {
  const [PhysicsCycle,setPhysicsCycle] = useState(false)
  const [ChemistryCycle,setChemistryCycle] = useState(false)
  const [CSRelatedPdf,setCSRelatedPdf] = useState([])
  const [Sem1,setSem1] = useState(0)
  const [Sem2,setSem2] = useState(0)

  const[ShowSubjectsClicked,setShowSubjectsClicked] = useState(false)

  
  const [ErrVal,setErrVal] = useState(false)
  

  const SelectPhysicsCycle=()=>{


    SearchedSubject.current.value = ""
    setShowSubjectsClicked(false)
    setPhysicsCycle(true)
    setChemistryCycle(false)

    setCSRelatedPdf([])
    
  }

  
  const SelectChemistryCycle=()=>{


    SearchedSubject.current.value = ""

    setShowSubjectsClicked(false)
    setPhysicsCycle(false)
    setChemistryCycle(true)

    setCSRelatedPdf([])
    
  }


  const ShowSelectedCycleRelatedPdf = ()=>{

    setShowSubjectsClicked(false)
    

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
              setShowSubjectsClicked(false)
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
              setShowSubjectsClicked(false)

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



  
  const [SelectedSubjectNumber,setSelectedSubjectNumber] = useState([])


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

                
                  const filteredData = _.filter(uniqueData, (item) => item.ClusterCategory !== 'EC' &&  item.ClusterCategory !== 'ME');


                  if(filteredData.length){
                    window.scrollTo({
                      top: 300,
                      left: 0,
                      behavior: 'smooth'
                    });
                    setFadeIn(true)
                    setCSRelatedPdf(filteredData);
                    setSelectedSubjectNumber([])
                    console.log("SelectedSubjectNumber: ")
                    setSelectedSubjectNumber(filteredData)
                    console.log(SelectedSubjectNumber)
                    console.log("SearchedRelatedPdf: ")
                    console.log(setCSRelatedPdf)
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



const [fadeIn,setFadeIn] = useState(false)

  return (
    <div className='bg-black min-h-screen gap-[20px] flex flex-col  '>
<div className='flex flex-col lg:flex-row gap-8 mx-auto max-w-screen-lg'>
    <Link><img
        src={Logo}
        alt="Logo"
        to = '/'
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
    <div className='text-white text-3xl mt-6 flex justify-center'>
      <span className='text-center'>CS Cluster</span>
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
        className="h-[40px] w-80 max-w-[500px]  placeholder:text-black border-2 border-black rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#20C030] focus:border-transparent"
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
<div className={`mt-4  transition-all     duration-700 ease-in-out animate-fade-in-slide-up   ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5' } `}>

<div className="flex flex-col gap-4 border-2 bg-[#20C030] rounded-md shadow-lg p-4 justify-between w-full  md:w-3/5 lg:w-3/4  max-w-3xl mx-auto">
  <div className="flex flex-row justify-between  font-semibold">
    <div className="flex-1 text-white text-center">Contents</div>

  </div>
</div>
      

{CSRelatedPdf.map((pdf) => (
  <div key={pdf.SubjectNumber} className={` transition-all  duration-700 ease-in-out transform bg-black  ` } >
    <div className="flex flex-col gap-2 bg-black border-2 rounded-lg shadow-lg p-4 mx-auto w-full max-w-3xl">
    <div className="flex flex-row justify-between items-center w-full bg-black">
  <div className="text-white text-center flex-1" style={{ maxWidth: '350px' }}>
    {pdf.SubjectName}
  </div>
  
  {/* Container for Expand and Reduce Icons */}
  <div  onClick={()=>handleToggle(pdf.SubjectNumber)} className="flex flex-col items-center flex-none">
    {/* Down Arrow (Expand) */}
    <i
      className={` text-3xl text-white cursor-pointer ${SelectedSubjectNumber.some(sub => sub.SubjectNumber === pdf.SubjectNumber && sub.State === 1)  ? 'bi bi-arrow-up-circle-fill' : 'bi-arrow-down-circle-fill'} `}
    ></i>
    <span className="text-white text-sm mt-1">Expand/Reduce</span> {/* Added Expand label */}
  </div>


</div>

{SelectedSubjectNumber.some(sub => sub.SubjectNumber === pdf.SubjectNumber) ?
  <div className={`flex flex-col gap-5 mt-2  overflow-auto  transition-all duration-700 ease-in-out bg-black 
    ${SelectedSubjectNumber.some(sub => sub.SubjectNumber === pdf.SubjectNumber && sub.State === 1)  ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'} `}>
    {/* Header Row */}
    <div className={`grid grid-cols-4 gap-2 bg-[#545454] border-2 border-white rounded-xl shadow-lg p-2 justify-between w-full transition-opacity duration-700 ease-in-out `}>
      <div className="text-white text-center md:text-left">Module No.</div>
      <div className="text-white text-center md:text-left">Module Name</div>
      <div className="text-white text-center md:text-left">PDF Link</div>
      <div className="text-white text-center md:text-left">YouTube Link</div>
    </div>

    {/* Module Rows */}
    <div className={`flex flex-col gap-5   transition-all  duration-700 ease-in-out transform ${ SelectedSubjectNumber.some(sub => sub.SubjectNumber === pdf.SubjectNumber && sub.State === 1)  ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
      {pdf.Modules.map((module) => (
        <div key={module.ModuleNum} className="grid grid-cols-4 gap-2 bg-black border-2 border-white rounded-2xl shadow-lg p-2 w-full mx-auto">
          <div className="text-white text-center ml-4 md:text-left">{module.ModuleNum}</div>
          <div className="text-white text-center md:text-left">{module.ModuleName}</div>
          <div className="text-center  md:text-left">
            {module.PdfLink.map((pdfLink, index) => (
              <a key={index} href={pdfLink} target="_blank" rel="noopener noreferrer" className="text-black cursor-pointer">
                <i className="bi bi-file-earmark-pdf-fill text-white" style={{ fontSize: '35px' }}></i>
              </a>
            ))}
          </div>
          <div className="text-center md:text-left">
            <a href={module.YoutubeLink} target="_blank" rel="noopener noreferrer" className="text-black cursor-pointer">
              <i className="bi bi-youtube text-[#FF3131]" style={{ fontSize: '35px' }}></i>
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
:null}


    </div>
  </div>
))}

</div>:null}

</div>

<div className='bg-black min-w-full h-auto lg:h-[380px] flex flex-col lg:flex-row gap-10 lg:gap-[150px] px-4 py-10'>
        <div className='flex flex-col gap-[30px] w-full lg:w-[300px]'>
          <img src={Logo} alt="Logo" className='h-[30px] lg:h-[40px] mt-[20px] lg:mt-[50px]' />
          <div className='text-sm md:text-md font-instrument ml-[0px] lg:ml-[50px] text-white text-justify'>
            NoteGo brings together professor-curated student notes with relevant 
            YouTube tutorials for fast and efficient learning.
          </div>
        </div>
{/* 
        <div className='flex flex-col gap-[30px] w-full lg:w-[300px]'>
          <h1 className='text-[#20C030] text-xl md:text-2xl mt-[20px] lg:mt-[60px]'>Quick Links</h1>
          <div className='flex flex-col'>
            <Link to='/about' className='text-white text-base md:text-lg cursor-pointer'>About</Link>
            <Link to='/contact' className='text-white text-base md:text-lg cursor-pointer'>Contact</Link>
            <Link to='/privacy' className='text-white text-base md:text-lg cursor-pointer'>Privacy Policy</Link>
            <Link to='/tnc' className='text-white text-base md:text-lg cursor-pointer'>Terms And Conditions</Link>
            <Link to='/notes' className='text-white text-base md:text-lg cursor-pointer'>Notes</Link>
            <Link to='/pyq' className='text-white text-base md:text-lg cursor-pointer'>PYQ</Link>
          </div>
        </div> */}
        <div className='flex flex-col gap-[30px] w-full lg:w-[300px]'>
          <h1 className='text-[#20C030] text-xl md:text-2xl mt-[20px] lg:mt-[60px]'>Quick Links</h1>
          <div className='flex flex-col'>
            <Link to = '/about' className='text-white text-base md:text-lg cursor-pointer'>About</Link>
            {/* <h1 className='text-white text-base md:text-lg cursor-pointer'>Contact</h1> */}
            <Link to='/Contact' className='text-white text-base md:text-lg cursor-pointer'>Contact</Link>
            <Link to = '/PrivacyPolicy' className='text-white text-base md:text-lg cursor-pointer'>Privacy Policy</Link>
            <Link to = '/Tnc' className='text-white text-base md:text-lg cursor-pointer'>Terms And Conditions</Link>
            <Link to = '/notes' className='text-white text-base md:text-lg cursor-pointer'>Notes</Link>
            <h1 className='text-white text-base md:text-lg cursor-pointer'>PYQ</h1>
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
  )
}

export default CSCluster