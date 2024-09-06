"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';


export default function EditParcel() {
  const router = useRouter();
  const { trackingNumber } = router.query;
  const [parcel, setParcel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchParcel = async () => {
      try {
        const response = await fetch(`/api/parcels/${trackingNumber}`);
        if (!response.ok) {
          throw new Error('Failed to fetch parcel');
        }
        const data = await response.json();
        setParcel(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchParcel();
  }, [trackingNumber]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!parcel) {
    return <div>Parcel not found</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/parcels/${trackingNumber}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parcel),
      });

      if (!response.ok) {
        throw new Error('Failed to update parcel');
      }

      // Handle success, e.g., show a success message, redirect to the parcel list page
      router.push('/pages/admin/parcels');
    } catch (err) {
      console.error('Error:', err);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <div>
      <h2>Edit Parcel</h2>
      <form onSubmit={handleSubmit}>
        {/* Add input fields for parcel data here */}
        <div>
          <label htmlFor="sender" className="block text-sm font-medium text-gray-700">Sender</label>
          <input
            type="text"
            id="sender"
            name="sender"
            value={formData.sender}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="recipient" className="block text-sm font-medium text-gray-700">Recipient</label>
          <input
            type="text"
            id="recipient"
            name="recipient"
            value={formData.recipient}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="parcelFrom" className="block text-sm font-medium text-gray-700">From</label>
          <input
            type="text"
            id="parcelFrom"
            name="parcelFrom"
            value={formData.parcelFrom}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="parcelTo" className="block text-sm font-medium text-gray-700">To</label>
          <input
            type="text"
            id="parcelTo"
            name="parcelTo"
            value={formData.parcelTo}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="isDelivered" className="inline-flex items-center">
            <input
              type="checkbox"
              id="isDelivered"
              name="isDelivered"
              checked={formData.isDelivered}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-600">Delivered</span>
          </label>
        </div>
        <div>
          <label htmlFor="isPickedUp" className="inline-flex items-center">
            <input
              type="checkbox"
              id="isPickedUp"
              name="isPickedUp"
              checked={formData.isPickedUp}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-600">Picked Up</span>
          </label>
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="timeline" className="block text-sm font-medium text-gray-700">Timeline</label>
          {/* Render timeline fields here if needed */}
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Save Changes
        </button>
       
      </form>
    </div>
  );
}