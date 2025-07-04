"use client";

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FiCalendar, FiUsers, FiFileText, FiMessageSquare, FiEye, FiSearch, FiPlus, FiX } from 'react-icons/fi';
import { FaSyringe, FaQrcode, FaFileMedical } from 'react-icons/fa';
import { getFirestore, collection, query as firestoreQuery, where, getDocs, doc, getDoc, addDoc, onSnapshot, Timestamp } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import dynamic from 'next/dynamic';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

interface Animal {
  id: string;
  name?: string;
  animalName?: string;
  type?: string;
  breed?: string;
  gender?: string;
  color?: string;
  birthDate?: string;
  owner?: {
    name?: string;
    id?: string;
  };
  lastVisit?: string;
  birthFarmId?: string;
  currentFarmId?: string;
  deathDate?: string;
  deathLocation?: string;
  exportCountry?: string;
  exportDate?: string;
  weight?: string;
  height?: string;
  healthStatus?: string;
  microchipNumber?: string;
  passportNumber?: string;
  registrationDate?: string;
  farmInformation?: {
    address?: string;
    coordinates?: string;
    countryCode?: string;
    email?: string;
    farmId?: string;
    name?: string;
    ownerName?: string;
    phone?: string;
    registrationDate?: string;
    registrationNumber?: string;
    type?: string;
    provinceCode?: string;
    fax?: string;
  };
  vaccinations?: any;
  medicalHistory?: Array<{
    date: string;
    condition: string;
    treatment: string;
    veterinarian: string;
    notes?: string;
  }>;
  slaughterhouse?: {
    name?: string;
    address?: string;
    licenseNumber?: string;
    slaughterDate?: string;
  };
  ownerInformation?: {
    firstName?: string;
    lastName?: string;
    idNumber?: string;
    address?: string;
  };
  parentId?: string;
}

// Dynamically import react-time-picker to avoid SSR issues
const TimePicker = dynamic(() => import('react-time-picker'), { ssr: false });

export default function Dashboard() {
  const { user } = useAuth ? useAuth() : { user: null };
  if (!user) return null;
  const [selectedSection, setSelectedSection] = useState<'appointments' | 'actions' | 'records' | 'addAppointment'>('appointments');
  const [showAllAppointments, setShowAllAppointments] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeType, setActiveType] = useState<'All' | 'Vaccination' | 'Check-up' | 'Surgery'>('All');
  const [recordsSearch, setRecordsSearch] = useState('');
  const [allAnimals, setAllAnimals] = useState<Animal[]>([]);
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [recordsLoading, setRecordsLoading] = useState(false);
  const [recordsError, setRecordsError] = useState('');
  const [expandedAnimalId, setExpandedAnimalId] = useState<string | null>(null);
  const [appointmentType, setAppointmentType] = useState<'Vaccination' | 'Check-up' | 'Surgery' | null>(null);
  const [appointmentForm, setAppointmentForm] = useState<{ time: string; livestockName: string; ownerName: string }>({ time: '', livestockName: '', ownerName: user?.displayName || '' });
  const [addAppointmentLoading, setAddAppointmentLoading] = useState(false);
  const [addAppointmentError, setAddAppointmentError] = useState('');
  const [appointments, setAppointments] = useState<any[]>([]);
  const [appointmentsLoading, setAppointmentsLoading] = useState(false);
  const [appointmentsError, setAppointmentsError] = useState('');
  const [showAddOptions, setShowAddOptions] = useState(false);

  // Button style for filter
  const filterButtonBase =
    'flex items-center justify-center w-24 h-8 md:w-28 md:h-10 text-sm md:text-base font-medium border transition-colors rounded-full focus:outline-none px-4';

  // Fetch all animals once when records section is opened
  const fetchAllAnimals = async () => {
    if (!user) return;
    try {
      setRecordsLoading(true);
      setRecordsError('');
      const db = getFirestore();
      const animalsRef = collection(db, 'animals');
      const querySnapshot = await getDocs(animalsRef);
      const animalsData: Animal[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        animalsData.push({
          id: doc.id,
          name: data.name || '',
          animalName: data.animalName || '',
          type: data.type || '',
          breed: data.breed || '',
          gender: data.gender || '',
          color: data.color || '',
          birthDate: data.birthDate || '',
          owner: data.owner || { name: '', id: '' },
          lastVisit: data.lastVisit || '',
          birthFarmId: data.birthFarmId || '',
          currentFarmId: data.currentFarmId || '',
          deathDate: data.deathDate || '',
          deathLocation: data.deathLocation || '',
          exportCountry: data.exportCountry || '',
          exportDate: data.exportDate || '',
          weight: data.weight || '',
          height: data.height || '',
          healthStatus: data.healthStatus || '',
          microchipNumber: data.microchipNumber || '',
          passportNumber: data.passportNumber || '',
          registrationDate: data.registrationDate || '',
          farmInformation: data.farmInformation || {},
          vaccinations: data.vaccinations || [],
          medicalHistory: data.medicalHistory || [],
          slaughterhouse: data.slaughterhouse || {},
          ownerInformation: data.ownerInformation || {},
          parentId: data.parentId || '',
        });
      });
      setAllAnimals(animalsData);
      setAnimals(animalsData);
    } catch (err) {
      setRecordsError('Failed to fetch animals');
    } finally {
      setRecordsLoading(false);
    }
  };

  // Filter animals as user types (startsWith, case-insensitive)
  const handleRecordsSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRecordsSearch(value);
    if (!value) {
      setAnimals(allAnimals);
      return;
    }
    const filtered = allAnimals.filter(animal =>
      (animal.name && animal.name.toLowerCase().startsWith(value.toLowerCase())) ||
      (animal.id && animal.id.toLowerCase().startsWith(value.toLowerCase()))
    );
    setAnimals(filtered);
  };

  // Fetch all animals when records section is opened
  useEffect(() => {
    if (selectedSection === 'records' && allAnimals.length === 0 && user) {
      fetchAllAnimals();
    }
  }, [selectedSection, user]);

  // Calculate age from birthDate
  const calculateAge = (birthDate: string) => {
    if (!birthDate) return '0 years';
    const birth = new Date(birthDate);
    const now = new Date();
    const ageInYears = now.getFullYear() - birth.getFullYear();
    return `${ageInYears} ${ageInYears === 1 ? 'year' : 'years'}`;
  };
  const handleViewRecords = (animal: Animal) => {
    setExpandedAnimalId(expandedAnimalId === animal.id ? null : animal.id);
  };

  // Update appointments fetching to get all appointments, not just today's
  useEffect(() => {
    if (!user) return;
    setAppointmentsLoading(true);
    setAppointmentsError('');
    const db = getFirestore();
    const appointmentsRef = collection(db, 'appointments');
    const unsubscribe = onSnapshot(appointmentsRef, (snapshot) => {
      const data: any[] = [];
      snapshot.forEach(doc => data.push({ id: doc.id, ...doc.data() }));
      setAppointments(data);
      setAppointmentsLoading(false);
    }, err => {
      setAppointmentsError('Failed to fetch appointments');
      setAppointmentsLoading(false);
    });
    return () => unsubscribe();
  }, [user]);

  // Helper to get today's date string in YYYY-MM-DD
  const getTodayString = () => {
    const now = new Date();
    return now.toISOString().split('T')[0];
  };

  // Update handleAddAppointment to store dateOnly
  const handleAddAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddAppointmentLoading(true);
    setAddAppointmentError('');
    try {
      const db = getFirestore();
      const todayString = getTodayString();
      await addDoc(collection(db, 'appointments'), {
        time: appointmentForm.time,
        livestockName: appointmentForm.livestockName,
        ownerName: appointmentForm.ownerName,
        ownerId: user.uid,
        appointmentType: appointmentType,
        date: Timestamp.fromDate(new Date(`${todayString}T${appointmentForm.time}`)),
        dateOnly: todayString,
        createdAt: Timestamp.now(),
      });
      setAppointmentType(null);
      setAppointmentForm({ time: '', livestockName: '', ownerName: user.displayName || '' });
      setShowAddOptions(false);
    } catch (err: any) {
      setAddAppointmentError(err.message || 'Failed to add appointment');
    } finally {
      setAddAppointmentLoading(false);
    }
  };

  // Update isToday to use dateOnly string
  const isToday = (appointment: any) => {
    return appointment.dateOnly === getTodayString();
  };

  return (
    <main className="min-h-screen">
      <Header />
      <section className="pt-16 pb-8 md:pt-20 md:pb-10 bg-[#F1DCA7] min-h-[calc(100vh-64px)]">
        <div className="container mx-auto px-0">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-44 md:align-start">
            {/* Sidebar */}
            <div className="w-full md:w-1/4 self-start" style={{ position: 'sticky', top: '20px', marginLeft: '-59px', minWidth: '240px' }}>
              <div className="p-0 md:p-2">
                {/* App Icon - Brand (üstte, büyük) */}
                <div className="flex flex-col items-center mb-8 mt-2">
                  <div className="w-34 h-34 bg-[#C17A50] rounded-full flex items-center justify-center shadow-md overflow-hidden">
                    <img src="/cowicon.png" alt="App Icon" className="object-contain w-20 h-20" />
                  </div>
                </div>
                <nav className="space-y-2">
                  <button
                    className={`block w-full text-left py-2 px-4 rounded-md font-medium transition-colors ${selectedSection === 'appointments' ? 'bg-[#D08C60] text-white' : 'text-[#797D62] hover:bg-[#D08C60] hover:text-white'}`}
                    onClick={() => setSelectedSection('appointments')}
                  >
                    Today's Appointments
                  </button>
                  <button
                    className={`block w-full text-left py-2 px-4 rounded-md font-medium transition-colors ${selectedSection === 'records' ? 'bg-[#D08C60] text-white' : 'text-[#797D62] hover:bg-[#D08C60] hover:text-white'}`}
                    onClick={() => setSelectedSection('records')}
                  >
                    Records
                  </button>
                </nav>
              </div>
            </div>
            {/* Main Content */}
            <div className="w-full md:w-3/4 flex flex-col justify-start">
              <div className="p-0 md:p-2 min-h-[400px]">
                {selectedSection === 'appointments' && (
                  <div>
                    <div className="flex items-center mb-8 pr-1.5 relative">
                      <h2 className="text-2xl font-bold text-[#797D62] ml-0">Today's Appointments</h2>
                      <button
                        className="ml-4 flex items-center justify-center w-8 h-8 rounded-full bg-[#D08C60] hover:bg-[#C17A50] text-white text-lg focus:outline-none transition-colors"
                        onClick={() => {
                          setAppointmentType(null);
                          setShowAllAppointments(false);
                          setAddAppointmentError('');
                          setAddAppointmentLoading(false);
                          setShowAddOptions((prev) => !prev);
                        }}
                        aria-label="Add Appointment"
                        type="button"
                      >
                        <FiPlus />
                      </button>
                    </div>
                    {/* Add Appointment Options - Modern Popup */}
                    {showAddOptions && !appointmentType && (
                      <div className="w-full flex mb-6">
                        <div className="flex flex-row gap-6 items-center justify-start">
                          {[
                            { type: 'Vaccination', icon: <FaSyringe className='w-5 h-5 mr-2 text-[#D08C60]' /> },
                            { type: 'Check-up', icon: <FiEye className='w-5 h-5 mr-2 text-[#D08C60]' /> },
                            { type: 'Surgery', icon: <FaFileMedical className='w-5 h-5 mr-2 text-[#D08C60]' /> },
                          ].map(({ type, icon }) => (
                            <button
                              key={type}
                              className={`flex items-center px-7 py-4 rounded-xl font-semibold text-lg transition-all duration-200 cursor-pointer border-2 shadow-md bg-white hover:bg-[#F1DCA7] hover:border-[#D08C60] hover:scale-105 ${appointmentType === type ? 'bg-[#D08C60] text-white border-[#D08C60]' : 'text-[#797D62] border-[#D08C60]'}`}
                              onClick={() => setAppointmentType(type as typeof appointmentType)}
                              type="button"
                              style={{ minWidth: 170 }}
                            >
                              {icon}
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    {/* Add Appointment Form (inline, only if type selected) */}
                    {showAddOptions && appointmentType && (
                      <div className="relative w-full max-w-md mb-8">
                        {/* X button sağ üst köşe */}
                        <button
                          type="button"
                          className="absolute top-4 right-4 text-[#797D62] hover:text-[#D08C60] text-2xl p-0 m-0 bg-transparent border-none focus:outline-none"
                          onClick={() => { setAppointmentType(null); setShowAddOptions(false); }}
                          aria-label="Cancel"
                        >
                          <FiX />
                        </button>
                        <form className="bg-white rounded-lg shadow-md p-8 flex flex-col gap-4" onSubmit={handleAddAppointment}>
                          <h3 className="text-xl font-bold text-[#797D62] mb-4">{appointmentType} Appointment</h3>
                          <label className="text-[#797D62] font-medium">Time
                            <div className="w-full mt-1">
                              <TimePicker
                                onChange={(value: string | null) => setAppointmentForm(f => ({ ...f, time: value || '' }))}
                                value={appointmentForm.time}
                                disableClock={true}
                                clearIcon={null}
                                className="w-full border-2 border-[#D9AE94] rounded-md focus:ring-[#D9AE94] focus:border-[#D9AE94]"
                                format="HH:mm"
                                clockIcon={null}
                              />
                            </div>
                          </label>
                          <label className="text-[#797D62] font-medium">Animal Name
                            <input
                              type="text"
                              className="w-full px-4 py-2 border-2 border-[#D9AE94] rounded-md focus:ring-[#D9AE94] focus:border-[#D9AE94] mt-1"
                              value={appointmentForm.livestockName}
                              onChange={e => setAppointmentForm(f => ({ ...f, livestockName: e.target.value }))}
                              required
                              placeholder="Enter your animal's name"
                            />
                          </label>
                          <label className="text-[#797D62] font-medium">Owner Name
                            <input
                              type="text"
                              className="w-full px-4 py-2 border-2 border-[#D9AE94] rounded-md focus:ring-[#D9AE94] focus:border-[#D9AE94] mt-1"
                              value={appointmentForm.ownerName}
                              onChange={e => setAppointmentForm(f => ({ ...f, ownerName: e.target.value }))}
                              required
                              placeholder="Enter your name"
                            />
                          </label>
                          {addAppointmentError && <div className="text-red-600 text-sm">{addAppointmentError}</div>}
                          <button type="submit" className="w-full px-6 py-3 bg-[#D08C60] hover:bg-[#C17A50] text-white font-bold rounded-md transition-colors" disabled={addAppointmentLoading}>
                            {addAppointmentLoading ? 'Adding...' : 'Add Appointment'}
                          </button>
                        </form>
                      </div>
                    )}
                    {/* Search Bar */}
                    <div className="mb-4 flex flex-col md:flex-row md:items-center md:space-x-4">
                      <div className="relative w-full md:w-1/2 mb-2 md:mb-0">
                        <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-md w-full">
                          <FiSearch className="text-[#D08C60] w-5 h-5 mr-2" />
                          <input
                            type="text"
                            placeholder="Search by livestock name"
                            className="w-full bg-transparent border-none focus:outline-none text-[#797D62]"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="flex space-x-2 mt-2 md:mt-0">
                        {['All', 'Vaccination', 'Check-up', 'Surgery'].map(type => (
                          <button
                            key={type}
                            className={
                              filterButtonBase +
                              (activeType === type
                                ? ' bg-[#D08C60] text-white border-[#D08C60] shadow-sm'
                                : ' bg-white text-[#797D62] border-[#D08C60] hover:bg-[#D08C60] hover:text-white')
                            }
                            onClick={() => setActiveType(type as typeof activeType)}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                    {/* Appointments List */}
                    {appointmentsLoading ? (
                      <div className="text-center py-8">
                        <div className="text-[#797D62] text-lg">Loading...</div>
                      </div>
                    ) : appointmentsError ? (
                      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {appointmentsError}
                      </div>
                    ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {appointments
                          .filter(app =>
                            (activeType === 'All' || app.appointmentType === activeType) &&
                            (!searchQuery || ((app.livestockName || app.petName) && (app.livestockName || app.petName).toLowerCase().startsWith(searchQuery.toLowerCase())))
                          )
                          // Sadece son 12 randevu göster (arama yoksa)
                          .slice(0, searchQuery ? undefined : 12)
                          .map((appointment, index) => (
                            <div key={appointment.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow hover:-translate-y-1 duration-300">
                          <div className="flex justify-between items-start mb-4">
                            <div className="font-bold text-[#797D62] text-lg">{appointment.time}</div>
                            <div className="px-3 py-1 rounded-full text-white text-sm font-medium bg-[#D08C60]">
                              {appointment.appointmentType}
                            </div>
                          </div>
                          <div className="mb-4">
                            <h3 className="text-xl font-semibold text-[#797D62]">{appointment.livestockName || appointment.petName}</h3>
                            <p className="text-[#997B66]">Owner: {appointment.ownerName}</p>
                          </div>
                            </div>
                          ))}
                        {appointments.filter(app =>
                          (activeType === 'All' || app.appointmentType === activeType) &&
                          (!searchQuery || ((app.livestockName || app.petName) && (app.livestockName || app.petName).toLowerCase().includes(searchQuery.toLowerCase())))
                        ).length === 0 && (
                          <div className="text-center py-8 col-span-3">
                            <p className="text-[#797D62] text-lg">No appointments found.</p>
                          </div>
                        )}
                        </div>
                    )}
                  </div>
                )}
                {selectedSection === 'actions' && (
                  <div>
                    <div className="flex justify-between items-center mb-8">
                      <h2 className="text-2xl font-bold text-[#797D62]">Quick Actions</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      <div className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col items-center justify-center hover:shadow-md transition-shadow hover:-translate-y-1 duration-300 cursor-pointer">
                        <div className="w-16 h-16 bg-[#F1DCA7] rounded-full flex items-center justify-center mb-4">
                          <FiCalendar className="w-8 h-8 text-[#D08C60]" />
                        </div>
                        <span className="text-[#797D62] font-medium text-center">Add Appointment</span>
                      </div>
                      <button
                        className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col items-center justify-center hover:shadow-md transition-shadow hover:-translate-y-1 duration-300 cursor-pointer"
                        onClick={() => setSelectedSection('records')}
                      >
                        <div className="w-16 h-16 bg-[#F1DCA7] rounded-full flex items-center justify-center mb-4">
                          <FiFileText className="w-7 h-7 text-[#D08C60]" />
                        </div>
                        <span className="text-[#797D62] font-medium text-center">Records</span>
                      </button>
                    </div>
                  </div>
                )}
                {selectedSection === 'records' && (
                  <div>
                    <div className="flex items-center mb-8 pr-1.5">
                      <h2 className="text-2xl font-bold text-[#797D62]">Medical Records</h2>
                    </div>
                    {/* Search Bar */}
                    <div className="relative mb-8">
                      <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-md">
                        <FiSearch className="text-[#D08C60] w-5 h-5 mr-2" />
                        <input
                          type="text"
                          placeholder="Search by animal ID or name "
                          className="w-full bg-transparent border-none focus:outline-none text-[#797D62]"
                          value={recordsSearch}
                          onChange={handleRecordsSearch}
                        />
                      </div>
                    </div>
                    {/* Loading State */}
                    {recordsLoading && (
                      <div className="text-center py-8">
                        <div className="text-[#797D62] text-lg">Loading...</div>
                      </div>
                    )}
                    {/* Error State */}
                    {recordsError && (
                      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {recordsError}
                      </div>
                    )}
                    {/* Animals List */}
                    <div className="space-y-4">
                      {!recordsLoading && (recordsSearch.trim() === ''
                        ? animals.slice(0, 10)
                        : animals
                      ).map(animal => (
                        <div key={animal.id} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all">
                          <div className="flex justify-between items-start mb-2">
                            <h2 className="text-2xl font-bold text-[#797D62]">{animal.animalName || animal.name || 'Unnamed'}</h2>
                          </div>
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <p className="text-[#797D62]">
                                <span className="font-medium">Breed:</span> {animal.breed || 'Not specified'}
                              </p>
                              <p className="text-[#797D62]">
                                <span className="font-medium">Animal ID:</span> {animal.id}
                              </p>
                            </div>
                            <div>
                              <p className="text-[#797D62]">
                                <span className="font-medium">Owner:</span> {(() => {
                                  if (animal.owner?.name) {
                                    const parts = animal.owner.name.split(' ');
                                    if (parts.length > 1) {
                                      return parts[0] + ' ' + parts.slice(1).join(' ');
                                    } else {
                                      return animal.owner.name;
                                    }
                                  } else {
                                    return 'Not specified';
                                  }
                                })()}
                              </p>
                              <p className="text-[#797D62]">
                                <span className="font-medium">Gender:</span> {animal.gender || 'Not specified'}
                              </p>
                              {animal.lastVisit && (
                                <p className="text-[#797D62]">
                                  <span className="font-medium">Last Visit:</span> {new Date(animal.lastVisit).toLocaleDateString()}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex space-x-3">
                            <button
                              onClick={() => handleViewRecords(animal)}
                              className={`flex items-center justify-center px-4 py-2 rounded-md transition-colors font-medium ${expandedAnimalId === animal.id ? 'bg-[#C17A50] text-white' : 'bg-[#D08C60] text-white hover:bg-[#C17A50]'}`}
                            >
                              <FiFileText className="mr-2" />
                              {expandedAnimalId === animal.id ? 'Hide Animal Details' : 'View Animal Details'}
                            </button>
                          </div>
                          {expandedAnimalId === animal.id && (
                            <div className="mt-8 border-t border-[#F1DCA7] pt-8 space-y-8">
                              {/* Animal Information */}
                              <div>
                                <h3 className="text-2xl font-bold text-[#797D62] mb-4">Animal Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-[#797D62] mb-2"><span className="font-medium">Animal ID:</span> {animal.id || '-'}</p>
                                    <p className="text-[#797D62] mb-2"><span className="font-medium">Animal Name:</span> {animal.animalName || animal.name || '-'}</p>
                                    <p className="text-[#797D62] mb-2"><span className="font-medium">Birth Date:</span> {animal.birthDate ? new Date(animal.birthDate).toLocaleDateString() : '-'}</p>
                                    <p className="text-[#797D62] mb-2"><span className="font-medium">Gender:</span> {animal.gender || '-'}</p>
                                    <p className="text-[#797D62] mb-2"><span className="font-medium">Breed:</span> {animal.breed || '-'}</p>
                                    <p className="text-[#797D62] mb-2"><span className="font-medium">Parent ID:</span> {('parentId' in animal && animal.parentId) ? animal.parentId : '-'}</p>
                                    <p className="text-[#797D62] mb-2"><span className="font-medium">Birth Farm ID:</span> {animal.birthFarmId || '-'}</p>
                                    <p className="text-[#797D62] mb-2"><span className="font-medium">Current Farm ID:</span> {animal.currentFarmId || '-'}</p>
                                  </div>
                                </div>
                              </div>
                              {/* Additional Information */}
                              <div>
                                <h3 className="text-2xl font-bold text-[#797D62] mb-4">Additional Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-[#797D62] mb-2"><span className="font-medium">Death Date:</span> {animal.deathDate ? new Date(animal.deathDate).toLocaleDateString() : '-'}</p>
                                    <p className="text-[#797D62] mb-2"><span className="font-medium">Death Location:</span> {animal.deathLocation || '-'}</p>
                                    <p className="text-[#797D62] mb-2"><span className="font-medium">Export Country:</span> {animal.exportCountry || '-'}</p>
                                  </div>
                                </div>
                              </div>
                              {/* Vaccinations */}
                              <div>
                                <h3 className="text-2xl font-bold text-[#797D62] mb-4">Vaccinations</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-[#797D62] mb-2"><span className="font-medium">SAP Vaccine:</span> {Array.isArray(animal.vaccinations)
                                      ? (animal.vaccinations.find(v => v.type?.toLowerCase().includes('sap'))?.date
                                          ? new Date(animal.vaccinations.find(v => v.type?.toLowerCase().includes('sap'))?.date as string).toLocaleDateString()
                                          : '-')
                                      : (animal.vaccinations && typeof animal.vaccinations === 'object' && typeof (animal.vaccinations as any).sapVaccine === 'string'
                                          ? new Date((animal.vaccinations as any).sapVaccine).toLocaleDateString()
                                          : '-')}
                                    </p>
                                    <p className="text-[#797D62] mb-2"><span className="font-medium">Brucella Vaccine:</span> {Array.isArray(animal.vaccinations)
                                      ? (animal.vaccinations.find(v => v.type?.toLowerCase().includes('brucella'))?.date
                                          ? new Date(animal.vaccinations.find(v => v.type?.toLowerCase().includes('brucella'))?.date as string).toLocaleDateString()
                                          : '-')
                                      : (animal.vaccinations && typeof animal.vaccinations === 'object' && typeof (animal.vaccinations as any).brucellaVaccine === 'string'
                                          ? new Date((animal.vaccinations as any).brucellaVaccine).toLocaleDateString()
                                          : '-')}
                                    </p>
                                    <p className="text-[#797D62] mb-2"><span className="font-medium">Pasteurella Vaccine:</span> {Array.isArray(animal.vaccinations)
                                      ? (animal.vaccinations.find(v => v.type?.toLowerCase().includes('pasteurella'))?.date
                                          ? new Date(animal.vaccinations.find(v => v.type?.toLowerCase().includes('pasteurella'))?.date as string).toLocaleDateString()
                                          : '-')
                                      : (animal.vaccinations && typeof animal.vaccinations === 'object' && typeof (animal.vaccinations as any).pasteurellaVaccine === 'string'
                                          ? new Date((animal.vaccinations as any).pasteurellaVaccine).toLocaleDateString()
                                          : '-')}
                                    </p>
                                    <p className="text-[#797D62] mb-2"><span className="font-medium">Other Vaccine:</span> {Array.isArray(animal.vaccinations)
                                      ? (animal.vaccinations.find(v => v.type?.toLowerCase().includes('other'))?.date
                                          ? new Date(animal.vaccinations.find(v => v.type?.toLowerCase().includes('other'))?.date as string).toLocaleDateString()
                                          : '-')
                                      : (animal.vaccinations && typeof animal.vaccinations === 'object' && typeof (animal.vaccinations as any).otherVaccine === 'string'
                                          ? new Date((animal.vaccinations as any).otherVaccine).toLocaleDateString()
                                          : '-')}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              {/* Slaughterhouse Information */}
                              <div>
                                <h3 className="text-2xl font-bold text-[#797D62] mb-4">Slaughterhouse Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    {('slaughterhouse' in animal && animal.slaughterhouse) && (
                                      <>
                                        <p className="text-[#797D62] mb-2"><span className="font-medium">Name:</span> {animal.slaughterhouse?.name || '-'}</p>
                                        <p className="text-[#797D62] mb-2"><span className="font-medium">Address:</span> {animal.slaughterhouse?.address || '-'}</p>
                                        <p className="text-[#797D62] mb-2"><span className="font-medium">License Number:</span> {animal.slaughterhouse?.licenseNumber || '-'}</p>
                                        <p className="text-[#797D62] mb-2"><span className="font-medium">Slaughter Date:</span> {animal.slaughterhouse?.slaughterDate ? new Date(animal.slaughterhouse?.slaughterDate as string).toLocaleDateString() : '-'}</p>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                              {/* Farm Information */}
                              <div>
                                <h3 className="text-2xl font-bold text-[#797D62] mb-4">Farm Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-[#797D62] mb-2"><span className="font-medium">Country Code:</span> {animal.farmInformation?.countryCode || '-'}</p>
                                    <p className="text-[#797D62] mb-2"><span className="font-medium">Province Code:</span> {animal.farmInformation && 'provinceCode' in animal.farmInformation ? animal.farmInformation.provinceCode : '-'}</p>
                                    <p className="text-[#797D62] mb-2"><span className="font-medium">Farm ID:</span> {animal.farmInformation?.farmId || '-'}</p>
                                    <p className="text-[#797D62] mb-2"><span className="font-medium">Farm Address:</span> {animal.farmInformation?.address || '-'}</p>
                                    <p className="text-[#797D62] mb-2"><span className="font-medium">Coordinates:</span> {animal.farmInformation?.coordinates || '-'}</p>
                                    <p className="text-[#797D62] mb-2"><span className="font-medium">Phone:</span> {animal.farmInformation?.phone || '-'}</p>
                                    <p className="text-[#797D62] mb-2"><span className="font-medium">Fax:</span> {animal.farmInformation && 'fax' in animal.farmInformation ? animal.farmInformation.fax : '-'}</p>
                                    <p className="text-[#797D62] mb-2"><span className="font-medium">Email:</span> {animal.farmInformation?.email || '-'}</p>
                                  </div>
                                </div>
                              </div>
                              {/* Owner Information */}
                              <div>
                                <h3 className="text-2xl font-bold text-[#797D62] mb-4">Owner Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    {('ownerInformation' in animal && animal.ownerInformation) && (
                                      <>
                                        <p className="text-[#797D62] mb-2"><span className="font-medium">First Name:</span> {animal.ownerInformation?.firstName || '-'}</p>
                                        <p className="text-[#797D62] mb-2"><span className="font-medium">Last Name:</span> {animal.ownerInformation?.lastName || '-'}</p>
                                        <p className="text-[#797D62] mb-2"><span className="font-medium">ID Number:</span> {animal.ownerInformation?.idNumber || '-'}</p>
                                        <p className="text-[#797D62] mb-2"><span className="font-medium">Address:</span> {animal.ownerInformation?.address || '-'}</p>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                      {!recordsLoading && recordsSearch && animals.length === 0 && (
                        <div className="text-center py-8">
                          <p className="text-[#797D62] text-lg">No animals found</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      {/* Add custom CSS for react-time-picker highlight color */}
      <style jsx global>{`
        .react-time-picker__wrapper {
          border: 2px solid #D9AE94 !important;
          border-radius: 0.375rem !important;
        }
        .react-time-picker__inputGroup__input:focus {
          border-color: #D08C60 !important;
          box-shadow: 0 0 0 2px #D08C6033 !important;
        }
        .react-time-picker__inputGroup__input:active {
          border-color: #D08C60 !important;
        }
        .react-time-picker__inputGroup__input:focus-visible {
          outline: 2px solid #D08C60 !important;
        }
        .react-time-picker__inputGroup__input:selection {
          background: #D08C60 !important;
          color: #fff !important;
        }
        .react-time-picker__inputGroup__input::selection {
          background: #D08C60 !important;
          color: #fff !important;
        }
        .react-time-picker__button svg {
          stroke: #D08C60 !important;
        }
        .react-time-picker__clock {
          background: #fff !important;
          border: 2px solid #D08C60 !important;
        }
      `}</style>
    </main>
  );
} 