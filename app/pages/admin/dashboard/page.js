"use client";

import { useEffect, useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout.js';
import Link from 'next/link';

export default function Dashboard() {
  const [summary, setSummary] = useState({});
  const [recentParcels, setRecentParcels] = useState([]);
  const [totalContacts, setTotalContacts] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch parcels
        const parcelsRes = await fetch('/api/parcels');
        if (!parcelsRes.ok) {
          throw new Error('Failed to fetch parcels');
        }
        const parcelsData = await parcelsRes.json();
  
        // Compute parcel statistics
        const totalParcels = parcelsData.length;
        const deliveredParcels = parcelsData.filter(parcel => parcel.status === 'Delivered').length;
        const inTransitParcels = parcelsData.filter(parcel => parcel.status === 'In Transit').length;
  
        setSummary({
          totalParcels,
          delivered: deliveredParcels,
          inTransit: inTransitParcels,
        });
  
        // Sort and set recent parcels
        const sortedParcels = parcelsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        const recentParcels = sortedParcels.slice(0, 5); // Get the top 5 most recent parcels
        setRecentParcels(recentParcels);
  
        // Fetch contacts
        const contactsRes = await fetch('/api/getContacts');
        if (!contactsRes.ok) {
          throw new Error('Failed to fetch contacts');
        }
        const contactsData = await contactsRes.json();
    
        if (contactsData.success && Array.isArray(contactsData.contacts)) {
          setTotalContacts(contactsData.contacts.length);
        } else {
          console.error('Contacts data is not in expected format:', contactsData);
        }
  
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-6 lg:px-8 lg:py-10">
        <header className="mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome to the admin dashboard. Here’s an overview of your system’s current status.</p>
        </header>
        
        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-6 text-gray-900">Summary Statistics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {/* Total Parcels Card */}
            <div className="bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <h3 className="text-lg font-medium text-white">Total Parcels</h3>
              <p className="text-3xl font-bold text-white">{summary.totalParcels || 0}</p>
            </div>
            {/* In Transit Card */}
            <div className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <h3 className="text-lg font-medium text-white">In Transit</h3>
              <p className="text-3xl font-bold text-white">{summary.inTransit || 0}</p>
            </div>
            {/* Delivered Card */}
            <div className="bg-gradient-to-r from-green-300 via-green-400 to-green-500 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <h3 className="text-lg font-medium text-white">Delivered</h3>
              <p className="text-3xl font-bold text-white">{summary.delivered || 0}</p>
            </div>
            {/* Contacts Card */}
            <div className="bg-gradient-to-r from-red-300 via-red-400 to-red-500 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <h3 className="text-lg font-medium text-white">Contacts</h3>
              <p className="text-3xl font-bold text-white">{totalContacts || 0}</p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-6 text-gray-900">Recent Parcels</h2>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <ul>
              {recentParcels.length === 0 ? (
                <li className="text-gray-600">No recent parcels.</li>
              ) : (
                recentParcels.map(parcel => (
                  <li key={parcel._id} className="flex justify-between border-b py-4 text-gray-800 hover:bg-gray-50">
                    <span>Tracking Number: <strong>{parcel.trackingNumber}</strong></span>
                    <span className={`font-medium ${parcel.status === 'Delivered' ? 'text-green-600' : 'text-yellow-600'}`}>
                      {parcel.status}
                    </span>
                  </li>
                ))
              )}
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-6 text-gray-900">Quick Actions</h2>
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-wrap gap-4 lg:gap-6">
            <Link href="/pages/admin/addparcel" className="bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-800 transition">
              Add New Parcel
            </Link>
            <Link href="/pages/admin/parcel" className="bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-800 transition">
              View All Parcels
            </Link>
            <Link href="/pages/admin/contacts" className="bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700 text-white px-6 py-3 rounded-lg shadow-md hover:bg-teal-800 transition">
              Contacts
            </Link>

            <Link href="/" className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-800 transition">
              Logout
            </Link>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
