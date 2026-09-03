import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import {
  Calendar,
  Clock,
  Mail,
  Phone,
  Building,
  CheckCircle2,
  ArrowRight,
  Send,
  MessageSquare,
  User,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { content, openBooking } = useData();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    business: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.business.trim() || !formData.message.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-white text-[#1A1A1A] py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#064E3B] block">
            GET IN TOUCH
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[#1A1A1A] font-heading">
            LET'S TALK.
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            Have something you'd like to improve in your business? Let's talk about it.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 border border-gray-200">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 bg-[#064E3B]/10 text-[#064E3B] flex items-center justify-center mx-auto rounded-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black tracking-tight text-[#1A1A1A]">
                  MESSAGE DISPATCHED
                </h3>
                <p className="text-gray-600 max-w-md mx-auto text-sm leading-relaxed">
                  Thank you, <strong className="text-black">{formData.name}</strong>. A digital strategist from SYNAIOS will review your message and reach back out within 24 business hours.
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', business: '', message: '' });
                    }}
                    className="text-xs font-bold uppercase tracking-widest text-[#064E3B] hover:text-black"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="text-lg font-black uppercase tracking-tight text-[#1A1A1A]">
                  Send a Direct Message
                </h2>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 text-xs font-semibold text-red-700">
                    {error}
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        required
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-10 pr-3.5 py-2.5 border border-gray-300 focus:border-[#064E3B] text-sm focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                        <input
                          type="email"
                          required
                          placeholder="you@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-10 pr-3.5 py-2.5 border border-gray-300 focus:border-[#064E3B] text-sm focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                        Contact Number *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                        <input
                          type="tel"
                          required
                          placeholder="(555) 000-0000"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full pl-10 pr-3.5 py-2.5 border border-gray-300 focus:border-[#064E3B] text-sm focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Business / Organization *
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        required
                        placeholder="Company or Organization Name"
                        value={formData.business}
                        onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                        className="w-full pl-10 pr-3.5 py-2.5 border border-gray-300 focus:border-[#064E3B] text-sm focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Message *
                    </label>
                    <div className="relative">
                      <MessageSquare className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                      <textarea
                        required
                        rows={4}
                        placeholder="Briefly describe what you are looking to improve or simplify..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full pl-10 pr-3.5 py-2.5 border border-gray-300 focus:border-[#064E3B] text-sm focus:outline-none transition-colors"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    id="contact-form-submit-btn"
                    type="submit"
                    className="bg-[#064E3B] text-white px-8 py-3.5 rounded-none text-xs font-bold uppercase tracking-widest hover:bg-black transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>SEND MESSAGE</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Prominent Consultation Booking Box */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 sm:p-10 bg-[#064E3B] text-white space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-emerald-200 text-xs font-bold uppercase tracking-widest">
                <Calendar className="w-3.5 h-3.5" />
                Direct Calendar Booking
              </div>

              <h2 className="text-2xl sm:text-3xl font-black tracking-tight font-heading leading-tight uppercase">
                BOOK YOUR FREE CONSULTATION
              </h2>

              <p className="text-emerald-100 text-sm leading-relaxed">
                Skip email tag. Pick a date and time that fits your calendar right now.
              </p>

              <div className="p-4 bg-white/10 border border-white/15 space-y-2 text-xs text-emerald-50">
                <div className="flex items-center gap-2 font-bold text-white text-xs uppercase tracking-wider">
                  <Clock className="w-4 h-4 text-emerald-300" />
                  <span>30 minutes. No obligation.</span>
                </div>
                <p className="leading-relaxed">
                  Let's talk about what you want to improve, simplify, automate, or solve in your business.
                </p>
              </div>

              <button
                id="contact-prominent-book-btn"
                onClick={openBooking}
                className="w-full flex items-center justify-center px-6 py-4 rounded-none text-xs font-bold uppercase tracking-widest text-[#1A1A1A] bg-white hover:bg-black hover:text-white transition-all group"
              >
                <span>BOOK YOUR FREE CONSULTATION</span>
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Direct Coordinates */}
            <div className="p-6 bg-[#F9FAFB] border border-gray-200 space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest text-[#581C87]">
                Direct Coordinates
              </p>
              <div className="space-y-2 text-xs text-gray-700">
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#064E3B]" />
                  <span>{content.contactEmail}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#064E3B]" />
                  <span>{content.contactPhone}</span>
                </p>
                <p className="flex items-center gap-2 text-[11px] text-gray-500 pt-1">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>{content.businessHours}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
