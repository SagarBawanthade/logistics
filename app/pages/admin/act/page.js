"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // State for controlling the initial loader
  const [success, setSuccess] = useState(false); // State for controlling the success loader
  const router = useRouter();

  useEffect(() => {
    // Simulate an initial loader for 4 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    // Clean up the timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    // Static login validation
    if (username === 'admin' && password === 'password') {
        setTimeout(() => {
           
          }, 1000);
      setSuccess(true); // Show success message

      // Simulate a loader for successful login for 2 seconds
      setTimeout(() => {
        router.push('/pages/admin/dashboard'); // Redirect to the dashboard
      }, 2000);
    } else {
      setError('Invalid username or password');
    }
  };

  if (loading) {
    // Render the initial loader
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
        <div className="text-white text-2xl font-bold animate-pulse">Loading...</div>
        <p className="text-red-600 text-xl animate-pulse mt-2">You are now redirecting to the admin login page...</p>
      </div>
    );
  }

  if (success) {
    // Render the success loader
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
        <div className="text-white text-2xl font-bold animate-pulse">Successfully Logged In...</div>
        <p className="text-green-600 text-xl animate-pulse mt-2">Redirecting to the dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md animate-fadeIn">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Admin Login</h1>
        
        {error && (
          <div className="bg-red-500 text-white p-3 rounded mb-4 text-center animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Username</label>
            <input 
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              placeholder="Enter your username"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Password</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              placeholder="Enter your password"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
