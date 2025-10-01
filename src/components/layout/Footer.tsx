import React from 'react';
import { Link } from 'react-router-dom';
import { BuildingStorefrontIcon } from '../shared/Icons';

const Footer: React.FC = () => {
  const linkClasses = "text-text-secondary hover:text-text-primary hover:underline transition-colors text-sm";
  
  return (
    <footer className="bg-secondary border-t border-border mt-auto">
      <div className="container mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center">
              <BuildingStorefrontIcon className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-text-primary">RE-CRM Pro</span>
            </Link>
            <p className="mt-4 text-sm text-text-secondary">
              The all-in-one solution for modern real estate professionals.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-text-primary tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="#" className={linkClasses}>About</Link></li>
              <li><Link to="#" className={linkClasses}>Careers</Link></li>
              <li><Link to="#" className={linkClasses}>Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-text-primary tracking-wider uppercase">Properties</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/properties" className={linkClasses}>For Sale</Link></li>
              <li><Link to="/properties" className={linkClasses}>For Rent</Link></li>
              <li><Link to="#" className={linkClasses}>Featured Listings</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-text-primary tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="#" className={linkClasses}>Privacy Policy</Link></li>
              <li><Link to="#" className={linkClasses}>Terms of Service</Link></li>
              <li><Link to="#" className={linkClasses}>Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm text-text-secondary">
            &copy; {new Date().getFullYear()} RE-CRM Pro. All Rights Reserved.
          </p>
          <div className="flex mt-4 sm:mt-0 space-x-6">
            <Link to="#" className={linkClasses}>Twitter</Link>
            <Link to="#" className={linkClasses}>Facebook</Link>
            <Link to="#" className={linkClasses}>LinkedIn</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;