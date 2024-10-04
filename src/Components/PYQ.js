import React, { useCallback, useEffect, useRef, useState } from 'react';

import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import _ from 'lodash';
import debounce from 'lodash.debounce';
import { Link } from 'react-router-dom';
import Logo from '../logo.svg';
import { HashLoader, PulseLoader } from 'react-spinners';

function PYQ() {
  const [PhysicsCycle,setPhysicsCycle] = useState(false)
  const [ChemistryCycle,setChemistryCycle] = useState(false)
  const [CSRelatedPdf,setCSRelatedPdf] = useState([])
  const [Sem1,setSem1] = useState(0)
  const [Sem2,setSem2] = useState(0)

  

  const SelectPhysicsCycle=()=>{

    SearchedSubject.current.value = ""

    setPhysicsCycle(true)
    setChemistryCycle(false)

    setCSRelatedPdf([])
    
  }

  
  const SelectChemistryCycle=()=>{

    SearchedSubject.current.value = ""

    setPhysicsCycle(false)
    setChemistryCycle(true)

    setCSRelatedPdf([])
    
  }


  const ShowSelectedCycleRelatedPdf = ()=>{

    SearchedSubject.current.value = ""

    setCSRelatedPdf([])

    var Sem="";
    if(Sem1)
        Sem = "1CS"
    else
    if(Sem2)
        Sem = "2CS"

    if((Sem1 || Sem2) && PhysicsCycle){
        var myData = {Category:"CS",Sem:Sem}
        axios.post("https://notego-backend.onrender.com/api/PhysicsCycle/GetAllModules",myData)
        .then(response=>{

          setCSRelatedPdf(response.data)
          console.log(response.data)
        })  
    }

    else
    if((Sem1 || Sem2) && ChemistryCycle){
        var myData = {Category:"CS",Sem:Sem}
        axios.post("https://notego-backend.onrender.com/api/ChemistryCycle/GetAllModules",myData)
        .then(response=>{

          setCSRelatedPdf(response.data)
          
          console.log(response.data)
        })
    }
    else
      alert("Select the Semester and Cycle")



  }



  
  const [SelectedSubjectNumber,setSelectedSubjectNumber] = useState([])


  // const ShowPdfDetails=(Pdf)=>{

  //     var Faculty = SelectedSubjectNumber.filter(SubjNumber=>SubjNumber === Pdf.SubjectNumber)
      
  //     if(Faculty.length === 0){
  //       setSelectedSubjectNumber([...SelectedSubjectNumber,Pdf.SubjectNumber])
  //     }

      
  // }

  // const DontShowPdfDetails = (Pdf)=>{

  //   var UpdateSelectedFaculty = SelectedSubjectNumber.filter(SubjNumber=>SubjNumber !== Pdf.SubjectNumber)
  //   setSelectedSubjectNumber(UpdateSelectedFaculty)
    
  // }

  const SelectSem = (Sem) =>{

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
      
        if (input.trim() === '') 
          setCSRelatedPdf([])

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
    
                 
                  setFadeIn(true)
                  setCSRelatedPdf(filteredData);
                  setTimeout(()=>{

                    if(uniqueData.length === 0){
                      
                      setCSRelatedPdf([])
                      SearchedSubject.current.value = ""
  
                  }
  
                  },3000)
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


const [fadeIn,setFadeIn] = useState(false)

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Enables smooth scrolling
    });
  }, []); // Empty dependency array to run only on mount



  const isFirstRender = useRef(true);

  // This useEffect runs only once when the component mounts
  useEffect(() => {
    isFirstRender.current = false; // Set to false after the first render
  }, []);

  useEffect(() => {
    return () => {
      handleInputChange.cancel(); // Cancel any pending debounced calls on unmount
    };
  }, [handleInputChange]);
  

  const getSearchedSubject = () => {
    handleInputChange();

  };






  return (
    <div className='bg-black min-h-screen gap-[20px] flex flex-col  '>
<div className='flex flex-col lg:flex-row gap-8 mx-auto max-w-screen-lg'>
    <Link><img
        src={Logo}
        alt="Logo"
        to='/'
        className='h-10 mx-4 my-4 cursor-pointer'
    /></Link>

<Link
  to='/notes'
  className='h-12 hover:ring-4 hover:ring-blue-500  cursor-pointer relative min-w-xs max-w-xs bg-[#20C030] rounded-full flex items-center justify-between px-4 mx-1 my-4'
>
  <div className="text-white text-base mx-4 sm:text-lg md:text-xl font-medium">
    BackToNotes
  </div>
  <div className="bg-[#20C030] w-10 h-10 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center ">
    <i className="bi bi-caret-left-fill text-white text-sm sm:text-base md:text-lg"></i>
  </div>
</Link>
</div>

<div className='flex flex-col'>

<div className='text-white text-3xl mt-6 flex justify-center'>
      <span className='text-center'>PYQ'S</span>
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
        className="h-[40px] w-80 max-w-[500px] placeholder:text-[#20C030] border-2 border-black rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#20C030] focus:border-transparent"
        placeholder="Search Your Subject"
      />

    </div>

    <div className='flex justify-center gap-8 mt-5'>
    <div
        onClick={ShowSelectedCycleRelatedPdf}
        className='h-10 hover:ring-4 hover:ring-blue-500  rounded-2xl hover:shadow-custom cursor-pointer  w-64 max-w-md sm:max-w-xs bg-[#20C030] flex items-center justify-center'
    >
        <div className='text-white font-medium text-lg sm:text-xl'>Show Subjects</div>
    </div>
</div>

  
  
{!isFirstRender.current &&  SearchedSubject.current.value.length !== 0 && CSRelatedPdf.length === 0 ?
      
      <div className="flex items-center justify-center mt-12  space-x-2">
        
        <PulseLoader color="#36d7b7" size={10} margin={2} />
      </div>
   :null
    }
    
  

{CSRelatedPdf.length ?
<div className={`mt-5  transition-all   duration-700 ease-in-out  animate-fade-in-slide-up  ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5' } `}>

<div className="flex flex-col gap-4 border-2 bg-[#20C030] rounded-md shadow-lg p-4 justify-between w-full  md:w-3/5 lg:w-3/4  max-w-3xl mx-auto">
  <div className="flex flex-row justify-between  font-semibold">
    <div className="flex-1 text-white text-center">Contents</div>

  </div>
</div>

<div className="flex flex-row gap-2 bg-gray-900 border-2 mt-4 rounded-lg shadow-lg p-4 mx-auto w-full max-w-3xl">
    <div className="flex flex-row justify-between items-center w-full">
  <div className="text-white text-center flex-1" style={{ maxWidth: '350px' }}>
    SubjectName
  </div>
  
  
  {/* Container for Expand and Reduce Icons */}
  <div  className="flex flex-col items-center flex-none">
    
    <span className="text-white text-sm mt-1">PdfLink</span> {/* Added Expand label */}
  </div>
  
  
</div>
</div>


{CSRelatedPdf.length &&  CSRelatedPdf.map((pdf,index) => (
  <div key={pdf.SubjectNumber} className="transition-all duration-500 ease-in-out opacity-100 translate-y-0 animate-fade-in-slide-up mt-2">
    <div className="flex flex-col gap-2 bg-black border-2 rounded-lg shadow-lg p-4 mx-auto w-full max-w-3xl">
    <div className="flex flex-row justify-between items-center w-full">
  <div className="text-white text-center flex-1" style={{ maxWidth: '350px' }}>
    {pdf.SubjectName}
  </div>
  
  
  {/* Container for Expand and Reduce Icons */}
  <div className="text-center  md:text-left">
          
              <a key={index} href={pdf.PYQLink} target="_blank" rel="noopener noreferrer" className="text-black cursor-pointer">
                <i className="bi bi-file-earmark-pdf-fill text-white" style={{ fontSize: '25px' }}></i>
              </a>
           
          </div>
  
</div>


    </div>
  </div>
))}



</div>
:null}
</div>

<div className='mb-[100px]'></div>

    </div>
  )
}

export default PYQ