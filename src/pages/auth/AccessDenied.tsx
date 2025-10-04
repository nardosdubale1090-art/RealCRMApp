// /src/pages/auth/AccessDenied.tsx

import React from 'react';
import { Link } from 'react-router-dom';

const AccessDenied: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h1 className="text-6xl font-bold text-red-500">403</h1>
      <p className="text-2xl font-semibold mt-4">Access Denied</p>
      <p className="mt-2 text-text-secondary">Sorry, you do not have permission to access this page.</p>
      <Link
        to="/"
        className="mt-6 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
      >
        Go to Dashboard
      </Link>
    </div>
  );
};

export default AccessDenied;
