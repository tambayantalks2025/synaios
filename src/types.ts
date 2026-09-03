export type BookingStatus = 'New' | 'Confirmed' | 'Completed' | 'Cancelled';

export interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  business: string;
  message?: string;
  date: string;
  time: string;
  status: BookingStatus;
  notes: string;
  createdAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  shortBio: string;
  fullBio: string;
  photo: string;
  email: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  displayOrder: number;
  active: boolean;
  isFounder?: boolean;
}

export interface Service {
  id: string;
  name: string;
  shortDesc: string;
  businessBenefit: string;
  displayOrder: number;
  active: boolean;
}

export interface Testimonial {
  id: string;
  clientName: string;
  company: string;
  position: string;
  testimonial: string;
  photo?: string;
  companyLogo?: string;
  active: boolean;
}

export interface WebsiteContent {
  founderName: string;
  founderPosition: string;
  founderShortBio: string;
  founderFullBio: string;
  founderPhoto: string;
  founderVentures: string[];
  founderPhilosophy1: string;
  founderPhilosophy2: string;
  contactEmail: string;
  contactPhone: string;
  businessHours: string;
}

export type PageView = 'home' | 'services' | 'about' | 'contact' | 'admin';
