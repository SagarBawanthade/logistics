"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import QRCode from 'qrcode.react';
import Image from 'next/image';
import navlogo from '../../../public/images/navlogo.png';

const getQRCodeData = (parcel) => {
  const { trackingNumber, status, sender, recipient, parcelFrom, parcelTo, location } = parcel;
  return JSON.stringify(
    { trackingNumber, status, sender, recipient, parcelFrom, parcelTo, location },
    null,
    2
  );
};

export default function ParcelPrint({ parcel }) {
  const router = useRouter();

  useEffect(() => {
    if (!parcel) {
      router.push('/pages/parcel');
    }
  }, [parcel, router]);

  if (!parcel) return null;

  const qrCodeValue = getQRCodeData(parcel);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <header className="mb-6 flex items-center justify-between">
        <Image src={navlogo} alt="Brand Logo" className="w-24 h-auto" />
        <h1 className="text-3xl font-bold text-gray-800">Royal Express (Priti Tito DasGupta)</h1>
      </header>
      <h2 className='text-center text-2xl p-4'>Invoice</h2>
        <p className='text-center'><strong>GSTIN:</strong>27DQGPD2336M1ZQ</p>
      

      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Parcel Details</h2>
        <table className="w-full text-left border-collapse">
          <tbody>
            <tr className="border-b border-gray-200">
              <th className="py-2 px-4 font-semibold text-gray-600">Tracking Number</th>
              <td className="py-2 px-4">{parcel.trackingNumber}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <th className="py-2 px-4 font-semibold text-gray-600">Status</th>
              <td className="py-2 px-4">{parcel.status}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <th className="py-2 px-4 font-semibold text-gray-600">Sender</th>
              <td className="py-2 px-4">{parcel.sender}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <th className="py-2 px-4 font-semibold text-gray-600">Recipient</th>
              <td className="py-2 px-4">{parcel.recipient}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <th className="py-2 px-4 font-semibold text-gray-600">From</th>
              <td className="py-2 px-4">{parcel.parcelFrom}</td>
            </tr>
            <tr className="border-b border-gray-200">
              <th className="py-2 px-4 font-semibold text-gray-600">To</th>
              <td className="py-2 px-4">{parcel.parcelTo}</td>
            </tr>
            <tr>
              <th className="py-2 px-4 font-semibold text-gray-600">Location</th>
              <td className="py-2 px-4">{parcel.location}</td>
            </tr>
          </tbody>
        </table>
        <div className="mt-6 flex justify-center">
          <QRCode value={qrCodeValue} size={256} />
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={handlePrint}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
          >
            Print
          </button>
        </div>
      </div>
    </div>
  );
}
