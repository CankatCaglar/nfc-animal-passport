"use client";

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FiSearch, FiFileText, FiPlus } from 'react-icons/fi';
import Link from 'next/link';

// Mock data for pets
const petRecords = [
  {
    id: 1,
    name: 'Max',
    type: 'Dog',
    breed: 'Golden Retriever',
    age: '3 years',
    owner: 'John Smith',
    lastVisit: '2023-12-15',
    animalType: 'Dog'
  },
  {
    id: 2,
    name: 'Bella',
    type: 'Cat',
    breed: 'Siamese',
    age: '2 years',
    owner: 'Sarah Johnson',
    lastVisit: '2023-12-10',
    animalType: 'Cat'
  },
  {
    id: 3,
    name: 'Charlie',
    type: 'Dog',
    breed: 'German Shepherd',
    age: '5 years',
    owner: 'Michael Brown',
    lastVisit: '2023-12-05',
    animalType: 'Dog'
  },
  {
    id: 4,
    name: 'Luna',
    type: 'Cat',
    breed: 'Maine Coon',
    age: '1 year',
    owner: 'Emily Davis',
    lastVisit: '2023-11-30',
    animalType: 'Cat'
  }
];

export default function Records() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter pets based on active tab and search query
  const filteredPets = petRecords.filter(pet => {
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'vaccinations' && pet.lastVisit > '2023-12-01') ||
                      (activeTab === 'recent' && pet.lastVisit > '2023-12-01') ||
                      (activeTab === 'surgery' && pet.lastVisit < '2023-12-07');
                      
    const matchesSearch = searchQuery === '' || 
                        pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        pet.owner.toLowerCase().includes(searchQuery.toLowerCase());
                        
    return matchesTab && matchesSearch;
  });

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
                  placeholder="Search by pet or owner name"
                  className="w-full bg-transparent border-none focus:outline-none text-[#797D62]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            {/* Tabs */}
            <div className="flex overflow-x-auto mb-8 pb-2">
              <button
                className={`px-6 py-3 rounded-full font-medium mr-3 whitespace-nowrap transition-colors ${
                  activeTab === 'all' 
                    ? 'bg-[#D08C60] text-white' 
                    : 'bg-white text-[#797D62] hover:bg-[#F3E9E0]'
                }`}
                onClick={() => setActiveTab('all')}
              >
                All Records
              </button>
              <button
                className={`px-6 py-3 rounded-full font-medium mr-3 whitespace-nowrap transition-colors ${
                  activeTab === 'recent' 
                    ? 'bg-[#D08C60] text-white' 
                    : 'bg-white text-[#797D62] hover:bg-[#F3E9E0]'
                }`}
                onClick={() => setActiveTab('recent')}
              >
                Recent Visits
              </button>
              <button
                className={`px-6 py-3 rounded-full font-medium mr-3 whitespace-nowrap transition-colors ${
                  activeTab === 'vaccinations' 
                    ? 'bg-[#D08C60] text-white' 
                    : 'bg-white text-[#797D62] hover:bg-[#F3E9E0]'
                }`}
                onClick={() => setActiveTab('vaccinations')}
              >
                Vaccinations
              </button>
              <button
                className={`px-6 py-3 rounded-full font-medium mr-3 whitespace-nowrap transition-colors ${
                  activeTab === 'surgery' 
                    ? 'bg-[#D08C60] text-white' 
                    : 'bg-white text-[#797D62] hover:bg-[#F3E9E0]'
                }`}
                onClick={() => setActiveTab('surgery')}
              >
                Surgery
              </button>
            </div>
            
            {/* Pet Records List */}
            <div className="space-y-4">
              {filteredPets.map(pet => (
                <div key={pet.id} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-2xl font-bold text-[#797D62]">{pet.name}</h2>
                    <span className="px-4 py-1 bg-[#D08C60] text-white rounded-full text-sm">
                      {pet.animalType}
                    </span>
                  </div>
                  
                  <p className="text-[#797D62] mb-4">
                    {pet.type} • {pet.breed} • {pet.age}
                  </p>
                  
                  <div className="mb-4">
                    <p className="text-[#797D62]">
                      Owner: {pet.owner}
                    </p>
                    <p className="text-[#797D62]">
                      Last Visit: {pet.lastVisit}
                    </p>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Link 
                      href={`/records/${pet.id}`}
                      className="flex items-center justify-center px-4 py-2 bg-[#D08C60] text-white rounded-md hover:bg-[#C17A50] transition-colors"
                    >
                      <FiFileText className="mr-2" />
                      View Records
                    </Link>
                    <Link
                      href={`/records/add/${pet.id}`}
                      className="flex items-center justify-center px-4 py-2 bg-[#ADBC9F] text-white rounded-md hover:bg-[#9CAD8B] transition-colors"
                    >
                      <FiPlus className="mr-2" />
                      Add Record
                    </Link>
                  </div>
                </div>
              ))}
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
      
      <Footer />
    </main>
  );
} 