"use client";

import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth, updateEmail, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';

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
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [pendingEmail, setPendingEmail] = useState("");
  const [pendingFormData, setPendingFormData] = useState(null);
  const [passwordInput, setPasswordInput] = useState("");
  const [reauthError, setReauthError] = useState("");
  const passwordInputRef = useRef(null);

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
    const newEmail = formData.get('email');
    const updatedData = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: newEmail,
      ...(userData.userType === 'vet' ? {
        licenseNumber: formData.get('license'),
      } : {
        phoneNumber: formData.get('phone'),
        address: formData.get('address'),
      })
    };

    if (user.email !== newEmail) {
      setPendingEmail(newEmail);
      setPendingFormData(updatedData);
      setShowPasswordModal(true);
      setReauthError("");
      setTimeout(() => passwordInputRef.current?.focus(), 100);
      return;
    }

    try {
      const db = getFirestore();
      await updateDoc(doc(db, 'users', user.uid), updatedData);
      setUserData(prev => ({
        ...prev,
        ...updatedData,
        phone: updatedData.phoneNumber !== undefined ? updatedData.phoneNumber : prev.phone,
        address: updatedData.address !== undefined ? updatedData.address : prev.address
      }));
      setShowEditForm(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile.');
    }
  };

  const handlePasswordConfirm = async () => {
    setReauthError("");
    if (!user || !pendingEmail || !pendingFormData) return;
    try {
      const auth = getAuth();
      const credential = EmailAuthProvider.credential(user.email, passwordInput);
      await reauthenticateWithCredential(auth.currentUser, credential);
      await updateEmail(auth.currentUser, pendingEmail);
      const db = getFirestore();
      await updateDoc(doc(db, 'users', user.uid), pendingFormData);
      setUserData(prev => ({
        ...prev,
        ...pendingFormData,
        phone: pendingFormData.phoneNumber !== undefined ? pendingFormData.phoneNumber : prev.phone,
        address: pendingFormData.address !== undefined ? pendingFormData.address : prev.address
      }));
      setShowEditForm(false);
      setShowPasswordModal(false);
      setPasswordInput("");
      setPendingEmail("");
      setPendingFormData(null);
    } catch (err) {
      let msg = 'Password incorrect or operation failed. Please try again.';
      if (err && err.code) {
        if (err.code === 'auth/wrong-password') msg = 'Incorrect password. Please try again.';
        else if (err.code === 'auth/too-many-requests') msg = 'Too many attempts. Please try again later.';
        else if (err.code === 'auth/requires-recent-login') msg = 'This operation is sensitive and requires recent authentication. Please log in again.';
        else if (err.message) msg = err.message;
      }
      setReauthError(msg);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col min-h-[100vh] bg-[#9B9B7A]">
        <Header />
        <div className="flex-1 flex items-center justify-center pt-20">
          <div className="text-white text-xl">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col min-h-[100vh] bg-[#9B9B7A]">
        <Header />
        <div className="flex-1 flex items-center justify-center pt-20">
          <div className="text-white text-xl">Please log in to view your profile</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col min-h-[100vh] bg-[#9B9B7A]">
      <Header />
      <div className="flex-1 flex flex-col">
        <section className="pt-24 pb-16 md:pt-3 md:pb-14 bg-[#9B9B7A]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              {/* Başlık ve açıklama kaldırıldı */}
            </div>
          </div>
        </section>
        <section>
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}
              
              <div className="flex flex-col md:flex-row gap-20 md:align-start">
                {/* Sidebar */}
                <div className="w-full md:w-1/3 self-start" style={{ position: 'sticky', top: '20px' }}>
                  <div className="p-6">
                    <div className="text-center mb-6">
                      <div className="w-32 h-32 bg-[#F2D399] rounded-full mx-auto mb-7 flex items-center justify-center overflow-hidden">
                        <span className="text-white text-6xl">{userData.userType === 'veterinarian' ? '👨‍⚕️' : '👤'}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white">{`${userData.firstName?.trim() || ''} ${userData.lastName?.trim() || ''}`.trim()}</h3>
                      <div className="mt-2 mb-2">
                        <span className="inline-block px-5 py-1 rounded-full text-base font-semibold" style={{background:'#997B66', color:'white'}}>
                          {userData.userType === 'veterinarian' ? 'Veterinarian' : 'Livestock Owner'}
                        </span>
                      </div>
                      <p className="text-white text-sm mb-2">Member since {new Date().getFullYear()}</p>
                    </div>
                    
                    <nav className="space-y-2">
                      <a href="#" className="block py-2 px-4 bg-[#D08C60] text-white rounded-md font-medium">Profile Information</a>
                      <a href="#" className="block py-2 px-4 text-white hover:bg-[#D08C60] hover:text-white rounded-md transition-colors">Password & Security</a>
                      {userData.userType === 'vet' && (
                        <>
                          <a href="#" className="block py-2 px-4 text-white hover:bg-[#D08C60] hover:text-white rounded-md transition-colors">Appointments</a>
                          <a href="#" className="block py-2 px-4 text-white hover:bg-[#D08C60] hover:text-white rounded-md transition-colors">Working Hours</a>
                        </>
                      )}
                    </nav>
                  </div>
                </div>
                
                {/* Main Content */}
                <div className="w-full md:w-2/3">
                  <div className="p-6">
                    <div>
                      <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold text-white flex items-center gap-4">
                          {userData.userType === 'veterinarian' ? 'Professional Information' : 'Personal Information'}
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
                            <div className="flex flex-row items-center text-white text-base md:text-lg font-normal mb-4">
                              <span className="whitespace-nowrap font-semibold">License Number:</span>
                              <span className="ml-2 font-semibold">{userData.licenseNumber}</span>
                            </div>
                            <div>
                              <h3 className="text-base md:text-lg font-semibold text-white mb-3">Specialties:</h3>
                              <div className="flex flex-wrap gap-3 mb-4">
                                {userData.specialties.map((specialty, index) => (
                                  <span key={index} className="bg-[#F2D399] text-[#6B705C] px-5 py-2 rounded-full text-base font-medium">{specialty}</span>
                                ))}
                              </div>
                            </div>
                          </>
                        )}
                        <div className="flex flex-col gap-3">
                          <div className="flex flex-row items-center text-white text-base md:text-lg font-normal">
                            <span className="whitespace-nowrap font-semibold">Email:</span>
                            <span className="ml-2 text-base md:text-lg">{userData.email}</span>
                          </div>
                          {userData.userType !== 'vet' && (
                            <>
                              <div className="flex flex-row items-center text-white text-base md:text-lg font-normal">
                                <span className="whitespace-nowrap font-semibold">Address:</span>
                                <span className="ml-2 text-base md:text-lg">{userData.address}</span>
                              </div>
                              <div className="flex flex-row items-center text-white text-base md:text-lg font-normal">
                                <span className="whitespace-nowrap font-semibold">Phone:</span>
                                <span className="ml-2 text-base md:text-lg">{userData.phone}</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {showEditForm && (
                      <div className="pt-6 mt-6 border-t border-gray-200">
                        <h3 className="text-xl font-bold text-white mb-4">Edit Information</h3>
                        
                        <form onSubmit={handleFormSubmit}>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div>
                              <label htmlFor="firstName" className="block text-sm font-medium text-white mb-1">
                                First Name
                              </label>
                              <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                defaultValue={userData.firstName}
                                className="w-full px-4 py-2 border-2 border-white text-black rounded-md focus:ring-white focus:border-white transition-all"
                              />
                            </div>
                            
                            <div>
                              <label htmlFor="lastName" className="block text-sm font-medium text-white mb-1">
                                Last Name
                              </label>
                              <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                defaultValue={userData.lastName}
                                className="w-full px-4 py-2 border-2 border-white text-black rounded-md focus:ring-white focus:border-white transition-all"
                              />
                            </div>
                          </div>
                          
                          {userData.userType === 'vet' && (
                            <div className="mb-4">
                              <label htmlFor="license" className="block text-sm font-medium text-white mb-1">
                                License Number
                              </label>
                              <input
                                type="text"
                                id="license"
                                name="license"
                                defaultValue={userData.licenseNumber}
                                className="w-full px-4 py-2 border-2 border-white text-black rounded-md focus:ring-white focus:border-white transition-all"
                              />
                            </div>
                          )}
                          
                          <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                              Email Address
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              defaultValue={userData.email}
                              className="w-full px-4 py-2 border-2 border-white text-black rounded-md focus:ring-white focus:border-white transition-all"
                            />
                          </div>
                          
                          {userData.userType !== 'vet' && (
                            <>
                              <div className="mb-4">
                                <label htmlFor="phone" className="block text-sm font-medium text-white mb-1">
                                  Phone Number
                                </label>
                                <input
                                  type="tel"
                                  id="phone"
                                  name="phone"
                                  defaultValue={userData.phone}
                                  className="w-full px-4 py-2 border-2 border-white text-black rounded-md focus:ring-white focus:border-white transition-all"
                                />
                              </div>
                              <div className="mb-6">
                                <label htmlFor="address" className="block text-sm font-medium text-white mb-1">
                                  Address
                                </label>
                                <input
                                  type="text"
                                  id="address"
                                  name="address"
                                  defaultValue={userData.address}
                                  className="w-full px-4 py-2 border-2 border-white text-black rounded-md focus:ring-white focus:border-white transition-all"
                                />
                              </div>
                            </>
                          )}
                          
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
      </div>
      <Footer />
      <style jsx global>{`
        footer {
          margin-top: 63px !important;
        }
      `}</style>

      {/* Modal: E-posta değişikliğinde şifre sor */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(155, 155, 122, 0.8)' }}>
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm relative">
            <h2 className="text-xl font-bold mb-4 text-[#797D62]">Email Change</h2>
            <p className="mb-2 text-[#797D62]">To change your email address, please enter your current password:</p>
            <input
              ref={passwordInputRef}
              type="password"
              className="w-full px-4 py-2 border-2 border-[#D08C60] rounded-md mb-3 focus:ring-[#D08C60] focus:border-[#D08C60]"
              placeholder="Your password"
              value={passwordInput}
              onChange={e => setPasswordInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handlePasswordConfirm(); }}
            />
            {reauthError && <div className="text-red-600 mb-2 text-sm">{reauthError}</div>}
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded bg-gray-200 text-[#797D62] font-medium hover:bg-gray-300"
                onClick={() => { setShowPasswordModal(false); setPasswordInput(""); }}
              >Cancel</button>
              <button
                className="px-4 py-2 rounded bg-[#D08C60] text-white font-medium hover:bg-[#C17A50]"
                onClick={handlePasswordConfirm}
              >Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}