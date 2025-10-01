import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const NotFound: React.FC = () => {
  const { user } = useAuth();
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <p className="text-2xl font-semibold mt-4">Page Not Found</p>
      <p className="mt-2 text-text-secondary">Sorry, the page you are looking for does not exist.</p>
      <Link
        to="/"
        className="mt-6 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
      >
        { user ? 'Go to Dashboard' : 'Go to Homepage'}
      </Link>
    </div>
  );
};

export default NotFound;