"use client";

import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState } from 'react';

export default function ProfilePage() {
  const [showEditForm, setShowEditForm] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "John",
    lastName: "Doe",
    licenseNumber: "PO-12345-CA",
    specialties: ["Surgery", "Dermatology", "Internal Medicine"],
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    address: "123 Main Street, Anytown, CA 12345"
  });

  const toggleEditForm = () => {
    setShowEditForm(!showEditForm);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Update user data with form values
    setUserData({
      ...userData,
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      licenseNumber: formData.get('license'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      address: formData.get('address')
    });

    // Hide the form after submission
    setShowEditForm(false);
  };

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
            <div className="flex flex-col md:flex-row gap-8 md:align-start">
              {/* Sidebar - Sabit kart */}
              <div className="w-full md:w-1/3 self-start" style={{ position: 'sticky', top: '20px' }}>
                <div className="bg-[#F5F5F5] p-6 rounded-lg shadow-md">
                  <div className="text-center mb-6">
                    <div className="w-32 h-32 bg-[#F2D399] rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
                      <span className="text-white text-5xl">👨‍⚕️</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#797D62]">{userData.firstName} {userData.lastName}</h3>
                    <p className="text-[#997B66]">DVM, Veterinary Surgeon</p>
                    <p className="text-[#997B66] text-sm mb-2">Member since 2023</p>
                  </div>
                  
                  <nav className="space-y-2">
                    <a href="#" className="block py-2 px-4 bg-[#D08C60] text-white rounded-md font-medium">Profile Information</a>
                    <a href="#" className="block py-2 px-4 text-[#797D62] hover:bg-[#D08C60] hover:text-white rounded-md transition-colors">Password & Security</a>
                    <a href="#" className="block py-2 px-4 text-[#797D62] hover:bg-[#D08C60] hover:text-white rounded-md transition-colors">Appointments</a>
                    <a href="#" className="block py-2 px-4 text-[#797D62] hover:bg-[#D08C60] hover:text-white rounded-md transition-colors">Working Hours</a>
                    <a href="#" className="block py-2 px-4 text-[#797D62] hover:bg-[#D08C60] hover:text-white rounded-md transition-colors">Vacation Schedule</a>
                  </nav>
                </div>
              </div>
              
              {/* Main Content - Dinamik kart */}
              <div className="w-full md:w-2/3">
                <div className="bg-[#F5F5F5] p-6 rounded-lg shadow-md">
                  <div>
                    <div className="flex justify-between items-center mb-8">
                      <h2 className="text-3xl font-bold text-[#797D62]">Professional Information</h2>
                      <button
                        onClick={toggleEditForm}
                        className="bg-[#D08C60] hover:bg-[#C17A50] text-white py-2 px-6 rounded-md font-medium transition-colors"
                      >
                        {showEditForm ? "Cancel Edit" : "Edit Profile"}
                      </button>
                    </div>
                    
                    <div className="space-y-8 pb-8">
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
                          <textarea
                            id="address"
                            name="address"
                            rows={3}
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