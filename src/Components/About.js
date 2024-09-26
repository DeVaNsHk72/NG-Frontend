import React from 'react';

function About({ setNotesLink, setBackToHome, setCSECluster, setECECluster, setMECluster }) {

  const GotoHome = () => {
    setNotesLink(false);
    setBackToHome(true);
    setCSECluster(false);
    setECECluster(false);
    setMECluster(false);
  };

  return (
    <div className="bg-zinc-950 min-h-screen flex flex-col items-center text-white">
      
      {/* About Section */}
      <div className="flex flex-col items-center mt-10 md:mt-20 px-4">
        <h1 className="text-3xl md:text-5xl font-bold">About NoteGo</h1>
        <p className="mt-10 max-w-4xl text-lg md:text-xl text-center">
          NoteGo is a platform designed to make learning more accessible and effective for students. 
          It combines professor-curated student notes with relevant YouTube tutorials, creating a streamlined 
          learning experience. Whether you're preparing for exams, working on assignments, or looking for 
          additional resources, NoteGo is here to help you succeed.
        </p>
        <p className="mt-5 max-w-4xl text-lg md:text-xl text-center">
          Our mission is to provide high-quality, easily accessible learning materials for college students. 
          We believe that having all the resources in one place can help students study smarter and faster, 
          giving them more time to focus on what really matters.
        </p>
        <p className="mt-5 max-w-4xl text-lg md:text-xl text-center">
          Whether you're studying computer science, electrical engineering, mechanical engineering, or 
          any other field, our platform covers a wide range of subjects and clusters, allowing you to 
          find the materials you need for your course.
        </p>
        <p className="mt-5 max-w-4xl text-lg md:text-xl text-center">
          Made By: Vinayak Rodd, Devansh Khetan, Utkarsh Chaurasia, Rishi Raj
        </p>
      </div>

      {/* Footer */}
      <footer className="mt-20">
        <div className="flex flex-row items-center gap-2">
          <i className="bi bi-c-circle text-white" style={{ fontSize: '20px' }}></i>
          <h1 className="text-sm md:text-lg">2024 by NoteGo</h1>
        </div>
      </footer>
    </div>
  );
}

export default About;