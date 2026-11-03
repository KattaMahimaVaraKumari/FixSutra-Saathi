import React, { useState } from 'react';
import { 
  Award, CheckCircle2, Star, BookOpen, User, 
  MapPin, Phone, MessageSquare, ShieldCheck, Zap 
} from 'lucide-react';
import { Language, UI_STRINGS } from '../i18n';

interface PathwayProps {
  currentLang: Language;
  onSelectCategory?: (cat: string) => void;
}

export const SkillPathway: React.FC<PathwayProps> = ({ currentLang, onSelectCategory }) => {
  const t = UI_STRINGS[currentLang];

  const modules = [
    {
      id: 'water_pumps',
      title: 'Water Pumps & Submersible Mastery',
      icon: '🚰',
      progress: 75,
      completedSteps: 6,
      totalSteps: 8,
      verifiedBadge: 'Borewell Pump Specialist',
      level: 'Advanced Technician'
    },
    {
      id: 'inverters',
      title: 'Inverter & Battery Power Systems',
      icon: '⚡',
      progress: 40,
      completedSteps: 4,
      totalSteps: 10,
      verifiedBadge: 'Inverter Power Engineer',
      level: 'Intermediate Technician'
    },
    {
      id: 'household_appliances',
      title: 'Household Electrical Appliances',
      icon: '🏠',
      progress: 90,
      completedSteps: 9,
      totalSteps: 10,
      verifiedBadge: 'Certified Appliance Restorer',
      level: 'Master Technician'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      {/* Title */}
      <div className="border-b border-white/10 pb-4">
        <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
          <span>Learner Skill Pathway & Verified Record</span>
          <Award className="w-6 h-6 text-orange-400" />
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Track guided practical modules, earn mentor-verified credentials from actual physical repairs, and qualify for customer bookings.
        </p>
      </div>

      {/* Progress Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {modules.map((mod) => (
          <div key={mod.id} className="p-6 rounded-3xl glass-panel space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-3xl">{mod.icon}</span>
                <span className="text-xs font-bold text-orange-400">{mod.progress}% Done</span>
              </div>

              <h2 className="font-extrabold text-white text-base leading-snug">
                {mod.title}
              </h2>

              {/* Progress Bar */}
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-orange-500 to-amber-400 h-full rounded-full transition-all"
                  style={{ width: `${mod.progress}%` }}
                />
              </div>

              <div className="text-xs text-slate-400">
                {mod.completedSteps} of {mod.totalSteps} practical repairs verified
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 space-y-2">
              <div className="flex items-center gap-1.5 text-xs text-teal-300 font-semibold">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>{mod.verifiedBadge}</span>
              </div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                Level: <span className="text-white">{mod.level}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Verified Skills Ledger (Self-Sovereign Repair Record) */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span>Verified Practical Skills Record (Sutra Passport)</span>
          </h2>
          <span className="text-xs font-mono text-emerald-400">19 Total Verified Fixes</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {[
            { skill: "440V AC Motor Run Capacitor Replacement", cat: "Pumps", count: 7, mentor: "Ramesh Verma" },
            { skill: "Ceramic-Carbon Mechanical Seal Extraction", cat: "Pumps", count: 4, mentor: "Sunil Jadhav" },
            { skill: "Pure Sine Wave H-Bridge MOSFET Soldering", cat: "Inverters", count: 3, mentor: "Vikram Rathore" },
            { skill: "Universal Motor Commutator Dressing & Brushes", cat: "Appliances", count: 5, mentor: "Santosh Kori" }
          ].map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <div className="font-bold text-white">{item.skill}</div>
              <div className="text-slate-400 flex items-center justify-between text-[11px] pt-1">
                <span>Category: {item.cat} ({item.count} fixes)</span>
                <span className="text-teal-400">Mentor: {item.mentor}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
