import React, { createContext, useContext, useEffect, useState } from 'react';
import { Booking, BookingStatus, Service, TeamMember, Testimonial, WebsiteContent } from '../types';
import {
  initialBookings,
  initialContent,
  initialServices,
  initialTeam,
  initialTestimonials,
} from '../data/initialData';

interface DataContextType {
  services: Service[];
  team: TeamMember[];
  testimonials: Testimonial[];
  content: WebsiteContent;
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'status' | 'notes' | 'createdAt'>) => Booking;
  updateBookingStatus: (id: string, status: BookingStatus, notes?: string) => void;
  rescheduleBooking: (id: string, date: string, time: string) => void;
  deleteBooking: (id: string) => void;
  addTeamMember: (member: Omit<TeamMember, 'id'>) => void;
  updateTeamMember: (id: string, member: Partial<TeamMember>) => void;
  deleteTeamMember: (id: string) => void;
  addService: (service: Omit<Service, 'id'>) => void;
  updateService: (id: string, service: Partial<Service>) => void;
  deleteService: (id: string) => void;
  addTestimonial: (item: Omit<Testimonial, 'id'>) => void;
  updateTestimonial: (id: string, item: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;
  updateContent: (content: Partial<WebsiteContent>) => void;
  resetToDefaults: () => void;
  // Booking modal controls
  isBookingOpen: boolean;
  openBooking: () => void;
  closeBooking: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem('synaios_services');
    return saved ? JSON.parse(saved) : initialServices;
  });

  const [team, setTeam] = useState<TeamMember[]>(() => {
    const saved = localStorage.getItem('synaios_team');
    return saved ? JSON.parse(saved) : initialTeam;
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem('synaios_testimonials');
    return saved ? JSON.parse(saved) : initialTestimonials;
  });

  const [content, setContent] = useState<WebsiteContent>(() => {
    const saved = localStorage.getItem('synaios_content');
    return saved ? JSON.parse(saved) : initialContent;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('synaios_bookings');
    return saved ? JSON.parse(saved) : initialBookings;
  });

  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('synaios_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('synaios_team', JSON.stringify(team));
  }, [team]);

  useEffect(() => {
    localStorage.setItem('synaios_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem('synaios_content', JSON.stringify(content));
  }, [content]);

  useEffect(() => {
    localStorage.setItem('synaios_bookings', JSON.stringify(bookings));
  }, [bookings]);

  const addBooking = (bookingData: Omit<Booking, 'id' | 'status' | 'notes' | 'createdAt'>): Booking => {
    const newBooking: Booking = {
      ...bookingData,
      id: `bkg-${Date.now().toString(36)}`,
      status: 'New',
      notes: '',
      createdAt: new Date().toISOString(),
    };
    setBookings((prev) => [newBooking, ...prev]);
    return newBooking;
  };

  const updateBookingStatus = (id: string, status: BookingStatus, notes?: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status, ...(notes !== undefined ? { notes } : {}) } : b))
    );
  };

  const rescheduleBooking = (id: string, date: string, time: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, date, time, status: 'Confirmed' } : b))
    );
  };

  const deleteBooking = (id: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  const addTeamMember = (member: Omit<TeamMember, 'id'>) => {
    const newMember: TeamMember = {
      ...member,
      id: `team-${Date.now().toString(36)}`,
    };
    setTeam((prev) => [...prev, newMember]);
  };

  const updateTeamMember = (id: string, member: Partial<TeamMember>) => {
    setTeam((prev) => prev.map((m) => (m.id === id ? { ...m, ...member } : m)));
  };

  const deleteTeamMember = (id: string) => {
    setTeam((prev) => prev.filter((m) => m.id !== id));
  };

  const addService = (service: Omit<Service, 'id'>) => {
    const newService: Service = {
      ...service,
      id: `srv-${Date.now().toString(36)}`,
    };
    setServices((prev) => [...prev, newService]);
  };

  const updateService = (id: string, service: Partial<Service>) => {
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, ...service } : s)));
  };

  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  const addTestimonial = (item: Omit<Testimonial, 'id'>) => {
    const newTestimonial: Testimonial = {
      ...item,
      id: `test-${Date.now().toString(36)}`,
    };
    setTestimonials((prev) => [...prev, newTestimonial]);
  };

  const updateTestimonial = (id: string, item: Partial<Testimonial>) => {
    setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, ...item } : t)));
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  };

  const updateContent = (newContent: Partial<WebsiteContent>) => {
    setContent((prev) => ({ ...prev, ...newContent }));
  };

  const resetToDefaults = () => {
    setServices(initialServices);
    setTeam(initialTeam);
    setTestimonials(initialTestimonials);
    setContent(initialContent);
    setBookings(initialBookings);
    localStorage.clear();
  };

  return (
    <DataContext.Provider
      value={{
        services,
        team,
        testimonials,
        content,
        bookings,
        addBooking,
        updateBookingStatus,
        rescheduleBooking,
        deleteBooking,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,
        addService,
        updateService,
        deleteService,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        updateContent,
        resetToDefaults,
        isBookingOpen,
        openBooking: () => setIsBookingOpen(true),
        closeBooking: () => setIsBookingOpen(false),
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
