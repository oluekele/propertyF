// components/properties/Pagination.tsx
import React from 'react';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center mt-10 gap-2">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded border text-sm ${
            page === currentPage
              ? 'bg-primary text-white'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};
