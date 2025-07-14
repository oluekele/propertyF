// components/ui/Button.tsx
import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'outline' | 'link';
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  className = '',
  children,
  ...props
}) => {
  const base = 'px-4 py-2 rounded font-medium transition-all duration-300';

  const variants: Record<string, string> = {
    default: 'bg-primary text-white hover:bg-secondary',
    outline: 'border border-primary text-primary hover:bg-primary hover:text-white',
    link: 'text-primary underline hover:text-secondary',
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};
