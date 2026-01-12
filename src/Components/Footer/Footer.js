import React from "react";
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "react-router-dom";
import {
  RiFacebookFill,
  RiInstagramLine,
  RiLinkedinBoxFill,
  RiTwitterFill,
} from "react-icons/ri";
import logo from "../../assets/QuizifyQuiz-removebg-preview.png";
import Herobottom from "../../assets/Footerbottom.png";

const Footer = () => {
  return (
    <footer className="bg-[#1e40af] text-white py-12 px-6 md:px-12 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
        {/* Logo and Description */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
          <img src={logo} alt="Quizify Logo" className="h-16" />
          <h2 className="text-3xl font-extrabold tracking-wide">Quizify</h2>
          <p className="text-base leading-relaxed max-w-sm">
            Quizify: Learn and have fun with quizzes on a wide variety of topics, created by experienced teachers.
          </p>
          <div className="flex space-x-4 mt-3">
            <RiFacebookFill className="text-3xl cursor-pointer bg-white text-[#1e40af] p-2 rounded-full hover:scale-110 transition-all" />
            <RiInstagramLine className="text-3xl cursor-pointer bg-white text-[#1e40af] p-2 rounded-full hover:scale-110 transition-all" />
            <RiLinkedinBoxFill className="text-3xl cursor-pointer bg-white text-[#1e40af] p-2 rounded-full hover:scale-110 transition-all" />
            <RiTwitterFill className="text-3xl cursor-pointer bg-white text-[#1e40af] p-2 rounded-full hover:scale-110 transition-all" />
          </div>
        </div>

        {/* Quick Links & Categories */}
        <div className="grid grid-cols-2 gap-8 text-center md:text-left">
          <div>
            <h3 className="font-bold text-xl">Quick Links</h3>
            <ul className="mt-3 space-y-2 text-base">
              <li><Link to="/" className="hover:underline">Home</Link></li>
              <li><Link to="/why" className="hover:underline">About us</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-xl">Quiz Categories</h3>
            <ul className="mt-3 space-y-2 text-base">
              <li><Link to="/exams" className="hover:underline">Science</Link></li>
              <li><Link to="/exams" className="hover:underline">Algebra</Link></li>
              <li><Link to="/exams" className="hover:underline">Chemistry</Link></li>
              <li><Link to="/exams" className="hover:underline">Biology</Link></li>
            </ul>
          </div>
        </div>

        {/* Contact & Newsletter */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
          <h3 className="font-bold text-xl">Get in touch</h3>
          <p className="text-base">We don’t send spam, so don’t worry!</p>
          <div className="mt-4 flex w-full max-w-md">
            <input 
              type="email" 
              placeholder="Email address" 
              className="p-3 rounded-l-md w-full text-black border-none outline-none text-base" 
            />
            <button className="bg-yellow-400 px-6 py-3 rounded-r-md text-black font-semibold hover:bg-yellow-500 transition-all text-base">
              Send
            </button>
          </div>
          <p className="text-base">Phone: (434) 546-4356</p>
          <p className="text-base">Email: Quizify@outbox.com</p>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center text-sm mt-8 border-t border-white pt-4">
        &copy; {new Date().getFullYear()} Quizify | Developed by Developmentmisr. All Rights Reserved
      </div>

      {/* Bottom Illustration */}
      <div className="w-full mt-4">
        <img src={Herobottom} className="w-full h-auto object-cover" alt="Footer Bottom" />
      </div>
    </footer>
  );
};

export default Footer;