import connectToDatabase from '../../lib/mongodb.js';
import Parcel from '../../models/Parcel.js';

export default async function handler(req, res) {
  try {
    await connectToDatabase(); // Ensure this is correctly connecting to your DB

    if (req.method === 'GET') {
      const parcels = await Parcel.find({}).exec(); // Fetch all parcels
      res.status(200).json(parcels);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Failed to fetch parcels:', error); // Log the error to server console
    res.status(500).json({ message: 'Failed to fetch parcels', error: error.message });
  }
}
