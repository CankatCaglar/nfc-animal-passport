'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      router.push('/profile');
    } catch (err) {
      setError('Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen">
      <Header />
      
      <section className="py-16 md:py-24 bg-[#9B9B7A]">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-xl p-8 border-2 border-[#F1DCA7]">
            <h1 className="text-3xl font-bold text-[#797D62] mb-6 text-center">Login</h1>
            
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-[#797D62] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-[#D9AE94] rounded-md focus:ring-[#D9AE94] focus:border-[#D9AE94] transition-all"
                  required
                />
              </div>
              
              <div className="mb-6 relative">
                <label htmlFor="password" className="block text-sm font-medium text-[#797D62] mb-1">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-[#D9AE94] rounded-md focus:ring-[#D9AE94] focus:border-[#D9AE94] transition-all pr-10"
                  required
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-9 cursor-pointer text-[#D08C60]"
                  tabIndex={0}
                  role="button"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </span>
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-[#D08C60] border-[#D9AE94] rounded focus:ring-[#D08C60]"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-[#797D62]">
                    Remember me
                  </label>
                </div>
                
                <Link href="/forgot-password" className="text-sm text-[#D08C60] hover:text-[#C17A50]">
                  Forgot your password?
                </Link>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#D08C60] hover:bg-[#C17A50] text-white py-2 px-4 rounded-md font-medium transition-colors disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-[#797D62]">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="text-[#D08C60] hover:text-[#C17A50] font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 