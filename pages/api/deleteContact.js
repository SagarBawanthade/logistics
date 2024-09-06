// pages/api/deleteContact.js


import connectToDatabase from '../../lib/mongodb.js';
import Contact from '../../models/Contact.js';


export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required.' });
    }

    try {
      await connectToDatabase();

      // Delete contact from the database
      const result = await Contact.deleteOne({ email });

      if (result.deletedCount === 0) {
        return res.status(404).json({ success: false, message: 'Contact not found.' });
      }

      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error deleting contact:', error);
      res.status(500).json({ success: false, message: 'An error occurred while deleting the contact.' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
