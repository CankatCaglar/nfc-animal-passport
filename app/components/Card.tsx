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
  hoverEffect = false,
}: CardProps & { hoverEffect?: boolean }) {
  return (
    <div
      className={`flex flex-col items-center justify-center min-h-[300px] h-full ${bgColor} rounded-2xl shadow-xl border ${borderColor} ${className} transition-all duration-300 ${hoverEffect ? 'hover:-translate-y-2 hover:shadow-2xl' : ''}`}
      style={{ maxWidth: 370, minWidth: 210 }}
    >
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
      <div className="flex flex-col items-center justify-center flex-1 w-full px-6 py-8">
        {icon && (
          <div className={`w-16 h-16 rounded-full ${iconBgColor} flex items-center justify-center shadow-lg mb-5`} style={{boxShadow:'0 4px 24px 0 rgba(208,140,96,0.15)'}}>
            <span className="text-white text-3xl flex items-center justify-center">{icon}</span>
          </div>
        )}
        <h3 className={`text-2xl font-bold ${titleColor} mb-3 text-center`}>{title}</h3>
        <p className={`${textColor} text-base text-center mb-3 leading-relaxed`}>{description}</p>
        {children}
      </div>
    </div>
  );
} 