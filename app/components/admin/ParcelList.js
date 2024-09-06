"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import Loader from '../Loader.js';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';

export default function ParcelList() {
  const router = useRouter();
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [parcelToDelete, setParcelToDelete] = useState(null);
  const [editParcel, setEditParcel] = useState(null);
  const [updatedParcel, setUpdatedParcel] = useState({});
  const [newTimelineEvent, setNewTimelineEvent] = useState('');
  const [isPrinting, setIsPrinting] = useState(false);

  const timelineOptions = [
    'Awaiting Pickup',
    'Parcel Picked-up',
    'On the way',
    'Parcel Received at Destination Center',
    'Out for Delivery',
    'Parcel Delivered Successfully',
    'Parcel Delayed',
    
  ];

  const statusOptions = ['Pending', 'In Transit', 'Delivered'];

  useEffect(() => {
    const fetchParcels = async () => {
      try {
        const response = await fetch('/api/parcels');
        if (!response.ok) {
          throw new Error('Failed to fetch parcels');
        }
        const data = await response.json();
        setParcels(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchParcels();
  }, []);

  const handleDelete = async () => {
    if (parcelToDelete) {
      try {
        const response = await fetch(`/api/${parcelToDelete}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete parcel');
        }

        setParcels(parcels.filter(parcel => parcel.trackingNumber !== parcelToDelete));
        setParcelToDelete(null);
        Swal.fire({
          icon: "success",
          title: "Successfully deleted parcel!",
          text: "Parcel has been deleted successfully",
        });
      } catch (err) {
        console.error('Error:', err);
        Swal.fire({
          icon: "error",
          title: "Failed to delete parcel!",
          text: error.message,
        });
      }
    }
  };

  const handleEdit = (parcel) => {
    setEditParcel(parcel);
    setUpdatedParcel({
      ...parcel,
      newTimeline: []
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedParcel(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTimeline = () => {
    if (newTimelineEvent) {
      const currentDate = dayjs().format('DD-MM-YYYY');
      setUpdatedParcel(prev => ({
        ...prev,
        newTimeline: [...prev.newTimeline, { event: newTimelineEvent, time: currentDate }]
      }));
      setNewTimelineEvent('');
    }
  };

  const handleRemoveTimeline = (index) => {
    setUpdatedParcel(prev => ({
      ...prev,
      newTimeline: prev.newTimeline.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    if (editParcel) {
      try {
        const combinedTimeline = [
          ...(editParcel.timeline || []),
          ...updatedParcel.newTimeline
        ].sort((a, b) => dayjs(a.time, 'DD-MM-YYYY').toDate() - dayjs(b.time, 'DD-MM-YYYY').toDate());

        const parcelToUpdate = {
          ...updatedParcel,
          timeline: combinedTimeline
        };

        const response = await fetch(`/api/${editParcel.trackingNumber}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(parcelToUpdate),
        });

        if (!response.ok) {
          throw new Error('Failed to update parcel');
        }

        setParcels(parcels.map(parcel =>
          parcel.trackingNumber === editParcel.trackingNumber ? parcelToUpdate : parcel
        ));
        setEditParcel(null);
        Swal.fire({
          title: "Parcel Updated Successfully!",
          text: "The parcel has been updated successfully",
          icon: "success"
        });
      } catch (err) {
        console.error('Error:', err);
        Swal.fire({
          title: "Failed to update parcel",
          text: err.message,
          icon: "error"
        });
      }
    }
  };

  const handleCancelEdit = () => {
    setEditParcel(null);
    setUpdatedParcel({});
  };

  const handleConfirmDelete = (trackingNumber) => {
    setParcelToDelete(trackingNumber);
  };

  const handleCloseDialog = () => {
    setParcelToDelete(null);
  };

 

  const handlePrint = (parcel) => {
    const encodedParcel = encodeURIComponent(JSON.stringify(parcel));
    router.push(`/pages/admin/print?parcel=${encodedParcel}`);
  };
  

  if (loading || isPrinting) {
    return <Loader />;
  }

  if (error) {
    return <p className="text-center text-lg font-semibold text-red-600">Error: {error}</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Parcel List</h2>
      <p className="text-lg text-gray-600 mb-4">Total Parcels: {parcels.length}</p>
      <ul className="space-y-4">
        {parcels.map((parcel) => (
          <li key={parcel.trackingNumber} className={`bg-white shadow-md rounded-lg border ${parcel.status === 'Delivered' ? 'border-green-500' : 'border-yellow-500'} p-6`}>
            {editParcel && editParcel.trackingNumber === parcel.trackingNumber ? (
              <div className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <h3 className="text-lg font-semibold text-blue-700">Tracking Number: {editParcel.trackingNumber}</h3>
                  {['sender', 'recipient', 'parcelFrom', 'parcelTo'].map(field => (
                    <input
                      key={field}
                      type="text"
                      name={field}
                      value={updatedParcel[field] || ''}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-lg p-2"
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    />
                  ))}
                  <select
                    name="status"
                    value={updatedParcel.status || ''}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg p-2"
                  >
                    {statusOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    name="location"
                    value={updatedParcel.location || ''}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg p-2"
                    placeholder="Location"
                  />
                  
                  <div className="mt-4 border-t pt-4">
                    <h4 className="font-semibold text-lg mb-2">Edit Timeline</h4>
                    <div className="flex items-center mb-2">
                      <select
                        value={newTimelineEvent}
                        onChange={(e) => setNewTimelineEvent(e.target.value)}
                        className="border border-gray-300 rounded-lg p-2 mr-2 flex-grow"
                      >
                        <option value="">Select an event</option>
                        {timelineOptions.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                      <button
                        onClick={handleAddTimeline}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                      >
                        Add Event
                      </button>
                    </div>
                    <h5 className="font-semibold mt-2">Existing Timeline:</h5>
                    <ul className="list-disc pl-5 mt-2">
                      {editParcel.timeline?.map((event, index) => (
                        <li key={index} className="mb-1">
                          <strong>{event.time}</strong>: {event.event}
                        </li>
                      ))}
                    </ul>
                    <h5 className="font-semibold mt-2">New Timeline Events:</h5>
                    <ul className="list-disc pl-5 mt-2">
                      {updatedParcel.newTimeline?.map((event, index) => (
                        <li key={index} className="mb-1 flex items-center">
                          <span><strong>{event.time}</strong>: {event.event}</span>
                          <button
                            onClick={() => handleRemoveTimeline(index)}
                            className="ml-2 text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex space-x-2 mt-4">
                    <button
                      onClick={handleSave}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-600 bg-gray-200 hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800">Tracking Number: {parcel.trackingNumber}</h3>
                  <p className={`text-lg font-semibold ${parcel.status === 'Delivered' ? 'text-green-600' : 'text-yellow-600'}`}>
                    Status: {parcel.status}
                  </p>
                </div>
                <div className="text-gray-600 mb-2">
                  <p><strong>Sender:</strong> {parcel.sender}</p>
                  <p><strong>Recipient:</strong> {parcel.recipient}</p>
                  <p><strong>From:</strong> {parcel.parcelFrom}</p>
                  <p><strong>To:</strong> {parcel.parcelTo}</p>
                  <p><strong>Location:</strong> {parcel.location}</p>
                </div>
                <div className="border-t mt-4 pt-4">
                  <h4 className="text-lg font-semibold text-gray-700 mb-2">Timeline : Date format is DD/MM/YYYY</h4>
                  <ul className="list-disc pl-5 text-gray-600">
                    {parcel.timeline?.map((event, index) => (
                      <li key={index}>
                        <strong>{event.time}</strong>: {event.event}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex space-x-2 mt-4">
                  <button
                    onClick={() => handleEdit(parcel)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleConfirmDelete(parcel.trackingNumber)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handlePrint(parcel)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                  >
                    Print
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      
      {parcelToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg font-semibold mb-4">Are you sure you want to delete this parcel?</p>
            <div className="flex space-x-4">
              <button
                onClick={handleDelete}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                Confirm
              </button>
              <button
                onClick={handleCloseDialog}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-600 bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}