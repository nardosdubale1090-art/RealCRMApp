import React from 'react';
import { Link } from 'react-router-dom';
import KpiCard from '../../components/dashboard/KpiCard';
import { mockKpis, mockFeaturedUnits, mockFavoritedUnits } from '../../mocks/data';
import { useAuth } from '../../hooks/useAuth';
import { UserRole } from '../../types';
import { BuildingOffice2Icon, SparklesIcon, ListBulletIcon } from '../../components/shared/Icons';
import FeaturedPropertyCard from '../../components/properties/FeaturedPropertyCard';
import QuickActions from '../../components/dashboard/QuickActions';
import RecentActivities from '../../components/dashboard/RecentActivities';
import DealPipelineChart from '../../components/dashboard/charts/DealPipelineChart';
import LeadConversionChart from '../../components/dashboard/charts/LeadConversionChart';
import PropertyStatusChart from '../../components/dashboard/charts/PropertyStatusChart';
import EmployeePerformanceChart from '../../components/dashboard/charts/EmployeePerformanceChart';

const PublicDashboard: React.FC = () => (
    <div className="space-y-8 animate-fade-in-up">
        <div className="bg-card p-8 rounded-xl shadow-lg text-center">
            <BuildingOffice2Icon className="h-16 w-16 mx-auto text-primary" />
            <h1 className="mt-4 text-4xl font-bold text-text-primary">Find Your Next Property with RE-CRM Pro</h1>
            <p className="mt-2 text-lg text-text-secondary max-w-2xl mx-auto">
                Browse our extensive list of available properties. Sign up to save your favorites, manage your interests, and schedule viewings seamlessly.
            </p>
            <div className="mt-6 flex items-center justify-center space-x-4">
                 <Link
                    to="/register"
                    className="inline-block px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-hover transition-all duration-300 shadow-md hover:shadow-lg"
                >
                    Get Started
                </Link>
                <Link
                    to="/properties"
                    className="inline-block px-8 py-3 bg-secondary text-text-primary font-semibold rounded-lg hover:bg-gray-700/50 transition-colors shadow-soft"
                >
                    Browse Properties
                </Link>
            </div>
        </div>
        <div>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Featured Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {mockFeaturedUnits.map(unit => (
                    <FeaturedPropertyCard key={unit.id} unit={unit} />
                ))}
            </div>
        </div>
    </div>
);

const ClientDashboard: React.FC = () => {
    const { user } = useAuth();
    return (
        <div className="space-y-6 animate-fade-in-up">
            <h1 className="text-3xl font-bold text-text-primary">Welcome, {user?.name}!</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link to="/my-interests" className="bg-card p-6 rounded-xl shadow-soft flex items-center space-x-4 hover:bg-gray-700/50 transition-colors hover:-translate-y-1 hover:shadow-lg">
                    <SparklesIcon className="h-10 w-10 text-primary" />
                    <div>
                        <h2 className="text-xl font-semibold">My Interests</h2>
                        <p className="text-text-secondary">Manage your property preferences.</p>
                    </div>
                </Link>
                 <Link to="/my-schedule" className="bg-card p-6 rounded-xl shadow-soft flex items-center space-x-4 hover:bg-gray-700/50 transition-colors hover:-translate-y-1 hover:shadow-lg">
                    <ListBulletIcon className="h-10 w-10 text-primary" />
                    <div>
                        <h2 className="text-xl font-semibold">My Schedule</h2>
                        <p className="text-text-secondary">View your appointments and pipeline.</p>
                    </div>
                </Link>
            </div>
             <div>
                <h2 className="text-2xl font-bold text-text-primary mb-4">Your Favorited Properties</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {mockFavoritedUnits.map(unit => (
                        <FeaturedPropertyCard key={unit.id} unit={unit} />
                    ))}
                </div>
            </div>
      </div>
    );
}

const InternalUserDashboard: React.FC = () => {
    const { user } = useAuth();
    
    const dashboardTitle = user?.role === UserRole.AGENT ? "Agent Dashboard" : "Admin Dashboard";

    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-3xl font-bold text-text-primary">{dashboardTitle}</h1>
                <QuickActions />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockKpis.map(kpi => (
                <KpiCard key={kpi.title} kpi={kpi} />
              ))}
            </div>
      
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <DealPipelineChart />
                        <LeadConversionChart />
                        <PropertyStatusChart />
                        <EmployeePerformanceChart />
                    </div>
                </div>
                <div className="lg:col-span-1">
                    <RecentActivities />
                </div>
            </div>
        </div>
    );
}


const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) {
      return <PublicDashboard />;
  }

  if (user.role === UserRole.CLIENT) {
    return <ClientDashboard />;
  }

  return <InternalUserDashboard />;
};

export default Dashboard;