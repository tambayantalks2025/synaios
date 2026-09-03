import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { Booking, BookingStatus, Service, TeamMember, Testimonial } from '../types';
import { PhotoUpload } from './PhotoUpload';
import {
  Calendar,
  Users,
  Briefcase,
  MessageSquareQuote,
  FileText,
  Search,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  XCircle,
  Clock,
  Lock,
  LogOut,
  RefreshCcw,
  Check,
  AlertCircle,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    bookings,
    updateBookingStatus,
    rescheduleBooking,
    deleteBooking,
    team,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
    services,
    addService,
    updateService,
    deleteService,
    testimonials,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    content,
    updateContent,
    resetToDefaults,
  } = useData();

  // Simple authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('synaios_admin_auth') === 'true';
  });
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    'bookings' | 'team' | 'services' | 'testimonials' | 'content'
  >('bookings');

  // Bookings filter & search
  const [bookingSearch, setBookingSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [dateFilter, setDateFilter] = useState<string>('');

  // Reschedule Modal
  const [reschedulingBooking, setReschedulingBooking] = useState<Booking | null>(null);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('10:00 AM');

  // Notes Modal
  const [editingNotesBooking, setEditingNotesBooking] = useState<Booking | null>(null);
  const [currentNotes, setCurrentNotes] = useState('');

  // Team Form Modal
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [teamFormData, setTeamFormData] = useState({
    name: '',
    position: '',
    shortBio: '',
    fullBio: '',
    photo: '',
    email: '',
    linkedin: '',
    twitter: '',
    displayOrder: 1,
    active: true,
  });

  // Services Form Modal
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [serviceFormData, setServiceFormData] = useState({
    name: '',
    shortDesc: '',
    businessBenefit: '',
    displayOrder: 1,
    active: true,
  });

  // Testimonials Form Modal
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [testimonialFormData, setTestimonialFormData] = useState({
    clientName: '',
    company: '',
    position: '',
    testimonial: '',
    photo: '',
    companyLogo: '',
    active: true,
  });

  // Content form state
  const [contentFormData, setContentFormData] = useState({ ...content });
  const [contentSaveSuccess, setContentSaveSuccess] = useState(false);

  useEffect(() => {
    setContentFormData({ ...content });
  }, [content]);

  // Authentication handlers
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim().toLowerCase() === 'synaios' || passcode.trim() === 'admin2025') {
      setIsAuthenticated(true);
      sessionStorage.setItem('synaios_admin_auth', 'true');
      setAuthError('');
    } else {
      setAuthError('Incorrect passcode. (Try "synaios" or click Demo Login)');
    }
  };

  const handleDemoLogin = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('synaios_admin_auth', 'true');
    setAuthError('');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('synaios_admin_auth');
  };

  // Filtered Bookings
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.email.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.business.toLowerCase().includes(bookingSearch.toLowerCase());
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    const matchesDate = !dateFilter || b.date === dateFilter;
    return matchesSearch && matchesStatus && matchesDate;
  });

  // Handle Team Member Edit
  const openEditTeam = (member: TeamMember) => {
    setEditingMember(member);
    setTeamFormData({
      name: member.name,
      position: member.position,
      shortBio: member.shortBio,
      fullBio: member.fullBio,
      photo: member.photo,
      email: member.email,
      linkedin: member.socialLinks?.linkedin || '',
      twitter: member.socialLinks?.twitter || '',
      displayOrder: member.displayOrder,
      active: member.active,
    });
    setIsTeamModalOpen(true);
  };

  const handleSaveTeam = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: teamFormData.name,
      position: teamFormData.position,
      shortBio: teamFormData.shortBio,
      fullBio: teamFormData.fullBio,
      photo: teamFormData.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
      email: teamFormData.email,
      socialLinks: {
        linkedin: teamFormData.linkedin || undefined,
        twitter: teamFormData.twitter || undefined,
      },
      displayOrder: Number(teamFormData.displayOrder),
      active: teamFormData.active,
    };

    if (editingMember) {
      updateTeamMember(editingMember.id, payload);
    } else {
      addTeamMember(payload);
    }
    setIsTeamModalOpen(false);
    setEditingMember(null);
  };

  // Handle Service Edit
  const openEditService = (srv: Service) => {
    setEditingService(srv);
    setServiceFormData({
      name: srv.name,
      shortDesc: srv.shortDesc,
      businessBenefit: srv.businessBenefit,
      displayOrder: srv.displayOrder,
      active: srv.active,
    });
    setIsServiceModalOpen(true);
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingService) {
      updateService(editingService.id, serviceFormData);
    } else {
      addService(serviceFormData);
    }
    setIsServiceModalOpen(false);
    setEditingService(null);
  };

  // Handle Testimonials
  const openEditTestimonial = (test: Testimonial) => {
    setEditingTestimonial(test);
    setTestimonialFormData({
      clientName: test.clientName,
      company: test.company,
      position: test.position,
      testimonial: test.testimonial,
      photo: test.photo || '',
      companyLogo: test.companyLogo || '',
      active: test.active,
    });
    setIsTestimonialModalOpen(true);
  };

  const handleSaveTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTestimonial) {
      updateTestimonial(editingTestimonial.id, testimonialFormData);
    } else {
      addTestimonial(testimonialFormData);
    }
    setIsTestimonialModalOpen(false);
    setEditingTestimonial(null);
  };

  // Save Website Content
  const handleSaveContent = (e: React.FormEvent) => {
    e.preventDefault();
    updateContent(contentFormData);
    setContentSaveSuccess(true);
    setTimeout(() => setContentSaveSuccess(false), 3000);
  };

  // If not authenticated, render passcode gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-white">
        <div className="w-full max-w-md bg-white p-8 border border-gray-200 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-[#064E3B] text-white flex items-center justify-center mx-auto rounded-sm">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black tracking-tight text-[#1A1A1A] font-heading uppercase">
              SYNAIOS Admin Portal
            </h2>
            <p className="text-xs text-gray-500">
              Manage client consultation bookings, team members, services, and content.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {authError && (
              <div className="p-3 bg-red-50 border border-red-200 text-xs font-semibold text-red-700">
                {authError}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Passcode
              </label>
              <input
                type="password"
                placeholder="Enter admin passcode (or click Demo below)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-gray-300 focus:border-[#064E3B] text-sm focus:outline-none"
              />
            </div>

            <button
              id="admin-login-submit-btn"
              type="submit"
              className="w-full py-3 text-xs font-bold uppercase tracking-widest text-white bg-[#064E3B] hover:bg-black transition-colors"
            >
              Sign In to Admin
            </button>

            <div className="pt-2 text-center border-t border-gray-100">
              <button
                type="button"
                onClick={handleDemoLogin}
                className="text-xs font-bold uppercase tracking-wider text-[#064E3B] hover:text-black"
              >
                Quick Demo Access (Click to bypass)
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#FAFAFA] min-h-screen pb-24 text-[#1A1A1A]">
      {/* Top Admin Header */}
      <header className="bg-white border-b border-gray-200 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#064E3B] text-white flex items-center justify-center font-bold text-xs rounded-sm">
                S
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tight text-[#1A1A1A] font-heading uppercase">
                  SYNAIOS Control Center
                </h1>
                <p className="text-xs text-gray-500">
                  Secure Management Dashboard
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={resetToDefaults}
                title="Reset local changes back to default starter content"
                className="px-3 py-1.5 border border-gray-300 text-xs font-bold uppercase tracking-wider text-gray-700 hover:bg-gray-100 flex items-center gap-1.5"
              >
                <RefreshCcw className="w-3.5 h-3.5" />
                Reset Defaults
              </button>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 bg-[#1A1A1A] text-white text-xs font-bold uppercase tracking-wider hover:bg-black flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex space-x-2 border-t border-gray-100 pt-1 overflow-x-auto">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 shrink-0 ${
                activeTab === 'bookings'
                  ? 'border-[#064E3B] text-[#064E3B]'
                  : 'border-transparent text-gray-500 hover:text-black'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Bookings ({bookings.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('team')}
              className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 shrink-0 ${
                activeTab === 'team'
                  ? 'border-[#064E3B] text-[#064E3B]'
                  : 'border-transparent text-gray-500 hover:text-black'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Team & Strategists ({team.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 shrink-0 ${
                activeTab === 'services'
                  ? 'border-[#064E3B] text-[#064E3B]'
                  : 'border-transparent text-gray-500 hover:text-black'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Services ({services.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('testimonials')}
              className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 shrink-0 ${
                activeTab === 'testimonials'
                  ? 'border-[#064E3B] text-[#064E3B]'
                  : 'border-transparent text-gray-500 hover:text-black'
              }`}
            >
              <MessageSquareQuote className="w-4 h-4" />
              <span>Testimonials ({testimonials.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('content')}
              className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 shrink-0 ${
                activeTab === 'content'
                  ? 'border-[#064E3B] text-[#064E3B]'
                  : 'border-transparent text-gray-500 hover:text-black'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Website Content</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* ===================== TAB 1: BOOKINGS ===================== */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-zinc-950 font-heading">
                  Consultation Bookings
                </h2>
                <p className="text-xs text-zinc-500">
                  Review, confirm, reschedule, or add internal notes for incoming discovery requests.
                </p>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="relative">
                  <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search client or business..."
                    value={bookingSearch}
                    onChange={(e) => setBookingSearch(e.target.value)}
                    className="pl-9 pr-3 py-1.5 text-xs rounded-lg border border-zinc-300 bg-white focus:outline-none focus:border-[#1b4332]"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="py-1.5 px-3 text-xs rounded-lg border border-zinc-300 bg-white font-medium focus:outline-none"
                >
                  <option value="All">All Statuses</option>
                  <option value="New">New</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>

                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="py-1.5 px-3 text-xs rounded-lg border border-zinc-300 bg-white focus:outline-none"
                />

                {dateFilter && (
                  <button
                    onClick={() => setDateFilter('')}
                    className="text-xs text-zinc-500 hover:text-zinc-900 underline"
                  >
                    Clear date
                  </button>
                )}
              </div>
            </div>

            {/* Bookings List */}
            {filteredBookings.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-2xl border border-zinc-200 text-zinc-500 space-y-2">
                <Calendar className="w-8 h-8 mx-auto text-zinc-400" />
                <p className="text-base font-semibold text-zinc-800">No bookings matched your filter</p>
                <p className="text-xs">Adjust your search terms or filters above.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredBookings.map((b) => (
                  <div
                    key={b.id}
                    className="p-6 bg-white rounded-2xl border border-zinc-200/90 shadow-sm space-y-4 hover:border-zinc-300 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 pb-3">
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                            b.status === 'New'
                              ? 'bg-amber-100 text-amber-800'
                              : b.status === 'Confirmed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : b.status === 'Completed'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-zinc-100 text-zinc-600'
                          }`}
                        >
                          {b.status}
                        </span>
                        <span className="text-xs font-medium text-zinc-400">
                          ID: {b.id}
                        </span>
                        <span className="text-xs text-zinc-400">
                          Submitted: {new Date(b.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      {/* Status changer buttons */}
                      <div className="flex items-center gap-1.5">
                        <select
                          value={b.status}
                          onChange={(e) =>
                            updateBookingStatus(b.id, e.target.value as BookingStatus)
                          }
                          className="text-xs font-bold py-1 px-2.5 rounded-lg border border-zinc-200 bg-zinc-50"
                        >
                          <option value="New">Mark New</option>
                          <option value="Confirmed">Mark Confirmed</option>
                          <option value="Completed">Mark Completed</option>
                          <option value="Cancelled">Mark Cancelled</option>
                        </select>

                        <button
                          onClick={() => {
                            setReschedulingBooking(b);
                            setNewDate(b.date);
                            setNewTime(b.time);
                          }}
                          className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800"
                        >
                          Reschedule
                        </button>

                        <button
                          onClick={() => {
                            setEditingNotesBooking(b);
                            setCurrentNotes(b.notes || '');
                          }}
                          className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800"
                        >
                          Notes
                        </button>

                        <button
                          onClick={() => {
                            if (confirm(`Delete consultation booking for ${b.name}?`)) {
                              deleteBooking(b.id);
                            }
                          }}
                          className="p-1 text-zinc-400 hover:text-red-600 rounded"
                          title="Delete booking"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Booking Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-0.5">
                          Client & Organization
                        </span>
                        <p className="font-bold text-zinc-950">{b.name}</p>
                        <p className="text-xs text-zinc-600">{b.business}</p>
                      </div>

                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-0.5">
                          Contact Info
                        </span>
                        <p className="text-zinc-800">{b.email}</p>
                        <p className="text-xs text-zinc-500">{b.phone}</p>
                      </div>

                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-0.5">
                          Scheduled Slot
                        </span>
                        <p className="font-bold text-[#1b4332] flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {b.date}
                        </p>
                        <p className="text-xs text-zinc-600 flex items-center gap-1 mt-0.5">
                          <Clock className="w-3.5 h-3.5" />
                          {b.time} (30 mins)
                        </p>
                      </div>

                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-0.5">
                          Admin Notes
                        </span>
                        <p className="text-xs text-zinc-600 italic">
                          {b.notes ? b.notes : 'No internal notes added.'}
                        </p>
                      </div>
                    </div>

                    {/* Client Message */}
                    {b.message && (
                      <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/80 text-xs text-zinc-700">
                        <strong className="text-zinc-900 block mb-1">Client Note / Challenge:</strong>
                        {b.message}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ===================== TAB 2: TEAM MANAGEMENT ===================== */}
        {activeTab === 'team' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-zinc-950 font-heading">
                  Team Management
                </h2>
                <p className="text-xs text-zinc-500">
                  Add and feature Digital Strategists. The website automatically displays active members.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingMember(null);
                  setTeamFormData({
                    name: '',
                    position: 'Digital Strategist',
                    shortBio: '',
                    fullBio: '',
                    photo: '',
                    email: '',
                    linkedin: '',
                    twitter: '',
                    displayOrder: team.length + 1,
                    active: true,
                  });
                  setIsTeamModalOpen(true);
                }}
                className="inline-flex items-center px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#1b4332] hover:bg-[#143326]"
              >
                <Plus className="w-4 h-4 mr-1.5" />
                Add Digital Strategist
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="h-48 w-full bg-zinc-100 relative">
                      <img
                        src={member.photo}
                        alt={member.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute top-3 right-3 flex items-center gap-1.5">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            member.active ? 'bg-emerald-100 text-emerald-800' : 'bg-zinc-200 text-zinc-700'
                          }`}
                        >
                          {member.active ? 'Active' : 'Inactive'}
                        </span>
                        {member.isFounder && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-purple-800">
                            Founder
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-5 space-y-2">
                      <h3 className="text-lg font-bold text-zinc-950">{member.name}</h3>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#1b4332]">
                        {member.position}
                      </p>
                      <p className="text-xs text-zinc-600 line-clamp-3">{member.shortBio}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-zinc-50 border-t border-zinc-100 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-zinc-400">
                      Order: {member.displayOrder}
                    </span>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => openEditTeam(member)}
                        className="p-1.5 rounded-md hover:bg-zinc-200 text-zinc-700"
                        title="Edit member"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      {!member.isFounder && (
                        <button
                          onClick={() => {
                            if (confirm(`Remove ${member.name} from team?`)) {
                              deleteTeamMember(member.id);
                            }
                          }}
                          className="p-1.5 rounded-md hover:bg-red-50 text-red-600"
                          title="Delete member"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================== TAB 3: SERVICES MANAGEMENT ===================== */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-zinc-950 font-heading">
                  Services Management
                </h2>
                <p className="text-xs text-zinc-500">
                  Add, edit, reorder, or toggle active services displayed across the website.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingService(null);
                  setServiceFormData({
                    name: '',
                    shortDesc: '',
                    businessBenefit: '',
                    displayOrder: services.length + 1,
                    active: true,
                  });
                  setIsServiceModalOpen(true);
                }}
                className="inline-flex items-center px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#1b4332] hover:bg-[#143326]"
              >
                <Plus className="w-4 h-4 mr-1.5" />
                Add New Service
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((srv) => (
                <div
                  key={srv.id}
                  className="p-6 bg-white rounded-2xl border border-zinc-200 shadow-sm flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#1b4332] uppercase tracking-wider">
                        Order #{srv.displayOrder}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          srv.active ? 'bg-emerald-100 text-emerald-800' : 'bg-zinc-200 text-zinc-700'
                        }`}
                      >
                        {srv.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-zinc-950">{srv.name}</h3>
                    <p className="text-xs text-zinc-600">{srv.shortDesc}</p>
                    <div className="p-2.5 rounded-lg bg-zinc-50 text-xs text-zinc-700 font-medium">
                      <strong>Benefit:</strong> {srv.businessBenefit}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-zinc-100 flex items-center justify-between">
                    <button
                      onClick={() => updateService(srv.id, { active: !srv.active })}
                      className="text-xs font-semibold text-zinc-600 hover:text-zinc-950"
                    >
                      {srv.active ? 'Deactivate' : 'Activate'}
                    </button>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => openEditService(srv)}
                        className="p-1.5 rounded-md hover:bg-zinc-100 text-zinc-700"
                        title="Edit service"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete service "${srv.name}"?`)) {
                            deleteService(srv.id);
                          }
                        }}
                        className="p-1.5 rounded-md hover:bg-red-50 text-red-600"
                        title="Delete service"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================== TAB 4: TESTIMONIALS ===================== */}
        {activeTab === 'testimonials' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-zinc-950 font-heading">
                  Testimonials Management
                </h2>
                <p className="text-xs text-zinc-500">
                  Add genuine client stories. Note: If no testimonials exist, the section is cleanly hidden on the public site.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingTestimonial(null);
                  setTestimonialFormData({
                    clientName: '',
                    company: '',
                    position: '',
                    testimonial: '',
                    photo: '',
                    companyLogo: '',
                    active: true,
                  });
                  setIsTestimonialModalOpen(true);
                }}
                className="inline-flex items-center px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#1b4332] hover:bg-[#143326]"
              >
                <Plus className="w-4 h-4 mr-1.5" />
                Add Testimonial
              </button>
            </div>

            {testimonials.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-2xl border border-dashed border-zinc-300 space-y-3">
                <MessageSquareQuote className="w-10 h-10 mx-auto text-zinc-300" />
                <h3 className="text-base font-bold text-zinc-900">No Testimonials Added Yet</h3>
                <p className="text-xs text-zinc-500 max-w-md mx-auto">
                  Per strict instructions: fake testimonials are prohibited. The testimonial section is currently hidden on the public website until you add verified client feedback here.
                </p>
                <button
                  onClick={() => setIsTestimonialModalOpen(true)}
                  className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-zinc-900 hover:bg-zinc-800 inline-block"
                >
                  Add Your First Client Testimonial
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonials.map((t) => (
                  <div
                    key={t.id}
                    className="p-6 bg-white rounded-2xl border border-zinc-200 shadow-sm flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-zinc-950">{t.clientName}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            t.active ? 'bg-emerald-100 text-emerald-800' : 'bg-zinc-200 text-zinc-700'
                          }`}
                        >
                          {t.active ? 'Active' : 'Hidden'}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500">
                        {t.position}, {t.company}
                      </p>
                      <p className="text-sm text-zinc-700 italic">"{t.testimonial}"</p>
                    </div>

                    <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
                      <button
                        onClick={() => updateTestimonial(t.id, { active: !t.active })}
                        className="text-xs font-semibold text-zinc-600 hover:text-zinc-950"
                      >
                        {t.active ? 'Hide from site' : 'Show on site'}
                      </button>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => openEditTestimonial(t)}
                          className="p-1.5 rounded-md hover:bg-zinc-100 text-zinc-700"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete testimonial from ${t.clientName}?`)) {
                              deleteTestimonial(t.id);
                            }
                          }}
                          className="p-1.5 rounded-md hover:bg-red-50 text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ===================== TAB 5: WEBSITE CONTENT ===================== */}
        {activeTab === 'content' && (
          <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm max-w-4xl space-y-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-950 font-heading">
                Website Content & Coordinates
              </h2>
              <p className="text-xs text-zinc-500">
                Update founder narrative, philosophies, ventures, and contact details.
              </p>
            </div>

            {contentSaveSuccess && (
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-2">
                <Check className="w-4 h-4" /> Changes saved successfully!
              </div>
            )}

            <form onSubmit={handleSaveContent} className="space-y-6">
              {/* Founder Photo Upload Component */}
              <div className="p-5 bg-gray-50 border border-gray-200 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#064E3B] block">
                  FOUNDER PORTRAIT PHOTOGRAPH
                </span>
                <PhotoUpload
                  id="founder-photo-upload"
                  value={contentFormData.founderPhoto}
                  onChange={(founderPhoto) =>
                    setContentFormData({ ...contentFormData, founderPhoto })
                  }
                  label="Founder Photo"
                  helperText="Upload a portrait photo from your computer (drag & drop or click), paste an image URL, or pick from presets. Displayed on Homepage and About Page."
                  aspectRatio="portrait"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                    Founder Name
                  </label>
                  <input
                    type="text"
                    value={contentFormData.founderName}
                    onChange={(e) =>
                      setContentFormData({ ...contentFormData, founderName: e.target.value })
                    }
                    className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-300 focus:border-[#1b4332] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                    Founder Position
                  </label>
                  <input
                    type="text"
                    value={contentFormData.founderPosition}
                    onChange={(e) =>
                      setContentFormData({ ...contentFormData, founderPosition: e.target.value })
                    }
                    className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-300 focus:border-[#1b4332] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                  Founder Short Bio (Homepage)
                </label>
                <textarea
                  rows={2}
                  value={contentFormData.founderShortBio}
                  onChange={(e) =>
                    setContentFormData({ ...contentFormData, founderShortBio: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-300 focus:border-[#1b4332] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                  Founder Full Bio (About Page)
                </label>
                <textarea
                  rows={4}
                  value={contentFormData.founderFullBio}
                  onChange={(e) =>
                    setContentFormData({ ...contentFormData, founderFullBio: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-300 focus:border-[#1b4332] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                    Philosophy 1
                  </label>
                  <input
                    type="text"
                    value={contentFormData.founderPhilosophy1}
                    onChange={(e) =>
                      setContentFormData({
                        ...contentFormData,
                        founderPhilosophy1: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-300 focus:border-[#1b4332] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                    Philosophy 2
                  </label>
                  <input
                    type="text"
                    value={contentFormData.founderPhilosophy2}
                    onChange={(e) =>
                      setContentFormData({
                        ...contentFormData,
                        founderPhilosophy2: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-300 focus:border-[#1b4332] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={contentFormData.contactEmail}
                    onChange={(e) =>
                      setContentFormData({ ...contentFormData, contactEmail: e.target.value })
                    }
                    className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-300 focus:border-[#1b4332] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                    Contact Phone
                  </label>
                  <input
                    type="text"
                    value={contentFormData.contactPhone}
                    onChange={(e) =>
                      setContentFormData({ ...contentFormData, contactPhone: e.target.value })
                    }
                    className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-300 focus:border-[#1b4332] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1">
                    Business Hours
                  </label>
                  <input
                    type="text"
                    value={contentFormData.businessHours}
                    onChange={(e) =>
                      setContentFormData({ ...contentFormData, businessHours: e.target.value })
                    }
                    className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-300 focus:border-[#1b4332] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-[#1b4332] hover:bg-[#143326]"
                >
                  Save Website Content
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* ===================== RESCHEDULE MODAL ===================== */}
      {reschedulingBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/50 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 space-y-4 border border-zinc-200 shadow-xl">
            <h3 className="text-lg font-bold text-zinc-950">Reschedule Consultation</h3>
            <p className="text-xs text-zinc-500">
              Update scheduled slot for <strong>{reschedulingBooking.name}</strong> ({reschedulingBooking.business}).
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">New Date</label>
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-300 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">New Time</label>
                <select
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-300 focus:outline-none"
                >
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:30 AM">10:30 AM</option>
                  <option value="11:30 AM">11:30 AM</option>
                  <option value="01:00 PM">01:00 PM</option>
                  <option value="02:30 PM">02:30 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setReschedulingBooking(null)}
                className="px-4 py-2 text-xs font-bold text-zinc-600 hover:text-zinc-950"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (newDate && newTime) {
                    rescheduleBooking(reschedulingBooking.id, newDate, newTime);
                    setReschedulingBooking(null);
                  }
                }}
                className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-[#1b4332] hover:bg-[#143326]"
              >
                Confirm Reschedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== NOTES MODAL ===================== */}
      {editingNotesBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/50 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 space-y-4 border border-zinc-200 shadow-xl">
            <h3 className="text-lg font-bold text-zinc-950">Consultation Notes</h3>
            <p className="text-xs text-zinc-500">
              Private admin notes regarding <strong>{editingNotesBooking.name}</strong>.
            </p>

            <textarea
              rows={4}
              value={currentNotes}
              onChange={(e) => setCurrentNotes(e.target.value)}
              placeholder="Enter preparation notes, priority topics, or next steps..."
              className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-300 focus:outline-none focus:border-[#1b4332]"
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setEditingNotesBooking(null)}
                className="px-4 py-2 text-xs font-bold text-zinc-600 hover:text-zinc-950"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  updateBookingStatus(
                    editingNotesBooking.id,
                    editingNotesBooking.status,
                    currentNotes
                  );
                  setEditingNotesBooking(null);
                }}
                className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-[#1b4332] hover:bg-[#143326]"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== TEAM MEMBER MODAL ===================== */}
      {isTeamModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/50 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-lg bg-white rounded-2xl p-6 space-y-4 border border-zinc-200 shadow-xl my-8">
            <h3 className="text-lg font-bold text-zinc-950">
              {editingMember ? 'Edit Digital Strategist' : 'Add Digital Strategist'}
            </h3>

            <form onSubmit={handleSaveTeam} className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Name *</label>
                  <input
                    type="text"
                    required
                    value={teamFormData.name}
                    onChange={(e) => setTeamFormData({ ...teamFormData, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Position *</label>
                  <input
                    type="text"
                    required
                    value={teamFormData.position}
                    onChange={(e) => setTeamFormData({ ...teamFormData, position: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">Short Bio *</label>
                <textarea
                  required
                  rows={2}
                  value={teamFormData.shortBio}
                  onChange={(e) => setTeamFormData({ ...teamFormData, shortBio: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-300"
                />
              </div>

              <div>
                <PhotoUpload
                  id="team-photo-upload"
                  value={teamFormData.photo}
                  onChange={(photo) => setTeamFormData({ ...teamFormData, photo })}
                  label="Member Photo *"
                  helperText="Upload portrait photo from your computer (drag & drop or click), paste a URL, or pick from presets."
                  aspectRatio="portrait"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={teamFormData.email}
                    onChange={(e) => setTeamFormData({ ...teamFormData, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Display Order</label>
                  <input
                    type="number"
                    value={teamFormData.displayOrder}
                    onChange={(e) =>
                      setTeamFormData({ ...teamFormData, displayOrder: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-300"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="team-active"
                  checked={teamFormData.active}
                  onChange={(e) => setTeamFormData({ ...teamFormData, active: e.target.checked })}
                  className="rounded border-zinc-300 text-[#1b4332] focus:ring-[#1b4332]"
                />
                <label htmlFor="team-active" className="text-xs font-bold text-zinc-700">
                  Active (Visible on public About Page)
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() => setIsTeamModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-zinc-600 hover:text-zinc-950"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-[#1b4332] hover:bg-[#143326]"
                >
                  Save Team Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================== SERVICE MODAL ===================== */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/50 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white rounded-2xl p-6 space-y-4 border border-zinc-200 shadow-xl">
            <h3 className="text-lg font-bold text-zinc-950">
              {editingService ? 'Edit Service' : 'Add Service'}
            </h3>

            <form onSubmit={handleSaveService} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">Service Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. BUSINESS AUTOMATION"
                  value={serviceFormData.name}
                  onChange={(e) => setServiceFormData({ ...serviceFormData, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">Short Description (Max 2 sentences) *</label>
                <textarea
                  required
                  rows={2}
                  value={serviceFormData.shortDesc}
                  onChange={(e) => setServiceFormData({ ...serviceFormData, shortDesc: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">Business Benefit *</label>
                <input
                  type="text"
                  required
                  value={serviceFormData.businessBenefit}
                  onChange={(e) => setServiceFormData({ ...serviceFormData, businessBenefit: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 items-center">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Display Order</label>
                  <input
                    type="number"
                    value={serviceFormData.displayOrder}
                    onChange={(e) => setServiceFormData({ ...serviceFormData, displayOrder: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-300"
                  />
                </div>
                <div className="pt-4 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="service-active"
                    checked={serviceFormData.active}
                    onChange={(e) => setServiceFormData({ ...serviceFormData, active: e.target.checked })}
                  />
                  <label htmlFor="service-active" className="text-xs font-bold text-zinc-700">
                    Active
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() => setIsServiceModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-zinc-600 hover:text-zinc-950"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-[#1b4332] hover:bg-[#143326]"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================== TESTIMONIAL MODAL ===================== */}
      {isTestimonialModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/50 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white rounded-2xl p-6 space-y-4 border border-zinc-200 shadow-xl">
            <h3 className="text-lg font-bold text-zinc-950">
              {editingTestimonial ? 'Edit Testimonial' : 'Add Client Testimonial'}
            </h3>

            <form onSubmit={handleSaveTestimonial} className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={testimonialFormData.clientName}
                    onChange={(e) => setTestimonialFormData({ ...testimonialFormData, clientName: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Company *</label>
                  <input
                    type="text"
                    required
                    value={testimonialFormData.company}
                    onChange={(e) => setTestimonialFormData({ ...testimonialFormData, company: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">Position / Title</label>
                <input
                  type="text"
                  placeholder="e.g. Managing Director"
                  value={testimonialFormData.position}
                  onChange={(e) => setTestimonialFormData({ ...testimonialFormData, position: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-300"
                />
              </div>

              <div>
                <PhotoUpload
                  id="testimonial-photo-upload"
                  value={testimonialFormData.photo || ''}
                  onChange={(photo) => setTestimonialFormData({ ...testimonialFormData, photo })}
                  label="Client Photo / Headshot (Optional)"
                  helperText="Upload client portrait from computer (drag & drop or click), enter image URL, or pick a preset."
                  aspectRatio="square"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">Testimonial Quote *</label>
                <textarea
                  required
                  rows={3}
                  value={testimonialFormData.testimonial}
                  onChange={(e) => setTestimonialFormData({ ...testimonialFormData, testimonial: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-300"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="testimonial-active"
                  checked={testimonialFormData.active}
                  onChange={(e) => setTestimonialFormData({ ...testimonialFormData, active: e.target.checked })}
                />
                <label htmlFor="testimonial-active" className="text-xs font-bold text-zinc-700">
                  Active (Show on public website)
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() => setIsTestimonialModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-zinc-600 hover:text-zinc-950"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-[#1b4332] hover:bg-[#143326]"
                >
                  Save Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
