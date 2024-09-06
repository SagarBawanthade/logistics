import mongoose from 'mongoose';
import connectToDatabase from '../../lib/mongodb.js';
import Parcel from '../../models/Parcel.js';

// Function to generate a unique tracking number
const generateTrackingNumber = async () => {
  const prefix = 'RE';
  const length = 15 - prefix.length;
  
  // Generate a random number with the required length
  const randomNumber = Math.floor(Math.random() * Math.pow(10, length)).toString().padStart(length, '0');
  const trackingNumber = prefix + randomNumber;

  // Check if the tracking number already exists in the database
  const existingParcel = await Parcel.findOne({ trackingNumber });
  if (existingParcel) {
    // Recursively generate a new tracking number if it already exists
    return generateTrackingNumber();
  }
  
  return trackingNumber;
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {
      sender,
      recipient,
      parcelFrom,
      parcelTo,
      status,
      isDelivered = false,
      isPickedUp = false,
      location,
      timeline = [],
    } = req.body;

    console.log('Request payload:', req.body);

    if (!sender || !recipient || !parcelFrom || !parcelTo || !status || !timeline.length) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      await connectToDatabase(); // Ensure the database connection is established

      // Generate a new tracking number
      const trackingNumber = await generateTrackingNumber();

      // Create a new parcel document
      const newParcel = new Parcel({
        trackingNumber,
        sender,
        recipient,
        parcelFrom,
        parcelTo,
        status,
        isDelivered,
        isPickedUp,
        location,
        timeline,
      });

      // Save the new parcel document
      const result = await newParcel.save();

      res.status(201).json(result);
      console.log('Parcel added successfully:', result);
    } catch (error) {
      console.error('Error adding parcel:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
