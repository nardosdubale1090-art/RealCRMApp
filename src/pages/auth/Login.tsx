import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { User, UserRole } from '../../types';
import { BuildingStorefrontIcon, UserCircleIcon, EyeIcon, EyeSlashIcon } from '../../components/shared/Icons';

const DEMO_USERS: User[] = [
    { id: 'user-admin', name: 'Admin User', role: UserRole.ADMIN, email: 'admin@recrm.pro' },
    { id: 'user-company', name: 'Realty Corp Admin', role: UserRole.COMPANY_ADMIN, email: 'company@recrm.pro' },
    { id: 'user-agent', name: 'Alice (Agent)', role: UserRole.AGENT, email: 'agent@recrm.pro' },
    { id: 'user-employee', name: 'Bob (Employee)', role: UserRole.EMPLOYEE, email: 'employee@recrm.pro' },
    { id: 'user-client', name: 'John Client', role: UserRole.CLIENT, email: 'client@recrm.pro' },
];
const DEMO_PASSWORD = 'password123';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = DEMO_USERS.find(u => u.email === email);
    if (user && password === DEMO_PASSWORD) {
      login(user);
      navigate('/', { replace: true });
    } else {
      setError('Invalid email or password. Please use a demo account.');
    }
  };

  const handleQuickLogin = (user: User) => {
    setEmail(user.email!);
    setPassword(DEMO_PASSWORD);
    setError('');
    login(user);
    navigate('/', { replace: true });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4 sm:p-6 animate-fade-in">
      <div className="w-full max-w-4xl bg-card rounded-xl shadow-xl flex flex-col md:flex-row overflow-hidden border border-border">
        
        <div className="flex flex-col justify-center p-8 sm:p-12 md:w-1/2">
            <div className="text-center md:text-left">
                <Link to="/" className="flex items-center justify-center md:justify-start mb-6">
                    <BuildingStorefrontIcon className="h-10 w-10 text-primary"/>
                    <h1 className="text-3xl font-bold ml-3 text-text-primary">RE-CRM Pro</h1>
                </Link>
              <h2 className="text-2xl font-semibold text-text-primary">Welcome Back!</h2>
              <p className="text-text-secondary mt-1">Sign in to continue your journey.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <label htmlFor="email" className="text-sm font-medium text-text-secondary">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mt-2 px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/70 transition-shadow"
                  placeholder="admin@recrm.pro"
                />
              </div>
              <div className="relative">
                <label htmlFor="password"className="text-sm font-medium text-text-secondary">Password</label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mt-2 px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/70 transition-shadow"
                  placeholder="••••••••"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-sm leading-5"
                >
                    {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                    ) : (
                        <EyeIcon className="h-5 w-5 text-gray-500" />
                    )}
                </button>
              </div>

              {error && <p className="text-sm text-red-500 text-center">{error}</p>}

              <div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  Sign In
                </button>
              </div>

              <p className="text-center text-sm text-text-secondary">
                Don't have an account?{' '}
                <Link to="/register" className="font-medium text-primary hover:text-primary-hover hover:underline">
                    Sign Up
                </Link>
              </p>
            </form>
        </div>

        <div className="flex flex-col bg-secondary p-8 sm:p-12 md:w-1/2">
          <h3 className="text-xl font-semibold text-center text-text-primary">Quick Access Demo Accounts</h3>
          <p className="text-center text-sm text-text-secondary mt-2">Click a profile to log in instantly. The password for all accounts is: <span className="font-mono text-primary/80">password123</span></p>
          <div className="mt-6 space-y-3">
            {DEMO_USERS.map((user) => (
                <button
                    key={user.id}
                    onClick={() => handleQuickLogin(user)}
                    className="w-full flex items-center space-x-4 text-left p-3 bg-background hover:bg-gray-700/50 rounded-lg transition-all duration-200 border border-border hover:border-primary/50 hover:shadow-md"
                >
                    <div className="flex-shrink-0 bg-secondary p-2 rounded-full">
                        <UserCircleIcon className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                        <h4 className="font-bold text-text-primary">{user.name}</h4>
                        <p className="text-sm text-text-secondary">{user.email}</p>
                    </div>
                </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;