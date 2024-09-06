"use client";

import { useState } from 'react';
import Image from 'next/image';
import navlogo from '../../public/images/navlogo.png';
import '../styles/Navbar.css';
import Linking from 'next/link';
import { Link } from 'react-scroll';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 dark:bg-gray-900 fixed w-full h-20 md:h-24 lg:h-20 z-20 border-b border-gray-200 dark:border-gray-600 justify-center">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4 relative">
        {/* Logo and Title */}
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="relative h-14 w-14 md:h-14 md:w-22">
            <Image src={navlogo} layout="fill" objectFit="contain" alt="Royal Express Logo" />
          </div>
          <h2 className="font text-xl md:text-2xl font-semibold whitespace-nowrap dark:text-white">Royal Express</h2>
        </a>

        {/* Dropdown Button for Mobile */}
        <button
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg md:hidden hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:text-gray-400 dark:hover:bg-gray-800 dark:focus:ring-gray-400"
          aria-controls="navbar-sticky"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>

        {/* Navigation Menu for Mobile and Desktop */}
        <div className={`absolute inset-x-0 top-full bg-zinc-800 md:static md:flex md:w-auto md:justify-center md:space-x-8 md:bg-transparent md:border-0 ${isMenuOpen ? 'block' : 'hidden'}`} id="navbar-sticky">
          <ul className="flex flex-col md:flex-row md:items-center md:justify-center md:space-x-8 md:w-full">
            <li>
              <Linking href="/" className="cursor-pointer block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-yellow-300 md:p-0" >Home</Linking>
            </li>
            <li>
              <Link to="services" smooth={true} duration={500}  className="cursor-pointer block py-2 px-3 text-white rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-yellow-300 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Services</Link>
            </li>
            <li>
              <Link to="about" smooth={true} duration={500}  className="cursor-pointer block py-2 px-3 text-white rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-yellow-300 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</Link>
            </li>
            <li>
            <Link to="contact" smooth={true} duration={500} className="cursor-pointer block py-2 px-3 text-white rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-yellow-300 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact us</Link>
            </li>

            <li>
              <Linking href="/pages/admin/act" smooth={true} duration={500}  className="cursor-pointer block py-2 px-3 text-white rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-yellow-300 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Agent Login</Linking>
            </li>
            {/* Sign In Button in Mobile View
            <Linking href='/pages/signin' >
              <button type="button" className="cursor-pointer text-black rounded-lg transition-all bg-yellow-300 hover:bg-yellow-400 font-medium text-sm px-4 py-2 border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400">
                Sign in
              </button>
            </Linking> */}
           
          </ul>
        </div>

        {/* Remove the Sign In Button for Larger Screens */}
      </div>
    </nav>
  );
};

export default Navbar;
