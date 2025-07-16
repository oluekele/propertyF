'use client';

import { useAdminGuard } from '@/utils/useAuth';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import Image from 'next/image';
import axiosWithAuth from '@/lib/axios';

type Property = {
  _id: string;
  title: string;
  slug: string;
  price: string;
  location: string;
  beds: string,
  baths: string,
  size: string,
  category: string;
  image: string;
};

export default function AdminPropertiesPage() {
  useAdminGuard(); 

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axiosWithAuth().get(`/properties`);
        setProperties(res.data);
      } catch (err) {
        console.error(err);
        toast.error('Failed to fetch properties');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  console.log("Properties" , properties)

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this property?')) return;

    try {
      await axiosWithAuth().delete(`/properties/${id}`);
      toast.success('Property deleted');
      setProperties((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
      toast.error('Delete failed');
    }
  };

  return (
    <div className="w-full lg:w-4/5 mx-auto py-20 px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">All Properties</h2>
        <Link
          href="/admin/properties/add"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Property
        </Link>
      </div>

      {loading ? (
        <p>Loading properties...</p>
      ) : properties.length === 0 ? (
        <p>No properties found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 border">Image</th>
                <th className="p-3 border">Title</th>
                <th className="p-3 border">Slug</th>
                <th className="p-3 border">Location</th>
                <th className="p-3 border">Beds</th>
                <th className="p-3 border">Baths</th>
                <th className="p-3 border">Price</th>
                <th className="p-3 border">Size</th>
                <th className="p-3 border">Category</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((p) => (
                <tr key={p._id}>
                  <td className="p-3 border">
                    <Image
                      src={`https://property-b.vercel.app/${p.image}` || `http://localhost:5000${p.image}`}
                      alt={p.title}
                      width={100}
                      height={100}
                      className="w-20 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="p-3 border">{p.title}</td>
                  <td className="p-3 border">{p.slug}</td>
                  <td className="p-3 border">{p.location}</td>
                  <td className="p-3 border">{p.beds}</td>
                  <td className="p-3 border">{p.baths}</td>
                  <td className="p-3 border">{p.price}</td>
                  <td className="p-3 border">{p.size}</td>
                  <td className="p-3 border">{p.category}</td>
                  <td className="p-3 flex gap-2">
                    <Link
                      href={`/admin/properties/${p._id}`}
                      className="text-white bg-blue-600 w-full h-full text-center hover:bg-blue-400 rounded-lg py-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="text-red-600 w-full h-full text-center rounded-lg py-2 hover:bg-gray-300 border border-gray-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
