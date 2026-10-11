import React from 'react';

type BadgeVariant = 'marigold' | 'maroon' | 'gold' | 'terracotta' | 'subtle';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'marigold',
  className = '',
  icon,
}) => {
  const variantStyles: Record<BadgeVariant, string> = {
    marigold: 'bg-[#F5A623]/15 text-[#B87005] border-[#F5A623]/30',
    maroon: 'bg-[#6B1D2A] text-[#FFF8EC] border-[#8E2737]',
    gold: 'bg-[#C9A24B]/15 text-[#8F6A1E] border-[#C9A24B]/35',
    terracotta: 'bg-[#C45A38]/15 text-[#9E3F1F] border-[#C45A38]/30',
    subtle: 'bg-[#FFF8EC] text-[#6B1D2A] border-[#C9A24B]/20',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase border shadow-2xs backdrop-blur-xs ${variantStyles[variant]} ${className}`}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      {children}
    </span>
  );
};
