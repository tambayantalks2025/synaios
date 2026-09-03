import React from 'react';
import { PageView } from '../types';
import { useData } from '../context/DataContext';
import { ArrowRight, ShieldCheck, Mail, Phone, Clock } from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: PageView) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
  const { content, openBooking } = useData();

  const handleNav = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1A1A1A] text-white border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand & Philosophy */}
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-[#064E3B] rounded-sm flex items-center justify-center text-white font-bold text-sm tracking-tight">
                S
              </div>
              <span className="text-2xl font-bold tracking-tighter uppercase text-white">
                Synaios
              </span>
            </div>

            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              We make things better. Practical digital solutions, AI, and automation that help businesses work smarter, faster, and better.
            </p>

            <div className="p-4 bg-zinc-900 border-l-2 border-[#581C87] text-xs text-gray-300 italic leading-relaxed">
              "{content.founderPhilosophy1}"
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-[#581C87]">
              Navigation
            </p>
            <ul className="space-y-2.5 text-xs uppercase tracking-wider text-gray-400">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-white transition-colors"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-white transition-colors"
                >
                  About SYNAIOS
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-white transition-colors"
                >
                  Contact
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => handleNav('admin')}
                  className="text-xs font-semibold text-gray-500 hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Portal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Consultation CTA & Direct Contact */}
          <div className="md:col-span-4 space-y-5">
            <p className="text-xs font-bold uppercase tracking-widest text-[#581C87]">
              Start The Conversation
            </p>

            <button
              id="footer-book-cta-btn"
              onClick={openBooking}
              className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-none text-xs font-bold uppercase tracking-widest text-white bg-[#064E3B] hover:bg-white hover:text-black transition-all group"
            >
              <span>BOOK YOUR FREE CONSULTATION</span>
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-[11px] text-gray-400">
              30 minutes. No obligation. Let's talk about your business.
            </p>

            <div className="pt-1 space-y-2 text-xs text-gray-400">
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gray-500" />
                <span>{content.contactEmail}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gray-500" />
                <span>{content.contactPhone}</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-gray-500" />
                <span>{content.businessHours}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Signature Professional Polish bottom bar */}
        <div className="mt-14 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-6">
          <div className="flex gap-6 sm:gap-8 text-[10px] sm:text-xs uppercase tracking-[0.2em] opacity-70 font-semibold">
            <span>Practical</span>
            <span>Simple</span>
            <span>Personal</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <span className="text-xs font-medium text-gray-300">Ready to make things better?</span>
            <button
              onClick={openBooking}
              className="bg-white text-black px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#064E3B] hover:text-white transition-all shadow-sm"
            >
              Book Consultation
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
