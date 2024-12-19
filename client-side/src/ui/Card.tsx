import React from 'react';
import { cn } from '@/helpers/lib/utilis';

interface CardProps {
  title: string;
  description?: string;
  imageSrc?: string;
  actions?: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  imageSrc,
  actions,
  className,
}) => {
  return (
    <div
      className={cn(
        'bg-white shadow-md rounded-lg overflow-hidden border border-gray-200',
        className
      )}
    >
      {imageSrc && (
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {description && (
          <p className="text-sm text-gray-600 mt-2">{description}</p>
        )}
        {actions && <div className="mt-4 flex space-x-2">{actions}</div>}
      </div>
    </div>
  );
};

export default Card;
