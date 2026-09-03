import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import {
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  X,
  ChevronRight,
  ArrowLeft,
  Mail,
  Building,
  User,
  Phone,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

const AVAILABLE_TIMES = [
  '09:00 AM',
  '10:30 AM',
  '11:30 AM',
  '01:00 PM',
  '02:30 PM',
  '04:00 PM',
];

// Generate next 14 business days
const getAvailableDates = () => {
  const dates: { dateStr: string; displayDay: string; displayMonthDate: string; isAvailable: boolean }[] = [];
  const today = new Date();
  let count = 0;
  let offset = 1;

  while (count < 14) {
    const d = new Date(today);
    d.setDate(today.getDate() + offset);
    const dayOfWeek = d.getDay(); // 0 is Sun, 6 is Sat
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const date = String(d.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${date}`;
      const displayDay = d.toLocaleDateString('en-US', { weekday: 'short' });
      const displayMonthDate = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      dates.push({ dateStr, displayDay, displayMonthDate, isAvailable: true });
      count++;
    }
    offset++;
  }
  return dates;
};

export const BookingModal: React.FC = () => {
  const { isBookingOpen, closeBooking, addBooking } = useData();
  const availableDates = getAvailableDates();

  const [step, setStep] = useState<'datetime' | 'details' | 'success'>('datetime');
  const [selectedDate, setSelectedDate] = useState<string>(availableDates[0]?.dateStr || '');
  const [selectedTime, setSelectedTime] = useState<string>('10:30 AM');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    business: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [confirmedBookingDetails, setConfirmedBookingDetails] = useState<{
    date: string;
    time: string;
    name: string;
    email: string;
  } | null>(null);

  if (!isBookingOpen) return null;

  const handleNextToDetails = () => {
    if (!selectedDate || !selectedTime) return;
    setStep('details');
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Please enter your full name';
    if (!formData.email.trim() || !formData.email.includes('@')) errors.email = 'Please provide a valid email';
    if (!formData.phone.trim()) errors.phone = 'Please enter a contact number';
    if (!formData.business.trim()) errors.business = 'Please provide your business or organization';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Save booking into context & backend store
    addBooking({
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      business: formData.business.trim(),
      message: formData.message.trim(),
      date: selectedDate,
      time: selectedTime,
    });

    setConfirmedBookingDetails({
      date: selectedDate,
      time: selectedTime,
      name: formData.name.trim(),
      email: formData.email.trim(),
    });

    setStep('success');
  };

  const handleResetAndClose = () => {
    closeBooking();
    setTimeout(() => {
      setStep('datetime');
      setFormData({ name: '', email: '', phone: '', business: '', message: '' });
      setFormErrors({});
      setConfirmedBookingDetails(null);
    }, 300);
  };

  const formattedBookingDate = selectedDate
    ? new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <div
      id="consultation-booking-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto"
    >
      <div className="relative w-full max-w-2xl bg-white border border-gray-200 shadow-2xl overflow-hidden my-8">
        {/* Header Bar */}
        <div className="px-6 py-4 bg-[#1A1A1A] text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <span className="w-2 h-2 rounded-full bg-[#064E3B]"></span>
            <span className="text-xs uppercase tracking-widest font-bold text-gray-300">
              SYNAIOS CONSULTATION
            </span>
          </div>
          <button
            id="close-booking-modal-btn"
            onClick={handleResetAndClose}
            className="text-gray-400 hover:text-white p-1 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-8">
          {step === 'datetime' && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#064E3B] block mb-1">
                  DIRECT SCHEDULING
                </span>
                <h3 className="text-2xl font-black tracking-tight text-[#1A1A1A]">
                  BOOK YOUR FREE CONSULTATION
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  30 minutes. No obligation. Let's talk about what you can improve.
                </p>
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-3 flex items-center gap-1.5">
                  <CalendarIcon className="w-4 h-4 text-[#064E3B]" />
                  Select an Available Date
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
                  {availableDates.map((item) => {
                    const isSelected = selectedDate === item.dateStr;
                    return (
                      <button
                        key={item.dateStr}
                        type="button"
                        onClick={() => setSelectedDate(item.dateStr)}
                        className={`p-2.5 text-center border transition-all ${
                          isSelected
                            ? 'bg-[#064E3B] text-white border-[#064E3B]'
                            : 'bg-[#F9FAFB] border-gray-200 text-[#1A1A1A] hover:border-gray-400 hover:bg-white'
                        }`}
                      >
                        <span className={`block text-[10px] font-semibold uppercase ${isSelected ? 'text-emerald-200' : 'text-gray-500'}`}>
                          {item.displayDay}
                        </span>
                        <span className="block text-xs font-bold mt-0.5">
                          {item.displayMonthDate}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-3 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#064E3B]" />
                  Select an Available Time (30 Min)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {AVAILABLE_TIMES.map((time) => {
                    const isSelected = selectedTime === time;
                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`py-2.5 px-3 text-xs font-bold uppercase tracking-wider border text-center transition-all ${
                          isSelected
                            ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                            : 'bg-white border-gray-200 text-[#1A1A1A] hover:bg-gray-50 hover:border-gray-300'
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Summary of Selected Slot */}
              <div className="p-3.5 bg-[#F9FAFB] border-l-2 border-[#581C87] flex items-center justify-between text-xs text-gray-600">
                <span>
                  Selected: <strong className="text-black">{formattedBookingDate}</strong> at{' '}
                  <strong className="text-black">{selectedTime}</strong>
                </span>
                <span className="text-[#064E3B] font-bold uppercase tracking-wider text-[10px] flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Free Consultation
                </span>
              </div>

              {/* Next Button */}
              <div className="flex justify-end pt-2">
                <button
                  id="booking-next-step-btn"
                  type="button"
                  onClick={handleNextToDetails}
                  className="inline-flex items-center px-6 py-3 text-xs font-bold uppercase tracking-widest text-white bg-[#064E3B] hover:bg-black transition-colors"
                >
                  <span>Continue to Your Details</span>
                  <ChevronRight className="w-4 h-4 ml-1.5" />
                </button>
              </div>
            </div>
          )}

          {step === 'details' && (
            <form onSubmit={handleConfirmBooking} className="space-y-5">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <div>
                  <h3 className="text-lg font-black uppercase tracking-tight text-[#1A1A1A]">
                    Your Details
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {formattedBookingDate} at {selectedTime}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep('datetime')}
                  className="text-xs font-bold uppercase tracking-wider text-[#064E3B] hover:text-black flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Change Time
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      id="booking-input-name"
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full pl-9 pr-3 py-2.5 border text-sm focus:outline-none transition-colors ${
                        formErrors.name ? 'border-red-400 bg-red-50/20' : 'border-gray-300 focus:border-[#064E3B]'
                      }`}
                    />
                  </div>
                  {formErrors.name && <p className="text-xs text-red-600 mt-1">{formErrors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Work Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      id="booking-input-email"
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full pl-9 pr-3 py-2.5 border text-sm focus:outline-none transition-colors ${
                        formErrors.email ? 'border-red-400 bg-red-50/20' : 'border-gray-300 focus:border-[#064E3B]'
                      }`}
                    />
                  </div>
                  {formErrors.email && <p className="text-xs text-red-600 mt-1">{formErrors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Contact Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      id="booking-input-phone"
                      type="tel"
                      required
                      placeholder="(555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full pl-9 pr-3 py-2.5 border text-sm focus:outline-none transition-colors ${
                        formErrors.phone ? 'border-red-400 bg-red-50/20' : 'border-gray-300 focus:border-[#064E3B]'
                      }`}
                    />
                  </div>
                  {formErrors.phone && <p className="text-xs text-red-600 mt-1">{formErrors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Business / Organization *
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      id="booking-input-business"
                      type="text"
                      required
                      placeholder="Company Name"
                      value={formData.business}
                      onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                      className={`w-full pl-9 pr-3 py-2.5 border text-sm focus:outline-none transition-colors ${
                        formErrors.business ? 'border-red-400 bg-red-50/20' : 'border-gray-300 focus:border-[#064E3B]'
                      }`}
                    />
                  </div>
                  {formErrors.business && <p className="text-xs text-red-600 mt-1">{formErrors.business}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  What would you like to improve or solve? (Optional)
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <textarea
                    id="booking-input-message"
                    rows={3}
                    placeholder="Tell us what takes too much time or what process feels inefficient..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 border border-gray-300 focus:border-[#064E3B] text-sm focus:outline-none transition-colors"
                  ></textarea>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep('datetime')}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-600 hover:text-black"
                >
                  Back
                </button>
                <button
                  id="booking-confirm-submit-btn"
                  type="submit"
                  className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-white bg-[#064E3B] hover:bg-black transition-colors"
                >
                  Confirm Free Consultation
                </button>
              </div>
            </form>
          )}

          {step === 'success' && (
            <div className="text-center py-4 space-y-5">
              <div className="w-16 h-16 bg-[#064E3B]/10 text-[#064E3B] flex items-center justify-center mx-auto rounded-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <h2 className="text-3xl font-black tracking-tight text-[#1A1A1A] font-heading">
                  YOU'RE BOOKED.
                </h2>
                <p className="text-sm text-gray-700 font-medium mt-2 max-w-md mx-auto">
                  Your free consultation has been scheduled for{' '}
                  <span className="text-[#064E3B] font-bold">
                    {formattedBookingDate}
                  </span>{' '}
                  at <span className="text-[#064E3B] font-bold">{confirmedBookingDetails?.time}</span>.
                </p>
              </div>

              <div className="p-4 bg-[#F9FAFB] border-l-2 border-[#064E3B] max-w-md mx-auto text-left space-y-2 text-xs text-gray-600">
                <div className="flex items-center justify-between text-[11px] text-gray-500 uppercase tracking-wider font-bold border-b border-gray-200 pb-2">
                  <span>Booking Confirmation</span>
                  <span className="text-[#064E3B]">30 Min Meeting</span>
                </div>
                <p>
                  <strong className="text-black">Attendee:</strong> {confirmedBookingDetails?.name} ({confirmedBookingDetails?.email})
                </p>
                <p>
                  <strong className="text-black">Meeting Format:</strong> Video conference link dispatched via email
                </p>
                <p className="text-xs text-gray-500 pt-1">
                  A confirmation email with calendar invites and direct preparation notes has been simulated and saved to our system.
                </p>
              </div>

              <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  id="booking-success-done-btn"
                  type="button"
                  onClick={handleResetAndClose}
                  className="w-full sm:w-auto px-8 py-3 text-xs font-bold uppercase tracking-widest text-white bg-[#1A1A1A] hover:bg-[#064E3B] transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
