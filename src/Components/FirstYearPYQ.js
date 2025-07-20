
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../logo-fim.svg';
// --- CONSTANTS ---
const API_BASE_URL = 'https://ng-backend-1-f4r9.onrender.com/api';
// --- ICONS ---
const LogoIcon = ({ className }) => (
  <img src={Logo} alt="NoteGo logo" className={className} />
);
// --- ICONS ---

// NOTE: Assuming PYQ-specific endpoints exist. The user-provided code used notes endpoints.
const API_ENDPOINTS = {
  CYCLE_PYQ: `${API_BASE_URL}/PhysicsCycle/GetAllModules`, // Placeholder, assuming this returns PYQ data structure
  CHEM_PYQ: `${API_BASE_URL}/ChemistryCycle/GetAllModules`, // Placeholder
  SEARCH_PHYSICS: `${API_BASE_URL}/GetPhysicsCycleSubjects`, // Placeholder
  SEARCH_CHEMISTRY: `${API_BASE_URL}/GetChemistryCycleSubjects`, // Placeholder
};

const CYCLE_OPTIONS = [
  { id: 'P', label: 'P-Cycle' },
  { id: 'C', label: 'C-Cycle' },
];

const SEM_OPTIONS = [
  { id: 1, label: 'Sem 1' },
  { id: 2, label: 'Sem 2' },
];


// --- API SERVICES ---
const postRequest = async (url, body) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error(`API request failed: ${response.statusText}`);
  return response.json();
};

const uniqueSubjects = (subjects) => {
    const seen = new Map();
    subjects.forEach(subject => {
        const key = `${subject.SubjectName}-${subject.SubjectCode || subject.code}`;
        if (!seen.has(key)) seen.set(key, subject);
    });
    return Array.from(seen.values());
};

const fetchPYQsByFilter = async (filters) => {
  const { cycle, sem } = filters;
  if (!cycle || !sem) return [];
  
  const url = cycle === 'P' ? API_ENDPOINTS.CYCLE_PYQ : API_ENDPOINTS.CHEM_PYQ;
  const body = { Category: "", Sem: `${sem}CS` }; // Backend seems to require a cluster, using CS as default
  
  const data = await postRequest(url, body);
  return uniqueSubjects(data);
};

const searchPYQs = async (query) => {
  const term = { SubjectName: query };
  const [physicsResults, chemistryResults] = await Promise.all([
    postRequest(API_ENDPOINTS.SEARCH_PHYSICS, term),
    postRequest(API_ENDPOINTS.SEARCH_CHEMISTRY, term),
  ]);
  const combined = [...physicsResults, ...chemistryResults];
  return uniqueSubjects(combined);
};


// --- CUSTOM HOOK ---
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};


// --- ICONS ---

const PdfIcon = ({ className }) => (<svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M20 2H8C6.9 2 6 2.9 6 4V16C6 17.1 6.9 18 8 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H8V4H20V16ZM4 6H2V20C2 21.1 2.9 22 4 22H18V20H4V6ZM14 14H18V12H12V14H14ZM16 10H12V8H18V10H16Z" /></svg>);

// --- UI SUB-COMPONENTS ---
const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header className=' align-center backdrop-blur-md fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 h-16 border-b border-slate-700'>
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-white">
            <LogoIcon className="h-[32px] md:h-[37px] pt-2 text-blue-500" />
          </Link>
          
          <nav className={`flex-col z-10 lg:flex-row bg-[#001128] lg:bg-transparent lg:flex ${isMenuOpen ? 'flex' : 'hidden'} lg:gap-8 gap-5 lg:static absolute w-full lg:w-auto top-full left-0 lg:top-auto lg:left-auto px-6 lg:px-0 py-5 lg:py-0 shadow-lg lg:shadow-none border-slate-700 lg:border-none`}>
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

const SidebarButton = ({ onClick, isActive, disabled = false, children }) => (
    <button onClick={onClick} disabled={disabled} className={`w-full h-10 rounded-lg flex items-center justify-center text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-blue-400 ${disabled ? 'opacity-50 cursor-not-allowed bg-slate-800 text-slate-500' : (isActive ? 'bg-blue-500 text-white shadow-md' : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white')}`}>
        {children}
    </button>
);

const Sidebar = ({ isOpen, setIsOpen, filters, onFilterChange }) => (
    <>
        <aside className={`fixed top-0 left-0 z-50 w-64 h-full bg-slate-900 text-white flex flex-col gap-8 py-6 px-4 transition-transform duration-300 ease-in-out md:fixed md:top-16 md:h-[calc(100vh-4rem)] md:translate-x-0 overflow-y-auto ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="flex justify-between items-center md:hidden">
                <h3 className="text-xl font-bold text-white">Filters</h3>
                <button onClick={() => setIsOpen(false)} className="p-2 text-2xl" aria-label="Close menu"><i className="bi bi-x"></i></button>
            </div>
            <div className="flex flex-col gap-3">
                <h3 className="text-blue-400 text-lg font-semibold px-2">Cycle</h3>
                {CYCLE_OPTIONS.map(({ id, label }) => <SidebarButton key={id} onClick={() => onFilterChange('cycle', id)} isActive={filters.cycle === id}>{label}</SidebarButton>)}
            </div>
            <div className="flex flex-col gap-3">
                <h3 className="text-blue-400 text-lg font-semibold px-2">Semester</h3>
                {SEM_OPTIONS.map(({ id, label }) => <SidebarButton key={id} onClick={() => onFilterChange('sem', id)} isActive={filters.sem === id} disabled={!filters.cycle}>{label}</SidebarButton>)}
            </div>
        </aside>
        {isOpen && <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/60 z-40 md:hidden" />}
    </>
);

const PYQRow = ({ subject }) => {
    const renderLink = (link, label) => {
        if (link && link !== "") {
            return <a href={link} target="_blank" rel="noopener noreferrer" title={label}><PdfIcon className="w-8 h-8 text-red-500 hover:text-red-400 transition-colors" /></a>;
        }
        return <span className="text-xs text-slate-400">N/A</span>;
    };

    // Helper component for each link column to ensure consistent alignment
    const PYQLinkColumn = ({ link, label }) => (
        <div className="flex flex-col items-center justify-start gap-1 w-1/4">
            <p className="text-sm font-medium text-slate-400 h-5">{label}</p>
            <div className="h-8 flex items-center justify-center">
                {renderLink(link, label)}
            </div>
        </div>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center bbg-slate-800 p-4 rounded-lg border border-slate-700">
            <div className="md:col-span-2 font-semibold text-slate-200">{subject.SubjectName}</div>
            <div className="flex justify-around items-start md:col-span-3 text-center">
                <PYQLinkColumn link={subject.CIE1} label="CIE 1" />
                <PYQLinkColumn link={subject.CIE2} label="CIE 2" />
                <PYQLinkColumn link={subject.CIE3} label="CIE 3" />
                <PYQLinkColumn link={subject.PYQLink} label="SEE" />
            </div>
        </div>
    );
};

const Spinner = () => (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
        <div className="w-12 h-12 border-4 border-t-blue-500 border-r-blue-500 border-b-blue-500/20 border-l-blue-500/20 rounded-full animate-spin"></div>
        <span className="text-lg font-medium text-slate-400">Loading PYQs...</span>
    </div>
);

const Footer = () => (
    <footer className="bg-slate-800 border-t border-slate-700 py-6">
        <div className="container mx-auto px-4 text-center text-slate-400">
            <p>&copy; {new Date().getFullYear()} NoteGo. All Rights Reserved.</p>
        </div>
    </footer>
);

// --- MAIN COMPONENT ---
export default function FirstYearPYQ() {
    const [filters, setFilters] = useState({ cycle: 'P', sem: 1 });
    const [searchTerm, setSearchTerm] = useState('');
    const [pyqs, setPyqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    const handleFetchData = useCallback(async () => {
        if (debouncedSearchTerm) {
            setLoading(true); setError(null);
            try {
                const results = await searchPYQs(debouncedSearchTerm);
                setPyqs(results);
                if (results.length === 0) setError('No PYQs found for your search term.');
            } catch (err) {
                setError('Failed to fetch search results.');
                setPyqs([]);
            } finally { setLoading(false); }
            return;
        }

        if (filters.cycle && filters.sem) {
            setLoading(true); setError(null);
            try {
                const results = await fetchPYQsByFilter(filters);
                setPyqs(results);
                if (results.length === 0) setError('No PYQs found for the selected filters.');
            } catch (err) {
                setError('Failed to fetch PYQs.');
                setPyqs([]);
            } finally { setLoading(false); }
        } else {
            setPyqs([]);
            setLoading(false);
        }
    }, [filters, debouncedSearchTerm]);

    useEffect(() => { handleFetchData(); }, [handleFetchData]);

    const handleFilterChange = (key, value) => {
        setSearchTerm('');
        setFilters(prev => {
            const newFilters = { ...prev, [key]: value };
            if (key === 'cycle') newFilters.sem = null;
            return newFilters;
        });
    };
    
    const showInitialMessage = !loading && !error && pyqs.length === 0 && !(filters.cycle && filters.sem) && !debouncedSearchTerm;

    return (
        <div className="flex flex-col min-h-screen bg-slate-900 text-slate-200">
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
                                placeholder="Search for a subject to override filters..."
                                className="w-full h-12 pl-12 pr-4 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                            />
                        </div>
                        <div className="min-h-[calc(100vh-20rem)] flex flex-col">
                            {loading && <Spinner />}
                            {!loading && error && (
                                <div className="text-center p-8 bg-red-900/20 border border-red-500/30 rounded-lg animate-fade-in m-auto">
                                    <i className="bi bi-exclamation-triangle text-4xl text-red-500 mb-4"></i>
                                    <h3 className="text-xl font-semibold :text-red-400">An Error Occurred</h3>
                                    <p className="text-slate-400 mt-2">{error}</p>
                                </div>
                            )}
                            {showInitialMessage && (
                                <div className="text-center p-8 bbg-slate-800/50 rounded-lg animate-fade-in m-auto">
                                    <i className="bi bi-filter-circle text-4xl text-blue-500 mb-4"></i>
                                    <h3 className="text-xl font-semibold">Start by selecting filters</h3>
                                    <p className="text-slate-400 mt-2">Choose a Cycle and Semester to find PYQs.</p>
                                </div>
                            )}
                            {!loading && !error && pyqs.length > 0 && (
                                <div className="w-full space-y-3 animate-fade-in">
                                    <div className="bg-blue-500 text-white rounded-md shadow-md p-4 flex justify-center font-semibold">
                                        Found {pyqs.length} {pyqs.length === 1 ? 'Subject' : 'Subjects'} with PYQs
                                    </div>
                                    {pyqs.map((subject, i) => <PYQRow key={subject.SubjectNumber || i} subject={subject} />)}
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
            <button onClick={() => setSidebarOpen(true)} className="md:hidden fixed bottom-6 right-6 z-30 w-16 h-16 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center text-3xl hover:bg-blue-600 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 focus:ring-blue-500" aria-label="Open filters">
                <i className="bi bi-funnel-fill"></i>
            </button>
            <div className="md:ml-64"><Footer /></div>
        </div>
    );
}
