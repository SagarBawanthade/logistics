"use client";

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ParcelPrint from '../../../components/admin/ParcelPrint.js';

export default function PrintParcelPage() {
  const searchParams = useSearchParams();
  const parcelParam = searchParams.get('parcel');

  let parcelData = null;
  if (parcelParam) {
    try {
      const decodedParcel = decodeURIComponent(parcelParam);
      parcelData = JSON.parse(decodedParcel);
    } catch (error) {
      console.error("Failed to parse parcel data:", error);
    }
  }

  if (!parcelData) {
    return <p className="text-center text-lg font-semibold text-red-600">No parcel data available.</p>;
  }

  return (
    <Suspense fallback={<p className="text-center text-lg font-semibold">Loading...</p>}>
      <ParcelPrint parcel={parcelData} />
    </Suspense>
  );
}
