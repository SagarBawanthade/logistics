"use client";
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/saveContact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        Swal.fire({
          title: "Message Sent Successfully!",
          text: "The Message has been sent successfully!",
          icon: "success"
        });
        setStatus('Message sent successfully!');
        setFormData({ firstName: '', lastName: '', email: '', message: '' });
      } else {
        Swal.fire({
          icon: "error",
          title: "Message Not Sent!",
          text: error.message,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section id="contact">
      <div className="bg-cover bg-center bg-no-repeat bg-[url('/images/contact.jpg')] dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="font-[sans-serif] max-w-6xl mx-auto p-4">
          <h1 className="text-center m-5 text-2xl md:text-4xl font-extrabold text-black drop-shadow-lg">
            Contact Us
          </h1>
          <form onSubmit={handleSubmit} className="space-y-3 max-w-xl mx-auto text-gray-800">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full border rounded py-3 px-4 text-sm focus:outline-yellow-400"
              required
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full border rounded py-3 px-4 text-sm focus:outline-yellow-400"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border rounded py-3 px-4 text-sm focus:outline-yellow-400"
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              rows="6"
              className="w-full border rounded px-4 text-sm pt-3 focus:outline-yellow-400"
              required
            />
            <button
              type="submit"
              className="text-black w-full bg-yellow-400 hover:bg-yellow-500 rounded text-sm px-6 py-3 mt-6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16px"
                height="16px"
                fill="currentColor"
                className="mr-2 inline"
                viewBox="0 0 548.244 548.244"
              >
                <path
                  fillRule="evenodd"
                  d="M392.19 156.054 211.268 281.667 22.032 218.58C8.823 214.168-.076 201.775 0 187.852c.077-13.923 9.078-26.24 22.338-30.498L506.15 1.549c11.5-3.697 24.123-.663 32.666 7.88 8.542 8.543 11.577 21.165 7.879 32.666L390.89 525.906c-4.258 13.26-16.575 22.261-30.498 22.338-13.923.076-26.316-8.823-30.728-22.032l-63.393-190.153z"
                  clipRule="evenodd"
                />
              </svg>
              Send Message
            </button>
          </form>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mt-12">
            <div className="flex flex-col items-center bg-transparent">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 fill-yellow-600"
                viewBox="0 0 512 512"
              >
                <path
                  d="M341.476 338.285c54.483-85.493 47.634-74.827 49.204-77.056C410.516 233.251 421 200.322 421 166 421 74.98 347.139 0 256 0 165.158 0 91 74.832 91 166c0 34.3 10.704 68.091 31.19 96.446l48.332 75.84C118.847 346.227 31 369.892 31 422c0 18.995 12.398 46.065 71.462 67.159C143.704 503.888 198.231 512 256 512c108.025 0 225-30.472 225-90 0-52.117-87.744-75.757-139.524-83.715zm-194.227-92.34a15.57 15.57 0 0 0-.517-.758C129.685 221.735 121 193.941 121 166c0-75.018 60.406-136 135-136 74.439 0 135 61.009 135 136 0 27.986-8.521 54.837-24.646 77.671-1.445 1.906 6.094-9.806-110.354 172.918L147.249 245.945zM256 482c-117.994 0-195-34.683-195-60 0-17.016 39.568-44.995 127.248-55.901l55.102 86.463a14.998 14.998 0 0 0 25.298 0l55.101-86.463C411.431 377.005 451 404.984 451 422c0 25.102-76.313 60-195 60z"
                />
                <path
                  d="M256 91c-41.355 0-75 33.645-75 75s33.645 75 75 75 75-33.645 75-75-33.645-75-75-75zm0 120c-24.813 0-45-20.187-45-45s20.187-45 45-45 45 20.187 45 45-20.187 45-45 45z"
                />
              </svg>
              <div className="mt-4 text-center">
                <h4 className="text-gray-800 text-base font-bold">Visit office</h4>
                <p className="text-sm text-gray-500 mt-2"> Gokuldham Goregaon-East, Mumbai, India</p>
              </div>
            </div>

            <div className="flex flex-col items-center bg-transparent">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 fill-yellow-600"
                viewBox="0 0 473.806 473.806"
              >
                <path
                  d="M374.456 293.506c-9.7-10.1-21.4-15.5-33.8-15.5-12.3 0-24.1 5.3-34.2 15.4l-31.6 31.5c-2.6-1.4-5.2-2.7-7.7-4-3.6-1.8-7-3.5-9.9-5.3-29.6-18.8-56.5-43.3-82.3-75-12.5-15.8-20.9-29.1-27-42.6 8.2-7.5 15.8-15.3 23.2-22.8 2.8-2.8 5.6-5.7 8.4-8.5 21-21 21-48.2 0-69.2l-27.3-27.3c-3.1-3.1-6.3-6.3-9.4-9.4-9.6-9.6-21.4-14.9-33.7-14.9-12.3 0-24 5.3-33.7 14.9l-28 28c-21 21-30.6 48.3-26.6 76.5 3.8 27.3 17.1 56.8 39.1 87.3 26.7 36.7 58.2 69.8 92.5 96.1 34.8 26.6 72 47.4 109.3 60.4 12.4 4.3 24.3 6.4 35.7 6.4 25.1 0 48.2-9.8 65.6-27.3 3.1-3.1 6.2-6.2 9.3-9.3l27.3-27.3c21-21 21-48.1 0-69.1-3.2-3.4-6.2-6.3-9.1-9.3zm6.9 65.4-28 28c-14.2 14.2-36.4 19.3-59.7 13.5-34.6-10.6-69.9-29.7-103.1-55.6-33.7-25.8-64.1-57.5-89.4-92.4-19.2-26.4-32-52.3-34.9-74.9-2.8-20.2 4.5-38.5 19.5-53.5l28-28c4.3-4.3 9.1-6.6 14.1-6.6s10.1 2.3 14.1 6.6c3.1 3.1 6.3 6.3 9.4 9.4l27.3 27.3c7.8 7.8 7.8 20.5 0 28.3l-8.5 8.5c-9 9-17.8 18-26.7 26.7-2.4 2.4-4.9 4.8-7.3 7.2-6.6 6.7-10.4 15.4-11.2 25.7-.8 10.8 1.7 23.4 7.5 37.6 7.6 18.6 18.9 36.5 34.1 56.5 27.2 34.2 58.6 64.2 93.6 87.2 10.2 6.4 20.6 11.8 31.4 16.3 5.4 2.2 10.8 4.5 16.1 6.3 13.7 4.6 25.7 6.9 36.8 6.9 14.6 0 27-4.5 36.4-13.5l28-28c7.8-7.8 20.5-7.8 28.3 0 3.1 3.1 6.3 6.3 9.4 9.4 7.8 7.8 7.8 20.5 0 28.3z"
                />
              </svg>
              <div className="mt-4 text-center">
                <h4 className="text-gray-800 text-base font-bold">Call Us</h4>
                <p className="text-sm text-gray-500 mt-2">8828458883</p>
                <p className="text-sm text-gray-500 mt-2">7620397865</p>
              </div>
            </div>

            <div className="flex flex-col items-center bg-transparent">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 fill-yellow-600"
                viewBox="0 0 297 297"
              >
                <path
                  d="M148.5 0C66.75 0 0 66.75 0 148.5S66.75 297 148.5 297 297 230.25 297 148.5 230.25 0 148.5 0zm0 277.2c-70.935 0-128.7-57.765-128.7-128.7S77.565 19.8 148.5 19.8s128.7 57.765 128.7 128.7-57.765 128.7-128.7 128.7z"
                />
                <path
                  d="M148.5 59.4c-19.305 0-34.65 15.345-34.65 34.65s15.345 34.65 34.65 34.65 34.65-15.345 34.65-34.65-15.345-34.65-34.65-34.65zm0 49.5c-8.235 0-14.85-6.615-14.85-14.85s6.615-14.85 14.85-14.85 14.85 6.615 14.85 14.85-6.615 14.85-14.85 14.85zM148.5 148.5c-40.92 0-74.25 33.33-74.25 74.25 0 5.49 4.461 9.9 9.9 9.9h128.7c5.49 0 9.9-4.461 9.9-9.9 0-40.92-33.33-74.25-74.25-74.25zm-54.045 64.35c5.94-21.87 25.65-37.95 49.395-37.95s43.455 16.083 49.395 37.95h-98.79z"
                />
              </svg>
              <div className="mt-4 text-center">
                <h4 className="text-gray-800 text-base font-bold">Our Location</h4>
                <p className="text-sm text-gray-500 mt-2">Mumbai, India</p>
              </div>
            </div>

            <div className="flex flex-col items-center bg-transparent">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 fill-yellow-600"
                viewBox="0 0 458.622 458.622"
              >
                <path
                  d="M29.087 152.312h400.448c16.065 0 29.087-13.022 29.087-29.087v-64.66c0-16.065-13.022-29.087-29.087-29.087H29.087C13.022 29.478 0 42.5 0 58.565v64.66c0 16.065 13.022 29.087 29.087 29.087zm-9.961-93.748c0-5.498 4.463-9.961 9.961-9.961h400.448c5.498 0 9.961 4.463 9.961 9.961v64.66c0 5.498-4.463 9.961-9.961 9.961H29.087c-5.498 0-9.961-4.463-9.961-9.961v-64.66zM429.535 181.478H29.087C13.022 181.478 0 194.5 0 210.565v107.492c0 16.065 13.022 29.087 29.087 29.087h400.448c16.065 0 29.087-13.022 29.087-29.087V210.565c0-16.065-13.022-29.087-29.087-29.087zm9.961 136.578c0 5.498-4.463 9.961-9.961 9.961H29.087c-5.498 0-9.961-4.463-9.961-9.961V210.565c0-5.498 4.463-9.961 9.961-9.961h400.448c5.498 0 9.961 4.463 9.961 9.961v107.492zM429.535 348.312H29.087C13.022 348.312 0 361.335 0 377.4v22.657c0 16.065 13.022 29.087 29.087 29.087h400.448c16.065 0 29.087-13.022 29.087-29.087V377.4c0-16.065-13.022-29.087-29.087-29.087zm9.961 51.744c0 5.498-4.463 9.961-9.961 9.961H29.087c-5.498 0-9.961-4.463-9.961-9.961V377.4c0-5.498 4.463-9.961 9.961-9.961h400.448c5.498 0 9.961 4.463 9.961 9.961v22.656z"
                />
              </svg>
              <div className="mt-4 text-center">
                <h4 className="text-gray-800 text-base font-bold">Mail Us</h4>
                <p className="text-sm text-gray-500 mt-2">royalexpress929@gmail.com</p>
                <p className="text-sm text-gray-500 mt-2">abhi6789klvm@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;