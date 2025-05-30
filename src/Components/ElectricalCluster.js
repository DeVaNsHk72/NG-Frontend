
import debounce from 'lodash.debounce';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import Logo from '../logo.svg';

function ElectricalCluster() {
  const [PhysicsCycle,setPhysicsCycle] = useState(false)
  const [ChemistryCycle,setChemistryCycle] = useState(false)
  const [ECERelatedPdf,setECERelatedPdf] = useState([])
  const [Sem1,setSem1] = useState(0)
  const [Sem2,setSem2] = useState(0)

  const[ShowSubjectsClicked,setShowSubjectsClicked] = useState(false)


  const SelectPhysicsCycle=()=>{


    setShowSubjectsClicked(false)

    SearchedSubject.current.value = ""

    setPhysicsCycle(true)
    setChemistryCycle(false)

    setECERelatedPdf([])
    
  }

  
  const SelectChemistryCycle=()=>{


    setShowSubjectsClicked(false)

    SearchedSubject.current.value = ""

    setPhysicsCycle(false)
    setChemistryCycle(true)
    
    setECERelatedPdf([])
  }


  const ShowSelectedCycleRelatedPdf = ()=>{


    setShowSubjectsClicked(false)

    SearchedSubject.current.value = ""

    setECERelatedPdf([])

    var Sem="";
    if(Sem1)
        Sem = "1EC"
    else
    if(Sem2)
        Sem = "2EC"

    if((Sem1 || Sem2) && PhysicsCycle){

        setShowSubjectsClicked(true)
        
        setSelectedSubjectNumber([])


        var myData = {Category:"EC",Sem:Sem}
        axios.post("https://ng-backend-1-f4r9.onrender.com/api/PhysicsCycle/GetAllModules",myData)
        .then(response=>{

          
          const filteredData = _.filter(response.data, (item) => item.SubjectCode !== "22EC1ESIEL/22EC2ESIEL");

          setECERelatedPdf(filteredData)

          if(response.data.length){
            
            setSelectedSubjectNumber(response.data)
            window.scrollTo({
              top: 300,
              left: 0,
              behavior: 'smooth'
            });
          }

          
          setTimeout(()=>{

            if(response.data.length === 0){
              
              setECERelatedPdf([])
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
      setSelectedSubjectNumber([])


        var myData = {Category:"CS",Sem:Sem}
        axios.post("https://ng-backend-1-f4r9.onrender.com/api/ChemistryCycle/GetAllModules",myData)
        .then(response=>{

          const filteredData = _.filter(response.data, (item) => item.SubjectCode !== "22EC1ESIEL/22EC2ESIEL");

          setECERelatedPdf(filteredData)
          if(response.data.length){
            
            setSelectedSubjectNumber(response.data)
            window.scrollTo({
              top: 300,
              left: 0,
              behavior: 'smooth'
            });
          }


          
          setTimeout(()=>{

            if(response.data.length === 0){
              
              setECERelatedPdf([])
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
    else{
      alert("Select the Semester and Cycle")
      SearchedSubject.current.value = ""
    }


  }



  
  const [SelectedSubjectNumber,setSelectedSubjectNumber] = useState([])

  const [ErrVal,setErrVal] = useState(false)


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

    setECERelatedPdf([])
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
          setECERelatedPdf([])

      if (input.length) {
      
        if (input.trim() === '') {

          setTimeout(()=>{

              setECERelatedPdf([])
              SearchedSubject.current.value = ""

          },1000)

          setErrVal(true)
            setTimeout(()=>{


            setErrVal(false)

            },1000)

        }

        else {

          var searchTerm
  
          setECERelatedPdf([])

          searchTerm = { SubjectName:input };
          
          axios.post("https://ng-backend-1-f4r9.onrender.com/api/GetPhysicsCycleSubjects", searchTerm)
          .then(response1 => {
            const physicsCycleData = response1.data;

            // Second API call for Chemistry Cycle
            setTimeout(() => {
              axios.post("https://ng-backend-1-f4r9.onrender.com/api/GetChemistryCycleSubjects", searchTerm)
                .then(response2 => {
                  const chemistryCycleData = response2.data;
    
                  // Combine both API results
                  const combinedData = [...physicsCycleData, ...chemistryCycleData];
    
                  // Remove duplicates based on SubjectNumber
                  const uniqueData = _.uniqBy(combinedData, (item) => `${item.SubjectName}-${item.code}`);

                
                  const filteredData = _.filter(uniqueData, (item) => item.ClusterCategory !== 'CS' &&  item.ClusterCategory !== 'ME');
    
                
                  if(filteredData.length){
                    window.scrollTo({
                      top: 300,
                      left: 0,
                      behavior: 'smooth'
                    });
                    setFadeIn(true)
                    setECERelatedPdf(filteredData);
                    setSelectedSubjectNumber([])
                    setSelectedSubjectNumber(filteredData)
                  }

                  setTimeout(()=>{

                    if(uniqueData.length === 0){
                      
                      setECERelatedPdf([])
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
})

  
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

};


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
    <Link><img
        src={Logo}
        alt="Logo"
        to = '/'
        className='h-10 mx-4 my-4 cursor-pointer'
    /></Link>

<Link
  to='/notes'
  className='h-12 hover:ring-2 hover:ring-blue-500  cursor-pointer relative min-w-xs max-w-xs bg-[#20C030] rounded-full flex items-center justify-between px-4 mx-1 my-4'
>
  <div className="text-white text-base mx-4 sm:text-lg md:text-xl font-medium">
    Back to Cluster
  </div>
  <div className="bg-[#20C030] w-10 h-10 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center ">
    <i className="bi bi-caret-left-fill text-white text-sm sm:text-base md:text-lg"></i>
  </div>
</Link>
</div>

<div className='flex flex-col transition-all     duration-700 ease-in-out animate-fade-in-slide-up '>
    <div className='text-white text-3xl mt-6 flex justify-center'>
      <span className='text-center'>EE Cluster</span>
    </div>
    

    {/* Flex container for all option buttons in a single line */}
    <div className='flex transition-all     duration-700 ease-in-out animate-fade-in-slide-up  justify-center gap-2 flex-col mx-auto'>

      <h1 className='text-[#20C030] text-2xl font-instrument mx-auto mt-4'>Select Cycle</h1>
      <div className='flex flex-row gap-4' >
        <div
            onClick={SelectPhysicsCycle}
            className={`h-10 w-full max-w-xs mt-[20px] cursor-pointer hover:ring-4 hover:ring-teal-400 hover:shadow-custom rounded-full  ${PhysicsCycle ? 'bg-[#20C030]' : 'bg-custom-dark' }`}
        >
            <div className={`text-xl w-full font-medium mx-2 my-1 text-white`}>P-Cycle</div>
        </div>

        <div
            onClick={SelectChemistryCycle}
            className={`h-10 w-full max-w-xs mt-[20px] hover:ring-4 hover:ring-teal-400 cursor-pointer hover:shadow-custom rounded-full ${ChemistryCycle ? 'bg-[#20C030]' : 'bg-custom-dark' }`}
        >
            <div className={`text-xl w-full font-medium mx-2 my-1 text-white`}>C-Cycle</div>
        </div>
      </div>

      <h1 className='text-[#20C030] text-2xl font-instrument mx-auto mt-4'>Select Semester</h1>
      <div className='flex flex-row gap-4' >
        <div
            onClick={() => SelectSem(1)}
            className={`h-10 w-full max-w-xs mt-[20px] hover:ring-4 hover:ring-teal-400 cursor-pointer hover:shadow-custom rounded-full ${Sem1 ? 'bg-[#20C030]' : 'bg-custom-dark' }`}
        >
            <div className={`text-xl font-medium mx-4 my-1 text-white`}>Sem1</div>
        </div>

        <div
            onClick={() => SelectSem(2)}
            className={`h-10 w-full max-w-xs mt-[20px] hover:ring-4 hover:ring-teal-400 cursor-pointer hover:shadow-custom rounded-full  ${Sem2 ? 'bg-[#20C030]' : 'bg-custom-dark' }`}
        >
            <div className={`text-xl font-medium  mx-4 my-1 text-white`}>Sem2</div>
        </div>
      </div>
    </div>



    <div className="flex flex-col items-center transition-all     duration-700 ease-in-out animate-fade-in-slide-up   justify-center mt-10 ">

  
{!isFirstRender.current &&  SearchedSubject.current.value.length !== 0 && ECERelatedPdf.length === 0
  
  ||(ShowSubjectsClicked && (( PhysicsCycle && (Sem1 || Sem2)) || (ChemistryCycle && (Sem1 || Sem2))) && ECERelatedPdf.length === 0) ?
      

      <div className='flex flex-row gap-2 mb-5 transition-all     duration-700 ease-in-out animate-fade-in-slide-up'>
          <div className='text-lg text-white font-medium ' >Loading</div>
          <div className="flex items-center justify-center   space-x-2">
        
            <PulseLoader color="#36d7b7" size={10} margin={2} />
          </div>
      </div>
   :null
  
    }
 <div className='flex flex-col transition-all duration-700 ease-in-out animate-fade-in-slide-up self-center gap-2 mt-0.5'>  {/* Reduced margin-top from 1 to 0.5 */}
  <div
    onClick={ShowSelectedCycleRelatedPdf}
    className='h-10 hover:ring-4 hover:ring-blue-500 ml-[30px] rounded-2xl hover:shadow-custom cursor-pointer w-64 max-w-md sm:max-w-xs bg-[#20C030] flex items-center justify-center'
  >
    <div className='text-white font-medium text-lg sm:text-xl'>Show Subjects</div>
  </div>

  <div className={`flex text-white justify-center items-center duration-1000 transition-all border-red-600 ease-in-out border-2 rounded-full mt-1 h-[40px] w-80 shadow-custom self-center font-medium ${ErrVal ? 'opacity-100':'opacity-0'}`}> {/* Reduced margin-top from 3 to 1 */}
    Search Results: Subject Not Found
  </div>

  <div>
    <input
      ref={SearchedSubject}
      onKeyUp={getSearchedSubject}
      className="h-[40px] w-80 max-w-[500px] self-center placeholder:text-black border-2 border-black rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#20C030] focus:border-transparent"
      placeholder="Search Your Subject"
    />
  </div>
</div>

  
  

    
    </div>



{ECERelatedPdf.length?

<div className={`mt-8  transition-all     duration-700 ease-in-out animate-fade-in-slide-up   ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5' } `}>

<div className="flex flex-col gap-4 border-2 bg-[#20C030] border-custom-dark rounded-md shadow-lg p-4 justify-between w-full  md:w-3/5 lg:w-3/4  max-w-3xl mx-auto">
  <div className="flex flex-row justify-between  font-semibold">
    <div className="flex-1 text-white text-center">Contents</div>

  </div>
</div>


<div className="flex flex-row gap-2 bg-custom-dark border-2 mt-2 border-custom-dark rounded-lg shadow-lg p-4 mx-auto w-full max-w-3xl">
    <div className="flex flex-row justify-between items-center w-full">
  <div className="text-white text-center flex-1" style={{ maxWidth: '350px' }}>
    Subject Name
  </div>
  
  <div  className="flex flex-col items-center flex-none">
    
    <span className="text-white text-sm mt-1">Expand/Reduce</span> {/* Added Expand label */}
  </div>

</div>
</div>

{ECERelatedPdf.map((pdf) => (
  
  <div>
    {pdf.Modules.length ? 
  <div key={pdf.SubjectNumber} className={` transition-all  duration-700 ease-in-out transform bg-black  ` } >
    <div className="flex flex-col gap-2 bg-black border-2 border-custom-dark rounded-lg shadow-lg p-4 mx-auto w-full max-w-3xl">
    <div onClick={() => handleToggle(pdf.SubjectNumber)} className="flex cursor-pointer flex-row justify-between items-center w-full bg-black">
  {/* SubjectName container */}
  <div className="text-white text-center flex-1 break-words overflow-hidden whitespace-normal max-w-[250px] md:max-w-[350px]" style={{ minHeight: '3.5rem' }}>
    {pdf.SubjectName}
  </div>

  {/* Container for Expand and Reduce Icons */}
  <div className="flex flex-col items-center flex-none">
    <i
      className={`text-3xl text-white cursor-pointer ${
        SelectedSubjectNumber.some(sub => sub.SubjectNumber === pdf.SubjectNumber && sub.State === 1)
          ? 'bi bi-arrow-up-circle-fill'
          : 'bi-arrow-down-circle-fill'
      }`}
    ></i>
  </div>
</div>

{SelectedSubjectNumber.some(sub => sub.SubjectNumber === pdf.SubjectNumber) ?
  <div className={`flex flex-col gap-5 mt-2  overflow-auto  transition-all duration-700 ease-in-out bg-black 
    ${SelectedSubjectNumber.some(sub => sub.SubjectNumber === pdf.SubjectNumber && sub.State === 1)  ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'} `}>
    {/* Header Row */}

       
<div className="flex items-center justify-between border-2 border-custom-dark  rounded-xl p-2 md:p-4 w-full">
  <div className="text-white text-center md:text-left">Syllabus</div>
  {pdf.Syllabus !== "" ? (
        <a href={pdf.Syllabus} target="_blank" rel="noopener noreferrer" className="text-black cursor-pointer">
          <i className="bi bi-file-earmark-pdf-fill text-white" style={{ fontSize: '35px' }}></i>
        </a>
      ) : null}
</div>


    <div className={`grid grid-cols-4 gap-2 bg-custom-dark border-2 border-custom-dark  rounded-xl shadow-lg p-2 justify-between w-full transition-opacity duration-700 ease-in-out `}>
      <div className="text-white text-center md:text-left">Module No.</div>
      <div className="text-white text-center md:text-left">Module Name</div>
      <div className="text-white text-center md:text-left">PDF Link</div>
      <div className="text-white text-center md:text-left">YouTube Link</div>
    </div>

    {/* Module Rows */}
    <div className={`flex flex-col gap-5   transition-all  duration-700 ease-in-out transform ${ SelectedSubjectNumber.some(sub => sub.SubjectNumber === pdf.SubjectNumber && sub.State === 1)  ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
      {pdf.Modules.map((module) => (
        <div key={module.ModuleNum} className="grid grid-cols-4 gap-2 bg-black border-2 border-custom-dark rounded-2xl shadow-lg p-2 w-full mx-auto">
          <div className="text-white text-center ml-4 md:text-left">{module.ModuleNum}</div>
          <div className="text-white text-center md:text-left">{module.ModuleName}</div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-2 text-center md:text-left ml-[12px]">
  {module.PdfLink.map((pdfLink, index) => (
    <div key={index}>
      {pdfLink !== "" ? (
        <a href={pdfLink} target="_blank" rel="noopener noreferrer" className="text-black cursor-pointer">
          <i className="bi bi-file-earmark-pdf-fill text-white" style={{ fontSize: '35px' }}></i>
        </a>
      ) : null}
    </div>
  ))}
</div>

          <div className="text-center flex flex-row ml-[20px] flex-wrap gap-1 md:text-left">
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
  </div>:null}
  </div>
))}
</div>:null}

</div>
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
  )
}

export default ElectricalCluster
