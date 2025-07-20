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
import PYQ from './Components/PYQ';
import Lab from './Components/Lab';
import PYQ2ndYear from './Components/PYQ2';
import CSE2 from './Components/CSE2';
import ECE2 from './Components/ECE2';
import ISE2 from './Components/ISE2';
import ETE2 from './Components/ETE2';
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
          <Route path="/pyq" element={<PYQ />} />
          <Route path="/lab" element={<Lab />} />
          <Route path="/pyq2" element={<PYQ2ndYear />} />
          <Route path="/CSE2" element={<CSE2 />} />
          <Route path="/ECE2" element={<ECE2 />} />
          <Route path="/ISE2" element={<ISE2 />} />
          <Route path="/ETE2" element={<ETE2 />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
