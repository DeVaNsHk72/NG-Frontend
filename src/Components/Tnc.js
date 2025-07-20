
import React, { useEffect, useState } from 'react';
import Logo from '../logo.svg';
import { Link } from 'react-router-dom';

function Tnc() {

  
  useEffect(()=>{

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  },[])




  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-[#001128] min-h-100vh flex flex-col items-center text-white">
      {/* Header */}
      <div className='bg-white/10 align-center backdrop-blur-md  fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-3.5
                
            border border-white/30 
            rounded-xl        
            shadow-lg mt-5 mx-5'>
          <div className="flex items-center">
            <img src={Logo} alt="Logo" className="h-[20px] md:h-[27px]" />
          </div>

          {/* Hamburger Icon for mobile and iPads */}
          <div className="lg:hidden flex px-2 py-1 ">
            <button onClick={toggleMenu} className="text-white text-3xl focus:outline-none">
              <i className={`bi ${isMenuOpen ? 'bi-x' : 'bi-list'}`}></i>
            </button>
          </div>

          {/* Links for larger screens & dropdown for smaller screens and iPads */}
          <nav className={`flex-col z-10 rounded-2xl  lg:flex-row bg-[#132f56] lg:bg-transparent lg:flex ${isMenuOpen ? 'flex' : 'hidden'} lg:gap-10 gap-5 lg:static absolute  w-full lg:w-auto top-[70px] left-0 px-4 lg:px-0 py-5 lg:py-0`}>


            <Link
              to='/about'
              className={`cursor-pointer text-white text-lg md:text-xl hover:text-blue-600`}
            >
              About
            </Link>
            <Link
              to='/notes'
              className={`cursor-pointer text-white text-lg md:text-xl hover:text-blue-600`}
            >
              Notes
            </Link>

            <Link
              to='/pyq'
              className={`cursor-pointer text-white text-lg md:text-xl hover:text-blue-600`}
            >
              PYQ
            </Link>

            {/* <Link
              to='/pyq2'
              className={`cursor-pointer text-white text-lg md:text-xl hover:text-green-400`}
            >
              2nd Year PYQ's
            </Link> */}

            <Link
              to='/lab'
              className={`cursor-pointer text-white text-lg md:text-xl hover:text-blue-600`}
            >
              Lab
            </Link>
          </nav>
        </div>
      {/* T&C Section */}
      {/* <div className="flex transition-all  z-10   duration-700 ease-in-out animate-fade-in-slide-up  flex-col items-center mt-10 md:mt-20 px-4"> */}
        {/* Title */}
        <div className="flex transition-all z-10 duration-700 ease-in-out animate-fade-in-slide-up flex-col items-start mt-[130px] md:mt-[150px] px-4">
  {/* Title */}
  {/* <div className="flex transition-all z-10 duration-700 ease-in-out animate-fade-in-slide-up flex-col items-start mt-10 md:mt-20 px-4"> */}
    <h1 className="text-3xl md:text-5xl font-bold text-left w-full">Terms and Conditions</h1>

    {/* Terms and Conditions Content */}
    <p className="mt-6 sm:mt-10 max-w-4xl text-base sm:text-lg md:text-xl text-left">
      Last updated: November 08, 2024
    </p>

    <p className="mt-4 sm:mt-5 max-w-4xl text-base sm:text-lg md:text-xl text-left">
      Please read these terms and conditions carefully before using Our Service.
    </p>

    <p className="mt-6 sm:mt-10 max-w-4xl text-base sm:text-lg md:text-xl text-left">
      <strong>Interpretation and Definitions</strong><br />
      <strong>Interpretation</strong><br />
      The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or plural.<br />
      <strong>Definitions</strong><br />
      For the purposes of these Terms and Conditions:
      <ul className="list-disc ml-6 mt-2">
        <li><strong>Affiliate</strong> means an entity that controls, is controlled by, or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest, or other securities entitled to vote for the election of directors or other managing authority.</li>
        <li><strong>Country</strong> refers to: Karnataka, India.</li>
        <li><strong>Company</strong> (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to NoteGo.</li>
        <li><strong>Device</strong> means any device that can access the Service such as a computer, a cellphone, or a digital tablet.</li>
        <li><strong>Service</strong> refers to the Website.</li>
        <li><strong>Terms and Conditions</strong> (also referred to as "Terms") mean these Terms and Conditions that form the entire agreement between You and the Company regarding the use of the Service.</li>
        <li><strong>Third-party Social Media Service</strong> means any services or content (including data, information, products, or services) provided by a third-party that may be displayed, included, or made available by the Service.</li>
        <li><strong>Website</strong> refers to NoteGo, accessible from notego.in.</li>
        <li><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</li>
      </ul>
    </p>

    <p className="mt-4 sm:mt-5 max-w-4xl text-base sm:text-lg md:text-xl text-left">
      <strong>Acknowledgment</strong><br />
      These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.<br />
      Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users, and others who access or use the Service.<br />
      By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions, then You may not access the Service.<br />
      You represent that you are over the age of 18. The Company does not permit those under 18 to use the Service.<br />
      Your access to and use of the Service is also conditioned on Your acceptance of and compliance with the Privacy Policy of the Company. Please read Our Privacy Policy carefully before using Our Service.
    </p>

    <p className="mt-4 sm:mt-5 max-w-4xl text-base sm:text-lg md:text-xl text-left">
      <strong>Links to Other Websites</strong><br />
      Our Service may contain links to third-party websites or services that are not owned or controlled by the Company.<br />
      The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You further acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such websites or services.<br />
      We strongly advise You to read the terms and conditions and privacy policies of any third-party websites or services that You visit.
    </p>

    <p className="mt-4 sm:mt-5 max-w-4xl text-base sm:text-lg md:text-xl text-left">
      <strong>Termination</strong><br />
      We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.<br />
      Upon termination, Your right to use the Service will cease immediately.
    </p>

    <p className="mt-4 sm:mt-5 max-w-4xl text-base sm:text-lg md:text-xl text-left">
      <strong>Limitation of Liability</strong><br />
      Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers under any provision of this Terms and Your exclusive remedy for all of the foregoing shall be limited to the amount actually paid by You through the Service or 100 USD if You haven't purchased anything through the Service.<br />
      To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data or other information, for business interruption, for personal injury, loss of privacy arising out of or in any way related to the use of or inability to use the Service).
    </p>

    <p className="mt-4 sm:mt-5 max-w-4xl text-base sm:text-lg md:text-xl text-left">
      <strong>"AS IS" and "AS AVAILABLE" Disclaimer</strong><br />
      The Service is provided to You "AS IS" and "AS AVAILABLE" and with all faults and defects without warranty of any kind. To the maximum extent permitted under applicable law, the Company, on its own behalf and on behalf of its Affiliates, expressly disclaims all warranties with respect to the Service.<br />
      Without limitation to the foregoing, neither the Company nor any of the company's providers makes any representation or warranty that the Service will be uninterrupted, error-free, or that it will meet Your requirements.
    </p>

    <p className="mt-4 sm:mt-5 max-w-4xl text-base sm:text-lg md:text-xl text-left">
      <strong>Governing Law</strong><br />
      The laws of the Country, excluding its conflicts of law rules, shall govern this Terms and Your use of the Service.
    </p>

    <p className="mt-4 sm:mt-5 max-w-4xl text-base sm:text-lg md:text-xl text-left">
      <strong>Disputes Resolution</strong><br />
      If You have any concern or dispute about the Service, You agree to first try to resolve the dispute informally by contacting the Company.
    </p>

    <p className="mt-4 sm:mt-5 max-w-4xl text-base sm:text-lg md:text-xl text-left">
      <strong>For European Union (EU) Users</strong><br />
      If You are a European Union consumer, you will benefit from any mandatory provisions of the law of the country in which You are resident.
    </p>

    <p className="mt-4 sm:mt-5 max-w-4xl text-base sm:text-lg md:text-xl text-left">
      <strong>United States Legal Compliance</strong><br />
      You represent and warrant that (i) You are not located in a country that is subject to the United States government embargo, or that has been designated by the United States government as a "terrorist supporting" country, and (ii) You are not listed on any United States government list of prohibited or restricted parties.
    </p>

    <p className="mt-4 sm:mt-5 max-w-4xl text-base sm:text-lg md:text-xl text-left">
      <strong>Severability and Waiver</strong><br />
      If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed to accomplish its objective, and the remaining provisions will continue in full force.<br />
      The failure to exercise a right or enforce an obligation under these Terms shall not affect a party's ability to do so in the future.
    </p>

    <p className="mt-4 sm:mt-5 max-w-4xl text-base sm:text-lg md:text-xl text-left">
      <strong>Translation Interpretation</strong><br />
      These Terms may have been translated. You agree that the original English text shall prevail in the case of a dispute.
    </p>

    <p className="mt-4 sm:mt-5 max-w-4xl text-base sm:text-lg md:text-xl text-left">
      <strong>Changes to These Terms and Conditions</strong><br />
      We reserve the right to modify these Terms at any time. If revisions are material, we will provide notice at least 30 days before the changes take effect.
    </p>

    <p className="mt-4 sm:mt-5 max-w-4xl text-base sm:text-lg md:text-xl text-left">
      <strong>Material Source</strong><br />
      The materials on the Website are sourced from BMSCE (B.M.S. College of Engineering) and are officially approved by the college.
    </p>

    <p className="mt-4 sm:mt-5 max-w-4xl text-base sm:text-lg md:text-xl text-left">
      <strong>Contact Us</strong><br />
      If you have any questions about these Terms and Conditions, You can contact us by email at: notego.bmsce@gmail.com
    </p>
  </div>


      
     
      

        <footer className="bg-[#001128] w-full text-white flex justify-between">
                {/* main content */}
                <div
                  className="
            max-w-7xl mx-auto
            grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
            place-items-center       /* centers each cell horizontally & vertically  */
            gap-y-12 lg:gap-y-0 lg:gap-x-12
            px-6 py-12
          "
                >
                  {/* ─────────── NoteGo blurb ─────────── */}
                  <div className="w-full max-w-xs text-center">
                    <h2 className="text-lg font-semibold mb-4">NoteGo</h2>
                    <p className="text-sm leading-relaxed opacity-90">
                      One-stop hub for notes, tutorials &amp; PYQs,<br />
                      built by students for students.
                    </p>
                  </div>
        
                  {/* ─────────── Quick Links ─────────── */}
                  <div className="w-full max-w-xs text-center">
                    <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
                    <ul className="space-y-2">
                      <li><Link to="/about" className="hover:underline">About</Link></li>
                      <li><Link to="/contact" className="hover:underline">Contact</Link></li>
                      <li><Link to="/privacypolicy" className="hover:underline">Privacy Policy</Link></li>
                      <li><Link to="/tnc" className="hover:underline">Terms &amp; Conditions</Link></li>
                    </ul>
                  </div>
        
                  {/* ─────────── Navigate To ─────────── */}
                  <div className="w-full max-w-xs text-center">
                    <h2 className="text-lg font-semibold mb-4">Navigate To</h2>
                    <ul className="space-y-2">
                      <li><Link to="/notes" className="hover:underline">Notes</Link></li>
                      <li><Link to="/pyq" className="hover:underline">PYQ</Link></li>
                      <li><Link to="/lab" className="hover:underline">Lab</Link></li>
                    </ul>
                  </div>
                </div>
        
              </footer>
              {/* copy‑right strip */}
              <div className="border-t w-full text-white bg-[#001128] border-white/10">
                <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 px-6 py-4 text-xs md:text-sm">
                  <i className="bi bi-c-circle" /> 2025 by NoteGo
                </div>
              </div>

    </div>
  );
}

export default Tnc;