import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { PageView } from '../types';
import { PhotoModal } from './PhotoModal';
import {
  ArrowRight,
  Sparkles,
  Workflow,
  Laptop,
  LineChart,
  Compass,
  Layers,
  CheckCircle2,
  Clock,
  Award,
  Camera,
} from 'lucide-react';

interface HomePageProps {
  setCurrentPage: (page: PageView) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setCurrentPage }) => {
  const { services, content, updateContent, testimonials, openBooking } = useData();
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  // Active services sorted by display order
  const activeServices = services
    .filter((s) => s.active)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  // Active testimonials
  const activeTestimonials = testimonials.filter((t) => t.active);

  // Icon mapping for services
  const getServiceIcon = (name: string) => {
    switch (name.toUpperCase()) {
      case 'AI SOLUTIONS':
        return <Sparkles className="w-5 h-5 text-[#1b4332]" />;
      case 'BUSINESS AUTOMATION':
        return <Workflow className="w-5 h-5 text-[#1b4332]" />;
      case 'DIGITAL SYSTEMS':
        return <Laptop className="w-5 h-5 text-[#1b4332]" />;
      case 'PROCESS IMPROVEMENT':
        return <LineChart className="w-5 h-5 text-[#1b4332]" />;
      case 'DIGITAL STRATEGY':
        return <Compass className="w-5 h-5 text-[#1b4332]" />;
      case 'CUSTOM DIGITAL SOLUTIONS':
        return <Layers className="w-5 h-5 text-[#1b4332]" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-[#1b4332]" />;
    }
  };

  const scrollToServices = () => {
    const el = document.getElementById('services-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setCurrentPage('services');
    }
  };

  return (
    <div className="w-full bg-white text-[#1A1A1A]">
      {/* 1. HERO SECTION - Professional Polish Split Layout */}
      <section
        id="hero-section"
        className="border-b border-gray-100 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10 lg:py-16">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-stretch">
            {/* Left Column: Bold Typographic Statement */}
            <div className="w-full lg:w-3/5 flex flex-col justify-center space-y-6 lg:space-y-8">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#064E3B]">
                <span className="w-2 h-2 bg-[#064E3B]" />
                Digital Solutions Specialist Firm
              </div>

              <h1 className="text-5xl sm:text-7xl lg:text-[96px] leading-[0.92] lg:leading-[0.88] font-black tracking-tight text-[#1A1A1A] font-heading">
                WE MAKE<br />
                THINGS<br />
                <span className="text-[#581C87]">BETTER.</span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 max-w-lg leading-relaxed">
                Simple digital solutions that help businesses work smarter, faster, and better. 30 minutes. No obligation. Let's talk about your business.
              </p>

              <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
                <button
                  id="hero-primary-cta"
                  onClick={openBooking}
                  className="bg-[#064E3B] text-white px-8 py-4 rounded-none text-xs sm:text-sm font-bold tracking-widest uppercase hover:bg-black hover:shadow-xl transition-all"
                >
                  Book Your Free Consultation
                </button>

                <button
                  id="hero-secondary-cta"
                  onClick={scrollToServices}
                  className="text-xs font-bold tracking-widest uppercase border-b-2 border-gray-200 pb-1 hover:border-[#581C87] text-[#1A1A1A] transition-all"
                >
                  See What We Do
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500 pt-1">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                <span>30 minutes. No obligation. Direct conversation about your business.</span>
              </div>
            </div>

            {/* Right Column: Signature "People Behind Synaios" Preview Card */}
            <div className="w-full lg:w-2/5 bg-[#F9FAFB] p-8 sm:p-10 border border-gray-100 lg:border-l lg:border-y-0 lg:border-r-0 lg:border-[#064E3B]/15 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-28 h-28 bg-[#581C87]/5 pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#581C87] font-bold mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#581C87]" />
                    The People Behind Synaios
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden grayscale border border-gray-200 bg-gray-200 shrink-0">
                      <img
                        src={content.founderPhoto}
                        alt={content.founderName}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg leading-tight text-[#1A1A1A]">
                        {content.founderName}
                      </h3>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#064E3B] mt-0.5">
                        {content.founderPosition}
                      </p>
                      <p className="text-[11px] text-gray-500 mt-1">
                        NexForge • The Spark • Tambayan Talks
                      </p>
                    </div>
                  </div>
                </div>

                <div className="italic text-gray-600 leading-relaxed text-sm border-l-2 border-[#581C87] pl-4 py-1">
                  "{content.founderPhilosophy2}"
                </div>

                <p className="text-xs text-gray-500 leading-relaxed">
                  {content.founderShortBio}
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setCurrentPage('about');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs uppercase tracking-widest font-bold text-[#064E3B] hover:text-black transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>Meet the Founder</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES SECTION ("WHAT WE DO") - Crisp Architectural Grid */}
      <section id="services-section" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#064E3B] block mb-2">
            PRACTICAL EXECUTION
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#1A1A1A] font-heading">
            WHAT WE DO
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mt-3 leading-relaxed">
            We use technology, AI, and automation to help businesses work better. Every solution solves a clear operational problem.
          </p>
        </div>

        {/* Crisp Gap Grid matching theme */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200 border-y border-gray-200 shadow-sm">
          {activeServices.map((service, index) => (
            <div
              key={service.id}
              className="bg-white p-7 sm:p-8 flex flex-col justify-between hover:bg-gray-50 transition-colors"
            >
              <div>
                <div className="w-8 h-8 bg-[#581C87]/10 flex items-center justify-center mb-5">
                  <div className="w-2.5 h-2.5 bg-[#581C87]" />
                </div>
                <h3 className="font-bold uppercase text-sm tracking-wider mb-2 text-[#1A1A1A]">
                  {service.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                  {service.shortDesc}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#064E3B]">
                <span>{service.businessBenefit}</span>
                <span className="text-gray-400 font-mono text-[10px]">0{index + 1}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom of Services Consultation Card */}
        <div className="mt-12 p-8 sm:p-10 bg-[#F9FAFB] border border-gray-200 text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#581C87] block">
            NEED GUIDANCE?
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1A1A1A] font-heading">
            Not sure what you need?
          </h3>
          <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto">
            That's what the consultation is for. We sit down, listen to where your operations are slowing down, and recommend straightforward solutions.
          </p>
          <div className="pt-2">
            <button
              id="services-cta-book-btn"
              onClick={openBooking}
              className="bg-[#064E3B] text-white px-8 py-3.5 rounded-none text-xs font-bold tracking-widest uppercase hover:bg-black transition-colors"
            >
              Book Your Free Consultation
            </button>
          </div>
          <p className="text-[11px] text-gray-500">
            30 minutes. No obligation. Let's talk about what you can improve.
          </p>
        </div>
      </section>

      {/* 3. VALUE STATEMENT */}
      <section id="value-statement-section" className="py-20 px-4 sm:px-8 lg:px-12 bg-[#F9FAFB] border-y border-gray-200">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#581C87] block">
            OUR PROMISE
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#1A1A1A] font-heading leading-tight">
            YOUR BUSINESS DOESN'T HAVE TO BE COMPLICATED.
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We look at what you're doing, find what can be improved, and help you build a better way of doing it.
          </p>
          <div className="pt-4">
            <button
              id="value-statement-cta-btn"
              onClick={openBooking}
              className="bg-[#064E3B] text-white px-8 py-4 rounded-none text-xs font-bold tracking-widest uppercase hover:bg-black hover:shadow-lg transition-all"
            >
              Book Your Free Consultation
            </button>
          </div>
        </div>
      </section>

      {/* 4. ABOUT SYNAIOS (CREDIBILITY & TRUST) */}
      <section id="about-summary-section" className="py-20 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#064E3B] block">
              CREDIBILITY & TRUST
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#1A1A1A] font-heading">
              ABOUT SYNAIOS
            </h2>
            <p className="text-lg font-medium text-gray-800 leading-relaxed">
              SYNAIOS is a Digital Solutions Specialist Firm focused on helping businesses use technology in practical ways.
            </p>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              We combine deep business understanding, digital strategy, AI, automation, and hands-on execution to create solutions that work in the real world. We don't push trendy buzzwords or over-engineered software—we diagnose the friction holding your business back and build straightforward tools that produce immediate relief.
            </p>
            <div className="pt-2">
              <button
                id="about-learn-more-btn"
                onClick={() => {
                  setCurrentPage('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs uppercase tracking-widest font-bold text-[#064E3B] hover:text-black border-b border-gray-300 pb-1 hover:border-[#581C87] transition-all inline-flex items-center gap-1"
              >
                <span>Read more about our approach</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 bg-white border border-gray-200">
              <div className="text-xl font-bold text-[#064E3B] mb-2 font-heading uppercase tracking-wide">
                Outcome-First
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                You care about getting your time back. Technology is simply the vehicle to get you there.
              </p>
            </div>
            <div className="p-6 bg-white border border-gray-200">
              <div className="text-xl font-bold text-[#581C87] mb-2 font-heading uppercase tracking-wide">
                Zero Bloat
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                No complex enterprise tools that require months of training for simple daily tasks.
              </p>
            </div>
            <div className="p-6 bg-white border border-gray-200 sm:col-span-2">
              <div className="text-xl font-bold text-[#1A1A1A] mb-2 font-heading uppercase tracking-wide">
                Personal Partnership
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                We sit down with you, study your exact workflow bottlenecks, and tailor improvements that fit how you work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. THE PEOPLE BEHIND SYNAIOS / FOUNDER SECTION */}
      <section id="founder-section" className="py-20 px-4 sm:px-8 lg:px-12 bg-[#F9FAFB] border-y border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#064E3B] block mb-2">
              LEADERSHIP & EXPERIENCE
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#1A1A1A] font-heading">
              THE PEOPLE BEHIND SYNAIOS
            </h2>
          </div>

          <div className="bg-white border border-gray-200 p-8 sm:p-12 lg:p-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Founder Image */}
              <div className="lg:col-span-5 flex flex-col items-center sm:items-start">
                <div className="relative w-full max-w-sm overflow-hidden border border-gray-200 bg-gray-100 aspect-[3/4] group">
                  <img
                    id="founder-photo-img"
                    src={content.founderPhoto}
                    alt={content.founderName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top grayscale"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-[#1A1A1A]/90 p-5 text-white">
                    <p className="text-base font-bold uppercase tracking-wider">{content.founderName}</p>
                    <p className="text-xs text-gray-300 font-medium">{content.founderPosition}</p>
                  </div>
                  {/* Direct Photo Upload overlay button */}
                  <button
                    id="upload-founder-photo-overlay-btn"
                    onClick={() => setIsPhotoModalOpen(true)}
                    className="absolute top-3 right-3 px-3 py-1.5 bg-[#1A1A1A]/85 hover:bg-[#064E3B] text-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 transition-colors border border-white/20 shadow-sm"
                    title="Upload or change photo"
                  >
                    <Camera className="w-3.5 h-3.5 text-white" />
                    <span>Upload Photo</span>
                  </button>
                </div>

                <button
                  id="upload-founder-photo-link-btn"
                  onClick={() => setIsPhotoModalOpen(true)}
                  className="mt-3 text-xs font-bold uppercase tracking-wider text-[#064E3B] hover:text-black flex items-center gap-1.5"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Upload / Change Photo</span>
                </button>
              </div>

              {/* Founder Details */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#1A1A1A] font-heading">
                    {content.founderName}
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#064E3B] mt-1">
                    {content.founderPosition}
                  </p>
                </div>

                <p className="text-base text-gray-600 leading-relaxed">
                  {content.founderShortBio}
                </p>

                {/* Relevant Ventures */}
                <div className="space-y-2.5 pt-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-[#064E3B]" />
                    Relevant Ventures & Leadership
                  </p>
                  <ul className="space-y-2">
                    {content.founderVentures.map((venture, idx) => (
                      <li key={idx} className="flex items-start text-xs sm:text-sm font-semibold text-[#1A1A1A]">
                        <span className="w-1.5 h-1.5 bg-[#064E3B] mt-1.5 mr-2.5 shrink-0" />
                        <span>{venture}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Founder Philosophies */}
                <div className="p-5 bg-[#F9FAFB] border-l-2 border-[#581C87] space-y-2.5">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#581C87]">
                    Founder Philosophy
                  </p>
                  <p className="text-xs sm:text-sm font-medium text-gray-700 italic leading-relaxed">
                    "{content.founderPhilosophy1}"
                  </p>
                  <p className="text-xs sm:text-sm font-medium text-gray-700 italic leading-relaxed">
                    "{content.founderPhilosophy2}"
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    id="founder-meet-btn"
                    onClick={() => {
                      setCurrentPage('about');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="border border-gray-300 text-xs font-bold uppercase tracking-widest text-[#1A1A1A] px-6 py-3 hover:bg-gray-50 transition-colors inline-flex items-center gap-2"
                  >
                    <span>Meet the Founder</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    id="founder-book-cta"
                    onClick={openBooking}
                    className="bg-[#064E3B] text-white px-6 py-3 text-xs font-bold tracking-widest uppercase hover:bg-black transition-colors"
                  >
                    Book Your Free Consultation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHY SYNAIOS SECTION */}
      <section id="why-synaios-section" className="py-20 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#064E3B] block mb-2">
            THREE GUIDING PRINCIPLES
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#1A1A1A] font-heading">
            WHY SYNAIOS?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 bg-white border border-gray-200 space-y-3 hover:border-[#064E3B] transition-colors">
            <span className="text-xs font-bold uppercase tracking-widest text-[#064E3B] block">
              01
            </span>
            <h3 className="text-2xl font-bold tracking-tight text-[#1A1A1A] font-heading uppercase">
              Practical
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              We solve real business problems with tools that generate measurable impact.
            </p>
          </div>

          <div className="p-8 bg-white border border-gray-200 space-y-3 hover:border-[#581C87] transition-colors">
            <span className="text-xs font-bold uppercase tracking-widest text-[#581C87] block">
              02
            </span>
            <h3 className="text-2xl font-bold tracking-tight text-[#1A1A1A] font-heading uppercase">
              Simple
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              We make technology easier—not more complicated. No bloat, no clutter.
            </p>
          </div>

          <div className="p-8 bg-white border border-gray-200 space-y-3 hover:border-black transition-colors">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500 block">
              03
            </span>
            <h3 className="text-2xl font-bold tracking-tight text-[#1A1A1A] font-heading uppercase">
              Personal
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              We understand your business and workflow before recommending a solution.
            </p>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS SECTION (CONDITIONAL: Hidden if empty) */}
      {activeTestimonials.length > 0 && (
        <section id="testimonials-section" className="py-20 px-4 sm:px-8 lg:px-12 bg-[#F9FAFB] border-t border-gray-200">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-[#064E3B] block mb-2">
                CLIENT RESULTS
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#1A1A1A] font-heading">
                WHAT CLIENTS SAY
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeTestimonials.map((t) => (
                <div key={t.id} className="p-8 bg-white border border-gray-200 space-y-4">
                  <p className="text-gray-700 italic text-sm sm:text-base leading-relaxed">"{t.testimonial}"</p>
                  <div>
                    <p className="font-bold text-[#1A1A1A] uppercase text-xs tracking-wider">{t.clientName}</p>
                    <p className="text-xs text-gray-500">
                      {t.position}, {t.company}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. FINAL CTA SECTION */}
      <section id="final-cta-section" className="py-24 px-4 sm:px-8 lg:px-12 bg-[#1A1A1A] text-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#581C87] bg-white/10 px-4 py-1.5 inline-block">
            TAKE THE NEXT STEP
          </span>

          <h2 className="text-4xl sm:text-6xl font-black tracking-tight font-heading leading-tight">
            READY TO MAKE THINGS BETTER?
          </h2>

          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Let's talk about your business, what's not working, and where things could be easier.
          </p>

          <div className="pt-2">
            <button
              id="final-section-book-btn"
              onClick={openBooking}
              className="bg-[#064E3B] text-white px-9 py-4 rounded-none text-xs sm:text-sm font-bold tracking-widest uppercase hover:bg-white hover:text-[#1A1A1A] transition-all shadow-lg"
            >
              Book Your Free Consultation
            </button>
          </div>

          <p className="text-xs text-gray-400 tracking-wide">
            30 minutes. No obligation. Just a conversation about your business.
          </p>
        </div>
      </section>

      {/* Founder Photo Modal */}
      <PhotoModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        title="Upload Founder Portrait Photo"
        initialPhoto={content.founderPhoto}
        onSave={(newPhoto) => updateContent({ founderPhoto: newPhoto })}
      />
    </div>
  );
};
