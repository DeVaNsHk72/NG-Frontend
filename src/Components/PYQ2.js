

import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import _, { set } from 'lodash';

import debounce from 'lodash.debounce';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import Logo from '../logo.svg';


function PYQ2ndYear() {

  const [CSE,setCSE] = useState(false)
  const [ECE,setECE] = useState(false)
  const [ISE,setISE] = useState(false)
  const [ETE,setETE] = useState(false)

  const [CSRelatedPdf,setCSRelatedPdf] = useState([])
  const [Sem3,setSem3] = useState(0)
  const [Sem4,setSem4] = useState(0)


  const[ShowSubjectsClicked,setShowSubjectsClicked] = useState(false)

 





  
  const SelectSem=(val)=>{

    setCSRelatedPdf([])

    setShowSubjectsClicked(false)


    if(val === 3){
        setSem3(1)
        setSem4(0)
    }
    else
    if(val === 4){
        setSem3(0)
        setSem4(1)
    }


  }


  const ShowSelectedCycleRelatedPdf = ()=>{


    setShowSubjectsClicked(false)


    setCSRelatedPdf([])

    

    if(Sem3){

        var Branch = ""
        if(CSE)
            Branch = "CSE"
        else
        if(ECE)
            Branch = "ECE"
        else
        if(ISE)
            Branch = "ISE"
        else
        if(ETE)
            Branch = "ETE"

            

      setShowSubjectsClicked(true)


      const myData = {Branch:Branch,Sem:3}

        axios.post("https://ng-backend-hqmv.onrender.com/api/getBranchRelatedPYQ",myData)
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
    if(Sem4){

        var Branch = ""
        if(CSE)
            Branch = "CSE"
        else
        if(ECE)
            Branch = "ECE"
        else
        if(ISE)
            Branch = "ISE"
        else
        if(ETE)
            Branch = "ETE"

            

      setShowSubjectsClicked(true)


      const myData = {Branch:Branch,Sem:4}

        axios.post("https://ng-backend-hqmv.onrender.com/api/getBranchRelatedPYQ",myData)
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
    else{
      alert("Select the Semester and Branch")
      SearchedSubject.current.value = ""
    }



  }



  const[ErrVal,setErrVal] = useState(false)

  var SearchedSubject = useRef("")
  const handleInputChange = useCallback(

    debounce(() => {

     

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

        else if((Sem3 || Sem4) && (CSE || ECE || ISE || ETE)){

          var searchTerm
          var Branch = ""
          var Sem
          setCSRelatedPdf([])

          if(Sem3)
            Sem = 3
          else
          if(Sem4)
            Sem = 4

          if(CSE)
            Branch = "CSE"
          else
          if(ECE)
            Branch = "ECE"
          else
          if(ISE)
            Branch = "ISE"
          else
          if(ETE)
            Branch = "ETE"

          searchTerm = { Branch:Branch,Sem:Sem };

          

            // Second API call for Chemistry Cycle
            setTimeout(() => {
              axios.post("https://ng-backend-hqmv.onrender.com/api/getBranchRelatedPYQ", searchTerm)
                .then(response2 => {

                  // Combine both API results

                  // Remove duplicates based on SubjectNumber
                  const uniqueData = response2.data

                  if(uniqueData.length){
                    window.scrollTo({
                      top: 300,
                      left: 0,
                      behavior: 'smooth'
                    });
                    setCSRelatedPdf(uniqueData);
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
              

        }
        else{
          alert("Select the Semester and Branch")
          SearchedSubject.current.value = ""
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


  const SelectBranch=(val)=>{

    setShowSubjectsClicked(false)
    setCSRelatedPdf([])
    if(val === 1){
        setCSE(1)
        setISE(0)
        setECE(0)
        setETE(0)
    }
    else
    if(val === 2){
        setCSE(0)
        setISE(1)
        setECE(0)
        setETE(0)
    }
    else
    if(val === 3){
        setCSE(0)
        setISE(0)
        setECE(1)
        setETE(0)
    }
    else
    if(val === 4){
        setCSE(0)
        setISE(0)
        setECE(0)
        setETE(1)
    }

  }


  return (
    <div className='bg-black min-h-screen gap-[20px] flex flex-col  '>
<div className='flex flex-col transition-all   duration-100 ease-in-out  animate-fade-in-slide-up lg:flex-row gap-8 mx-auto max-w-screen-lg'>
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
    Back to Cluster
  </div>
  <div className="bg-[#20C030] w-10 h-10 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center ">
    <i className="bi bi-caret-left-fill text-white text-sm sm:text-base md:text-lg"></i>
  </div>
</Link>

</div>

<div className='flex flex-col transition-all   duration-100 ease-in-out  animate-fade-in-slide-up'>
    <div className='text-white text-3xl mt-6 flex justify-center'>
      <span className='text-center'>2nd Year Previous Year Questions</span>
    </div>

    {/* Flex container for all option buttons in a single line */}
    <div className='flex justify-center gap-2 flex-col mx-auto'>
      
    <h1 className={` text-2xl  mx-auto mt-4 text-[#20C030] font-instrument  `}>Select Branch</h1>
    <div className='flex flex-wrap gap-4 mt-3 justify-center'>
    <div
        onClick={() => SelectBranch(1)}
        className={`h-[35px] w-20 sm:w-[100px] md:w-[130px] flex justify-center items-center hover:ring-4 hover:ring-teal-400 cursor-pointer hover:shadow-custom rounded-full ${CSE ? 'bg-[#20C030]' : 'bg-custom-dark'}`}
    >
        <div className={`text-xl sm:text-2xl md:text-3xl font-medium text-white`}>CSE</div>
    </div>

    <div
        onClick={() => SelectBranch(2)}
        className={`h-[35px] w-20 sm:w-[100px] md:w-[130px] flex justify-center items-center hover:ring-4 hover:ring-teal-400 cursor-pointer hover:shadow-custom rounded-full ${ISE ? 'bg-[#20C030]' : 'bg-custom-dark'}`}
    >
        <div className={`text-xl sm:text-2xl md:text-3xl font-medium text-white`}>ISE</div>
    </div>

    <div
        onClick={() => SelectBranch(3)}
        className={`h-[35px] w-20 sm:w-[100px] md:w-[130px] flex justify-center items-center hover:ring-4 hover:ring-teal-400 cursor-pointer hover:shadow-custom rounded-full ${ECE ? 'bg-[#20C030]' : 'bg-custom-dark'}`}
    >
        <div className={`text-xl sm:text-2xl md:text-3xl font-medium text-white`}>ECE</div>
    </div>

    <div
        onClick={() => SelectBranch(4)}
        className={`h-[35px] w-20 sm:w-[100px] md:w-[130px] flex justify-center items-center hover:ring-4 hover:ring-teal-400 cursor-pointer hover:shadow-custom rounded-full ${ETE ? 'bg-[#20C030]' : 'bg-custom-dark'}`}
    >
        <div className={`text-xl sm:text-2xl md:text-3xl font-medium text-white`}>ETE</div>
    </div>
</div>

<h1 className='text-2xl mx-auto mt-4 text-[#20C030] font-instrument'>Select Semester</h1>

<div className='flex flex-wrap gap-4 justify-center'>
    <div
        onClick={() => SelectSem(3)}
        className={`h-[35px] w-28 sm:w-[110px] md:w-[160px] flex justify-center items-center hover:ring-4 hover:ring-teal-400 mt-[20px] cursor-pointer hover:shadow-custom rounded-full ${Sem3 ? 'bg-[#20C030]' : 'bg-custom-dark'}`}
    >
        <div className={`text-xl sm:text-2xl md:text-3xl font-medium text-white`}>Sem3</div>
    </div>

    <div
        onClick={() => SelectSem(4)}
        className={`h-[35px] w-28 sm:w-[110px] md:w-[160px] flex justify-center items-center hover:ring-4 hover:ring-teal-400 mt-[20px] cursor-pointer hover:shadow-custom rounded-full ${Sem4 ? 'bg-[#20C030]' : 'bg-custom-dark'}`}
    >
        <div className={`text-xl sm:text-2xl md:text-3xl font-medium text-white`}>Sem4</div>
    </div>
</div>

    </div>

   
    <div className="flex flex-col items-center transition-all     duration-700 ease-in-out animate-fade-in-slide-up   justify-center mt-10 ">

  
{!isFirstRender.current &&   CSRelatedPdf.length === 0
  
&& ShowSubjectsClicked && (( CSE && (Sem3 || Sem4)) || (ISE && (Sem3 || Sem4)) || (ECE && (Sem3 || Sem4)) || (ETE && (Sem3 || Sem4))) && CSRelatedPdf.length === 0 ?
      

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

</div>

  
  

    
    </div>


  


{CSRelatedPdf.length ?
<div className={`mt-5`}>
  <div className="flex flex-col gap-4 border-2 bg-[#20C030] rounded-md border-custom-dark shadow-lg p-4 justify-between w-full sm:w-11/12 max-w-3xl mx-auto">
    <div className="flex flex-row justify-between font-semibold">
      <div className="flex-1 text-white text-center text-base sm:text-lg md:text-xl">Contents</div>
    </div>
  </div>





{/* Header for Subject Name, CIE PdfLink, and SEE PdfLink */}
<div className="flex flex-col gap-2 bg-custom-dark border-2 border-custom-dark rounded-lg shadow-lg p-4 mx-auto w-full max-w-3xl">
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
    <div className="flex flex-col   border-2 rounded-lg border-custom-dark shadow-lg p-4 mx-auto w-full max-w-3xl">
      <div className="grid grid-cols-3 space-x-20 w-full mx-auto justify-between items-center">
        {/* Subject Name */}
        <div className="text-white text-center flex-1" style={{ maxWidth: '350px' }}>
          {pdf.SubjectName}
        </div>

        {/* CIE PdfLink */}

        
        <div className='flex justify-center items-center space-x-3 flex-row gap-2' >

          {pdf.CIE1 !== "" ?
          <div className="text-center">
            <a href={pdf.CIE1} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
              <i className="bi bi-file-earmark-pdf-fill text-white" style={{ fontSize: '40px' }}></i>
            </a>
          </div>:<div className='text-center text-white ' style={{ fontSize: '10px' }} >Coming Soon..</div>
          }

        {pdf.CIE2 !== "" ?
          <div className="text-center">
            <a href={pdf.CIE2} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
              <i className="bi bi-file-earmark-pdf-fill text-white" style={{ fontSize: '40px' }}></i>
            </a>
          </div>:<div className='text-center text-white' style={{ fontSize: '10px' }} >Coming Soon..</div>
        }

          {pdf.CIE3 !== "" ?
          <div className="text-center">
            <a href={pdf.CIE3} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
              <i className="bi bi-file-earmark-pdf-fill text-white" style={{ fontSize: '40px' }}></i>
            </a>
          </div>:<div className='text-center text-white' style={{ fontSize: '10px' }} >Coming Soon..</div>
          }
        </div>

        {/* SEE PdfLink */}

        {pdf.PYQLink !== "" ?
        <div className="text-center">
          <a href={pdf.PYQLink} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
            <i className="bi bi-file-earmark-pdf-fill text-white" style={{ fontSize: '40px' }}></i>
          </a>
        </div>:<div className='text-center text-white ' style={{ fontSize: '10px' }} >Coming Soon..</div>
        }
      </div>
    </div>
  </div>
  

))}


</div>
:null}



</div>


<div className='mb-[200px]'>

</div>

<div className='bg-black min-w-full h-auto lg:h-[580px] flex flex-col lg:flex-row gap-10 lg:gap-[150px] px-4 py-10'>
        <div className='flex flex-col gap-[30px] w-full lg:w-[300px]'>
          <img src={Logo} alt="Logo" className='h-[30px] lg:h-[40px] mt-[20px] lg:mt-[50px]' />
          <div className='text-sm md:text-md font-instrument ml-[0px] lg:ml-[50px] text-white text-justify'>
            NoteGo brings together professor-curated student notes with relevant 
            YouTube tutorials for fast and efficient learning.
          </div>
        </div>

        <div className='flex flex-col gap-[30px] w-full lg:w-[300px]'>
          <h1 className='text-[#20C030] text-xl md:text-2xl mt-[20px] lg:mt-[60px]'>Quick Links</h1>
          <div className='flex flex-col gap-[20px]'>
            <Link to = '/about' className='text-white text-base md:text-lg cursor-pointer'>About</Link>
            {/* <h1 className='text-white text-base md:text-lg cursor-pointer'>Contact</h1> */}
            <Link to='/Contact' className='text-white text-base md:text-lg cursor-pointer'>Contact</Link>
            <Link to = '/PrivacyPolicy' className='text-white text-base md:text-lg cursor-pointer'>Privacy Policy</Link>
            <Link to = '/Tnc' className='text-white text-base md:text-lg cursor-pointer'>Terms And Conditions</Link>
            <Link to = '/notes' className='text-white text-base md:text-lg cursor-pointer'>Notes</Link>
            <Link to = '/pyq' className='text-white text-base md:text-lg cursor-pointer'>PYQ</Link>
            <Link to = '/pyq2' className='text-white text-base md:text-lg cursor-pointer'>2ndYearPYQ</Link>
            <Link to = '/lab' className='text-white text-base md:text-lg cursor-pointer'>Lab</Link>

          </div>
        </div>

        <div className='flex flex-col gap-[30px] w-full lg:w-[200px]'>
          <h1 className='text-[#20C030] text-xl md:text-2xl mt-[20px] lg:mt-[60px]'>Navigate To</h1>
          <div className='flex flex-col gap-[20px]'>
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

export default PYQ2ndYear
