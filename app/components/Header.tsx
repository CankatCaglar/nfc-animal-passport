'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <header className="bg-[#797D62] shadow-md">
      <div className="container mx-auto px-0 py-4">
        <div className="flex justify-between items-center px-1">
          {/* Logo - Left aligned with margin */}
          <div className="flex items-center w-1/4 justify-start pl-1">
            <Link href="/" className="flex items-center">
              <h1 className="text-white text-xl font-bold">NFC Animal Passport</h1>
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden md:flex space-x-8 w-2/4 justify-center">
            <Link href="/" className={`font-medium transition-colors px-3 py-1 rounded ${pathname === '/' ? 'bg-[#D08C60] text-white' : 'text-white hover:text-[#F1DCA7]'}`}>Home</Link>
            <Link href="/features" className={`font-medium transition-colors px-3 py-1 rounded ${pathname === '/features' ? 'bg-[#D08C60] text-white' : 'text-white hover:text-[#F1DCA7]'}`}>Features</Link>
            <Link href="/contact" className={`font-medium transition-colors px-3 py-1 rounded ${pathname === '/contact' ? 'bg-[#D08C60] text-white' : 'text-white hover:text-[#F1DCA7]'}`}>Contact</Link>
            {user && (
              <Link href="/profile" className={`font-medium transition-colors px-3 py-1 rounded ${pathname === '/profile' ? 'bg-[#D08C60] text-white' : 'text-white hover:text-[#F1DCA7]'}`}>Profile</Link>
            )}
          </nav>

          {/* Auth Buttons - Right aligned with margin */}
          <div className="hidden md:flex items-center space-x-4 w-1/4 justify-end pr-1">
            {!user ? (
              <>
                <Link 
                  href="/login" 
                  className="text-white hover:text-[#F1DCA7] font-medium transition-colors"
                >
                  Login
                </Link>
                <Link 
                  href="/signup" 
                  className="bg-[#F1DCA7] text-[#797D62] px-4 py-2 rounded-md hover:bg-[#D9AE94] transition-colors"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="text-white hover:text-[#F1DCA7] font-medium transition-colors"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 space-y-3 pb-3 px-4">
            <Link href="/" className={`block font-medium transition-colors px-3 py-2 rounded ${pathname === '/' ? 'bg-[#D08C60] text-white' : 'text-white hover:text-[#F1DCA7]'}`} onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link href="/features" className={`block font-medium transition-colors px-3 py-2 rounded ${pathname === '/features' ? 'bg-[#D08C60] text-white' : 'text-white hover:text-[#F1DCA7]'}`} onClick={() => setIsMenuOpen(false)}>Features</Link>
            <Link href="/contact" className={`block font-medium transition-colors px-3 py-2 rounded ${pathname === '/contact' ? 'bg-[#D08C60] text-white' : 'text-white hover:text-[#F1DCA7]'}`} onClick={() => setIsMenuOpen(false)}>Contact</Link>
            {user && (
              <Link href="/profile" className={`block font-medium transition-colors px-3 py-2 rounded ${pathname === '/profile' ? 'bg-[#D08C60] text-white' : 'text-white hover:text-[#F1DCA7]'}`} onClick={() => setIsMenuOpen(false)}>Profile</Link>
            )}
            {!user ? (
              <>
                <Link
                  href="/login"
                  className="block text-white hover:text-[#F1DCA7] font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="block text-white hover:text-[#F1DCA7] font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="block text-white hover:text-[#F1DCA7] font-medium transition-colors w-full text-left"
              >
                Logout
              </button>
            )}
          </nav>
        )}
      </div>
    </header>
  );
} 