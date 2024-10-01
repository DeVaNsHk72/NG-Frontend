import logo from './logo.svg';
import './App.css';
import FrontPage from './Components/FrontPage';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Notes from './Components/Notes';
import About from './Components/About';
import CSCluster from './Components/CSCluster';
import MECluster from './Components/MechCluster';
import ECCluster from './Components/ElectricalCluster';
import Tnc from './Components/Tnc'; // Import the Tnc component
import PrivacyPolicy from './Components/PrivacyPolicy'; // Import the Tnc component
import Contact from './Components/Contact';

function App() {
  return (
    <Router>
      <div className='App'>
        {/* Optional: You can have a header or navigation here */}
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/CSCluster" element={<CSCluster />} />
          <Route path="/ECCluster" element={<ECCluster />} />
          <Route path="/MECluster" element={<MECluster />} />
          <Route path="/Tnc" element={<Tnc />} /> {/* Add this line */}
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} /> {/* Add this line */}
          <Route path="/Contact" element={<Contact />} /> {/* Add this line */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
