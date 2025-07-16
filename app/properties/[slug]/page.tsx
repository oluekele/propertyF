'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import axiosWithAuth from '@/lib/axios';
import toast from 'react-hot-toast';

type Property = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  price: string;
  location: string;
  beds: string;
  baths: string;
  size: string;
  category: string;
  image: string;
};

export default function PropertyDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axiosWithAuth().get(`/properties/slug/${slug}`);
        setProperty(res.data);
      } catch (err) {
        console.error(err);
        toast.error('Property not found');
        router.push('/properties');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProperty();
    }
  }, [slug]);

  if (loading) return <p className="p-6 text-center">Loading property...</p>;
  if (!property) return <p className="p-6 text-center">Property not found.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 py-20">
      <Image
        src={`https://property-b.vercel.app${property.image}` || `http://localhost:5000${property.image}`}
        alt={property.title}
        width={800}
        height={400}
        className="w-full h-96 object-cover rounded-lg mb-6"
      />
      <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
      <p className="text-gray-600 mb-4">{property.location} • {property.category}</p>
      <p className="text-xl font-semibold text-blue-600 mb-4">{property.price}</p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <p><strong>Beds:</strong> {property.beds}</p>
        <p><strong>Baths:</strong> {property.baths}</p>
        <p><strong>Size:</strong> {property.size}</p>
        <p><strong>Category:</strong> {property.category}</p>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Description</h2>
        <p className="text-gray-700">{property.description}</p>
      </div>
    </div>
  );
}
