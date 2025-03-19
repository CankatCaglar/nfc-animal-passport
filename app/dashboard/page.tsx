"use client";

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FiCalendar, FiUsers, FiFileText, FiMessageSquare, FiEye } from 'react-icons/fi';
import { FaSyringe, FaQrcode, FaFileMedical } from 'react-icons/fa';

// Mock data for the appointments
const todaysAppointments = [
  {
    time: '10:00 AM',
    petName: 'Max',
    ownerName: 'John Smith',
    appointmentType: 'Vaccination'
  },
  {
    time: '11:30 AM',
    petName: 'Bella',
    ownerName: 'Sarah Johnson',
    appointmentType: 'Check-up'
  },
  {
    time: '2:15 PM',
    petName: 'Charlie',
    ownerName: 'Michael Brown',
    appointmentType: 'Surgery'
  }
];

// Additional appointments to show when "See All" is clicked
const moreAppointments = [
  {
    time: '3:45 PM',
    petName: 'Luna',
    ownerName: 'Emily Wilson',
    appointmentType: 'Dental'
  },
  {
    time: '4:30 PM',
    petName: 'Rocky',
    ownerName: 'David Thompson',
    appointmentType: 'Check-up'
  },
  {
    time: '5:15 PM',
    petName: 'Daisy',
    ownerName: 'Jessica Roberts',
    appointmentType: 'Vaccination'
  }
];

export default function Dashboard() {
  const [showAllAppointments, setShowAllAppointments] = useState(false);
  
  return (
    <main className="min-h-screen">
      <Header />
      
      <section className="py-16 md:py-24 bg-[#F1DCA7]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-[#797D62] mb-6">
              Vet Dashboard
            </h1>
            <p className="text-lg text-[#797D62] opacity-90 max-w-3xl mx-auto">
              Manage pet appointments, health records, and vaccinations all in one place.
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            {/* Today's Appointments Section */}
            <div className="mb-12">
              <div className="flex justify-between items-center mb-8 pr-1.5">
                <h2 className="text-2xl font-bold text-[#797D62]">Today's Appointments</h2>
                <a 
                  href="#" 
                  className="text-[#D08C60] hover:underline font-medium"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowAllAppointments(!showAllAppointments);
                  }}
                >
                  See All
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {todaysAppointments.map((appointment, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow hover:-translate-y-1 duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <div className="font-bold text-[#797D62] text-lg">{appointment.time}</div>
                      <div className="px-3 py-1 rounded-full text-white text-sm font-medium bg-[#D08C60]">
                        {appointment.appointmentType}
                      </div>
                    </div>
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold text-[#797D62]">{appointment.petName}</h3>
                      <p className="text-[#997B66]">Owner: {appointment.ownerName}</p>
                    </div>
                    <div className="flex space-x-4 mt-auto">
                      <button className="flex items-center text-[#997B66] hover:text-[#D08C60]">
                        <FiMessageSquare className="mr-1" />
                        <span>Message</span>
                      </button>
                      <button className="flex items-center text-[#997B66] hover:text-[#D08C60]">
                        <FiEye className="mr-1" />
                        <span>View</span>
                      </button>
                    </div>
                  </div>
                ))}
                
                {/* Additional appointments that show when "See All" is clicked */}
                {showAllAppointments && moreAppointments.map((appointment, index) => (
                  <div 
                    key={`more-${index}`} 
                    className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow hover:-translate-y-1 duration-300 animate-fadeIn"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="font-bold text-[#797D62] text-lg">{appointment.time}</div>
                      <div className="px-3 py-1 rounded-full text-white text-sm font-medium bg-[#D08C60]">
                        {appointment.appointmentType}
                      </div>
                    </div>
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold text-[#797D62]">{appointment.petName}</h3>
                      <p className="text-[#997B66]">Owner: {appointment.ownerName}</p>
                    </div>
                    <div className="flex space-x-4 mt-auto">
                      <button className="flex items-center text-[#997B66] hover:text-[#D08C60]">
                        <FiMessageSquare className="mr-1" />
                        <span>Message</span>
                      </button>
                      <button className="flex items-center text-[#997B66] hover:text-[#D08C60]">
                        <FiEye className="mr-1" />
                        <span>View</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions Section */}
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-[#797D62]">Quick Actions</h2>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col items-center justify-center hover:shadow-md transition-shadow hover:-translate-y-1 duration-300 cursor-pointer">
                  <div className="w-16 h-16 bg-[#F1DCA7] rounded-full flex items-center justify-center mb-4">
                    <FiCalendar className="w-8 h-8 text-[#D08C60]" />
                  </div>
                  <span className="text-[#797D62] font-medium text-center">Add Appointment</span>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col items-center justify-center hover:shadow-md transition-shadow hover:-translate-y-1 duration-300 cursor-pointer">
                  <div className="w-16 h-16 bg-[#F1DCA7] rounded-full flex items-center justify-center mb-4">
                    <FaSyringe className="w-7 h-7 text-[#D08C60]" />
                  </div>
                  <span className="text-[#797D62] font-medium text-center">Record Vaccine</span>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col items-center justify-center hover:shadow-md transition-shadow hover:-translate-y-1 duration-300 cursor-pointer">
                  <div className="w-16 h-16 bg-[#F1DCA7] rounded-full flex items-center justify-center mb-4">
                    <FaFileMedical className="w-7 h-7 text-[#D08C60]" />
                  </div>
                  <span className="text-[#797D62] font-medium text-center">New Health Record</span>
                </div>
                
                <a href="/records" className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col items-center justify-center hover:shadow-md transition-shadow hover:-translate-y-1 duration-300 cursor-pointer">
                  <div className="w-16 h-16 bg-[#F1DCA7] rounded-full flex items-center justify-center mb-4">
                    <FiFileText className="w-7 h-7 text-[#D08C60]" />
                  </div>
                  <span className="text-[#797D62] font-medium text-center">Records</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Navigation (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 md:hidden">
        <div className="flex justify-around">
          <a href="/dashboard" className="flex flex-col items-center text-[#D08C60]">
            <FiUsers className="w-5 h-5" />
            <span className="text-xs mt-1">Dashboard</span>
          </a>
          <a href="#" className="flex flex-col items-center text-[#797D62]">
            <FaQrcode className="w-5 h-5" />
            <span className="text-xs mt-1">Scan Tag</span>
          </a>
          <a href="#" className="flex flex-col items-center text-[#797D62]">
            <FiCalendar className="w-5 h-5" />
            <span className="text-xs mt-1">Appointments</span>
          </a>
          <a href="/records" className="flex flex-col items-center text-[#797D62]">
            <FiFileText className="w-5 h-5" />
            <span className="text-xs mt-1">Records</span>
          </a>
          <a href="/profile" className="flex flex-col items-center text-[#797D62]">
            <FiUsers className="w-5 h-5" />
            <span className="text-xs mt-1">Profile</span>
          </a>
        </div>
      </div>
      
      <Footer />
    </main>
  );
} 