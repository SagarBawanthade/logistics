import connectToDatabase from '../../lib/mongodb.js';
import Parcel from '../../models/Parcel.js';

export default async function handler(req, res) {
  const { trackingNumber } = req.query;

  if (!trackingNumber) {
    return res.status(400).json({ message: 'Tracking number is required' });
  }

  try {
    await connectToDatabase(); // Ensure the connection is established

    if (req.method === 'PUT') {
      const result = await Parcel.updateOne(
        { trackingNumber },
        { $set: req.body }
      );

      if (result.matchedCount === 1 && result.modifiedCount === 1) {
        res.status(200).json({ message: 'Parcel updated successfully' });
      } else if (result.matchedCount === 1) {
        res.status(200).json({ message: 'Parcel updated, but no changes were made' });
      } else {
        res.status(404).json({ message: 'Parcel not found' });
      }
    } else if (req.method === 'DELETE') {
      const result = await Parcel.deleteOne({ trackingNumber });

      if (result.deletedCount === 1) {
        res.status(200).json({ message: 'Parcel deleted successfully' });
      } else {
        res.status(404).json({ message: 'Parcel not found' });
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ message: 'Error processing request', error: error.message });
  }
}
