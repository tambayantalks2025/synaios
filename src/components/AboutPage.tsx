import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { TeamMember } from '../types';
import { PhotoModal } from './PhotoModal';
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Clock,
  Mail,
  Linkedin,
  Twitter,
  UserCheck,
  Camera,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { content, updateContent, team, updateTeamMember, openBooking } = useData();
  const [isFounderPhotoModalOpen, setIsFounderPhotoModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  const activeTeam = team
    .filter((t) => t.active)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <div className="w-full bg-white text-[#1A1A1A] py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-20">
        {/* 1. SYNAIOS: What the company does and why it exists */}
        <div className="max-w-3xl space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#064E3B] block">
            ABOUT SYNAIOS
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[#1A1A1A] font-heading">
            WE MAKE BUSINESS BETTER.
          </h1>
          <p className="text-xl sm:text-2xl text-gray-700 font-medium leading-relaxed">
            SYNAIOS is a Digital Solutions Specialist Firm focused on helping businesses use technology in practical ways.
          </p>
          <div className="prose prose-zinc text-base sm:text-lg text-gray-600 space-y-4 leading-relaxed">
            <p>
              Too many businesses are drowning in disconnected software, messy manual data transfers, and half-implemented digital tools. They don't need another 50-page technical assessment or an overpriced enterprise suite that takes months to configure.
            </p>
            <p>
              We exist to solve this exact problem: we take the operational friction out of your business and implement straightforward digital workflows, AI capabilities, and automated tools that just work.
            </p>
          </div>
        </div>

        {/* 2. OUR PHILOSOPHY */}
        <div className="p-8 sm:p-14 bg-[#1A1A1A] text-white">
          <div className="max-w-3xl space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#581C87] bg-white/10 px-3.5 py-1 inline-block">
              OUR PHILOSOPHY
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight font-heading">
              Technology should simplify business, not complicate it.
            </h2>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              If a digital system requires your team to perform more administrative chores than the problem it was supposed to solve, it has failed. We evaluate every solution on a single standard: does this give you and your team more time to focus on what actually grows the business?
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-zinc-800">
              <div className="space-y-2 border-l-2 border-[#064E3B] pl-4">
                <p className="text-sm font-bold text-white uppercase tracking-wider">
                  {content.founderPhilosophy1}
                </p>
                <p className="text-xs text-gray-400">
                  Technology should free your people from mundane administrative overhead.
                </p>
              </div>
              <div className="space-y-2 border-l-2 border-[#581C87] pl-4">
                <p className="text-sm font-bold text-white uppercase tracking-wider">
                  {content.founderPhilosophy2}
                </p>
                <p className="text-xs text-gray-400">
                  Reclaiming hours from manual tasks directly powers innovation, family, and growth.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. OUR FOUNDER */}
        <div className="bg-white border border-gray-200 p-8 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-5">
              <div className="relative w-full max-w-md mx-auto overflow-hidden border border-gray-200 bg-gray-50 aspect-[3/4] group">
                <img
                  src={content.founderPhoto}
                  alt={content.founderName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
                <button
                  id="about-founder-upload-photo-overlay-btn"
                  onClick={() => setIsFounderPhotoModalOpen(true)}
                  className="absolute top-3 right-3 px-3 py-1.5 bg-[#1A1A1A]/85 hover:bg-[#064E3B] text-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 transition-colors border border-white/20 shadow-sm"
                  title="Upload or change founder photo"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Upload Photo</span>
                </button>
              </div>
              <div className="text-center mt-3">
                <button
                  id="about-founder-upload-photo-link-btn"
                  onClick={() => setIsFounderPhotoModalOpen(true)}
                  className="text-xs font-bold uppercase tracking-wider text-[#064E3B] hover:text-black inline-flex items-center gap-1.5"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Upload / Change Founder Photo</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#064E3B] block mb-2">
                  OUR FOUNDER
                </span>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#1A1A1A] font-heading">
                  {content.founderName}
                </h2>
                <p className="text-xs font-bold uppercase tracking-widest text-[#581C87] mt-1">
                  {content.founderPosition}
                </p>
              </div>

              <div className="space-y-4 text-gray-700 text-base leading-relaxed">
                <p>{content.founderFullBio}</p>
                <p>
                  Bryan brings a unique intersection of hands-on technical architecture, executive business strategy, and community-driven entrepreneurship. His work focuses on unburdening small-to-midsize business operators from repetitive manual tasks through practical digital workflows and applied intelligence.
                </p>
              </div>

              {/* Leadership & Ventures */}
              <div className="pt-2 space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#064E3B]" />
                  Leadership, Ventures & Innovation
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {content.founderVentures.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-gray-50 border border-gray-200 text-xs font-semibold text-[#1A1A1A] flex items-center gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#064E3B] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                  <div className="p-3.5 bg-gray-50 border border-gray-200 text-xs font-semibold text-[#1A1A1A] flex items-center gap-2.5">
                    <UserCheck className="w-4 h-4 text-[#064E3B] shrink-0" />
                    <span>Nonprofit & Community Board Leadership</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. OUR TEAM (Multiple Digital Strategists featured dynamically) */}
        <div className="space-y-10">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#064E3B] block mb-2">
              DIGITAL STRATEGISTS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#1A1A1A] font-heading">
              OUR TEAM
            </h2>
            <p className="text-lg text-gray-600 mt-2">
              Practitioners who know how to solve real operational problems with modern digital execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeTeam.map((member) => (
              <div
                key={member.id}
                className="bg-white border border-gray-200 overflow-hidden hover:border-[#064E3B] transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-64 w-full bg-gray-100 overflow-hidden group">
                    <img
                      src={member.photo}
                      alt={member.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      onClick={() => setEditingMember(member)}
                      className="absolute top-2 right-2 px-2.5 py-1 bg-[#1A1A1A]/85 hover:bg-[#064E3B] text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition-colors border border-white/20 shadow-xs"
                      title={`Upload photo for ${member.name}`}
                    >
                      <Camera className="w-3 h-3" />
                      <span>Upload Photo</span>
                    </button>
                  </div>
                  <div className="p-6 space-y-3">
                    <div>
                      <h3 className="text-xl font-bold tracking-tight text-[#1A1A1A]">
                        {member.name}
                      </h3>
                      <p className="text-xs font-bold uppercase tracking-wider text-[#064E3B] mt-0.5">
                        {member.position}
                      </p>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {member.shortBio}
                    </p>
                  </div>
                </div>

                <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1 text-[11px]">
                    <Mail className="w-3.5 h-3.5 text-gray-400" />
                    {member.email}
                  </span>
                  <div className="flex items-center space-x-3">
                    {member.socialLinks?.linkedin && (
                      <a
                        href={member.socialLinks.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-400 hover:text-black transition-colors"
                        aria-label={`${member.name} LinkedIn`}
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {member.socialLinks?.twitter && (
                      <a
                        href={member.socialLinks.twitter}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-400 hover:text-black transition-colors"
                        aria-label={`${member.name} Twitter`}
                      >
                        <Twitter className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final Page CTA */}
        <div className="p-10 sm:p-14 bg-[#1A1A1A] text-white text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#581C87] bg-white/10 px-4 py-1.5 inline-block">
            TAILORED WORKFLOW STRATEGY
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight font-heading">
            WANT TO TALK THROUGH YOUR WORKFLOW?
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto text-sm sm:text-base">
            Get practical advice on where technology can make your business work smarter and faster.
          </p>
          <div className="pt-2">
            <button
              id="about-page-cta-btn"
              onClick={openBooking}
              className="bg-[#064E3B] text-white px-9 py-4 rounded-none text-xs sm:text-sm font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all shadow-md group"
            >
              <span>BOOK YOUR FREE CONSULTATION</span>
              <ArrowRight className="ml-2 w-4 h-4 inline group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <p className="text-xs text-gray-400 flex items-center justify-center gap-1.5">
            <Clock className="w-4 h-4 text-gray-400" />
            30 minutes. No obligation. Direct conversation about your business.
          </p>
        </div>
      </div>

      {/* Founder Photo Modal */}
      <PhotoModal
        isOpen={isFounderPhotoModalOpen}
        onClose={() => setIsFounderPhotoModalOpen(false)}
        title="Upload Founder Portrait Photo"
        initialPhoto={content.founderPhoto}
        onSave={(newPhoto) => updateContent({ founderPhoto: newPhoto })}
      />

      {/* Team Member Photo Modal */}
      {editingMember && (
        <PhotoModal
          isOpen={!!editingMember}
          onClose={() => setEditingMember(null)}
          title={`Upload Photo for ${editingMember.name}`}
          initialPhoto={editingMember.photo}
          onSave={(newPhoto) => {
            updateTeamMember(editingMember.id, { photo: newPhoto });
            setEditingMember(null);
          }}
        />
      )}
    </div>
  );
};
