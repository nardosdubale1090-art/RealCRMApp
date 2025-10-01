import React from 'react';

export const UnitCardSkeleton: React.FC = () => {
  return (
    <div className="bg-card rounded-xl shadow-soft overflow-hidden animate-pulse">
      <div className="bg-secondary h-48 w-full"></div>
      <div className="p-4">
        <div className="h-8 bg-secondary rounded w-1/3"></div>
        <div className="h-6 bg-secondary rounded w-3/4 mt-2"></div>
        <div className="h-4 bg-secondary rounded w-1/2 mt-2"></div>
        <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
            <div className="flex items-center space-x-4">
                <div className="h-6 w-12 bg-secondary rounded"></div>
                <div className="h-6 w-16 bg-secondary rounded"></div>
            </div>
        </div>
      </div>
    </div>
  );
};