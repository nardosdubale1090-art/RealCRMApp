import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProtectedRoute from './ProtectedRoute';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../types';

// Page Imports
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Dashboard from '../pages/dashboard/Dashboard';
import Clients from '../pages/crm/Clients';
import Properties from '../pages/properties/Properties';
import PropertyDetails from '../pages/properties/PropertyDetails';
import Deals from '../pages/deals/Deals';
import Employees from '../pages/employees/Employees';
import Attendance from '../pages/attendance/Attendance';
import Calendar from '../pages/calendar/Calendar';
import Reports from '../pages/reports/Reports';
import Settings from '../pages/settings/Settings';
import MyInterests from '../pages/client/MyInterests';
import MySchedule from '../pages/client/MySchedule';
import Notifications from '../pages/notifications/Notifications';
import NotFound from '../pages/NotFound';

const AppRoutes: React.FC = () => {
    const { user } = useAuth();
    
    return (
        <Routes>
            {/* Public and Authenticated routes with Layout */}
            <Route element={<Layout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/properties" element={<Properties />} />
                <Route path="/properties/:type/:id" element={<PropertyDetails />} />
                
                {/* Client-specific protected routes */}
                <Route path="/my-interests" element={
                    <ProtectedRoute allowedRoles={[UserRole.CLIENT]}>
                        <MyInterests />
                    </ProtectedRoute>
                } />
                 <Route path="/my-schedule" element={
                    <ProtectedRoute allowedRoles={[UserRole.CLIENT]}>
                        <MySchedule />
                    </ProtectedRoute>
                } />

                {/* Internal protected routes */}
                <Route path="/clients" element={
                    <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.AGENT, UserRole.COMPANY_ADMIN]}>
                        <Clients />
                    </ProtectedRoute>
                } />
                <Route path="/deals" element={
                    <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.AGENT, UserRole.COMPANY_ADMIN]}>
                        <Deals />
                    </ProtectedRoute>
                } />
                <Route path="/employees" element={
                    <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.COMPANY_ADMIN]}>
                        <Employees />
                    </ProtectedRoute>
                } />
                <Route path="/attendance" element={
                    <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.COMPANY_ADMIN, UserRole.EMPLOYEE]}>
                        <Attendance />
                    </ProtectedRoute>
                } />
                <Route path="/calendar" element={
                    <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.AGENT, UserRole.COMPANY_ADMIN, UserRole.EMPLOYEE]}>
                        <Calendar />
                    </ProtectedRoute>
                } />
                <Route path="/reports" element={
                    <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.COMPANY_ADMIN]}>
                        <Reports />
                    </ProtectedRoute>
                } />
                <Route path="/settings" element={
                    <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.COMPANY_ADMIN, UserRole.AGENT, UserRole.EMPLOYEE, UserRole.CLIENT]}>
                        <Settings />
                    </ProtectedRoute>
                } />
                <Route path="/notifications" element={
                    <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.COMPANY_ADMIN, UserRole.AGENT, UserRole.EMPLOYEE, UserRole.CLIENT]}>
                        <Notifications />
                    </ProtectedRoute>
                } />

                <Route path="*" element={<NotFound />} />
            </Route>

            {/* Auth routes without Layout */}
            <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
            <Route path="/register" element={user ? <Navigate to="/" replace /> : <Register />} />
        </Routes>
    );
};

export default AppRoutes;