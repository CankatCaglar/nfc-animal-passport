'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-[#797D62] shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <h1 className="text-white text-xl font-bold">NFC Animal Passport</h1>
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden md:flex space-x-8 flex-1 justify-center ml-8">
            <Link href="/" className="text-white hover:text-[#F1DCA7] font-medium transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-white hover:text-[#F1DCA7] font-medium transition-colors">
              About
            </Link>
            <Link href="/features" className="text-white hover:text-[#F1DCA7] font-medium transition-colors">
              Features
            </Link>
            <Link href="/contact" className="text-white hover:text-[#F1DCA7] font-medium transition-colors">
              Contact
            </Link>
          </nav>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/login" 
              className="text-white hover:text-[#F1DCA7] font-medium transition-colors"
            >
              Login
            </Link>
            <Link 
              href="/signup" 
              className="bg-[#D08C60] hover:bg-[#C17A50] text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 space-y-3 pb-3">
            <Link
              href="/"
              className="block text-white hover:text-[#F1DCA7] font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block text-white hover:text-[#F1DCA7] font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/features"
              className="block text-white hover:text-[#F1DCA7] font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/contact"
              className="block text-white hover:text-[#F1DCA7] font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            
            {/* Auth Links - Mobile */}
            <div className="pt-2 border-t border-white/20">
              <Link
                href="/login"
                className="block text-white hover:text-[#F1DCA7] font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="block mt-3 bg-[#D08C60] hover:bg-[#C17A50] text-white px-4 py-2 rounded-lg font-medium transition-colors text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
} 