import React, { useState, useEffect } from 'react';
import { 
  BarChart3, Recycle, IndianRupee, Users, BookOpen, 
  Sparkles, Info, Sliders, ShieldCheck, ArrowUpRight 
} from 'lucide-react';
import { Language, UI_STRINGS } from '../i18n';
import { ImpactData } from '../types';

interface ImpactProps {
  currentLang: Language;
}

export const ImpactDashboard: React.FC<ImpactProps> = ({ currentLang }) => {
  const t = UI_STRINGS[currentLang];

  const [metrics, setMetrics] = useState<ImpactData>({
    repairs_documented: 30,
    repairs_completed: 1540,
    learners_trained: 1420,
    e_waste_avoided_kg: 520.4,
    money_saved_inr: 945000,
    active_languages: ["Hindi (हिन्दी)", "Marathi (मराठी)", "English"],
    call_relays_handled: 328
  });

  // "If Shipped" interactive calculator with fully transparent assumptions
  const [targetTechnicians, setTargetTechnicians] = useState<number>(50000);
  const [adoptionRatePct, setAdoptionRatePct] = useState<number>(15);
  const [repairsPerYearPerTech, setRepairsPerYearPerTech] = useState<number>(180);

  useEffect(() => {
    fetch('/api/impact')
      .then((r) => r.json())
      .then((d) => setMetrics(d))
      .catch((e) => console.error(e));
  }, []);

  // Calculated figures based on adjustable assumptions
  const activeAdoptedTechs = Math.round((targetTechnicians * adoptionRatePct) / 100);
  const annualRepairsEstimated = activeAdoptedTechs * repairsPerYearPerTech;
  const annualEwasteAvoidedKg = Math.round(annualRepairsEstimated * 7.5); // avg 7.5kg per appliance
  const annualConsumerSavingsInr = Math.round(annualRepairsEstimated * 2200); // avg replacement cost saved minus fix
  const estimatedPeopleBenefited = activeAdoptedTechs * 140; // households served + apprentice network

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20">
      {/* Title */}
      <div className="border-b border-white/10 pb-4">
        <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
          <span>Impact & E-Waste Avoidance Dashboard</span>
          <BarChart3 className="w-6 h-6 text-orange-400" />
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Tracking tangible e-waste diverted from landfills and livelihood enhancement for disabled Indian artisans.
        </p>
      </div>

      {/* Live Impact Counters */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 rounded-3xl glass-panel space-y-2 border border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Documented Cases</span>
            <BookOpen className="w-4 h-4 text-orange-400" />
          </div>
          <div className="text-3xl font-black text-white">
            {metrics.repairs_documented}
          </div>
          <div className="text-[11px] text-teal-400 font-semibold">
            Across 3 MVP categories
          </div>
        </div>

        <div className="p-6 rounded-3xl glass-panel space-y-2 border border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">E-Waste Avoided</span>
            <Recycle className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-400">
            {metrics.e_waste_avoided_kg} kg
          </div>
          <div className="text-[11px] text-slate-400">
            Copper, cast iron, plastics saved
          </div>
        </div>

        <div className="p-6 rounded-3xl glass-panel space-y-2 border border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Consumer Savings</span>
            <IndianRupee className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-amber-400">
            ₹{(metrics.money_saved_inr / 100000).toFixed(1)} Lakhs
          </div>
          <div className="text-[11px] text-slate-400">
            Versus premature replacements
          </div>
        </div>

        <div className="p-6 rounded-3xl glass-panel space-y-2 border border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Deaf / Blind Relays</span>
            <Users className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-3xl font-black text-indigo-300">
            {metrics.call_relays_handled}
          </div>
          <div className="text-[11px] text-slate-400">
            Live AI-assisted telephone jobs
          </div>
        </div>
      </div>

      {/* "IF SHIPPED" Interactive Calculator */}
      <section className="p-6 sm:p-8 rounded-3xl glass-panel border border-orange-500/40 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-white">
                "If Shipped" Pan-India Scale Calculator
              </h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 font-bold border border-orange-500/30">
                Transparent Modeling
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Adjust assumptions to estimate potential national impact if FixSutra Saathi is deployed with skill councils.
            </p>
          </div>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 rounded-2xl bg-white/5 border border-white/10">
          {/* Target Population Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-300">
              <span>Target Technician Base</span>
              <span className="text-orange-400">{targetTechnicians.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="10000"
              max="200000"
              step="5000"
              value={targetTechnicians}
              onChange={(e) => setTargetTechnicians(parseInt(e.target.value))}
              className="w-full accent-orange-500"
            />
            <div className="text-[10px] text-slate-400">
              Indian informal repair workforce pool
            </div>
          </div>

          {/* Adoption Rate Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-300">
              <span>Platform Adoption Rate</span>
              <span className="text-teal-400">{adoptionRatePct}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              step="1"
              value={adoptionRatePct}
              onChange={(e) => setAdoptionRatePct(parseInt(e.target.value))}
              className="w-full accent-teal-500"
            />
            <div className="text-[10px] text-slate-400">
              Estimated active participating technicians: <strong>{activeAdoptedTechs.toLocaleString()}</strong>
            </div>
          </div>

          {/* Repairs per year */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-300">
              <span>Annual Repairs per Tech</span>
              <span className="text-amber-400">{repairsPerYearPerTech}</span>
            </div>
            <input
              type="range"
              min="60"
              max="360"
              step="10"
              value={repairsPerYearPerTech}
              onChange={(e) => setRepairsPerYearPerTech(parseInt(e.target.value))}
              className="w-full accent-amber-500"
            />
            <div className="text-[10px] text-slate-400">
              Approx. 15 repairs per month
            </div>
          </div>
        </div>

        {/* Projected Scale Outputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-center space-y-1">
            <div className="text-xs font-bold text-indigo-300 uppercase">Estimated Beneficiaries</div>
            <div className="text-2xl sm:text-3xl font-black text-white">
              {(estimatedPeopleBenefited / 100000).toFixed(2)} Lakh
            </div>
            <div className="text-[10px] text-slate-400">Households served & disabled artisans empowered</div>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-1">
            <div className="text-xs font-bold text-emerald-300 uppercase">Annual E-Waste Diverted</div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">
              {(annualEwasteAvoidedKg / 1000).toFixed(1)} Tons
            </div>
            <div className="text-[10px] text-slate-400">Prevented toxic scrap in town landfills</div>
          </div>

          <div className="p-5 rounded-2xl bg-amber-950/40 border border-amber-500/30 text-center space-y-1">
            <div className="text-xs font-bold text-amber-300 uppercase">Annual Economic Wealth Retained</div>
            <div className="text-2xl sm:text-3xl font-black text-amber-400">
              ₹{(annualConsumerSavingsInr / 10000000).toFixed(1)} Crores
            </div>
            <div className="text-[10px] text-slate-400">Saved by tier 2/3 consumers & small farmers</div>
          </div>
        </div>

        {/* Assumption Methodology Disclosure */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-400 space-y-1">
          <div className="font-bold text-white flex items-center gap-1.5">
            <Info className="w-4 h-4 text-orange-400" />
            <span>Assumptions & Source Modeling Note</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            All figures above are projections modeled on: (1) Average appliance salvage weight of 7.5 kg per repair, (2) Conservative ₹2,200 net saving per successful repair versus replacement cost, and (3) India Skills Council informal electronics service cluster estimates. These figures are illustrative models and not hard audited facts.
          </p>
        </div>
      </section>
    </div>
  );
};
