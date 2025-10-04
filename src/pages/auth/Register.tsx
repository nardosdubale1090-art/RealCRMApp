// /src/pages/auth/Register.tsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { User, UserRole } from '../../types';
import { BuildingStorefrontIcon, EyeIcon, EyeSlashIcon } from '../../components/shared/Icons';

const Register: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
        setError('Please fill in all fields.');
        return;
    }
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: name,
      role: UserRole.CLIENT,
      email: email,
    };
    login(newUser);
    navigate('/', { replace: true });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4 animate-fade-in">
      <div className="w-full max-w-md p-8 sm:p-12 bg-card rounded-xl shadow-xl border border-border">
        <div className="text-center">
            <Link to="/" className="flex items-center justify-center mb-6">
                <BuildingStorefrontIcon className="h-10 w-10 text-primary"/>
                <h1 className="text-3xl font-bold ml-3">RE-CRM Pro</h1>
            </Link>
          <h2 className="text-2xl font-semibold text-text-primary">Create Your Account</h2>
          <p className="text-text-secondary mt-1">Join us to find your perfect property.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label htmlFor="name" className="text-sm font-medium text-text-secondary">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-2 px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/70 transition-shadow"
              placeholder="John Doe"
            />
          </div>
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
              placeholder="you@example.com"
            />
          </div>
          <div className="relative">
            <label htmlFor="password"className="text-sm font-medium text-text-secondary">Password</label>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
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
              Sign Up
            </button>
          </div>
          <p className="text-center text-sm text-text-secondary">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary hover:text-primary-hover hover:underline">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;