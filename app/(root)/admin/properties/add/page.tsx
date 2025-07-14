'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useAdminGuard } from '@/utils/useAuth';
import axiosWithAuth from '@/lib/axios';

export default function AddPropertyPage() {
  const router = useRouter();
  useAdminGuard();

  const [form, setForm] = useState({
    title: '',
    slug: '',
    description: '',
    price: '',
    location: '',
    beds: '',
    baths: '',
    size: '',
    category: '',
  });
  const [image, setImage] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.category || !image) {
      return toast.error('Title, category, and image are required.');
    }

    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));
    if (image) data.append('image', image);

    try {
      await axiosWithAuth().post(`/properties`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true, 
      });

      toast.success('Property created');
      router.push('/admin/properties');
    } catch (err) {
      console.error(err);
      toast.error('Failed to create property');
    }
  };

  return (
    <div className="w-full lg:w-4/5 mx-auto py-20 px-4">
      <h2 className="text-2xl font-bold mb-6">Add New Property</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
        <input type="text" name="title" placeholder="Title *" value={form.title} onChange={handleChange} className="border w-full p-2 rounded" required />
        <input type="text" name="slug" placeholder="slug *" value={form.slug} onChange={handleChange} className="border w-full p-2 rounded" required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="border w-full p-2 rounded" />
        <input type="text" name="price" placeholder="Price" value={form.price} onChange={handleChange} className="border w-full p-2 rounded" />
        <input type="text" name="location" placeholder="Location" value={form.location} onChange={handleChange} className="border w-full p-2 rounded" />
        <div className="grid grid-cols-2 gap-4">
          <input type="number" name="beds" placeholder="Beds" value={form.beds} onChange={handleChange} className="border w-full p-2 rounded" />
          <input type="number" name="baths" placeholder="Baths" value={form.baths} onChange={handleChange} className="border w-full p-2 rounded" />
        </div>
        <input type="text" name="size" placeholder="Size (e.g., 600sqm)" value={form.size} onChange={handleChange} className="border w-full p-2 rounded" />
        <select name="category" value={form.category} onChange={handleChange} className="border w-full p-2 rounded" required>
          <option value="">-- Select Category --</option>
          <option value="Residential">Residential</option>
          <option value="Commercial">Commercial</option>
          <option value="Land">Land</option>
          <option value="Vehicle">Vehicle</option>
        </select>
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} className="border w-full p-2 rounded" required />
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Add Property</button>
      </form>
    </div>
  );
}
