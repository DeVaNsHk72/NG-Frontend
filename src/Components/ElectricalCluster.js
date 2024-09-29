import React, { useEffect, useRef, useState } from 'react'

import axios from 'axios'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import _ from 'lodash';
import Logo from '../logo.svg';
import { Link } from 'react-router-dom';

function ElectricalCluster() {
  const [PhysicsCycle,setPhysicsCycle] = useState(false)
  const [ChemistryCycle,setChemistryCycle] = useState(false)
  const [ECERelatedPdf,setECERelatedPdf] = useState([])
  const [Sem1,setSem1] = useState(0)
  const [Sem2,setSem2] = useState(0)

  

  const SelectPhysicsCycle=()=>{

    setPhysicsCycle(true)
    setChemistryCycle(false)

    setECERelatedPdf([])
    
  }

  
  const SelectChemistryCycle=()=>{

    setPhysicsCycle(false)
    setChemistryCycle(true)
    
    setECERelatedPdf([])
  }


  const ShowSelectedCycleRelatedPdf = ()=>{

    setECERelatedPdf([])

    var Sem="";
    if(Sem1)
        Sem = "1EC"
    else
    if(Sem2)
        Sem = "2EC"

    if((Sem1 || Sem2) && PhysicsCycle){
        var myData = {Category:"EC",Sem:Sem}
        axios.post("https://notego-backend.onrender.com/api/PhysicsCycle/GetAllModules",myData)
        .then(response=>{

          
          const filteredData = _.filter(response.data, (item) => item.SubjectCode !== "22EC1ESIEL/22EC2ESIEL");

          setECERelatedPdf(filteredData)
          console.log(filteredData)
        })  
    }

    else
    if((Sem1 || Sem2) && ChemistryCycle){
        var myData = {Category:"CS",Sem:Sem}
        axios.post("https://notego-backend.onrender.com/api/ChemistryCycle/GetAllModules",myData)
        .then(response=>{

          const filteredData = _.filter(response.data, (item) => item.SubjectCode !== "22EC1ESIEL/22EC2ESIEL");

          setECERelatedPdf(filteredData)
          console.log(response.data)
        })
    }
    else
      alert("Select the Semester and Cycle")



  }



  
  const [SelectedSubjectNumber,setSelectedSubjectNumber] = useState([])


  const ShowPdfDetails=(Pdf)=>{

      var Faculty = SelectedSubjectNumber.filter(SubjNumber=>SubjNumber === Pdf.SubjectNumber)
      
      if(Faculty.length === 0){
        setSelectedSubjectNumber([...SelectedSubjectNumber,Pdf.SubjectNumber])
      }

      
  }

  const DontShowPdfDetails = (Pdf)=>{

    var UpdateSelectedFaculty = SelectedSubjectNumber.filter(SubjNumber=>SubjNumber !== Pdf.SubjectNumber)
    setSelectedSubjectNumber(UpdateSelectedFaculty)
    
  }

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

    setECERelatedPdf([])
  }

  var SearchedSubject = useRef("")
  
  const getSearchedSubject = (e) =>{

    setSem1(false)
    setSem2(false)
    setPhysicsCycle(false)
    setChemistryCycle(false)
    const sanitizedInput = e.target.value.replace(/[^A-Za-z0-9]/g, '');

     
    setECERelatedPdf([])
  

    if(sanitizedInput.length){

          var searchTerm

          setECERelatedPdf([])

  
          searchTerm = { SubjectName: sanitizedInput };
          


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
                  
                  const filteredData = _.filter(uniqueData, (item) => item.ClusterCategory !== 'CS' &&  item.ClusterCategory !== 'ME' && item.SubjectCode !== "22EC1ESIEL/22EC2ESIEL");

                
                  setECERelatedPdf(filteredData);
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
        else
            setECERelatedPdf([])
}





const [isRotated,setisRotated] = useState(0)
const RotateOnClick = () =>{

    setSem1(false)
    setSem2(false)
    setPhysicsCycle(false)
    setChemistryCycle(false)
    setECERelatedPdf([])

    setisRotated(true)

    setTimeout(() => {
      setisRotated(0);
    }, 300);
}



useEffect(() => {
  
  if (
    (SearchedSubject.current.value === "" && // When the search box is empty
    ((!PhysicsCycle && !(Sem1 || Sem2)) || (!ChemistryCycle && !(Sem1 || Sem2))))
    
    || SearchedSubject.current.value === " "// Related cycles are not present
  ) {
    setECERelatedPdf([]); // Clear the CSRelatedPdf list
  }

  const delayDebounceFn = setTimeout(() => {
    // Simulate search query here (e.g., fetch results)
   

    // Example: simulate setting the search results
    // Replace this with your actual search logic
  }, 500); // 500ms delay for debouncing

  // Cleanup function: clear the timeout to avoid memory leaks
  return () => clearTimeout(delayDebounceFn);

}, [ECERelatedPdf, PhysicsCycle, ChemistryCycle, Sem1, Sem2]); // Add all dependencies

// const BackHome = () =>{


//     setNotesLink(false)
//     setBackToHome(true)
//     setCSECluster(false)
// }

// const BackToNotes = () =>{

//   setNotesLink(true)
//   setCSECluster(false)
//   setMECluster(false)
//   setECECluster(false)
// }



const [inputValue, setInputValue] = useState(" "); // Initialize with one space

  const handleInputChange = (e) => {
    const value = e.target.value;

    // Ensure at least one space remains in the input
    if (value === "") {
      setInputValue(" "); // Reset to a single space if input is cleared
    } else {
      setInputValue(value); // Otherwise, update normally
    }
  };

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
        to = '/notes'
        className='h-12 cursor-pointer relative w-full max-w-xs bg-[#20C030] rounded-full flex   mx-1 my-4'
    >
        <div className="text-white text-xl font-medium mx-12 my-2 ">BackToNotes</div>
        <div className="bg-[#20C030] w-12 h-12 rounded-3xl absolute right-0  flex items-center justify-center">
            <i className="bi bi-caret-left-fill text-white text-lg mx-2"></i>
        </div>
    </Link>
</div>

<div className='flex flex-col'>
    <div className='text-white text-3xl mt-6 flex justify-center'>
      <span className='text-center'>EC Cluster</span>
    </div>
    

    {/* Flex container for all option buttons in a single line */}
    <div className='flex justify-center gap-2 flex-col mx-auto'>

      <h1 className='text-white text-2xl font-instrument mx-auto mt-4'>Select Cycle</h1>
      <div className='flex flex-row gap-4' >
        <div
            onClick={SelectPhysicsCycle}
            className={`h-10 w-full max-w-xs mt-[20px] cursor-pointer hover:shadow-custom rounded-full  ${PhysicsCycle ? 'bg-[#20C030]' : 'bg-white' }`}
        >
            <div className={`text-xl w-full font-medium mx-2 my-1 ${PhysicsCycle ? 'text-white':'text-black'}`}>P-Cycle</div>
        </div>

        <div
            onClick={SelectChemistryCycle}
            className={`h-10 w-full max-w-xs mt-[20px] cursor-pointer hover:shadow-custom rounded-full ${ChemistryCycle ? 'bg-[#20C030]' : 'bg-white' }`}
        >
            <div className={`text-xl w-full font-medium mx-2 my-1 ${ChemistryCycle ? 'text-white':'text-black'}`}>C-Cycle</div>
        </div>
      </div>

      <h1 className='text-white text-2xl font-instrument mx-auto mt-4'>Select Semester</h1>
      <div className='flex flex-row gap-4' >
        <div
            onClick={() => SelectSem(1)}
            className={`h-10 w-full max-w-xs mt-[20px] cursor-pointer hover:shadow-custom rounded-full ${Sem1 ? 'bg-[#20C030]' : 'bg-white' }`}
        >
            <div className={`text-xl font-medium mx-4 my-1 ${Sem1 ? 'text-white':'text-black'}`}>Sem1</div>
        </div>

        <div
            onClick={() => SelectSem(2)}
            className={`h-10 w-full max-w-xs mt-[20px] cursor-pointer hover:shadow-custom rounded-full  ${Sem2 ? 'bg-[#20C030]' : 'bg-white' }`}
        >
            <div className={`text-xl font-medium mx-4 my-1 ${Sem2 ? 'text-white':'text-black'}`}>Sem2</div>
        </div>
      </div>
    </div>

    <div className="flex justify-center mt-10">
        <input
            autoFocus
            ref={SearchedSubject}
            onKeyUp={getSearchedSubject}
            className="h-12  w-80 max-w-md border placeholder:text-black border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#20C030] focus:border-transparent"
            placeholder="Search Your Subject" value={inputValue} defaultValue="  "
            onChange={handleInputChange}
        />
    </div>

    <div className='flex justify-center gap-8 mt-10'>
    <div
        onClick={ShowSelectedCycleRelatedPdf}
        className='h-10 rounded-2xl hover:shadow-custom cursor-pointer  w-64 max-w-md sm:max-w-xs bg-[#20C030] flex items-center justify-center'
    >
        <div className='text-white font-medium text-lg sm:text-xl'>Show Subjects</div>
    </div>
</div>



{ECERelatedPdf.length ? 
  <div className="flex flex-col gap-4 border-2 bg-amber-100 rounded-md shadow-lg p-4 justify-between w-full  md:w-3/5 lg:w-3/4  max-w-3xl mx-auto mt-5">
    <div className="flex flex-row justify-between text-black font-semibold">
      <div className="flex-1 text-center">Contents</div>

    </div>
  </div>

  :null
}

{ECERelatedPdf.map((pdf) => (
  <div key={pdf.SubjectNumber} className="transition-all duration-500 ease-in-out opacity-100 translate-y-0 animate-fade-in-slide-up mt-8">
    <div className="flex flex-col gap-2 bg-slate-900 border-2 rounded-lg shadow-lg p-4 mx-auto w-full max-w-3xl">
    <div className="flex flex-row justify-between items-center w-full">
  <div className="text-white text-center flex-1" style={{ maxWidth: '350px' }}>
    {pdf.SubjectName}
  </div>
  
  {/* Container for Expand and Reduce Icons */}
  <div className="flex flex-col items-center flex-none">
    {/* Down Arrow (Expand) */}
    <i
      onClick={() => ShowPdfDetails(pdf)}
      className="bi bi-arrow-down-circle-fill text-3xl text-white cursor-pointer"
    ></i>
    <span className="text-white text-sm mt-1">Expand</span> {/* Added Expand label */}
  </div>

  <div className="flex flex-col items-center flex-none">
    {/* Up Arrow (Reduce) */}
    <i
      onClick={() => DontShowPdfDetails(pdf)}
      className="bi bi-arrow-up-circle-fill text-3xl text-white cursor-pointer"
    ></i>
    <span className="text-white text-sm mt-1">Reduce</span> {/* Added Reduce label */}
  </div>
</div>

{SelectedSubjectNumber.includes(pdf.SubjectNumber) && (
  <div className="flex flex-col gap-5 mt-2">
    {/* Header Row */}
    <div className="grid grid-cols-4 gap-2 bg-red-900 border-2 rounded-xl shadow-lg p-2 justify-between w-full">
      <div className="text-white text-center md:text-left">Module No.</div>
      <div className="text-white text-center md:text-left">Module Name</div>
      <div className="text-white text-center md:text-left">PDF Link</div>
      <div className="text-white text-center md:text-left">YouTube Link</div>
    </div>

    {/* Module Rows */}
    <div className="flex flex-col gap-2">
      {pdf.Modules.map((module) => (
        <div key={module.ModuleNum} className="grid grid-cols-4 gap-2 bg-amber-400 border-2 rounded-2xl shadow-lg p-2 w-full mx-auto">
          <div className="text-black text-center ml-4 md:text-left">{module.ModuleNum}</div>
          <div className="text-black text-center md:text-left">{module.ModuleName}</div>
          <div className="text-center md:text-left">
            {module.PdfLink.map((pdfLink, index) => (
              <a key={index} href={pdfLink} target="_blank" rel="noopener noreferrer" className="text-black cursor-pointer">
                <i className="bi bi-file-earmark-pdf-fill text-white" style={{ fontSize: '25px' }}></i>
              </a>
            ))}
          </div>
          <div className="text-center md:text-left">
            <a href={module.YoutubeLink} target="_blank" rel="noopener noreferrer" className="text-black cursor-pointer">
              <i className="bi bi-youtube text-red-800" style={{ fontSize: '25px' }}></i>
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
)}


    </div>
  </div>
))}


</div>

     
    </div>
  )
}

export default ElectricalCluster