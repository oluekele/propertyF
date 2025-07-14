// components/ui/Input.tsx
import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<InputProps> = ({ className = '', ...props }) => {
  return (
    <input
      className={`border border-gray-300 rounded px-4 py-2 outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${className}`}
      {...props}
    />
  );
};
