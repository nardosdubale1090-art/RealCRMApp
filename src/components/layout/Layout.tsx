import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import BottomNav from './BottomNav';
import Footer from './Footer';
import { useAppearance } from '../../context/AppearanceContext';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useAuth } from '../../hooks/useAuth';

const Layout: React.FC = () => {
  const { user } = useAuth();
  const { layout, mobileLayout, isSidebarCollapsed } = useAppearance();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 767px)');

  const showSidebar = layout === 'vertical' || (isMobile && mobileLayout === 'sidebar');
  const showBottomNav = isMobile && mobileLayout === 'bottom' && !!user;
  
  const mainContentPadding = showBottomNav ? 'pb-20' : 'pb-6';
  const mainContentMargin = showSidebar && !isMobile && !!user ? (isSidebarCollapsed ? 'md:ml-14' : 'md:ml-48') : 'ml-0';

  return (
    <div className="bg-background text-text-primary flex flex-col min-h-screen">
      <Header setIsSidebarOpen={setIsSidebarOpen} />
      
      <div className="flex-1 flex">
        {showSidebar && !!user && <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />}
        
        <div className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}>
          <main className="p-4 sm:p-6 md:pb-6 w-full">
            <div className="page-content">
              <Outlet />
            </div>
          </main>
        </div>
      </div>

      {!user && <Footer />}

      {showBottomNav && <BottomNav />}
    </div>
  );
};

export default Layout;