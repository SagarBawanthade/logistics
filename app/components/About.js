import React from 'react';
import aboutLogo from '../../public/images/navlogo.png'; // Adjust the path if necessary
import Image from 'next/image';

const About = () => {
  return (
    <section id="about">
    <div className="bg-gradient-to-r from-green-400 to-blue-500 min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl space-y-12">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image src={aboutLogo} height={70} width={70} alt="Brand Logo" className="rounded-full shadow-lg"/>
        </div>

        {/* Heading */}
        <div className="text-center">
          <h1 className="text-2xl md:text-4xl font-extrabold text-white drop-shadow-lg">
            About Us
          </h1>
        </div>

        {/* Description */}
        <div className="text-center text-yellow-300 text-base leading-relaxed space-y-6 max-w-4xl mx-auto">
          <p style={{  fontSize:"19px", fontFamily: "Grenze serif"}}>
            Welcome to <span className="font-semibold">Royal Express</span>, where we specialize in providing top-notch logistics and transportation services. Our team is dedicated to ensuring your cargo is delivered safely and efficiently.
          </p>
          <p style={{  fontSize:"19px", fontFamily: "Grenze serif"}} >
            With years of experience in the industry, we have built a reputation for reliability and excellence. Our services range from cargo consolidation to express delivery, warehousing solutions, and international freight forwarding. We are committed to optimizing your shipping processes and reducing logistics costs.
          </p>
          <p style={{  fontSize:"19px", fontFamily: "Grenze serif"}} >
            At <span className="font-semibold">Royal Express</span>, we believe in delivering not just goods but also peace of mind to our clients. Trust us to handle your logistics needs with the utmost professionalism and care.
          </p>
        </div>
      </div>
    </div>
     </section>
  );
};

export default About;
