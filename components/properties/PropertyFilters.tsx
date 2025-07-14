'use client'

import { Input } from '@/components/ui/Input';

export type PropertyFilterValues = {
  location: string;
  priceRange: string;
  searchQuery: string;
};

type Props = {
  filters: PropertyFilterValues;
  onChange: (filters: PropertyFilterValues) => void;
};

const locations = ['All Locations', 'Lagos', 'Abuja', 'Miami', 'New York', 'Texas'];
const priceRanges = [
  'All Prices',
  'Under $500k',
  '$500k - $1M',
  '$1M - $2M',
  '$2M+',
];

export const PropertyFilters: React.FC<Props> = ({ filters, onChange }) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center items-center mb-6">
      <select
        value={filters.location}
        onChange={(e) => onChange({ ...filters, location: e.target.value })}
        className="border border-gray-300 rounded px-4 py-2 text-sm"
      >
        {locations.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>

      <select
        value={filters.priceRange}
        onChange={(e) => onChange({ ...filters, priceRange: e.target.value })}
        className="border border-gray-300 rounded px-4 py-2 text-sm"
      >
        {priceRanges.map((range) => (
          <option key={range} value={range}>
            {range}
          </option>
        ))}
      </select>

      <Input
        placeholder="Search properties..."
        className="w-full sm:w-64"
        value={filters.searchQuery}
        onChange={(e) => onChange({ ...filters, searchQuery: e.target.value })}
      />
    </div>
  );
};
