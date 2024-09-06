import React from 'react';
import Image from 'next/image';
import home1 from '../../public/images/pex.jpg';
import Link from 'next/link';
import '../styles/Dashboard.css';


const Dashboard = () => {
  return (
    <div className="bg relative min-h-screen bg-#F6E2CC">
      {/* Background Image */}
      <div className=" absolute inset-0 bg-cover  z-0"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row w-full h-screen items-center justify-center p-6">
        

        {/* Left Section: Text and Button */}
        <div className="flex flex-col items-start justify-center md:ml-16 p-4 w-full md:w-1/2">
          <h1 className="fonth1 text-3xl font-extrabold text-gray-800">Faster & Reliable</h1>
          <p className="fontp text-lg md:text-xl text-gray-600 mt-4">
            Welcome to Royal express. Our main goal is to always achieve a high level of customer satisfaction with the services and service that we provide. This simple approach has effectively fueled our growth since we opened our doors in 1999. We’re thrilled you’ve decided to visit us - please browse our site to discover what we’re all about.
          </p>
          <div className="block md:hidden w-full flex justify-center mt-4">
          <Link href="/pages/order">
            <button className="bg-yellow-300 text-black px-6 py-3 hover:bg-yellow-400 transition duration-200">
            Track your order
            </button>
            </Link>
          </div>
          <div className="hidden md:block mt-4">
            <Link href="/pages/order">
            <button className="bg-yellow-400 text-black px-6 py-3 rounded-lg hover:bg-yellow-500 transition duration-200">
              Track your order
            </button>
            </Link>
          </div>
        </div>

        {/* Right Section: Image */}
        <div className="relative w-full md:w-1/2 h-64 md:h-full flex items-center justify-center">
          <Image 
            src={home1}
           
            alt="Dashboard Image" 
            layout="intrinsic"
            className="dashicon rounded-lg shadow-md"
          />
        </div>


      </div>
    </div>
  );
};

export default Dashboard;
