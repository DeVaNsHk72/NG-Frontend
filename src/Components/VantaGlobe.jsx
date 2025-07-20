import React, { useRef, useEffect } from 'react';


export default function VantaGlobe() {
  const vantaRef = useRef(null);
  const effectRef = useRef(null);

  useEffect(() => {
    // Initialize Vanta.js only once on mount
    if (!effectRef.current && window.VANTA) {
      effectRef.current = window.VANTA.NET({
        el: vantaRef.current,
        THREE: window.THREE, // Use the global THREE object
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 2.0,
        scaleMobile: 0.5,
        color: 0x214572,         // A modern, vibrant blue for the lines
        backgroundColor: 0x31324,  // A very dark, deep blue for the background
        points: 20.00,           // The number of points
        maxDistance: 20.00,      // How far lines will be drawn between points
        spacing: 19.00           // The spacing between points
      });
    }

    // Cleanup function to destroy the effect on unmount
    return () => {
      if (effectRef.current) {
        effectRef.current.destroy();
        effectRef.current = null;
      }
    };
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div
      ref={vantaRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: -1, // Places the background behind all other content
      }}
    />
  );
}