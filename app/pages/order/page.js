"use client";

import Loader from '../../components/Loader.js';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

function TrackOrder() {
  const router = useRouter();
  const [trackingNumber, setTrackingNumber] = useState('');
  const [parcelDetails, setParcelDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    setParcelDetails(null);
    try {
      const response = await fetch(`/api/findparcel?trackingNumber=${trackingNumber}`);
  
      if (!response.ok) {
        throw new Error('Parcel not found');
      }
  
      const data = await response.json();
      setParcelDetails(data);
      console.log(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => router.push('/')}
        className="font-bold top-10 text-white left-10 p-2 text-lg bg-black-300 md:text-black"
      >
        Go back
      </button>

      <section className="relative min-h-screen flex flex-col justify-center bg-slate-50 overflow-hidden">
        <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-16">
          <div className="flex flex-col justify-center divide-y divide-slate-200 [&>*]:py-16">

            <div className="w-full max-w-3xl mx-auto">
              <div className="relative pl-8 sm:pl-32 py-6 group">
                <div className="mb-12">
                  <div className="font-medium text-red-500 mb-1 sm:mb-0">Search for Parcel</div>
                  <label htmlFor="tracking-number" className="block text-xl font-medium mb-4 text-gray-700">Tracking Number</label>
                  <div className="flex flex-col sm:flex-row items-center border border-gray-300 rounded-md shadow-sm">
                    <input
                      id="tracking-number"
                      type="text"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      className="flex-1 text-black p-4 border-none rounded-t-md sm:rounded-l-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      placeholder="Enter tracking number"
                    />
                    <button
                      onClick={handleSearch}
                      className="bg-yellow-300 text-black py-3 px-6 rounded-b-md sm:rounded-r-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={loading}
                    >
                      {loading ? <Loader/> : 'Track Parcel'}
                    </button>
                  </div>
                </div>
                {error && <p className="text-red-600">{error}</p>}
              </div>

              {parcelDetails && (
                <div className="p-6 mb-12 border border-gray-300 rounded-md shadow-md bg-white">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-800">Parcel Details</h2>
                  <div className="space-y-4">
                    <p className="text-lg text-black"><strong className="font-medium">Tracking Number:</strong> {parcelDetails.trackingNumber}</p>
                    <p className="text-lg text-black"><strong className="font-medium">Status:</strong> {parcelDetails.status}</p>
                    <p className="text-lg text-black"><strong className="font-medium">Location:</strong> {parcelDetails.location}</p>
                  </div>
                </div>
              )}

              <div className="-my-6">
                {parcelDetails ? (
                  parcelDetails.timeline.map((event, index) => {
                    
                    return (
                      <div key={index} className="relative pl-8 sm:pl-32 py-6 group">
                        <div className="font-medium text-red-500 mb-1 sm:mb-0">Parcel Update</div>
                        <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-indigo-600 after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
                          <p className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-20 h-6 mb-3 sm:mb-0 text-emerald-600 bg-emerald-100 rounded-full">
                            {event.time}
                          </p>
                          <div className="text-xl font-bold text-slate-900">{event.event}</div>
                        </div>
                        <div className="text-blue-500">Details of the event:- {event.event}</div>
                      </div>
                    );
                  })
                ) : (
                  !error && !loading && (
                    <div className="relative pl-8 sm:pl-32 py-6 group">
                      <div className="text-lg font-bold text-slate-900">Please enter a tracking number to view parcel details.</div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default TrackOrder;
