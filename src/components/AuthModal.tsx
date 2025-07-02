import React, { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const { login, signup, isLoading, error } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSignUp) {
      await signup(formData.email, formData.password, formData.name);
    } else {
      await login(formData.email, formData.password);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4">
      <div className="bg-netflix-dark rounded-lg w-full max-w-md p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="mb-8">
          <h2 className="text-white text-3xl font-bold mb-2">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </h2>
          <p className="text-gray-400">
            {isSignUp 
              ? 'Create your Netflix account' 
              : 'Welcome back to Netflix'
            }
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {isSignUp && (
            <div>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-netflix-red"
                required
              />
            </div>
          )}

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-netflix-red"
              required
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-netflix-red pr-12"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && (
            <div className="text-red-500 text-sm bg-red-500/10 p-3 rounded">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-netflix-red text-white py-3 rounded font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Sign In')}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-400">
            {isSignUp ? 'Already have an account?' : 'New to Netflix?'}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-white ml-2 hover:underline"
            >
              {isSignUp ? 'Sign in' : 'Sign up now'}
            </button>
          </p>
        </div>

        <div className="mt-6 text-xs text-gray-500 text-center">
          <p>
            This is a demo version. Use any email and password to {isSignUp ? 'sign up' : 'sign in'}.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;