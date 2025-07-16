'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PropertyFilters, PropertyFilterValues } from '@/components/properties/PropertyFilters';
import { SortControl, SortOption } from '@/components/properties/SortControl';
import { Pagination } from '@/components/properties/Pagination';
import { Card, CardContent } from '@/components/ui/Card';
import Image from 'next/image';
// import { allProperties } from '@/lib/property';
import { CategoryFilter } from '@/components/properties/CategoryFilter';
import axiosWithAuth from '@/lib/axios';
import toast from 'react-hot-toast';


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
export default function PropertiesPage() {
   const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [filters, setFilters] = useState<PropertyFilterValues>({
    location: 'All Locations',
    priceRange: 'All Prices',
    searchQuery: '',
  });
  const [sortBy, setSortBy] = useState<SortOption>('Default');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter
  const filtered = properties.filter((p) => {
    const matchLocation =
      filters.location === 'All Locations' || p.location.includes(filters.location);

    const matchPrice = (() => {
      const price = parseInt(p.price.replace(/[^0-9]/g, ''));
      if (filters.priceRange === 'Under $500k') return price < 500000;
      if (filters.priceRange === '$500k - $1M') return price >= 500000 && price <= 1000000;
      if (filters.priceRange === '$1M - $2M') return price > 1000000 && price <= 2000000;
      if (filters.priceRange === '$2M+') return price > 2000000;
      return true;
    })();

    const matchSearch =
      p.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(filters.searchQuery.toLowerCase());

      const matchCategory =
    category === 'all' || p.category.toLowerCase() === category.toLowerCase();

     return matchLocation && matchPrice && matchSearch && matchCategory;
  });

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    const getPrice = (p: string) => parseInt(p.replace(/[^0-9]/g, ''));
    const getSize = (s: string) => parseInt(s.replace(/[^0-9]/g, ''));

    switch (sortBy) {
      case 'Price (Low to High)':
        return getPrice(a.price) - getPrice(b.price);
      case 'Price (High to Low)':
        return getPrice(b.price) - getPrice(a.price);
      case 'Size (Small to Large)':
        return getSize(a.size) - getSize(b.size);
      case 'Size (Large to Small)':
        return getSize(b.size) - getSize(a.size);
      default:
        return 0;
    }
  });

  // Paginate
  const paginated = sorted.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  
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


  return (
    <section className="py-20 px-6 w-full lg:w-4/5 mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Discover Your Next Property</h2>
      <CategoryFilter selected={category} onChange={setCategory} />
      <PropertyFilters filters={filters} onChange={setFilters} />
      <SortControl sortBy={sortBy} onChange={setSortBy} />
      {loading ? (
        <p>Loading properties...</p>
      ) : properties.length === 0 ? (
        <p>No properties found.</p>
      ) : (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginated.map((p, i) => (
          <Link key={i} href={`/properties/${p._id}`}>
            <Card className="cursor-pointer hover:shadow-md transition">
              <Image src={`https://property-b.vercel.app${p.image}` || `http://localhost:5000${p.image}`} alt={p.title} width={300} height={300} className="w-full h-48 object-cover" />
              <CardContent>
                <h4 className="font-semibold text-lg mb-1">{p.title}</h4>
                <p className="text-sm text-gray-500 mb-1">{p.location}</p>
                <p className="text-primary font-semibold mb-2">{p.price}</p>
                <div className="text-xs text-gray-500 flex gap-4">
                  <span>🛏 {p.beds} Beds</span>
                  <span>🛁 {p.baths} Baths</span>
                  <span>📐 {p.size}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(sorted.length / itemsPerPage)}
        onPageChange={setCurrentPage}
      />
    </section>
  );
}