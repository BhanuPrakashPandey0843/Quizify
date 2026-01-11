import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { FaTimes, FaBars } from "react-icons/fa"; // Close & menu icons
import logo from "../../assets/QuizifyQuiz-removebg-preview.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const sideNavRef = useRef(null);

  // GSAP animation for opening the sidebar
  useEffect(() => {
    if (menuOpen) {
      gsap.to(sideNavRef.current, { x: 0, duration: 0.5, ease: "power2.out" });
    } else {
      gsap.to(sideNavRef.current, { x: "100%", duration: 0.5, ease: "power2.in" });
    }
  }, [menuOpen]);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img src={logo} alt="Quizify Logo" className="w-32 h-auto" />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/home"
            className="text-gray-800 hover:text-blue-500 font-medium relative group transition duration-300"
          >
            Home
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            to="/exams"
            className="text-gray-800 hover:text-blue-500 font-medium relative group transition duration-300"
          >
            Exams
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            to="/why"
            className="text-gray-800 hover:text-blue-500 font-medium relative group transition duration-300"
          >
            Why Quizify
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            to="/contact"
            className="text-gray-800 hover:text-blue-500 font-medium relative group transition duration-300"
          >
            Contact
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login" className="text-gray-800 hover:text-blue-500 font-medium transition duration-300">
            Login
          </Link>
          <Link to="/signup" className="px-5 py-2 rounded-full border-2 border-blue-500 text-blue-500 font-medium transition duration-300 hover:bg-blue-500 hover:text-white">
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(true)} className="text-gray-800 focus:outline-none">
            <FaBars className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Navigation */}
        <div
        ref={sideNavRef}
        className={`fixed top-0 right-0 w-4/5 sm:w-3/5 md:w-1/3 h-full bg-white shadow-lg transform translate-x-full transition-all ease-in-out`}
        style={{ backdropFilter: "blur(15px)" }} // Glassmorphism effect
      >
        {/* Close Button */}
        <button onClick={() => setMenuOpen(false)} className="absolute top-5 right-5 text-gray-600 hover:text-red-500 transition duration-300">
          <FaTimes className="w-6 h-6" />
        </button>

        {/* Sidebar Content */}
        <div className="flex flex-col items-center mt-20 space-y-6">
          <Link
            to="/home"
            className="text-lg text-gray-800 font-medium hover:text-blue-500 transition duration-300"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/exams"
            className="text-lg text-gray-800 font-medium hover:text-blue-500 transition duration-300"
            onClick={() => setMenuOpen(false)}
          >
            Exams
          </Link>
          <Link
            to="/why"
            className="text-lg text-gray-800 font-medium hover:text-blue-500 transition duration-300"
            onClick={() => setMenuOpen(false)}
          >
            Why Quizify
          </Link>
          <Link
            to="/contact"
            className="text-lg text-gray-800 font-medium hover:text-blue-500 transition duration-300"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>

          {/* Buttons in Sidebar */}
          <div className="mt-4 flex flex-col space-y-4">
            <Link to="/login" className="text-gray-800 text-center hover:text-blue-500 font-medium transition duration-300" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
            <Link to="/signup" className="px-5 py-2 rounded-full border-2 border-blue-500 text-blue-500 font-medium text-center transition duration-300 hover:bg-blue-500 hover:text-white" onClick={() => setMenuOpen(false)}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
