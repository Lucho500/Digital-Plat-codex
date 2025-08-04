import React from 'react';
import { User } from 'lucide-react';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fallback?: string;
  status?: 'online' | 'offline' | 'busy' | 'away';
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'md',
  fallback,
  status
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-8 h-8 text-xs';
      case 'lg':
        return 'w-12 h-12 text-base';
      case 'xl':
        return 'w-16 h-16 text-lg';
      default:
        return 'w-10 h-10 text-sm';
    }
  };

  const getStatusClasses = () => {
    switch (status) {
      case 'online':
        return 'bg-success';
      case 'offline':
        return 'bg-gray-400';
      case 'busy':
        return 'bg-error';
      case 'away':
        return 'bg-warning';
      default:
        return '';
    }
  };

  const getFallbackContent = () => {
    if (fallback) {
      return fallback.slice(0, 2).toUpperCase();
    }
    return <User className="w-1/2 h-1/2" />;
  };

  return (
    <div className="relative inline-block">
      <div className={`
        ${getSizeClasses()}
        rounded-full overflow-hidden flex items-center justify-center
        ${!src ? 'bg-primary/10 text-primary' : ''}
      `}>
        {src ? (
          <img
            src={src}
            alt={alt || 'Avatar'}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          getFallbackContent()
        )}
      </div>
      {status && (
        <span className={`
          absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white
          ${getStatusClasses()}
        `}></span>
      )}
    </div>
  );
};

export default Avatar;