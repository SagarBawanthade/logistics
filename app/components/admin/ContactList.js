"use client";
import { useState, useEffect } from 'react';
import Loader from '../Loader';
import { FaCopy, FaEnvelope, FaPhone, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2'

export default function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/getContacts');
      const data = await response.json();
      if (data.success) {
        setContacts(data.contacts);
      } else {
        setError('Failed to fetch contacts.');
      }
    } catch (error) {
      setError('An error occurred while fetching contacts.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyEmail = (email) => {
    navigator.clipboard.writeText(email)
      .then(() => alert('Email copied to clipboard!'))
      .catch(err => console.error('Failed to copy email:', err));
  };

  const handleDeleteContact = async (email) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        const response = await fetch(`/api/deleteContact?email=${encodeURIComponent(email)}`, {
          method: 'DELETE',
        });
        const data = await response.json();
        if (data.success) {
          setContacts(contacts.filter(contact => contact.email !== email));
          Swal.fire({
            title: "Contact Deleted Successfully!",
            text: "Contact has been deleted successfully to database!",
            icon: "success"
          });
        } else {
          Swal.fire({
            title: "Contact Deletion Failed!",
            text: "Contact has not been deleted from database!",
            icon: "error"
          });
        }
      } catch (error) {
        alert('An error occurred while deleting the contact.');
      }
    }
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  const isNewContact = (createdAt) => {
    const oneDay = 24 * 60 * 60 * 1000;
    return (new Date() - new Date(createdAt)) < oneDay;
  };

  if (isLoading) return <Loader />;

  return (
    <section className="p-8 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 min-h-screen">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-8 text-center">Contact Management</h1>
        {error && <p className="text-red-500 mb-6 text-center bg-red-100 dark:bg-red-900 p-3 rounded-lg">{error}</p>}
        {contacts.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300 text-center text-xl bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">No contacts available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {contacts.map((contact) => (
              <div 
                key={contact.email} 
                className={`bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl ${isNewContact(contact.createdAt) ? 'border-l-4 border-indigo-500 bg-indigo-50 dark:bg-indigo-900' : ''}`}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-xl font-semibold text-gray-800 dark:text-gray-100 truncate">
                      {contact.firstName} {contact.lastName}
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleCopyEmail(contact.email)} 
                        className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors duration-300"
                        aria-label="Copy Email"
                      >
                        <FaCopy size={18} />
                      </button>
                      <button 
                        onClick={() => handleDeleteContact(contact.email)} 
                        className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors duration-300"
                        aria-label="Delete Contact"
                      >
                        <FaTrash size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                    <FaEnvelope className="mr-2 text-gray-400" />
                    <span className="text-sm truncate">{contact.email}</span>
                  </div>
                  {contact.phone && (
                    <div className="flex items-center text-gray-600 dark:text-gray-300 mb-4">
                      <FaPhone className="mr-2 text-gray-400" />
                      <span className="text-sm">{contact.phone}</span>
                    </div>
                  )}
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    {contact.message.length > 100 ? (
                      <>
                        {truncateText(contact.message, 100)}
                        <button
                          onClick={() => alert(contact.message)}
                          className="ml-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors duration-300"
                        >
                          Read More
                        </button>
                      </>
                    ) : (
                      contact.message
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
