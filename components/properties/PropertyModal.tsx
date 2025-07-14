// components/properties/PropertyModal.tsx
import React from 'react';
import { CardContent } from '@/components/ui/Card';
import Image from 'next/image';

export type Property = {
  title: string;
  price: string;
  location: string;
  image: string;
  beds: number;
  baths: number;
  size: string;
  description?: string;
};

type Props = {
  property: Property | null;
  onClose: () => void;
};

export const PropertyModal: React.FC<Props> = ({ property, onClose }) => {
  if (!property) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl text-gray-600 hover:text-black"
        >
          &times;
        </button>
        <Image src={property.image} alt={property.title} width={200} height={200} className="w-full h-64 object-cover rounded-t-lg" />
        <CardContent>
          <h2 className="text-2xl font-bold mb-2">{property.title}</h2>
          <p className="text-sm text-gray-500 mb-1">{property.location}</p>
          <p className="text-purple-600 font-semibold mb-3">{property.price}</p>
          <div className="text-sm text-gray-600 flex gap-4 mb-4">
            <span>🛏 {property.beds} Beds</span>
            <span>🛁 {property.baths} Baths</span>
            <span>📐 {property.size}</span>
          </div>
          <p className="text-gray-700 text-sm">
            {property.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.'}
          </p>
        </CardContent>
      </div>
    </div>
  );
};
