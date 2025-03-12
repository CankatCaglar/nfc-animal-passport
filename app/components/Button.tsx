import { ReactNode } from 'react';
import Link from 'next/link';

type ButtonProps = {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  primaryBgColor?: string;
  primaryHoverBgColor?: string;
  secondaryTextColor?: string;
  secondaryHoverBgColor?: string;
  outlineBorderColor?: string;
  outlineTextColor?: string;
  outlineHoverBgColor?: string;
  outlineHoverTextColor?: string;
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
  primaryBgColor = 'bg-[#D08C60]',
  primaryHoverBgColor = 'hover:bg-[#C17A50]',
  secondaryTextColor = 'text-[#8B5A2B]',
  secondaryHoverBgColor = 'hover:bg-gray-100',
  outlineBorderColor = 'border-[#D08C60]',
  outlineTextColor = 'text-[#D08C60]',
  outlineHoverBgColor = 'hover:bg-[#D08C60]',
  outlineHoverTextColor = 'hover:text-white',
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: `${primaryBgColor} text-white ${primaryHoverBgColor} shadow-md hover:shadow-lg focus:ring-[#D08C60]`,
    secondary: `bg-white ${secondaryTextColor} ${secondaryHoverBgColor} shadow-md hover:shadow-lg focus:ring-white`,
    outline: `border-2 ${outlineBorderColor} ${outlineTextColor} ${outlineHoverBgColor} ${outlineHoverTextColor} shadow-md hover:shadow-lg focus:ring-[#D08C60]`,
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
  
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`;
  
  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {children}
      </Link>
    );
  }
  
  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
} 