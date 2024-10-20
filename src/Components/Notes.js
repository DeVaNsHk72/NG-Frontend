import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import _ from 'lodash';
import debounce from 'lodash.debounce';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import Logo from '../logo.svg';

function Notes() {
    var SearchedSubject = useRef("");

    const [SearchedRelatedPdf, setSearchedRelatedPdf] = useState([]);
    const [fadeIn, setFadeIn] = useState(false);
    const [ErrVal, setErrVal] = useState(false);
    const [SelectedSubjectNumber, setSelectedSubjectNumber] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isFirstRender = useRef(true);

    const handleInputChange = useCallback(
        debounce(() => {
            var input = SearchedSubject.current.value;

            if (input === "" || input.length === 0) {
                setSearchedRelatedPdf([]);
            }

            if (input.length) {
                if (input.trim() === '') {
                    setTimeout(() => {
                        setSearchedRelatedPdf([]);
                        SearchedSubject.current.value = "";
                    }, 1000);

                    setErrVal(true);
                    setTimeout(() => {
                        setErrVal(false);
                    }, 2500);
                } else {
                    setFadeIn(false);
                    var searchTerm = { SubjectName: input };
                    setSearchedRelatedPdf([]);

                    axios.post("https://ng-backend-kr21.onrender.com/api/GetPhysicsCycleSubjects", searchTerm)
                        .then(response1 => {
                            const physicsCycleData = response1.data;

                            setTimeout(() => {
                                axios.post("https://ng-backend-kr21.onrender.com/api/GetChemistryCycleSubjects", searchTerm)
                                    .then(response2 => {
                                        const chemistryCycleData = response2.data;
                                        const combinedData = [...physicsCycleData, ...chemistryCycleData];
                                        const uniqueData = _.uniqBy(combinedData, (item) => `${item.SubjectName}-${item.code}`);

                                        if (uniqueData.length) {
                                            window.scrollTo({ top: 300, behavior: 'smooth' });
                                            setFadeIn(true);
                                            setSearchedRelatedPdf(uniqueData);
                                            setSelectedSubjectNumber(uniqueData);
                                        }

                                        setTimeout(() => {
                                            if (uniqueData.length === 0) {
                                                setSearchedRelatedPdf([]);
                                                SearchedSubject.current.value = "";
                                            }
                                        }, 1000);

                                        if (uniqueData.length === 0) {
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                            setErrVal(true);
                                            setTimeout(() => {
                                                setErrVal(false);
                                            }, 2500);
                                        }
                                    })
                                    .catch(err => {
                                        console.error(err);
                                    });
                            }, 500);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            }
        }, 200),
        []
    );

    useEffect(() => {
        return () => {
            handleInputChange.cancel();
        };
    }, [handleInputChange]);

    const getSearchedSubject = () => {
        handleInputChange();
    };

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        setTimeout(() => {
            if (SearchedSubject.current.value.length === 0) {
                setSearchedRelatedPdf([]);
            }
        }, 100);
    }, [SearchedSubject]);

    useEffect(() => {
        isFirstRender.current = false;
    }, []);

    const handleToggle = (subjectNumber) => {
        setSelectedSubjectNumber((prev) => {
            const existingSubject = prev.find(sub => sub.SubjectNumber === subjectNumber);

            if (existingSubject) {
                return prev.map(sub =>
                    sub.SubjectNumber === subjectNumber
                        ? { ...sub, State: existingSubject.State === 0 ? 1 : 0 }
                        : sub
                );
            } else {
                return [...prev, { SubjectNumber: subjectNumber, State: 1 }];
            }
        });

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

            <div className="flex flex-col items-center justify-center mt-10 ">
                <input
                    ref={SearchedSubject}
                    onKeyUp={getSearchedSubject}
                    className="h-[40px] w-80 max-w-[500px] placeholder:text-black border-2 z-10 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus: ring-offset-0"
                    placeholder="Search Your Subject"
                />

                {!isFirstRender.current && SearchedSubject.current.value.length !== 0 && SearchedRelatedPdf.length === 0 ?
                    <div className='flex flex-row gap-2 transition-all     duration-700 ease-in-out animate-fade-in-slide-up'>
                        <div className='text-lg text-black font-medium mt-12'>Loading</div>
                        <div className="flex items-center justify-center mt-12 space-x-2">
                            <PulseLoader color="#36d7b7" size={10} margin={2} />
                        </div>
                    </div>
                    : ErrVal ?
                        <div className={`flex text-black justify-center items-center duration-1000 transition-all border-red-600 ease-in-out border-2 rounded-full mt-10 h-[40px] w-80 shadow-custom self-center font-medium ${ErrVal ? 'opacity-100' : 'opacity-0'}`}>
                            Search Results: Subject Not Found
                        </div> : null
                }
            </div>

            {SearchedRelatedPdf.length === 0 ?
                <div className="text-[#20C030] text-4xl mt-10 font-instrument w-full text-center transition-all     duration-700 ease-in-out animate-fade-in-slide-up ">
                    Select the Cluster
                </div>
                : null
            }

            {SearchedRelatedPdf.length === 0 ?
                <div className="text-[#20C030] text-3xl mt-10 font-instrument w-full text-center transition-all     duration-700 ease-in-out animate-fade-in-slide-up">
                    1st Year
                </div> : null}

                {SearchedRelatedPdf.length === 0 ?
                 <Link
                 to = '/pyq'
                 className="flex self-center mt-5 shadow-custom-gray hover:ring-4 hover:ring-teal-400 flex-col gap-2 cursor-pointer bg-black rounded-3xl h-[50px] w-80 sm:w-[250px] md:w-[300px]  "
                >
                 <h1 className="text-3xl sm:text-4xl text-center text-[#20C030] ">PYQ'S</h1>
               
               </Link>: null}

            {SearchedRelatedPdf.length === 0 ? (
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
         

            {SearchedRelatedPdf.length === 0 ?
                <div className="text-[#20C030] self-center text-3xl mt-14 font-instrument w-full text-center transition-all     duration-700 ease-in-out animate-fade-in-slide-up">
                    2nd Year
                </div> : null}

                {SearchedRelatedPdf.length === 0 ?
                 <div className="flex justify-center items-center">
                 <Link
                   to='/pyq2'
                   className="flex self-center mt-5 shadow-custom-gray hover:ring-4 hover:ring-teal-400 flex-col gap-2 cursor-pointer bg-black rounded-3xl h-[50px] w-80 sm:w-[250px] md:w-[300px] mx-auto"
                 >
                   <h1 className="text-3xl sm:text-4xl text-center text-[#20C030]">PYQ'S</h1>
                 </Link>
               </div>
               : null}
            
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
            ) : (

                <div className={`mt-8 transition-all duration-700 ease-in-out animate-fade-in-slide-up ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                    <div className="flex flex-col gap-4 border-2 bg-[#20C030]  rounded-md shadow-lg p-4 justify-between w-full md:w-3/5 lg:w-3/4 max-w-3xl mx-auto">
                        <div className="flex flex-row justify-between  text-black font-semibold">
                            <div className="flex-1 text-white text-center">Contents</div>
                        </div>
                    </div>

                    <div className="flex flex-row gap-2 bg-gray-900 border-2 mt-2 rounded-lg shadow-lg p-4 mx-auto w-full max-w-3xl">
                        <div className="flex flex-row justify-between items-center w-full">
                            <div className="text-white text-center flex-1" style={{ maxWidth: '350px' }}>
                                Subject Name
                            </div>

                            <div className="flex flex-col items-center flex-none">
                                <span className="text-white text-sm mt-1">Expand/Reduce</span>
                            </div>
                        </div>
                    </div>

                    {SearchedRelatedPdf.map((pdf) => (
                        <div key={pdf.SubjectNumber}>
                            {pdf.Modules.length ?
                                <div className={`transition-all duration-700 ease-in-out transform bg-white`}>
                                    <div className="flex flex-col gap-2 bg-black border-2 rounded-lg shadow-lg p-4 mx-auto w-full max-w-3xl">
                                        <div onClick={() => handleToggle(pdf.SubjectNumber)} className="flex cursor-pointer flex-row justify-between items-center w-full bg-black">
                                            <div className="text-white text-center flex-1 break-words overflow-hidden whitespace-normal max-w-[250px] md:max-w-[350px]" style={{ minHeight: '3.5rem' }}>
                                                {pdf.SubjectName}
                                            </div>

                                            <div className="flex flex-col items-center flex-none">
                                                <i className={`text-3xl text-white cursor-pointer ${SelectedSubjectNumber.some(sub => sub.SubjectNumber === pdf.SubjectNumber && sub.State === 1) ? 'bi bi-arrow-up-circle-fill' : 'bi-arrow-down-circle-fill'}`}></i>
                                            </div>
                                        </div>

                                        {SelectedSubjectNumber.some(sub => sub.SubjectNumber === pdf.SubjectNumber) ?
                                            <div className={`flex flex-col gap-5 mt-2 overflow-auto transition-all duration-700 ease-in-out bg-black ${SelectedSubjectNumber.some(sub => sub.SubjectNumber === pdf.SubjectNumber && sub.State === 1) ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                                {pdf.Modules.length ?
                                                    <div>
                                                        <div className={`gap-2 bg-[#545454] border-2 border-white rounded-xl shadow-lg p-2 justify-between w-full transition-opacity duration-700 ease-in-out grid grid-cols-4`}>
                                                            <div className="text-white text-center md:text-left">Module No.</div>
                                                            <div className="text-white text-center md:text-left">Module Name</div>
                                                            <div className="text-white text-center md:text-left">PDF Link</div>
                                                            <div className="text-white text-center md:text-left">YouTube Link</div>
                                                        </div>

                                                        <div className={`flex flex-col transition-all duration-700 ease-in-out transform ${SelectedSubjectNumber.some(sub => sub.SubjectNumber === pdf.SubjectNumber && sub.State === 1) ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                                            {pdf.Modules.map((module) => (
                                                                <div key={module.ModuleNum} className="grid grid-cols-4 gap-2 bg-black border-2 border-white rounded-2xl shadow-lg p-2 w-full mx-auto">
                                                                    <div className="text-white text-center ml-4 md:text-left">{module.ModuleNum}</div>
                                                                    <div className="text-white text-center md:text-left">{module.ModuleName}</div>

                                                                    <div className="grid grid-cols-2 gap-4 md:grid-cols-2 text-center md:text-left ml-[12px]">
                                                                            {module.PdfLink.map((pdfLink, index) => (
                                                                            <div key={index}>
                                                                                {module.PdfLink !== "" ?
                                                                                    <a href={pdfLink} target="_blank" rel="noopener noreferrer" className="text-black cursor-pointer">
                                                                                        <i className="bi bi-file-earmark-pdf-fill text-white" style={{ fontSize: '35px' }}></i>
                                                                                    </a> : null}
                                                                              </div>
                                                                        ))}
</div>

                                                                    <div className="text-center flex flex-row ml-[20px] flex-wrap gap-1 md:text-left">
                                                                        <div>
                                                                            {module.YoutubeLink !== "" ?
                                                                                <a href={module.YoutubeLink} target="_blank" rel="noopener noreferrer" className="text-black cursor-pointer">
                                                                                    <i className="bi bi-youtube text-[#FF3131]" style={{ fontSize: '35px' }}></i>
                                                                                </a> : null}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    : null}
                                            </div>
                                            : null}
                                    </div>
                                </div>
                                : null}
                        </div>
                    ))}
                </div>
            )}

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