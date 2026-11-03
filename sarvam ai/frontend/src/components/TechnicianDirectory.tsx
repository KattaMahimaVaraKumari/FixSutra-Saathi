import React, { useState } from 'react';
import { 
  Users, MapPin, Phone, MessageSquare, Star, 
  ShieldCheck, Wrench, CheckCircle2, Search, ArrowRight 
} from 'lucide-react';
import { Language, UI_STRINGS } from '../i18n';

interface DirectoryProps {
  currentLang: Language;
  onBookTech?: (techName: string) => void;
}

export const TechnicianDirectory: React.FC<DirectoryProps> = ({ currentLang, onBookTech }) => {
  const t = UI_STRINGS[currentLang];
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const technicians = [
    {
      id: 1,
      name: "Ramesh Verma",
      avatar: "👨‍🔧",
      location: "Nashik, Maharashtra",
      specialty: "Water Pumps & Agricultural Motors",
      category: "water_pumps",
      years_exp: 14,
      rating: 4.9,
      reviews: 68,
      verified: true,
      languages: ["Hindi", "Marathi"],
      bio: "Master winder and borewell specialist. Certified mentor with 1,200+ pump repairs."
    },
    {
      id: 2,
      name: "Sunil Jadhav",
      avatar: "👨‍🔧",
      location: "Kolhapur, Maharashtra",
      specialty: "Industrial Surface Monoblocks & Seals",
      category: "water_pumps",
      years_exp: 18,
      rating: 4.8,
      reviews: 52,
      verified: true,
      languages: ["Marathi", "Hindi"],
      bio: "Expert mechanical seal fitter. Mentors deaf apprentices in sensory touch diagnosis."
    },
    {
      id: 3,
      name: "Vikram Rathore",
      avatar: "👨‍🔧",
      location: "Agra, Uttar Pradesh",
      specialty: "Pure Sine Wave Inverters & Solar MPPT",
      category: "inverters",
      years_exp: 12,
      rating: 5.0,
      reviews: 84,
      verified: true,
      languages: ["Hindi", "English"],
      bio: "Electronics engineer specializing in MOSFET power boards and high-voltage grid protection."
    },
    {
      id: 4,
      name: "Kavita Pillai",
      avatar: "👩‍🔧",
      location: "Bengaluru, Karnataka",
      specialty: "Domestic Pressure Boosters & Plumbing",
      category: "water_pumps",
      years_exp: 8,
      rating: 4.9,
      reviews: 43,
      verified: true,
      languages: ["English", "Hindi"],
      bio: "Certified booster pump technician and low-vision educator."
    },
    {
      id: 5,
      name: "Santosh Kori",
      avatar: "👨‍🔧",
      location: "Jabalpur, Madhya Pradesh",
      specialty: "Household Motor Restorations & Grinders",
      category: "household_appliances",
      years_exp: 16,
      rating: 4.7,
      reviews: 91,
      verified: true,
      languages: ["Hindi"],
      bio: "Expert universal motor rebuilder. Over 15 tons of e-waste avoided in career."
    },
    {
      id: 6,
      name: "Milind Borade",
      avatar: "👨‍🔧",
      location: "Aurangabad, Maharashtra",
      specialty: "Refrigeration & Double-Door Defrost",
      category: "household_appliances",
      years_exp: 18,
      rating: 4.9,
      reviews: 77,
      verified: true,
      languages: ["Marathi", "Hindi"],
      bio: "Master refrigeration mechanic. Founder of local accessible repair workshop."
    }
  ];

  const filtered = technicians.filter((tech) => {
    const matchesCat = selectedCategory === 'all' || tech.category === selectedCategory;
    const matchesSearch = tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tech.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tech.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
            <span>Sutra Technicians Directory</span>
            <Users className="w-6 h-6 text-orange-400" />
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Connect with verified grassroots repair technicians. Book on-site visits via voice or WhatsApp chat.
          </p>
        </div>

        {/* Quick Search */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by city, name..."
            className="px-4 py-2 rounded-xl glass-input text-xs w-48"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-slate-200"
          >
            <option value="all">All Specialties</option>
            <option value="water_pumps">Pumps</option>
            <option value="inverters">Inverters</option>
            <option value="household_appliances">Appliances</option>
          </select>
        </div>
      </div>

      {/* Technicians Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((tech) => (
          <div
            key={tech.id}
            className="p-6 rounded-3xl glass-panel space-y-4 flex flex-col justify-between hover:border-orange-500/40 transition"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-2xl">
                    {tech.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 font-extrabold text-white text-base">
                      <span>{tech.name}</span>
                      {tech.verified && (
                        <span title="Verified Master Technician">
                          <ShieldCheck className="w-4 h-4 text-teal-400" />
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <MapPin className="w-3 h-3 text-orange-400" />
                      <span>{tech.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 px-2 py-1 rounded-xl bg-amber-500/20 text-amber-300 font-bold text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-300" />
                  <span>{tech.rating}</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-xs font-bold text-orange-300">
                  {tech.specialty}
                </div>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {tech.bio}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {tech.languages.map((lng, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-slate-300">
                    {lng}
                  </span>
                ))}
                <span className="px-2 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-[10px] text-teal-300">
                  {tech.years_exp} Yrs Exp
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                {tech.reviews} verified repairs
              </span>
              <button
                onClick={() => {
                  alert(`Connecting with ${tech.name} via FixSutra Voice & WhatsApp Relay...`);
                  if (onBookTech) onBookTech(tech.name);
                }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md transition min-h-[40px]"
              >
                <span>Book Service</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
