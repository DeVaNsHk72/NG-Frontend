
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../logo-fim.svg';
// --- CONSTANTS ---
const API_BASE_URL = 'https://ng-backend-1-f4r9.onrender.com/api';

const API_ENDPOINTS = {
  BRANCH_SUBJECTS: `${API_BASE_URL}/SecondYear/SelectedBranchPdf`,
  SEARCH_BRANCH_SUBJECTS: `${API_BASE_URL}/GetSearchedBranchRelatedSubjects`,
};

const BRANCH_OPTIONS = [
  { id: 'CSE', label: 'CSE' },
  { id: 'ISE', label: 'ISE' },
  { id: 'ECE', label: 'ECE' },
  { id: 'ETE', label: 'ETE' },
];

const SEM_OPTIONS = [
  { id: 3, label: 'Sem 3' },
  { id: 4, label: 'Sem 4' },
  { id: 5, label: 'Sem 5' },
  { id: 6, label: 'Sem 6' },
  { id: 7, label: 'Sem 7' },
  { id: 8, label: 'Sem 8' },
];


// --- API SERVICES ---
const postRequest = async (url, body) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }
  return response.json();
};

const uniqueSubjects = (subjects) => {
    const seen = new Map();
    subjects.forEach(subject => {
        const key = `${subject.SubjectName}-${subject.SubjectCode}`;
        if (!seen.has(key)) {
            seen.set(key, subject);
        }
    });
    return Array.from(seen.values());
};

const fetchSubjectsByFilter = async (filters) => {
  const { branch, sem } = filters;
  if (!branch || !sem) return [];

  const body = {
    Branch: branch,
    Sem: sem,
  };

  const data = await postRequest(API_ENDPOINTS.BRANCH_SUBJECTS, body);
  return uniqueSubjects(data);
};

const searchSubjects = async (query, branch) => {
  if (!query || !branch) return [];
  const body = { SubjectName: query, Branch: branch };
  const data = await postRequest(API_ENDPOINTS.SEARCH_BRANCH_SUBJECTS, body);
  return uniqueSubjects(data);
};


// --- CUSTOM HOOK ---
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};


const LogoIcon = ({ className }) => (
  <img src={Logo} alt="NoteGo logo" className={className} />
);



const PdfIcon = ({ className }) => (
    <svg 
        className={className}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M20 2H8C6.9 2 6 2.9 6 4V16C6 17.1 6.9 18 8 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H8V4H20V16ZM4 6H2V20C2 21.1 2.9 22 4 22H18V20H4V6ZM14 14H18V12H12V14H14ZM16 10H12V8H18V10H16Z" />
    </svg>
);

const YoutubeIcon = ({ className }) => (
    <svg 
        className={className}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M21.582,6.186c-0.23-0.854-0.908-1.532-1.762-1.762C18.254,4,12,4,12,4S5.746,4,4.18,4.424 c-0.854,0.23-1.532,0.908-1.762,1.762C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.854,0.908,1.532,1.762,1.762 C5.746,20,12,20,12,20s6.254,0,7.819-0.424c0.854-0.23,1.532-0.908,1.762-1.762C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z" />
    </svg>
);


// --- UI SUB-COMPONENTS ---
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className=' align-center backdrop-blur-md fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 h-16  border-slate-700'>
              <Link to="/" className="flex items-center gap-2 text-xl font-bold text-white">
                <LogoIcon className="h-[32px] md:h-[37px] pt-2" />
              </Link>
              
              <nav className={`flex-col z-10 lg:flex-row bg-[#001128] lg:flex ${isMenuOpen ? 'flex' : 'hidden'} lg:gap-8 gap-5 lg:static absolute w-full lg:w-auto top-full left-0 lg:top-auto lg:left-auto px-6 lg:px-0 py-5 lg:py-0 shadow-lg lg:shadow-none border-slate-700 lg:border-none`}>
                <Link to='/about' onClick={() => setIsMenuOpen(false)} className="cursor-pointer text-white text-lg md:text-xl hover:text-blue-600 ">About</Link>
                <Link to='/notes' onClick={() => setIsMenuOpen(false)} className="cursor-pointer text-white text-lg md:text-xl hover:text-blue-600 ">Notes</Link>
                <Link to='/pyq' onClick={() => setIsMenuOpen(false)} className="cursor-pointer text-white text-lg md:text-xl hover:text-blue-600 ">PYQ</Link>
                <Link to='/lab' onClick={() => setIsMenuOpen(false)} className="cursor-pointer text-white text-lg md:text-xl hover:text-blue-600 ">Lab</Link>
              </nav>
        
              <div className="lg:hidden flex px-2 py-1 ">
                <button onClick={toggleMenu} className="text-white text-3xl focus:outline-none">
                  <i className={`bi ${isMenuOpen ? 'bi-x' : 'bi-list'}`}></i>
                </button>
              </div>
            </header>
  );
};


const SidebarButton = ({ onClick, isActive, disabled = false, children }) => {
  const baseClasses = "w-full h-10 rounded-lg flex items-center justify-center text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-blue-600";
  const activeClasses = "bg-blue-600 text-white shadow-md";
  const inactiveClasses = "bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white";
  const disabledClasses = "opacity-50 cursor-not-allowed bg-slate-800 text-slate-500";
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${disabled ? disabledClasses : (isActive ? activeClasses : inactiveClasses)}`}
    >
      {children}
    </button>
  );
}

const Sidebar = ({ isOpen, setIsOpen, filters, onFilterChange }) => {

  return (
    <>
      <aside className={`fixed top-0 left-0 z-50 w-64 h-full bg-[#001128] text-white flex flex-col gap-8 py-6 px-4 transition-transform duration-300 ease-in-out md:fixed md:top-16 md:h-[calc(100vh-4rem)] md:translate-x-0 overflow-y-auto ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center md:hidden">
            <h3 className="text-xl font-bold text-white">Filters</h3>
            <button onClick={() => setIsOpen(false)} className="p-2 text-2xl" aria-label="Close menu">
                <i className="bi bi-x"></i>
            </button>
        </div>
        
        <div className="flex flex-col gap-3">
          <h3 className="text-blue-600 text-lg font-semibold px-2">Branch</h3>
          {BRANCH_OPTIONS.map(({ id, label }) => (
            <SidebarButton key={id} onClick={() => onFilterChange('branch', id)} isActive={filters.branch === id}>
              {label}
            </SidebarButton>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-blue-600 text-lg font-semibold px-2">Semester</h3>
          {SEM_OPTIONS.map(({ id, label }) => (
            <SidebarButton key={id} onClick={() => onFilterChange('sem', id)} isActive={filters.sem === id} disabled={!filters.branch}>
              {label}
            </SidebarButton>
          ))}
        </div>
      </aside>
      {isOpen && <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/60 z-40 md:hidden" />}
    </>
  );
};

const SubjectCard = ({ subject }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-slate-800 border-slate-700 rounded-lg shadow-sm transition-all overflow-hidden">
      <div
        className="flex justify-between items-center cursor-pointer p-4 hover:bg-slate-700/50"
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-slate-200 flex-1 pr-4">{subject.SubjectName}</span>
        <i className={`bi text-2xl text-slate-400 transition-transform duration-300 ${isOpen ? 'bi-chevron-up' : 'bi-chevron-down'}`} />
      </div>
      
      <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[1500px]' : 'max-h-0'}`}>
        <div className="px-4 pb-4 border-t border-slate-700">
          <div className="pt-4 space-y-4">
            {subject.Syllabus && (
              <a href={subject.Syllabus} target="_blank" rel="noopener noreferrer" className="flex justify-between items-center bg-slate-700 rounded-lg p-3 hover:bg-slate-600 transition-colors">
                <span className="font-medium">Syllabus</span>
                <PdfIcon className="w-8 h-8 text-red-500" />
              </a>
            )}

            {subject.Modules && subject.Modules.length > 0 && (
              <div className="space-y-2">
                <div className="grid grid-cols-6 md:grid-cols-10 gap-2 font-bold text-sm text-slate-400 px-3 py-2">
                  <span className="col-span-1">Mod.</span>
                  <span className="col-span-3 md:col-span-6">Module Name</span>
                  <span className="col-span-1 text-center">PDF</span>
                  <span className="col-span-1 text-center">Video</span>
                </div>
                {subject.Modules.map((m) => (
                  <div key={m.ModuleNum} className="grid grid-cols-6 md:grid-cols-10 gap-2 items-center bg-slate-700/50 rounded-lg p-3">
                    <span className="col-span-1 font-semibold">{m.ModuleNum}</span>
                    <span className="col-span-3 md:col-span-6 text-sm">{m.ModuleName}</span>
                    <div className="col-span-1 flex gap-2 justify-center">
                      {m.PdfLink && m.PdfLink.map((link, i) => link && (
                        <a key={i} href={link} target="_blank" rel="noopener noreferrer" title={`Download PDF ${i+1}`}>
                          <PdfIcon className="w-6 h-6 text-red-500 hover:opacity-80 transition-opacity" />
                        </a>
                      ))}
                    </div>
                    <div className="col-span-1 flex justify-center">
                      {m.YoutubeLink && (
                        <a href={m.YoutubeLink} target="_blank" rel="noopener noreferrer" title="Watch on YouTube">
                          <YoutubeIcon className="w-6 h-6 text-red-600 hover:opacity-80 transition-opacity" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Spinner = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
       <div className="w-12 h-12 border-4 border-t-blue-600 border-r-blue-600 border-b-blue-600/20 border-l-blue-600/20 rounded-full animate-spin"></div>
       <span className="text-lg font-medium text-slate-400">Loading Subjects...</span>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-800 border-t border-slate-700 py-6">
      <div className="container mx-auto px-4 text-center text-slate-400">
        <p>&copy; {new Date().getFullYear()} NoteGo</p>
      </div>
    </footer>
  );
};

// --- MAIN COMPONENT ---
export default function SecondYearNotes() {
    // Default to CSE, Sem 3 for initial load
    const [filters, setFilters] = useState({ branch: 'CSE', sem: 3 });
    const [searchTerm, setSearchTerm] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true); // Start loading on initial render
    const [error, setError] = useState(null);
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    const handleFetchData = useCallback(async () => {
        // Search takes priority
        if (debouncedSearchTerm) {
            setLoading(true); setError(null);
            try {
                // Search requires a branch to be selected
                if(!filters.branch) {
                    setError('Please select a branch before searching.');
                    setSubjects([]);
                    setLoading(false);
                    return;
                }
                const results = await searchSubjects(debouncedSearchTerm, filters.branch);
                setSubjects(results);
                if (results.length === 0) setError('No subjects found for your search term.');
            } catch (err) {
                setError('Failed to fetch search results. Please try again.');
                setSubjects([]);
            } finally { setLoading(false); }
            return;
        }

        // Fetch based on filters
        const { branch, sem } = filters;
        if (branch && sem) {
            setLoading(true); setError(null);
            try {
                const results = await fetchSubjectsByFilter(filters);
                setSubjects(results);
                if (results.length === 0) setError('No subjects found for the selected filters.');
            } catch (err) {
                setError('Failed to fetch subjects. Please check the backend service.');
                setSubjects([]);
            } finally { setLoading(false); }
        } else {
            setSubjects([]);
            setLoading(false);
        }
    }, [filters, debouncedSearchTerm]);

    useEffect(() => { handleFetchData(); }, [handleFetchData]);

    const handleFilterChange = (key, value) => {
        setSearchTerm(''); // Clear search when filters change
        setFilters(prev => {
            const newFilters = { ...prev, [key]: value };
            if (key === 'branch') {
                newFilters.sem = null; // Reset semester when branch changes
            }
            return newFilters;
        });
    };

    const hasActiveFilters = filters.branch && filters.sem;
    const showInitialMessage = !loading && !error && subjects.length === 0 && !hasActiveFilters && !debouncedSearchTerm;

    return (
        <div className="flex flex-col min-h-screen bg-[#001128] text-slate-200">
            <Header />
            <div className="flex flex-1 pt-16">
                <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} filters={filters} onFilterChange={handleFilterChange} />
                <main className="flex-1 flex flex-col p-4 md:p-8 md:ml-64 transition-all duration-300">
                    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
                        <div className="relative">
                            <i className="bi bi-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                            <input
                                type="search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search in selected branch..."
                                disabled={!filters.branch}
                                className="w-full h-12 pl-12 pr-4 :bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none transition disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                        </div>
                        <div className="min-h-[calc(100vh-20rem)] flex flex-col">
                            {loading && <Spinner />}
                            {!loading && error && (
                                <div className="text-center p-8 :bg-red-900/20 border border-red-500/30 rounded-lg animate-fade-in m-auto">
                                    <i className="bi bi-exclamation-triangle text-4xl text-red-500 mb-4"></i>
                                    <h3 className="text-xl font-semibold text-red-400">An Error Occurred</h3>
                                    <p className="text-slate-400 mt-2">{error}</p>
                                </div>
                            )}
                            {showInitialMessage && (
                                <div className="text-center p-8 bg-slate-800/50 rounded-lg animate-fade-in m-auto">
                                    <i className="bi bi-filter-circle text-4xl text-blue-600 mb-4"></i>
                                    <h3 className="text-xl font-semibold">Start by selecting filters</h3>
                                    <p className="text-slate-400 mt-2">Choose a Branch and Semester to find notes.</p>
                                </div>
                            )}
                            {!loading && !error && subjects.length > 0 && (
                                <div className="w-full space-y-3 animate-fade-in">
                                    <div className="bg-blue-600 text-white rounded-md shadow-md p-4 flex justify-center font-semibold">
                                        Found {subjects.length} {subjects.length === 1 ? 'Subject' : 'Subjects'}
                                    </div>
                                    {subjects.map((subject) => <SubjectCard key={subject.SubjectNumber} subject={subject} />)}
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
            
            <button 
              onClick={() => setSidebarOpen(true)}
              className="md:hidden fixed bottom-6 right-6 z-30 w-16 h-16 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center text-3xl hover:bg-blue-600 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 focus:ring-blue-600"
              aria-label="Open filters"
            >
              <i className="bi bi-funnel-fill"></i>
            </button>

            <div className="md:ml-64">
                <Footer />
            </div>
        </div>
    );
}
