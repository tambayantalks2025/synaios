import React from 'react';
import { useData } from '../context/DataContext';
import {
  Sparkles,
  Workflow,
  Laptop,
  LineChart,
  Compass,
  Layers,
  ArrowRight,
  CheckCircle2,
  Clock,
  Check,
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const { services, openBooking } = useData();

  const activeServices = services
    .filter((s) => s.active)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  const getServiceIcon = (name: string) => {
    switch (name.toUpperCase()) {
      case 'AI SOLUTIONS':
        return <Sparkles className="w-5 h-5 text-[#581C87]" />;
      case 'BUSINESS AUTOMATION':
        return <Workflow className="w-5 h-5 text-[#064E3B]" />;
      case 'DIGITAL SYSTEMS':
        return <Laptop className="w-5 h-5 text-[#581C87]" />;
      case 'PROCESS IMPROVEMENT':
        return <LineChart className="w-5 h-5 text-[#064E3B]" />;
      case 'DIGITAL STRATEGY':
        return <Compass className="w-5 h-5 text-[#581C87]" />;
      case 'CUSTOM DIGITAL SOLUTIONS':
        return <Layers className="w-5 h-5 text-[#064E3B]" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-[#064E3B]" />;
    }
  };

  return (
    <div className="w-full bg-white text-[#1A1A1A] py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-16">
        {/* Page Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#064E3B] block">
            OUR CAPABILITIES
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[#1A1A1A] font-heading">
            WHAT WE DO
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            We use technology, AI, and automation to help businesses work better. Every service is centered on a measurable outcome: saving hours, removing friction, and simplifying operations.
          </p>
        </div>

        {/* Services List / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activeServices.map((service, index) => (
            <div
              key={service.id}
              className="p-8 sm:p-10 bg-white border border-gray-200 hover:border-[#064E3B] transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 bg-[#581C87]/10 flex items-center justify-center rounded-sm">
                    {getServiceIcon(service.name)}
                  </div>
                  <span className="text-xs font-mono font-bold text-gray-400">
                    0{index + 1}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#1A1A1A] mb-3 uppercase">
                  {service.name}
                </h2>

                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
                  {service.shortDesc}
                </p>

                <div className="p-4 bg-[#F9FAFB] border-l-2 border-[#581C87] space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#581C87] block flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" />
                    Business Benefit
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-[#1A1A1A]">
                    {service.businessBenefit}
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between">
                <button
                  onClick={openBooking}
                  className="text-xs font-bold uppercase tracking-widest text-[#064E3B] hover:text-black flex items-center gap-1 group"
                >
                  <span>Discuss this solution</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Block */}
        <div className="mt-16 p-10 sm:p-14 bg-[#1A1A1A] text-white text-center max-w-4xl mx-auto space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#581C87] bg-white/10 px-4 py-1.5 inline-block">
            GUIDED ADVISORY
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight font-heading">
            NOT SURE WHAT YOU NEED?
          </h2>

          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Tell us what you're trying to improve. We'll help you figure out where to start.
          </p>

          <div className="pt-2">
            <button
              id="services-page-bottom-cta"
              onClick={openBooking}
              className="bg-[#064E3B] text-white px-9 py-4 rounded-none text-xs sm:text-sm font-bold tracking-widest uppercase hover:bg-white hover:text-[#1A1A1A] transition-all shadow-md"
            >
              Book Your Free Consultation
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
            <Clock className="w-4 h-4 text-gray-400" />
            <span>30 minutes. No obligation. Direct conversation about your business.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
