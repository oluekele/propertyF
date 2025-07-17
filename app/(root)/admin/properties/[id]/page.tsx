'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import { useAdminGuard } from '@/utils/useAuth';
import axiosWithAuth from '@/lib/axios';

export default function EditPropertyPage() {
  const router = useRouter();
  const params = useParams();
   useAdminGuard();
  const id = params.id;

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
  const [existingImage, setExistingImage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosWithAuth().get(`/properties/${id}`);
        const property = res.data;

        setForm({
          title: property.title,
          slug: property.slug,
          description: property.description,
          price: property.price,
          location: property.location,
          beds: property.beds,
          baths: property.baths,
          size: property.size,
          category: property.category,
        });
        
        console.log(property)
        setExistingImage(property.image);
        console.log(existingImage)
      } catch (err) {
        console.log(err)
        toast.error('Failed to load property');
        router.push('/admin/properties');
      }
    };

    fetchData();
  }, [id, router]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));
    if (image) data.append('image', image);

    try {
      await axiosWithAuth().put(`/properties/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Property updated');
      router.push('/admin/properties');
    } catch (err) {
      console.error(err);
      toast.error('Update failed');
    }
  };

  return (
    <div className="w-full lg:w-4/5 mx-auto py-20 px-4">
      <h2 className="text-2xl font-bold mb-6">Edit Property</h2>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
        <input
          type="text"
          name="title"
          placeholder="Title *"
          value={form.title}
          onChange={handleChange}
          className="border w-full p-2 rounded"
          required
        />
        <input
          type="text"
          name="slug"
          placeholder="Slug *"
          value={form.slug}
          onChange={handleChange}
          className="border w-full p-2 rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border w-full p-2 rounded"
        />

        <input
          type="text"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="border w-full p-2 rounded"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="border w-full p-2 rounded"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="beds"
            placeholder="Beds"
            value={form.beds}
            onChange={handleChange}
            className="border w-full p-2 rounded"
          />
          <input
            type="number"
            name="baths"
            placeholder="Baths"
            value={form.baths}
            onChange={handleChange}
            className="border w-full p-2 rounded"
          />
        </div>

        <input
          type="text"
          name="size"
          placeholder="Size"
          value={form.size}
          onChange={handleChange}
          className="border w-full p-2 rounded"
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border w-full p-2 rounded"
          required
        >
          <option value="">-- Select Category --</option>
          <option value="Residential">Residential</option>
          <option value="Commercial">Commercial</option>
          <option value="Land">Land</option>
          <option value="Vehicle">Vehicle</option>
        </select>

        {existingImage && (
          <Image
            src={`https://property-b.vercel.app${existingImage}` || `http://localhost:5000${existingImage}`}
            width={100}
            height={100}
            alt="Existing Property"
            className="w-full max-w-xs rounded border shadow"
          />
        )}

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="border w-full p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Update Property
        </button>
      </form>
    </div>
  );
}
