import { ReactNode } from 'react';
import Image from 'next/image';

type CardProps = {
  title: string;
  description: string;
  icon?: string;
  image?: string;
  children?: ReactNode;
  className?: string;
  bgColor?: string;
  iconBgColor?: string;
  titleColor?: string;
  textColor?: string;
  borderColor?: string;
};
export default function Card({
  title,
  description,
  icon,
  image,
  children,
  className = '',
  bgColor = 'bg-white',
  iconBgColor = 'bg-[#D08C60]',
  titleColor = 'text-[#797D62]',
  textColor = 'text-[#997B66]',
  borderColor = 'border-[#D9AE94]',
}: CardProps) {
  return (
    <div className={`${bgColor} rounded-lg shadow-md overflow-hidden border ${borderColor} ${className}`}>
      {image && (
        <div className="relative h-48 w-full">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-start">
          {icon && (
            <div className="mr-4 flex-shrink-0">
              <div className={`w-12 h-12 rounded-full ${iconBgColor} flex items-center justify-center shadow-md`}>
                <span className="text-white text-xl">{icon}</span>
              </div>
            </div>
          )}
          
          <div>
            <h3 className={`text-xl font-semibold ${titleColor} mb-2`}>{title}</h3>
            <p className={`${textColor} mb-4`}>{description}</p>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
} 