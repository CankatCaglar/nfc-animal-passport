'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { createUserWithEmailAndPassword, User } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import Link from 'next/link';
import { FirebaseError } from 'firebase/app';
import { auth } from '../firebase/config';
import { FiEye, FiEyeOff } from 'react-icons/fi';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  address: string;
}

export default function SignupPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    address: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signup } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSpecialtiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    setFormData(prev => ({
      ...prev,
      specialties: checked 
        ? [...prev.specialties, value]
        : prev.specialties.filter(specialty => specialty !== value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    if (formData.password.length < 6) {
      return setError('Password must be at least 6 characters long');
    }

    try {
      setLoading(true);
      // Create user in Firebase Auth
      const userCredential = await signup(formData.email, formData.password);
      
      if (!userCredential.user) {
        throw new Error('Failed to create user account');
      }

      // Store additional user data in Firestore
      const db = getFirestore();
      const userData = {
        userType: 'livestock-owner',
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
          phoneNumber: formData.phoneNumber,
          address: formData.address,
        createdAt: new Date().toISOString(),
      };

      await setDoc(doc(db, 'users', userCredential.user.uid), userData);
      router.push('/profile');
    } catch (err) {
      if (err instanceof FirebaseError) {
        switch (err.code) {
          case 'auth/email-already-in-use':
            setError('This email is already registered. Please try logging in instead.');
            break;
          case 'auth/invalid-email':
            setError('Invalid email address format.');
            break;
          case 'auth/operation-not-allowed':
            setError('Email/password accounts are not enabled. Please contact support.');
            break;
          case 'auth/weak-password':
            setError('Password is too weak. Please choose a stronger password.');
            break;
          default:
            setError(`Failed to create account: ${err.message}`);
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      console.error('Signup error:', err);
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
            <h1 className="text-3xl font-bold text-[#797D62] mb-6 text-center">Create Account</h1>
            
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              {/* Common Fields */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-[#797D62] mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-[#D9AE94] rounded-md focus:ring-[#D9AE94] focus:border-[#D9AE94] transition-all"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-[#797D62] mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-[#D9AE94] rounded-md focus:ring-[#D9AE94] focus:border-[#D9AE94] transition-all"
                    required
                  />
                </div>
              </div>

                  <div className="mb-4">
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-[#797D62] mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border-2 border-[#D9AE94] rounded-md focus:ring-[#D9AE94] focus:border-[#D9AE94] transition-all"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="address" className="block text-sm font-medium text-[#797D62] mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border-2 border-[#D9AE94] rounded-md focus:ring-[#D9AE94] focus:border-[#D9AE94] transition-all"
                      required
                    />
                  </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-[#797D62] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2 border-[#D9AE94] rounded-md focus:ring-[#D9AE94] focus:border-[#D9AE94] transition-all"
                  required
                />
              </div>
              
              <div className="mb-4 relative">
                <label htmlFor="password" className="block text-sm font-medium text-[#797D62] mb-1">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
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
              <div className="mb-6 relative">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#797D62] mb-1">
                  Confirm Password
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2 border-[#D9AE94] rounded-md focus:ring-[#D9AE94] focus:border-[#D9AE94] transition-all pr-10"
                  required
                />
                <span
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-9 cursor-pointer text-[#D08C60]"
                  tabIndex={0}
                  role="button"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </span>
              </div>
              
              <div className="flex items-center mb-6">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 text-[#D08C60] border-[#D9AE94] rounded focus:ring-[#D08C60]"
                  required
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-[#797D62]">
                  I agree to the <Link href="/terms" className="text-[#D08C60] hover:text-[#C17A50]">terms and conditions</Link>
                </label>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#D08C60] hover:bg-[#C17A50] text-white py-2 px-4 rounded-md font-medium transition-colors disabled:opacity-50"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-[#797D62]">
                Already have an account?{' '}
                <Link href="/login" className="text-[#D08C60] hover:text-[#C17A50] font-medium">
                  Log in
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