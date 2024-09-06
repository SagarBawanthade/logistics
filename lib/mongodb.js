import mongoose from 'mongoose';

const MONGODB_URI = "mongodb+srv://royalexpress:royalexpress@royalexpress.r982qug.mongodb.net/?retryWrites=true&w=majority&appName=royalexpress";

if (!MONGODB_URI) {
  throw new Error('Please add your Mongo URI to the .env.local file');
}

let cachedClient = null;
let isConnected = false;

export default async function connectToDatabase() {
  if (isConnected) {
    return cachedClient;
  }

  try {
    cachedClient = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('Connected to MongoDB');
    return cachedClient;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}
