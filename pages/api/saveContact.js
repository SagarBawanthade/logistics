// pages/api/saveContact.js

import connectToDatabase from '../../lib/mongodb.js';
import Contact from '../../models/Contact.js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await connectToDatabase();

      const { firstName, lastName, email, message } = req.body;

      if (!firstName || !lastName || !email || !message) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
      }

      const contact = new Contact({
        firstName,
        lastName,
        email,
        message,
      });

      await contact.save();

      return res.status(200).json({ success: true, message: 'Contact saved successfully!' });
    } catch (error) {
      console.error('Error saving contact:', error);
      return res.status(500).json({ success: false, message: 'An error occurred while saving the contact.', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
