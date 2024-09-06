// pages/api/getContacts.js
import connectToDatabase from '../../lib/mongodb.js';
import Contact from '../../models/Contact.js';


export default async function handler(req, res) {

  await connectToDatabase();

  try {
    // Fetch contacts from the database
    const contacts = await Contact.find().exec(); // `.lean()` returns plain JavaScript objects

    // Return contacts as JSON
    res.status(200).json({ success: true, contacts });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch contacts.' });
  }
}
