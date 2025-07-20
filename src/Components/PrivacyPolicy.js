import React, { useEffect, useState } from 'react';
import Logo from '../logo-fim.svg';
import { Link } from 'react-router-dom';

function PrivacyPolicy() {

  
  useEffect(()=>{

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  },[])

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-black min-h-screen flex flex-col items-center text-white">
     <div className='bg-black transition-all   z-50  duration-700 ease-in-out animate-fade-in-slide-up  w-full flex justify-between items-center px-4 md:px-20 py-6 '>
        <Link to = '/' className='flex items-center'>
          <img src={Logo} alt="Logo" className='h-[30px] md:h-[40px]' />
        </Link>

        {/* Hamburger Icon for mobile and iPads */}
        <div className='lg:hidden flex'>
          <button onClick={toggleMenu} className='text-white text-3xl focus:outline-none'>
            <i className={`bi ${isMenuOpen ? 'bi-x' : 'bi-list'}`}></i> {/* Toggling icon from "hamburger" to "close" */}
          </button>
        </div>

        {/* Links for larger screens & dropdown for smaller screens and iPads */}
        <nav className={`flex-col lg:flex-row lg:flex ${isMenuOpen ? 'flex' : 'hidden'} lg:gap-10 gap-5 lg:static absolute bg-zinc-950 w-full lg:w-auto top-[70px] left-0 px-4 lg:px-0 py-5 lg:py-0`}>
          <Link
            to = '/'
            className={`cursor-pointer text-white text-lg md:text-2xl hover:text-green-400`}
          >
            Home
          </Link>

          <Link
            to = '/notes'
            className={`cursor-pointer text-white text-lg md:text-2xl hover:text-green-400`}
          >
            Notes
          </Link>

          <Link
            to = '/pyq'
            className={`cursor-pointer text-white text-lg md:text-2xl hover:text-green-400`}
          >
            PYQ'S
          </Link>

          <Link
            to = '/lab'
            className={`cursor-pointer text-white text-lg md:text-2xl hover:text-green-400`}
          >
            Lab
          </Link>

        </nav>
      </div>
      
      {/* Privacy Policy Section */}
  {/* Title */}
  <div className="flex transition-all z-10 duration-700 ease-in-out animate-fade-in-slide-up flex-col items-start mt-10 md:mt-20 px-4">
    <h1 className="text-3xl md:text-5xl font-bold text-center">Privacy Policy</h1>

    {/* Privacy Policy Content */}
    <p className="mt-6 sm:mt-10 max-w-4xl text-base sm:text-lg md:text-xl text-left">
      Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our platform, <strong>NoteGo</strong>. Please read this policy carefully. If you do not agree with the terms of this policy, please do not access the site.
    </p>

    <p className="mt-4 sm:mt-5 max-w-4xl text-base sm:text-lg md:text-xl text-left">
      We may collect information about you in a variety of ways, including when you visit our site, register on the site, and interact with our content. This information may include personal identification information such as your name, email address, and other contact details.
    </p>

    <p className="mt-4 sm:mt-5 max-w-4xl text-base sm:text-lg md:text-xl text-left">
      We use your information to improve our platform, provide customer service, and communicate with you. We will not sell, trade, or rent your personal identification information to others.
    </p>

    <p className="mt-4 sm:mt-5 max-w-4xl text-base sm:text-lg md:text-xl text-left">
      By using our platform, you consent to our Privacy Policy and agree to its terms. If you have any questions about this policy, please contact us at notego.bmsce@gmail.com.
    </p>

    {/* Full Privacy Policy Text */}
    <p className="mt-6 sm:mt-10 max-w-4xl text-base sm:text-lg md:text-xl text-left">
      <strong>Privacy Policy</strong><br />
      Last updated: November 08, 2024
    </p>

    <p className="mt-4 sm:mt-5 max-w-4xl text-base sm:text-lg md:text-xl text-left">
      This Privacy Policy describes Our policies and procedures on the collection, use, and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
    </p>

    <p className="mt-4 sm:mt-5 max-w-4xl text-base sm:text-lg md:text-xl text-left">
      We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy. This Privacy Policy has been created with the help of the Privacy Policy Generator.
    </p>

    <p className="mt-4 sm:mt-5 max-w-4xl text-base sm:text-lg md:text-xl text-left">
      <strong>Interpretation and Definitions</strong><br />
      Interpretation: The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or plural.<br />
      Definitions:<br />
      For the purposes of this Privacy Policy: <br />
      <ul className="list-disc ml-6 mt-2">
        <li><strong>Account</strong> means a unique account created for You to access our Service or parts of our Service.</li>
        <li><strong>Affiliate</strong> means an entity that controls, is controlled by, or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest, or other securities entitled to vote for election of directors or other managing authority.</li>
        <li><strong>Company</strong> refers to <strong>NoteGo</strong>.</li>
        <li><strong>Cookies</strong> are small files that are placed on Your computer, mobile device, or any other device by a website, containing the details of Your browsing history on that website.</li>
        <li><strong>Device</strong> means any device that can access the Service such as a computer, a cellphone, or a digital tablet.</li>
        <li><strong>Personal Data</strong> is any information that relates to an identified or identifiable individual.</li>
        <li><strong>Service</strong> refers to the Website.</li>
        <li><strong>Service Provider</strong> means any natural or legal person who processes the data on behalf of the Company.</li>
        <li><strong>Usage Data</strong> refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself.</li>
        <li><strong>Website</strong> refers to <strong>NoteGo</strong>, accessible from notego.in.</li>
        <li><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service.</li>
      </ul>
    </p>

    <p className="mt-4 sm:mt-5 max-w-4xl text-base sm:text-lg md:text-xl text-left">
      <strong>Collecting and Using Your Personal Data</strong><br />
      Types of Data Collected:<br />
      <ul className="list-disc ml-6 mt-2">
        <li><strong>Personal Data:</strong> While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to: Your name, email address, and phone number.</li>
        <li><strong>Usage Data:</strong> Usage Data is collected automatically when using the Service.</li>
        <li><strong>Cookies and Tracking Technologies:</strong> We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. We use both Session and Persistent Cookies for various purposes such as functionality, necessary cookies, and analytics.</li>
      </ul>
    </p>

    <p className="mt-4 sm:mt-5 max-w-4xl text-base sm:text-lg md:text-xl text-left">
      <strong>Use of Your Personal Data</strong><br />
      We may use Your Personal Data for the following purposes:<br />
      <ul className="list-disc ml-6 mt-2">
        <li>To provide and maintain our Service</li>
        <li>To manage Your Account</li>
        <li>For the performance of a contract</li>
        <li>To contact You</li>
        <li>For business transfers</li>
        <li>For data analysis and marketing</li>
      </ul>
    </p>

    <p className="mt-4 sm:mt-5 max-w-4xl text-base sm:text-lg md:text-xl text-left">
      <strong>Retention of Your Personal Data</strong><br />
      We will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations and resolve disputes.
    </p>

    <p className="mt-4 sm:mt-5 max-w-4xl text-base sm:text-lg md:text-xl text-left">
      <strong>Transfer of Your Personal Data</strong><br />
      Your information, including Personal Data, may be transferred to, and maintained on, servers outside of your location. Your consent to this Privacy Policy represents your agreement to such a transfer.
    </p>

    <p className="mt-4 sm:mt-5 max-w-4xl text-base sm:text-lg md:text-xl text-left">
      <strong>Delete Your Personal Data</strong><br />
      You have the right to delete or request that We assist in deleting the Personal Data that We have collected about You. Our Service may give You the ability to delete certain information about You from within the Service.
    </p>

    <p className="mt-4 sm:mt-5 max-w-4xl text-base sm:text-lg md:text-xl text-left">
      <strong>Disclosure of Your Personal Data</strong><br />
      We may disclose Your Personal Data in business transactions, law enforcement, and legal requirements.
    </p>

    <p className="mt-4 sm:mt-5 max-w-4xl text-base sm:text-lg md:text-xl text-left">
      <strong>Security of Your Personal Data</strong><br />
      While we strive to use commercially acceptable means to protect Your Personal Data, we cannot guarantee its absolute security.
    </p>

    <p className="mt-4 sm:mt-5 max-w-4xl text-base sm:text-lg md:text-xl text-left">
      <strong>Children's Privacy</strong><br />
      Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13.
    </p>

    <p className="mt-4 sm:mt-5 max-w-4xl text-base sm:text-lg md:text-xl text-left">
      <strong>Links to Other Websites</strong><br />
      Our Service may contain links to third-party websites. We advise You to review the Privacy Policy of any site you visit.
    </p>

    <p className="mt-4 sm:mt-5 max-w-4xl text-base sm:text-lg md:text-xl text-left">
      <strong>Changes to this Privacy Policy</strong><br />
      We may update Our Privacy Policy periodically. We will notify You of any changes by posting the new Privacy Policy on this page.
    </p>

    <p className="mt-4 sm:mt-5 max-w-4xl text-base sm:text-lg md:text-xl text-left">
      <strong>Contact Us</strong><br />
      If you have any questions about this Privacy Policy, You can contact us at:<br />
      By email: notego.bmsce@gmail.com
    </p>
  </div>

      <div className='bg-black transition-all     duration-700 ease-in-out animate-fade-in-slide-up  min-w-full h-auto lg:h-[480px] flex flex-col lg:flex-row gap-10 lg:gap-[150px] px-4 py-10'>
        <div className='flex flex-col gap-[30px] w-full lg:w-[300px]'>
          <img src={Logo} alt="Logo" className='h-[30px] lg:h-[40px] mt-[10px] lg:mt-[20px]' />
          <div className='text-sm md:text-md font-instrument ml-[0px] lg:ml-[50px] text-white text-justify'>
            NoteGo brings together professor-curated student notes with relevant 
            YouTube tutorials for fast and efficient learning.
          </div>

          <div className='text-sm italic md:text-md font-instrument ml-[0px] lg:ml-[50px] text-white text-justify'>
            Disclaimer: While the notes on this website are curated to assist in your studies, we advise students to 
            first refer to their professor's notes and resources. This is particularly important for theory-intensive
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
  );
}

export default PrivacyPolicy;