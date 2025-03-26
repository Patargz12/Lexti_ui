import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({
  children,
  variant = 'default',
  size = 'md',
  className,
  disabled,
  ...props
}: ButtonProps) {
  // Base classes for all button variants
  const baseClasses = "font-medium transition-colors rounded-md border";
  
  // Variant-specific classes
  const variantClasses = {
    default: "bg-white text-gray-600 border-gray-300 dark:border-none hover:bg-gray-50 disabled:hover:bg-white",
    primary: "bg-tertiary-500 text-white hover:bg-tertiary-500/90 disabled:hover:bg-tertiary-500",
    secondary: "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200 disabled:hover:bg-gray-100",
    accent: `bg-accent-500 text-white hover:bg-accent-500/90 dark:bg-tertiary-500 hover:dark:bg-tertiary-500/65 
      disabled:bg-gray-300 disabled:text-gray-900 disabled:border-0 disabled:hover:bg-gray-200 dark:disabled:bg-gray-200 dark:disabled:hover:bg-gray-200`,
  };
  
  // Size-specific classes
  const sizeClasses = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  // Disabled classes - removed opacity since we're handling it in variant classes
  const disabledClasses = disabled ? 'cursor-not-allowed' : '';
  
  // Combine all classes
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className || ''}`;
  
  return (
    <button className={buttonClasses} disabled={disabled} {...props}>
      {children}
    </button>
  );
} 