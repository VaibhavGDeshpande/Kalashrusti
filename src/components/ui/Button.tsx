'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

type ButtonVariant = 'primary' | 'festive' | 'gold' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  iconPosition = 'left',
  className = '',
  disabled = false,
  ...props
}) => {
  const baseStyles = 'relative inline-flex items-center justify-center font-medium tracking-wide transition-all rounded-full overflow-hidden select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C9A24B]/50 disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'text-xs px-4 py-2 gap-1.5 shadow-sm',
    md: 'text-sm px-6 py-3 gap-2 shadow',
    lg: 'text-base px-8 py-3.5 gap-2.5 shadow-md',
  };

  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      'bg-[#6B1D2A] text-[#FFF8EC] border border-[#8E2737] hover:bg-[#4A121C] shadow-[0_4px_14px_rgba(107,29,42,0.3)] hover:shadow-[0_6px_20px_rgba(107,29,42,0.4)]',
    festive:
      'bg-gradient-to-r from-[#F5A623] to-[#D4880D] text-[#231F20] font-semibold border border-[#FFBD59] hover:brightness-105 shadow-[0_4px_18px_rgba(245,166,35,0.4)] hover:shadow-[0_6px_24px_rgba(245,166,35,0.6)]',
    gold:
      'bg-gradient-to-r from-[#C9A24B] to-[#A5802E] text-[#FFF8EC] border border-[#DFC47F] hover:brightness-105 shadow-[0_4px_14px_rgba(201,162,75,0.35)]',
    outline:
      'bg-transparent text-[#6B1D2A] border-2 border-[#C9A24B] hover:bg-[#FFF8EC] hover:border-[#6B1D2A]',
    ghost:
      'bg-transparent text-[#6B1D2A] hover:bg-[#6B1D2A]/10 border border-transparent',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="inline-flex shrink-0">{icon}</span>}
    </motion.button>
  );
};
