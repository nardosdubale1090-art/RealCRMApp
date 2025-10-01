import React, { useEffect, useState } from 'react';
import { ShieldCheckIcon } from './Icons';

interface ToastProps {
  message: string;
}

const Toast: React.FC<ToastProps> = ({ message }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2800); // Start fading out before it's removed
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`flex items-center bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}
    >
      <ShieldCheckIcon className="h-5 w-5 mr-2" />
      <span className="font-medium">{message}</span>
    </div>
  );
};

export default Toast;
