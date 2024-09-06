import React from 'react';
import Image from 'next/image';
import serviceImg1 from '../../public/images/1.jpg';
import serviceImg2 from '../../public/images/2.jpg';
import serviceImg3 from '../../public/images/3.jpg';
import serviceImg4 from '../../public/images/4.jpg';
import '../styles/Services.css'; // Ensure this path is correct

const services = [
  {
    image: serviceImg1,
    title: 'Cargo Consolidation',
    description: 'Our cargo consolidation service helps in combining multiple smaller shipments into a single larger shipment to reduce costs and optimize transport efficiency. This service is ideal for businesses looking to streamline their shipping processes and save on logistics costs.',
  },
  {
    image: serviceImg2,
    title: 'Express Delivery',
    description: 'Our express delivery service caters to urgent shipments that need to be delivered quickly. We prioritize these shipments to ensure fast and reliable delivery, whether it\'s within Mumbai or to other cities across India.',
  },
  {
    image: serviceImg3,
    title: 'Warehousing Solutions',
    description: 'With our warehousing solutions, we offer secure and organized storage facilities for your goods. Our warehouses are equipped with modern technology to manage inventory efficiently, ensuring that your cargo is stored safely and can be accessed easily.',
  },
  {
    image: serviceImg4,
    title: 'International Freight Forwarding',
    description: 'Our international freight forwarding service ensures timely and efficient transport of goods across borders. We handle all aspects of international shipping, including customs clearance and documentation, to ensure a smooth delivery process.',
  },
];



const Services = () => {
  return (
    <section id="services">
    <div className="relative bg-gray-100 py-12 px-4 lg:px-8">
    {/* Heading */}
    <div className="text-center mb-12">
    <h1 className="text-2xl md:text-4xl font-extrabold text-black drop-shadow-lg">
    Our Services</h1>
    </div>

      {/* Service List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <div 
            key={index}
            className="flex flex-col bg-white border border-gray-200 rounded-lg shadow transition-transform duration-300 ease-in-out transform hover:scale-105"
          >
            {/* Image */}
            <div className="relative w-full h-64">
              <Image 
                className="object-cover w-full h-full rounded-t-lg"
                src={service.image}
                alt={`Service ${index + 1}`}
                layout="fill"
                objectFit="cover"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col justify-between p-4">
              <h5 className="mb-2 title text-xl font-bold tracking-tight text-gray-900">
                {service.title}
              </h5>
              <p className="desc mb-3 font-normal text-gray-700">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </section>
  );
};

export default Services;
