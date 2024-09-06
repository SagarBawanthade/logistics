import mongoose from 'mongoose';

const ParcelSchema = new mongoose.Schema({
  trackingNumber: { type: String, required: true, unique: true },
  sender: { type: String, required: true },
  recipient: { type: String, required: true },
  parcelFrom: { type: String, required: true },
  parcelTo: { type: String, required: true },
  status: { type: String, required: true },
  isDelivered: { type: Boolean, default: false },
  isPickedUp: { type: Boolean, default: false },
  location: { type: String },
  timeline: [
    {
      time: { type: String, required: true },
      event: { type: String, required: true },
    },
  ],
}, { timestamps: true });

export default mongoose.models.Parcel || mongoose.model('Parcel', ParcelSchema);
