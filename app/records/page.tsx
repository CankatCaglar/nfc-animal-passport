"use client";

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FiSearch, FiFileText, FiPlus, FiX } from 'react-icons/fi';
import Link from 'next/link';
import { getFirestore, collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

interface Animal {
  id: string;
  name: string;
  type: string;
  breed: string;
  gender: string;
  color: string;
  birthDate: string;
  owner: {
    name: string;
    id: string;
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
  };
  vaccinations?: Array<{
    date: string;
    type: string;
    veterinarian: string;
    nextDueDate?: string;
    batchNumber?: string;
  }>;
  medicalHistory?: Array<{
    date: string;
    condition: string;
    treatment: string;
    veterinarian: string;
    notes?: string;
  }>;
}

export default function Records() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const { user } = useAuth();

  const searchAnimals = async () => {
    if (!searchQuery.trim() || !user) return;

    try {
      setLoading(true);
      setError('');
      const db = getFirestore();

      // Önce doğrudan ID ile arama yapalım
      const docRef = doc(db, 'animals', searchQuery.trim());
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // ID ile eşleşen hayvan bulundu
        const data = docSnap.data();
        setAnimals([{
          id: docSnap.id,
          name: data.name || '',
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
          medicalHistory: data.medicalHistory || []
        }]);
      } else {
        // ID ile bulunamadıysa, isim ile arama yapalım
        const animalsRef = collection(db, 'animals');
        const q = query(animalsRef, where('name', '>=', searchQuery.toLowerCase()), where('name', '<=', searchQuery.toLowerCase() + '\uf8ff'));
        const querySnapshot = await getDocs(q);
        
        const animalsData: Animal[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          animalsData.push({
            id: doc.id,
            name: data.name || '',
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
            medicalHistory: data.medicalHistory || []
          });
        });
        
        if (animalsData.length === 0) {
          setError('No animals found with this ID or name');
        }
        setAnimals(animalsData);
      }
    } catch (err) {
      console.error('Error searching animals:', err);
      setError('Failed to search animals');
    } finally {
      setLoading(false);
    }
  };

  // Calculate age from birthDate
  const calculateAge = (birthDate: string) => {
    if (!birthDate) return '0 years';
    const birth = new Date(birthDate);
    const now = new Date();
    const ageInYears = now.getFullYear() - birth.getFullYear();
    return `${ageInYears} ${ageInYears === 1 ? 'year' : 'years'}`;
  };

  const handleViewRecords = (animal: Animal) => {
    setSelectedAnimal(animal);
  };

  const closeModal = () => {
    setSelectedAnimal(null);
  };

  return (
    <main className="min-h-screen">
      <Header />
      
      <section className="py-16 md:py-24 bg-[#F1DCA7]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-[#797D62] mb-10">
              Medical Records
            </h1>
            
            {/* Search Bar */}
            <div className="relative mb-8">
              <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-md">
                <FiSearch className="text-[#D08C60] w-5 h-5 mr-2" />
                <input
                  type="text"
                  placeholder="Search by animal ID or name"
                  className="w-full bg-transparent border-none focus:outline-none text-[#797D62]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && searchAnimals()}
                />
              </div>
            </div>
            
            {/* Loading State */}
            {loading && (
              <div className="text-center py-8">
                <div className="text-[#797D62] text-lg">Loading...</div>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            
            {/* Animals List */}
            <div className="space-y-4">
              {!loading && animals.map(animal => (
                <div key={animal.id} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-2xl font-bold text-[#797D62]">{animal.name || 'Unnamed'}</h2>
                    <span className="px-4 py-1 bg-[#D08C60] text-white rounded-full text-sm">
                      {animal.type || 'Unknown'}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-[#797D62]">
                        <span className="font-medium">Breed:</span> {animal.breed || 'Not specified'}
                      </p>
                      <p className="text-[#797D62]">
                        <span className="font-medium">Age:</span> {calculateAge(animal.birthDate)}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#797D62]">
                        <span className="font-medium">Owner:</span> {animal.owner?.name || 'Not specified'}
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
                      className="flex items-center justify-center px-4 py-2 bg-[#D08C60] text-white rounded-md hover:bg-[#C17A50] transition-colors"
                    >
                      <FiFileText className="mr-2" />
                      View Records
                    </button>
                    <Link
                      href={`/records/add/${animal.id}`}
                      className="flex items-center justify-center px-4 py-2 bg-[#ADBC9F] text-white rounded-md hover:bg-[#9CAD8B] transition-colors"
                    >
                      <FiPlus className="mr-2" />
                      Add Record
                    </Link>
                  </div>
                </div>
              ))}

              {!loading && searchQuery && animals.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-[#797D62] text-lg">No animals found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Bottom Navigation (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 md:hidden">
        <div className="flex justify-around">
          <Link href="/dashboard" className="flex flex-col items-center text-[#797D62]">
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span className="text-xs mt-1">Dashboard</span>
          </Link>
          
          <Link href="#" className="flex flex-col items-center text-[#797D62]">
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span className="text-xs mt-1">Appointments</span>
          </Link>
          
          <Link href="/records" className="flex flex-col items-center text-[#D08C60]">
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <span className="text-xs mt-1">Records</span>
          </Link>
          
          <Link href="/profile" className="flex flex-col items-center text-[#797D62]">
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </div>
      
      {/* Detailed Records Modal */}
      {selectedAnimal && (
        <div className="fixed inset-0 bg-[#9B9B7A] bg-opacity-95 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[#797D62]">Animal Details</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>
            
            <div className="p-6">
              {/* Basic Information */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-[#797D62] mb-4">Basic Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[#797D62] mb-2">
                      <span className="font-medium">ID:</span> {selectedAnimal.id || 'null'}
                    </p>
                    <p className="text-[#797D62] mb-2">
                      <span className="font-medium">Name:</span> {selectedAnimal.name || 'null'}
                    </p>
                    <p className="text-[#797D62] mb-2">
                      <span className="font-medium">Type:</span> {selectedAnimal.type || 'null'}
                    </p>
                    <p className="text-[#797D62] mb-2">
                      <span className="font-medium">Breed:</span> {selectedAnimal.breed || 'null'}
                    </p>
                    <p className="text-[#797D62] mb-2">
                      <span className="font-medium">Gender:</span> {selectedAnimal.gender || 'null'}
                    </p>
                    <p className="text-[#797D62] mb-2">
                      <span className="font-medium">Color:</span> {selectedAnimal.color || 'null'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#797D62] mb-2">
                      <span className="font-medium">Birth Date:</span> {selectedAnimal.birthDate || 'null'}
                    </p>
                    <p className="text-[#797D62] mb-2">
                      <span className="font-medium">Weight:</span> {selectedAnimal.weight || 'null'}
                    </p>
                    <p className="text-[#797D62] mb-2">
                      <span className="font-medium">Height:</span> {selectedAnimal.height || 'null'}
                    </p>
                    <p className="text-[#797D62] mb-2">
                      <span className="font-medium">Health Status:</span> {selectedAnimal.healthStatus || 'null'}
                    </p>
                    <p className="text-[#797D62] mb-2">
                      <span className="font-medium">Microchip Number:</span> {selectedAnimal.microchipNumber || 'null'}
                    </p>
                    <p className="text-[#797D62] mb-2">
                      <span className="font-medium">Passport Number:</span> {selectedAnimal.passportNumber || 'null'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Farm Information */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-[#797D62] mb-4">Farm Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[#797D62] mb-2">
                      <span className="font-medium">Farm Name:</span> {selectedAnimal.farmInformation?.name || 'null'}
                    </p>
                    <p className="text-[#797D62] mb-2">
                      <span className="font-medium">Owner Name:</span> {selectedAnimal.farmInformation?.ownerName || 'null'}
                    </p>
                    <p className="text-[#797D62] mb-2">
                      <span className="font-medium">Registration Number:</span> {selectedAnimal.farmInformation?.registrationNumber || 'null'}
                    </p>
                    <p className="text-[#797D62] mb-2">
                      <span className="font-medium">Registration Date:</span> {selectedAnimal.farmInformation?.registrationDate || 'null'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#797D62] mb-2">
                      <span className="font-medium">Address:</span> {selectedAnimal.farmInformation?.address || 'null'}
                    </p>
                    <p className="text-[#797D62] mb-2">
                      <span className="font-medium">Country Code:</span> {selectedAnimal.farmInformation?.countryCode || 'null'}
                    </p>
                    <p className="text-[#797D62] mb-2">
                      <span className="font-medium">Phone:</span> {selectedAnimal.farmInformation?.phone || 'null'}
                    </p>
                    <p className="text-[#797D62] mb-2">
                      <span className="font-medium">Email:</span> {selectedAnimal.farmInformation?.email || 'null'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Export Information */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-[#797D62] mb-4">Export Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[#797D62] mb-2">
                      <span className="font-medium">Export Country:</span> {selectedAnimal.exportCountry || 'null'}
                    </p>
                    <p className="text-[#797D62] mb-2">
                      <span className="font-medium">Export Date:</span> {selectedAnimal.exportDate || 'null'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#797D62] mb-2">
                      <span className="font-medium">Death Location:</span> {selectedAnimal.deathLocation || 'null'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Medical History */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-[#797D62] mb-4">Medical History</h3>
                {selectedAnimal.medicalHistory && selectedAnimal.medicalHistory.length > 0 ? (
                  <div className="grid gap-4">
                    {selectedAnimal.medicalHistory.map((record, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-[#797D62] mb-2">
                          <span className="font-medium">Date:</span> {record.date}
                        </p>
                        <p className="text-[#797D62] mb-2">
                          <span className="font-medium">Condition:</span> {record.condition}
                        </p>
                        <p className="text-[#797D62] mb-2">
                          <span className="font-medium">Treatment:</span> {record.treatment}
                        </p>
                        <p className="text-[#797D62] mb-2">
                          <span className="font-medium">Veterinarian:</span> {record.veterinarian}
                        </p>
                        {record.notes && (
                          <p className="text-[#797D62]">
                            <span className="font-medium">Notes:</span> {record.notes}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[#797D62]">No medical history records found</p>
                )}
              </div>

              {/* Vaccinations */}
              <div>
                <h3 className="text-xl font-bold text-[#797D62] mb-4">Vaccination History</h3>
                {selectedAnimal.vaccinations && selectedAnimal.vaccinations.length > 0 ? (
                  <div className="grid gap-4">
                    {selectedAnimal.vaccinations.map((vaccination, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-[#797D62] mb-2">
                          <span className="font-medium">Date:</span> {vaccination.date}
                        </p>
                        <p className="text-[#797D62] mb-2">
                          <span className="font-medium">Type:</span> {vaccination.type}
                        </p>
                        <p className="text-[#797D62] mb-2">
                          <span className="font-medium">Veterinarian:</span> {vaccination.veterinarian}
                        </p>
                        {vaccination.nextDueDate && (
                          <p className="text-[#797D62] mb-2">
                            <span className="font-medium">Next Due Date:</span> {vaccination.nextDueDate}
                          </p>
                        )}
                        {vaccination.batchNumber && (
                          <p className="text-[#797D62]">
                            <span className="font-medium">Batch Number:</span> {vaccination.batchNumber}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[#797D62]">No vaccination records found</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </main>
  );
} 