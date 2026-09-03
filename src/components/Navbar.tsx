import React, { useState } from 'react';
import { PageView } from '../types';
import { useData } from '../context/DataContext';
import { ArrowRight, Menu, X, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage }) => {
  const { openBooking, bookings } = useData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const newBookingsCount = bookings.filter((b) => b.status === 'New').length;

  const handleNavClick = (page: PageView) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 transition-all h-[88px] flex items-center">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <button
            id="nav-brand-logo"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left focus:outline-none group"
          >
            <div className="w-8 h-8 bg-[#064E3B] rounded-sm flex items-center justify-center text-white font-bold text-base group-hover:bg-black transition-colors">
              S
            </div>
            <span className="text-2xl font-bold tracking-tighter uppercase text-[#1A1A1A]">
              Synaios
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <button
              id="nav-link-home"
              onClick={() => handleNavClick('home')}
              className={`text-xs uppercase tracking-wider font-medium transition-colors ${
                currentPage === 'home'
                  ? 'text-[#1A1A1A] font-bold border-b-2 border-[#064E3B] pb-1'
                  : 'text-gray-500 hover:text-[#1A1A1A]'
              }`}
            >
              Home
            </button>
            <button
              id="nav-link-services"
              onClick={() => handleNavClick('services')}
              className={`text-xs uppercase tracking-wider font-medium transition-colors ${
                currentPage === 'services'
                  ? 'text-[#1A1A1A] font-bold border-b-2 border-[#064E3B] pb-1'
                  : 'text-gray-500 hover:text-[#1A1A1A]'
              }`}
            >
              Services
            </button>
            <button
              id="nav-link-about"
              onClick={() => handleNavClick('about')}
              className={`text-xs uppercase tracking-wider font-medium transition-colors ${
                currentPage === 'about'
                  ? 'text-[#1A1A1A] font-bold border-b-2 border-[#064E3B] pb-1'
                  : 'text-gray-500 hover:text-[#1A1A1A]'
              }`}
            >
              About
            </button>
            <button
              id="nav-link-contact"
              onClick={() => handleNavClick('contact')}
              className={`text-xs uppercase tracking-wider font-medium transition-colors ${
                currentPage === 'contact'
                  ? 'text-[#1A1A1A] font-bold border-b-2 border-[#064E3B] pb-1'
                  : 'text-gray-500 hover:text-[#1A1A1A]'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              id="nav-cta-book-consultation"
              onClick={openBooking}
              className="bg-[#064E3B] text-white px-6 py-3 rounded-none text-xs font-bold tracking-widest uppercase hover:bg-black transition-colors"
            >
              Book Your Free Consultation
            </button>

            {/* Quick Admin Portal access */}
            <button
              id="nav-admin-link"
              onClick={() => handleNavClick('admin')}
              title="Admin Management Dashboard"
              className={`p-2 rounded-sm text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                currentPage === 'admin'
                  ? 'bg-[#1A1A1A] text-white'
                  : 'text-gray-400 hover:text-[#1A1A1A] hover:bg-gray-50'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span className="sr-only sm:not-sr-only text-[11px] uppercase tracking-wider font-bold">Admin</span>
              {newBookingsCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-[#581C87] animate-pulse" />
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              id="nav-mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-sm text-gray-700 hover:text-black hover:bg-gray-50 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-[88px] inset-x-0 border-b border-gray-200 bg-white px-6 pt-4 pb-6 space-y-4 shadow-xl z-50 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-2">
            <button
              id="nav-mobile-home"
              onClick={() => handleNavClick('home')}
              className={`text-left px-3 py-2 text-xs font-bold uppercase tracking-wider ${
                currentPage === 'home' ? 'text-[#064E3B] bg-gray-50' : 'text-gray-600'
              }`}
            >
              Home
            </button>
            <button
              id="nav-mobile-services"
              onClick={() => handleNavClick('services')}
              className={`text-left px-3 py-2 text-xs font-bold uppercase tracking-wider ${
                currentPage === 'services' ? 'text-[#064E3B] bg-gray-50' : 'text-gray-600'
              }`}
            >
              Services
            </button>
            <button
              id="nav-mobile-about"
              onClick={() => handleNavClick('about')}
              className={`text-left px-3 py-2 text-xs font-bold uppercase tracking-wider ${
                currentPage === 'about' ? 'text-[#064E3B] bg-gray-50' : 'text-gray-600'
              }`}
            >
              About
            </button>
            <button
              id="nav-mobile-contact"
              onClick={() => handleNavClick('contact')}
              className={`text-left px-3 py-2 text-xs font-bold uppercase tracking-wider ${
                currentPage === 'contact' ? 'text-[#064E3B] bg-gray-50' : 'text-gray-600'
              }`}
            >
              Contact
            </button>
            <button
              id="nav-mobile-admin"
              onClick={() => handleNavClick('admin')}
              className={`text-left px-3 py-2 text-xs font-bold uppercase tracking-wider flex items-center justify-between ${
                currentPage === 'admin' ? 'bg-[#1A1A1A] text-white' : 'text-gray-600'
              }`}
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                Admin Dashboard
              </span>
              {newBookingsCount > 0 && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#581C87] text-white font-bold">
                  {newBookingsCount} new
                </span>
              )}
            </button>
          </div>

          <div className="pt-3 border-t border-gray-100">
            <button
              id="nav-mobile-cta"
              onClick={() => {
                setMobileMenuOpen(false);
                openBooking();
              }}
              className="w-full flex items-center justify-center px-4 py-3 rounded-none text-xs font-bold tracking-widest uppercase text-white bg-[#064E3B] hover:bg-black transition-colors"
            >
              Book Your Free Consultation
            </button>
            <p className="text-center text-[11px] text-gray-500 mt-2">
              30 minutes. No obligation. Let's talk about your business.
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
