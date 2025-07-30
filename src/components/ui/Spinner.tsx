import React from 'react';
import { Loader } from 'lucide-react';

interface SpinnerProps {
  size?: number;
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 24, className = '' }) => (
  <Loader size={size} className={`animate-spin ${className}`} />
);

export default Spinner;
