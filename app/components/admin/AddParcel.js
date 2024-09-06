"use client";
import { useState } from 'react';
import Swal from 'sweetalert2';
import Loader from '../Loader.js';

export default function AddParcel() {
  const [formData, setFormData] = useState({
    sender: '',
    recipient: '',
    parcelFrom: '',
    parcelTo: '',
    status: '',
    deliveryTime: '',
    isDelivered: false,
    isPickedUp: false,
    location: '',
    timeline: [{ time: '', event: '' }],
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleTimelineChange = (index, e) => {
    const { name, value } = e.target;
    const newTimeline = [...formData.timeline];
    newTimeline[index] = { ...newTimeline[index], [name]: value };
    setFormData({ ...formData, timeline: newTimeline });
  };

  const addTimelineEntry = () => {
    setFormData({
      ...formData,
      timeline: [...formData.timeline, { time: '', event: '' }],
    });
  };

  const handleStatusChange = (status) => {
    setFormData({
      ...formData,
      status,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/addparcel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();

        setFormData({
          sender: '',
          recipient: '',
          parcelFrom: '',
          parcelTo: '',
          status: '',
          deliveryTime: '',
          isDelivered: false,
          isPickedUp: false,
          location: '',
          timeline: [{ time: '', event: '' }],
        });
        Swal.fire({
          title: "Parcel Added Successfully!",
          text: "The new Parcel Entry has been added successfully to the database!",
          icon: "success"
        });

      } else {
        const error = await response.json();
        Swal.fire({
          icon: "error",
          title: "Parcel Not Added!",
          text: error.message,
        });
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 p-10 bg-gradient-to-br from-indigo-50 via-white to-indigo-100 shadow-2xl rounded-xl border border-gray-300">
      <h2 className="text-4xl font-bold text-gray-900 text-center mb-8">Add New Parcel</h2>

      <div className="grid grid-cols-1 gap-y-8 md:grid-cols-2 md:gap-x-12">
        {Object.entries({
          sender: 'Sender',
          recipient: 'Recipient',
          parcelFrom: 'Parcel From',
          parcelTo: 'Parcel To',
          location: 'Location',
        }).map(([name, label]) => (
          <div key={name} className="relative">
            <label className="block text-sm font-medium text-gray-800 mb-2">
              {label}
            </label>
            <input
              type="text"
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="block w-full rounded-xl border border-gray-300 shadow-md focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 py-3 px-5 text-gray-900 bg-white"
              required
            />
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">Status</h3>
        <div className="flex flex-wrap items-center space-x-4 space-y-4">
          {['Pending', 'In Transit', 'Delivered'].map((statusOption) => (
            <div key={statusOption} className="flex items-center space-x-3">
              <input
                type="radio"
                name="status"
                value={statusOption}
                checked={formData.status === statusOption}
                onChange={() => handleStatusChange(statusOption)}
                className="h-5 w-5 text-indigo-600 border-gray-300 rounded-full focus:ring-indigo-500"
              />
              <label className="text-lg font-medium text-gray-800">{statusOption}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">Timeline (Please add Time in DD-MM-YYYY)</h3>
        {formData.timeline.map((entry, index) => (
          <div key={index} className="bg-gradient-to-r from-gray-100 to-gray-200 p-6 rounded-xl shadow-lg mb-6">
            <div className="flex space-x-6">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time
                </label>
                <input
                  type="text"
                  placeholder="Enter Date of Event"
                  name="time"
                  value={entry.time}
                  onChange={(e) => handleTimelineChange(index, e)}
                  className="block w-full rounded-xl border border-gray-300 shadow-md focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 py-3 px-5 text-gray-900"
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event
                </label>
                <select
                  name="event"
                  value={entry.event}
                  onChange={(e) => handleTimelineChange(index, e)}
                  className="block w-full rounded-xl border border-gray-300 shadow-md focus:border-indigo-600 focus:ring focus:ring-indigo-600 focus:ring-opacity-50 py-3 px-5 text-gray-900"
                  required
                >
                  <option value="" disabled>Select an event</option>
                  <option value="Parcel Registered">Parcel Registered</option>
                  <option value="Awaiting Picked-up">Awaiting Picked-up</option>
                  <option value="Picked-up">Picked-up</option>
                  <option value="On the way (In Transit)">On the way (In Transit)</option>
                  <option value="Parcel Received at Destination Center">Parcel Received at Destination Center</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Parcel Delivered Successfully">Parcel Delivered Successfully</option>
                  <option value="Parcel Delayed">Parcel Delayed</option>
                  
                </select>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                const newTimeline = formData.timeline.filter((_, i) => i !== index);
                setFormData({ ...formData, timeline: newTimeline });
              }}
              className="mt-4 text-red-600 hover:text-red-800"
            >
              Remove Entry
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addTimelineEntry}
          className="inline-flex items-center px-6 py-3 border border-transparent text-lg font-medium rounded-md text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 transition-all duration-300 ease-in-out"
        >
          Add Timeline Entry
        </button>
      </div>

      <button 
        type="submit"
        className="w-full inline-flex justify-center px-6 py-3 mt-6 border border-transparent shadow-lg text-lg font-semibold rounded-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out"
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <Loader />
            <span className="ml-3">Adding Parcel...</span>
          </div>
        ) : (
          "Add Parcel"
        )}
      </button>
    </form>
  );
}

