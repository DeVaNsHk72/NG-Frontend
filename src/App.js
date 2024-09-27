import logo from './logo.svg';
import './App.css';
import FrontPage from './Components/FrontPage';
import { useState } from 'react';
import Notes from './Components/Notes';
import CSCluster from './Components/CSCluster';
import MechCluster from './Components/MechCluster';
import ElectricalCluster from './Components/ElectricalCluster';
import About from './Components/About';

function App() {

  
  const [CSECluster,setCSECluster] = useState(false)
  const [ECECluster,setECECluster] = useState(false)
  const [MECluster,setMECluster] = useState(false)
  const [NotesLink,setNotesLink] = useState(false)
  const [BackToHome,setBackToHome] = useState(true)
  const [AboutLink,setAboutLink] = useState(false)

  return (

    <div className="App"  >

      {!NotesLink && BackToHome && !AboutLink?<FrontPage  BackToHome={BackToHome} AboutLink={AboutLink} NotesLink={NotesLink} setAboutLink={setAboutLink}  setCSECluster={setCSECluster} setECECluster={setECECluster} setMECluster={setMECluster} setBackToHome={setBackToHome}  setNotesLink={setNotesLink} />:
       CSECluster ? <CSCluster setBackToHome={setBackToHome}  setNotesLink={setNotesLink}  CSECluster={CSECluster} ECECluster={ECECluster} MECluster={MECluster} setCSECluster={setCSECluster} setECECluster={setECECluster} setMECluster={setMECluster} />:
        ECECluster? <ElectricalCluster setBackToHome={setBackToHome}  setNotesLink={setNotesLink} CSECluster={CSECluster} ECECluster={ECECluster} MECluster={MECluster} setCSECluster={setCSECluster} setECECluster={setECECluster} setMECluster={setMECluster}  />:
         MECluster? <MechCluster setBackToHome={setBackToHome}  setNotesLink={setNotesLink} CSECluster={CSECluster} ECECluster={ECECluster} MECluster={MECluster} setCSECluster={setCSECluster} setECECluster={setECECluster} setMECluster={setMECluster} />:
      
        AboutLink ? <About  BackToHome={BackToHome} AboutLink={AboutLink} NotesLink={NotesLink} setNotesLink={setNotesLink} setAboutLink={setAboutLink}  setBackToHome={setBackToHome} setCSECluster={setCSECluster}  setECECluster={setECECluster}  setMECluster={setMECluster}  /> : 
        <Notes setCSECluster={setCSECluster} setBackToHome={setBackToHome} NotesLink = {NotesLink}  setNotesLink={setNotesLink}  setECECluster={setECECluster}  setMECluster={setMECluster}  />
      
      }
      </div>
  );
}

export default App;
