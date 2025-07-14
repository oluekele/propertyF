// components/properties/SortControl.tsx
import React from 'react';

export type SortOption = 'Default' | 'Price (Low to High)' | 'Price (High to Low)' | 'Size (Small to Large)' | 'Size (Large to Small)';

type Props = {
  sortBy: SortOption;
  onChange: (value: SortOption) => void;
};

const options: SortOption[] = [
  'Default',
  'Price (Low to High)',
  'Price (High to Low)',
  'Size (Small to Large)',
  'Size (Large to Small)',
];

export const SortControl: React.FC<Props> = ({ sortBy, onChange }) => {
  return (
    <div className="mb-6 text-center">
      <label className="text-sm mr-2 font-medium">Sort by:</label>
      <select
        className="border border-gray-300 rounded px-4 py-2 text-sm"
        value={sortBy}
        onChange={(e) => onChange(e.target.value as SortOption)}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};
