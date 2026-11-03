import React from 'react';
import { 
  Sparkles, Wrench, Eye, Volume2, ShieldCheck, 
  ArrowRight, PhoneCall, CheckCircle2, Zap, Award, Layers
} from 'lucide-react';
import { Language, UI_STRINGS } from '../i18n';

interface LandingProps {
  setTab: (tab: string) => void;
  onGuidedDemo: () => void;
  currentLang: Language;
}

export const LandingPage: React.FC<LandingProps> = ({ setTab, onGuidedDemo, currentLang }) => {
  const t = UI_STRINGS[currentLang];

  return (
    <div className="space-y-16 pb-16">
      {/* 30-Second Problem & Solution Hero */}
      <section className="relative pt-8 pb-12 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-300 text-xs font-bold tracking-wide">
          <Sparkles className="w-4 h-4 text-orange-400" />
          <span>{t.landing_badge}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight max-w-4xl mx-auto leading-tight">
          {t.hero_headline}
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {t.hero_sub}
        </p>

        {/* Hero Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={onGuidedDemo}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white font-extrabold shadow-xl shadow-orange-500/25 hover:scale-105 active:scale-95 transition min-h-[50px]"
          >
            <Sparkles className="w-5 h-5" />
            <span>{t.btn_guided_demo}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setTab('search')}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl glass-panel text-white font-bold hover:bg-white/10 transition border border-white/15 min-h-[50px]"
          >
            <span>{t.btn_explore}</span>
          </button>
        </div>

        {/* Quick Social Proof / Live Impact Pill */}
        <div className="pt-6 flex flex-wrap justify-center gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span><strong>30 Verified Cases</strong> Seeded</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
            <span><strong>100% Sensory-Guided</strong> Workflows</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span><strong>Sarvam-105B & Bulbul v4</strong> Latency &lt;300ms</span>
          </div>
        </div>
      </section>

      {/* Four Ways To Use It Section */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Designed for 4 Distinct Audiences
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            One single repair case transforms into sensory-tactile, caption-first, or voice-relay formats.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Senior Technicians */}
          <div 
            onClick={() => setTab('capture')}
            className="p-6 rounded-3xl glass-panel hover:border-orange-500/50 transition cursor-pointer space-y-4 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition">
              👨‍🔧
            </div>
            <h3 className="font-extrabold text-white text-lg">Senior Technicians</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Capture your 20 years of repair wisdom by voice (in Hindi/Marathi) and photo of the fault. Sarvam-105B documents it forever into a structured case.
            </p>
            <div className="pt-2 text-xs font-bold text-orange-400 flex items-center gap-1">
              <span>Capture a fault</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* 2. Blind Learners */}
          <div 
            onClick={() => setTab('learn')}
            className="p-6 rounded-3xl glass-panel hover:border-indigo-500/50 transition cursor-pointer space-y-4 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition">
              🦯
            </div>
            <h3 className="font-extrabold text-white text-lg">Blind & Low-Vision</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Hands-free voice walkthroughs with sound, touch, and smell cues. Bulbul v4 speaks each step clearly with "repeat", "slower", and safety proximity alerts.
            </p>
            <div className="pt-2 text-xs font-bold text-indigo-400 flex items-center gap-1">
              <span>Experience Blind Mode</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* 3. Deaf Learners */}
          <div 
            onClick={() => setTab('learn')}
            className="p-6 rounded-3xl glass-panel hover:border-teal-500/50 transition cursor-pointer space-y-4 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition">
              🧏
            </div>
            <h3 className="font-extrabold text-white text-lg">Deaf & Hard of Hearing</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Visual troubleshooting decision trees, high-contrast illustrated steps, live speech captions, and text-based interactive Q&A.
            </p>
            <div className="pt-2 text-xs font-bold text-teal-400 flex items-center gap-1">
              <span>Experience Deaf Mode</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* 4. Speech-Impaired Entrepreneurs */}
          <div 
            onClick={() => setTab('relay')}
            className="p-6 rounded-3xl glass-panel hover:border-amber-500/50 transition cursor-pointer space-y-4 group border border-amber-500/30"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition">
              📞
            </div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-white text-lg">Speech-Impaired</h3>
              <span className="text-[10px] bg-amber-500 text-black px-1.5 py-0.5 rounded font-black">HERO</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Run a live repair business over the phone! Customer speech becomes large captions; technician taps quick replies, and Bulbul speaks natural polite sentences.
            </p>
            <div className="pt-2 text-xs font-bold text-amber-400 flex items-center gap-1">
              <span>Try Call Relay Assistant</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* 3 Focused MVP Categories */}
      <section className="p-8 rounded-3xl glass-panel space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              3 High-Impact MVP Repair Categories
            </h2>
            <p className="text-xs text-slate-400">
              Targeted where repair knowledge gap creates severe economic loss & e-waste in small towns.
            </p>
          </div>
          <button
            onClick={() => setTab('search')}
            className="text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1"
          >
            <span>View All 30 Cases</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="text-3xl">🚰</div>
            <h3 className="font-bold text-white">Water Pumps</h3>
            <p className="text-xs text-slate-400">
              Submersibles, surface monoblocks, booster pumps. Capacitor failures, mechanical seal leaks, sand locks, and dry-run cavitation.
            </p>
            <div className="text-[11px] font-semibold text-teal-400">10 Seeded Cases • Hindi & Marathi</div>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="text-3xl">⚡</div>
            <h3 className="font-bold text-white">Inverters & UPS</h3>
            <p className="text-xs text-slate-400">
              Pure sine wave inverters, tubular batteries. MOSFET blowouts, sulfate crust cleaning, transfer relay failure, and cell shorts.
            </p>
            <div className="text-[11px] font-semibold text-teal-400">10 Seeded Cases • Hindi & Marathi</div>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="text-3xl">🏠</div>
            <h3 className="font-bold text-white">Household Appliances</h3>
            <p className="text-xs text-slate-400">
              Mixer grinders, geysers, induction cooktops, ceiling fans, microwaves. Carbon brush sparking, heating coils, seized jar bushes.
            </p>
            <div className="text-[11px] font-semibold text-teal-400">10 Seeded Cases • Hindi & Marathi</div>
          </div>
        </div>
      </section>

      {/* Live Impact Preview */}
      <section className="text-center p-8 rounded-3xl bg-gradient-to-br from-indigo-950/60 to-slate-900/80 border border-indigo-500/30 space-y-6">
        <h2 className="text-2xl font-extrabold text-white">
          Empowering Grassroots Repair & Curbing E-Waste
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-2xl sm:text-3xl font-black text-orange-400">30+</div>
            <div className="text-xs text-slate-400 mt-1">Cases Documented</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-2xl sm:text-3xl font-black text-teal-400">1,420+</div>
            <div className="text-xs text-slate-400 mt-1">Learners Trained</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">520 kg</div>
            <div className="text-xs text-slate-400 mt-1">E-Waste Avoided</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-2xl sm:text-3xl font-black text-amber-400">₹9.4L+</div>
            <div className="text-xs text-slate-400 mt-1">Repair Cost Saved</div>
          </div>
        </div>
        <div>
          <button
            onClick={() => setTab('impact')}
            className="text-xs font-bold text-indigo-300 hover:text-white underline underline-offset-4"
          >
            See If-Shipped Calculator & Verified Assumptions →
          </button>
        </div>
      </section>
    </div>
  );
};
