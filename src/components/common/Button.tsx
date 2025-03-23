import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({
  children,
  variant = 'default',
  size = 'md',
  className,
  ...props
}: ButtonProps) {
  // Base classes for all button variants
  const baseClasses = "font-medium transition-colors rounded-md border";
  
  // Variant-specific classes
  const variantClasses = {
    default: "bg-white text-gray-600 border-gray-200 hover:bg-gray-50",
    primary: "bg-[#202c3c] text-white border-indigo-500 hover:bg-indigo-600",
    secondary: "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200",
  };
  
  // Size-specific classes
  const sizeClasses = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };
  
  // Combine all classes
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className || ''}`;
  
  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
} 