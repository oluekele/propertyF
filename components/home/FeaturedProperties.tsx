'use client'

import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import axiosWithAuth from "@/lib/axios";
import toast from "react-hot-toast";

type Property = {
  _id: string;
  title: string;
  slug: string;
  price: string;
  location: string;
  beds: string;
  baths: string;
  size: string;
  category: string;
  image: string;
};

type Props = {
  preferredCategory?: string; // optional prop to filter first
};

export const FeaturedProperties = ({ preferredCategory }: Props) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axiosWithAuth().get(`/properties`);
        const allProps: Property[] = res.data;
        console.log(res)
        // Sort by latest (assuming backend sends in order; reverse if needed)
        const sorted = [...allProps].reverse();

        let preferred: Property[] = [];
        let others: Property[] = [];

        if (preferredCategory) {
          preferred = sorted.filter(
            (p) => p.category.toLowerCase() === preferredCategory.toLowerCase()
          );
          others = sorted.filter(
            (p) => p.category.toLowerCase() !== preferredCategory.toLowerCase()
          );
        } else {
          preferred = sorted;
        }

        // Combine and take at most 6
        const finalList = [...preferred, ...others].slice(0, 6);
        setProperties(finalList);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch properties");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [preferredCategory]);

  return (
    <section className="bg-gray-50 py-16 px-6">
      <div className="w-full lg:w-4/5 mx-auto">
        <h3 className="text-3xl font-bold text-center mb-6">Featured Properties</h3>
        <p className="text-center text-gray-600 mb-8">
          Discover our hand-picked selection of exclusive properties and premium vehicles.
        </p>

        {loading ? (
          <p>Loading properties...</p>
        ) : properties.length === 0 ? (
          <p>No properties found.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property, i) => (
              <Card key={i} className="overflow-hidden shadow-md">
                <Image
                  src={`https://property-b.vercel.app${property.image}` || `http://localhost:5000${property.image}`}
                  alt={property.title}
                  width={200}
                  height={100}
                  className="w-full h-48 object-cover"
                />
                <CardContent>
                  <h4 className="font-semibold text-lg mb-1">{property.title}</h4>
                  <p className="text-sm text-gray-500 mb-2">
                    {property.price} • {property.location}
                  </p>
                  <Link href={`/properties/${property.slug}`}>
                    <Button variant="link" className="text-sm p-0 cursor-pointer">
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <Link
            href="/properties"
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer py-3 px-3 rounded-lg text-white"
          >
            View All Properties
          </Link>
        </div>
      </div>
    </section>
  );
};

