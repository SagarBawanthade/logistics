// pages/api/findparcel.js
import connectToDatabase from '../../lib/mongodb.js';
import Parcel from '../../models/Parcel.js';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { trackingNumber } = req.query;

    if (!trackingNumber) {
      return res.status(400).json({ error: 'Tracking number is required' });
    }

    try {
      const db = await connectToDatabase();
      const parcel = await Parcel.findOne({ trackingNumber });

      if (!parcel) {
        return res.status(404).json({ error: 'Parcel not found' });
      }

      res.status(200).json(parcel);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}


