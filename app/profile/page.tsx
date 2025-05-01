"use client";

import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';

export default function ProfilePage() {
  const [showEditForm, setShowEditForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    userType: "",
    licenseNumber: "",
    specialties: [],
    email: "",
    phone: "",
    address: ""
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const db = getFirestore();
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        
        if (userDoc.exists()) {
          setUserData({
            firstName: userDoc.data().firstName || "",
            lastName: userDoc.data().lastName || "",
            userType: userDoc.data().userType || "",
            licenseNumber: userDoc.data().licenseNumber || "",
            specialties: userDoc.data().specialties || [],
            email: userDoc.data().email || "",
            phone: userDoc.data().phoneNumber || "",
            address: userDoc.data().address || ""
          });
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const toggleEditForm = () => {
    setShowEditForm(!showEditForm);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    const formData = new FormData(e.target);
    const updatedData = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      ...(userData.userType === 'vet' ? {
        licenseNumber: formData.get('license'),
      } : {
        phoneNumber: formData.get('phone'),
        address: formData.get('address'),
      })
    };

    try {
      const db = getFirestore();
      await updateDoc(doc(db, 'users', user.uid), updatedData);
      
      setUserData(prev => ({
        ...prev,
        ...updatedData
      }));
      
      setShowEditForm(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile');
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#9B9B7A]">
        <Header />
        <div className="flex items-center justify-center pt-20">
          <div className="text-white text-xl">Loading...</div>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-[#9B9B7A]">
        <Header />
        <div className="flex items-center justify-center pt-20">
          <div className="text-white text-xl">Please log in to view your profile</div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Header />
      
      <section className="pt-16 pb-8 md:pt-20 md:pb-10 bg-[#9B9B7A]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Your Profile
            </h1>
            <p className="text-lg text-white opacity-90 max-w-3xl mx-auto">
              Manage your account settings and view your pet passports all in one place.
            </p>
          </div>
        </div>
      </section>
      
      <section className="pt-4 pb-16 bg-[#9B9B7A]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}
            
            <div className="flex flex-col md:flex-row gap-8 md:align-start">
              {/* Sidebar */}
              <div className="w-full md:w-1/3 self-start" style={{ position: 'sticky', top: '20px' }}>
                <div className="bg-[#F5F5F5] p-6 rounded-lg shadow-md">
                  <div className="text-center mb-6">
                    <div className="w-32 h-32 bg-[#F2D399] rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
                      <span className="text-white text-5xl">{userData.userType === 'vet' ? '👨‍⚕️' : '👤'}</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#797D62]">{userData.firstName} {userData.lastName}</h3>
                    {userData.userType === 'vet' && (
                      <p className="text-[#997B66]">DVM, Veterinary Surgeon</p>
                    )}
                    <p className="text-[#997B66] text-sm mb-2">Member since {new Date().getFullYear()}</p>
                  </div>
                  
                  <nav className="space-y-2">
                    <a href="#" className="block py-2 px-4 bg-[#D08C60] text-white rounded-md font-medium">Profile Information</a>
                    <a href="#" className="block py-2 px-4 text-[#797D62] hover:bg-[#D08C60] hover:text-white rounded-md transition-colors">Password & Security</a>
                    {userData.userType === 'vet' && (
                      <>
                        <a href="#" className="block py-2 px-4 text-[#797D62] hover:bg-[#D08C60] hover:text-white rounded-md transition-colors">Appointments</a>
                        <a href="#" className="block py-2 px-4 text-[#797D62] hover:bg-[#D08C60] hover:text-white rounded-md transition-colors">Working Hours</a>
                        <a href="#" className="block py-2 px-4 text-[#797D62] hover:bg-[#D08C60] hover:text-white rounded-md transition-colors">Vacation Schedule</a>
                      </>
                    )}
                  </nav>
                </div>
              </div>
              
              {/* Main Content */}
              <div className="w-full md:w-2/3">
                <div className="bg-[#F5F5F5] p-6 rounded-lg shadow-md">
                  <div>
                    <div className="flex justify-between items-center mb-8">
                      <h2 className="text-3xl font-bold text-[#797D62]">
                        {userData.userType === 'vet' ? 'Professional Information' : 'Personal Information'}
                      </h2>
                      <button
                        onClick={toggleEditForm}
                        className="bg-[#D08C60] hover:bg-[#C17A50] text-white py-2 px-6 rounded-md font-medium transition-colors"
                      >
                        {showEditForm ? "Cancel Edit" : "Edit Profile"}
                      </button>
                    </div>
                    
                    <div className="space-y-8 pb-8">
                      {userData.userType === 'vet' && (
                        <>
                          <div>
                            <h3 className="text-xl font-medium text-[#797D62] mb-3">License Number:</h3>
                            <p className="text-lg text-[#997B66] font-medium">{userData.licenseNumber}</p>
                          </div>
                          
                          <div>
                            <h3 className="text-xl font-medium text-[#797D62] mb-3">Specialties:</h3>
                            <div className="flex flex-wrap gap-3">
                              {userData.specialties.map((specialty, index) => (
                                <span key={index} className="bg-[#F2D399] text-[#797D62] px-5 py-2 rounded-full text-base font-medium">{specialty}</span>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-xl font-medium text-[#797D62] mb-3">Email:</h3>
                          <p className="text-lg text-[#997B66]">{userData.email}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-medium text-[#797D62] mb-3">Phone:</h3>
                          <p className="text-lg text-[#997B66]">{userData.phone}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-medium text-[#797D62] mb-3">Address:</h3>
                        <p className="text-lg text-[#997B66]">{userData.address}</p>
                      </div>
                    </div>
                  </div>
                  
                  {showEditForm && (
                    <div className="pt-6 mt-6 border-t border-gray-200">
                      <h3 className="text-xl font-bold text-[#797D62] mb-4">Edit Information</h3>
                      
                      <form onSubmit={handleFormSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-[#797D62] mb-1">
                              First Name
                            </label>
                            <input
                              type="text"
                              id="firstName"
                              name="firstName"
                              defaultValue={userData.firstName}
                              className="w-full px-4 py-2 border-2 border-[#D08C60] rounded-md focus:ring-[#D08C60] focus:border-[#D08C60] transition-all"
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
                              defaultValue={userData.lastName}
                              className="w-full px-4 py-2 border-2 border-[#D08C60] rounded-md focus:ring-[#D08C60] focus:border-[#D08C60] transition-all"
                            />
                          </div>
                        </div>
                        
                        {userData.userType === 'vet' && (
                          <div className="mb-4">
                            <label htmlFor="license" className="block text-sm font-medium text-[#797D62] mb-1">
                              License Number
                            </label>
                            <input
                              type="text"
                              id="license"
                              name="license"
                              defaultValue={userData.licenseNumber}
                              className="w-full px-4 py-2 border-2 border-[#D08C60] rounded-md focus:ring-[#D08C60] focus:border-[#D08C60] transition-all"
                            />
                          </div>
                        )}
                        
                        <div className="mb-4">
                          <label htmlFor="email" className="block text-sm font-medium text-[#797D62] mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            defaultValue={userData.email}
                            className="w-full px-4 py-2 border-2 border-[#D08C60] rounded-md focus:ring-[#D08C60] focus:border-[#D08C60] transition-all"
                          />
                        </div>
                        
                        <div className="mb-4">
                          <label htmlFor="phone" className="block text-sm font-medium text-[#797D62] mb-1">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            defaultValue={userData.phone}
                            className="w-full px-4 py-2 border-2 border-[#D08C60] rounded-md focus:ring-[#D08C60] focus:border-[#D08C60] transition-all"
                          />
                        </div>
                        
                        <div className="mb-6">
                          <label htmlFor="address" className="block text-sm font-medium text-[#797D62] mb-1">
                            Address
                          </label>
                          <input
                            type="text"
                            id="address"
                            name="address"
                            defaultValue={userData.address}
                            className="w-full px-4 py-2 border-2 border-[#D08C60] rounded-md focus:ring-[#D08C60] focus:border-[#D08C60] transition-all"
                          />
                        </div>
                        
                        <div className="flex justify-end">
                          <button
                            type="submit"
                            className="bg-[#D08C60] hover:bg-[#C17A50] text-white py-2 px-6 rounded-md font-medium transition-colors"
                          >
                            Save Changes
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}