import React, { useState } from 'react';
import { PageView } from './types';
import { DataProvider } from './context/DataContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { ServicesPage } from './components/ServicesPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { AdminDashboard } from './components/AdminDashboard';
import { BookingModal } from './components/BookingModal';
import { Footer } from './components/Footer';

export function AppContent() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1A1A1A] font-sans antialiased selection:bg-[#064E3B] selection:text-white">
      {/* Persistent Navigation */}
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
        {currentPage === 'services' && <ServicesPage />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'contact' && <ContactPage />}
        {currentPage === 'admin' && <AdminDashboard />}
      </main>

      {/* Global Consultation Booking Modal */}
      <BookingModal />

      {/* Global Footer */}
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default function App() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
}
