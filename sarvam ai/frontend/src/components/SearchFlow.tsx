import React, { useState, useEffect } from 'react';
import { 
  Search, Mic, Filter, ShieldCheck, Clock, 
  ArrowRight, ThumbsUp, Sparkles, Volume2, CheckCircle2 
} from 'lucide-react';
import { Language, UI_STRINGS } from '../i18n';
import { RepairCase } from '../types';

interface SearchProps {
  onSelectCase: (c: RepairCase) => void;
  currentLang: Language;
}

export const SearchFlow: React.FC<SearchProps> = ({ onSelectCase, currentLang }) => {
  const t = UI_STRINGS[currentLang];

  const [cases, setCases] = useState<RepairCase[]>([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [difficulty, setDifficulty] = useState<string>('all');
  const [loading, setLoading] = useState(false);

  const fetchCases = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (category !== 'all') params.append('category', category);
      if (difficulty !== 'all') params.append('difficulty', difficulty);
      if (query.trim()) params.append('q', query);

      const res = await fetch(`/api/cases?${params.toString()}`);
      const data = await res.json();
      setCases(data.cases || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCases();
  }, [category, difficulty]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCases();
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Search Bar */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <h1 className="text-2xl sm:text-4xl font-black text-white">
          Grassroots Repair Knowledge Base
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Search 30+ verified fault cases by symptom, equipment model, or voice in Hindi, Marathi, & English.
        </p>

        <form onSubmit={handleSearchSubmit} className="relative flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try: 'pump humming not starting', 'MOSFET short', 'मिक्सर कार्बन ब्रश'..."
            className="w-full px-5 py-4 pl-12 pr-28 rounded-2xl glass-input text-sm focus:ring-2 focus:ring-orange-500 shadow-xl"
            aria-label="Search repair cases"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-4" />
          <div className="absolute right-2 flex items-center gap-1">
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md transition min-h-[44px]"
            >
              Search
            </button>
          </div>
        </form>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
          {/* Category Filter */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-slate-200 text-xs font-semibold"
            aria-label="Filter by appliance category"
          >
            <option value="all">All Categories (30 Cases)</option>
            <option value="water_pumps">Water Pumps (10)</option>
            <option value="inverters">Inverters & Batteries (10)</option>
            <option value="household_appliances">Household Appliances (10)</option>
          </select>

          {/* Difficulty Filter */}
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-slate-200 text-xs font-semibold"
            aria-label="Filter by repair difficulty"
          >
            <option value="all">All Difficulties</option>
            <option value="Easy">Easy (DIY / Quick Fix)</option>
            <option value="Medium">Medium (Multimeter & Soldering)</option>
            <option value="Hard">Hard (High Voltage / Mechanical)</option>
          </select>
        </div>
      </div>

      {/* Case Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4 text-xs font-semibold text-slate-400">
          <span>Found {cases.length} verified repair solutions</span>
          <span>Lightweight Keyword + LLM Re-Ranked</span>
        </div>

        {loading ? (
          <div className="text-center py-12 text-slate-400 text-sm animate-pulse">
            Retrieving repair network cases...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cases.map((c) => (
              <div
                key={c.id}
                onClick={() => onSelectCase(c)}
                className="p-6 rounded-3xl glass-panel hover:border-orange-500/50 hover:scale-[1.01] transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300 font-semibold">
                      {c.category_name || c.category}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                      c.difficulty === 'Easy' ? 'bg-emerald-500/20 text-emerald-300' :
                      c.difficulty === 'Medium' ? 'bg-amber-500/20 text-amber-300' :
                      'bg-rose-500/20 text-rose-300'
                    }`}>
                      {c.difficulty}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-white text-base group-hover:text-orange-400 transition leading-snug">
                    {c.title}
                  </h3>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    <strong>Symptom:</strong> {c.symptom}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-white/10 text-xs">
                  {/* Cause & Steps Count */}
                  <div className="text-slate-400 text-[11px]">
                    <span className="text-orange-300 font-semibold">Cause:</span> {c.probable_cause}
                  </div>

                  <div className="flex items-center justify-between text-slate-300 font-medium">
                    <div className="flex items-center gap-1 text-emerald-400 font-bold">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{c.success_rate}% success</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{c.estimated_time}</span>
                    </div>
                  </div>

                  {/* Technician Credit */}
                  <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <span>{c.technician?.avatar || '👨‍🔧'}</span>
                      <span className="font-semibold text-slate-200">{c.technician?.name}</span>
                      {c.technician?.verified && (
                        <span title="Mentor Verified">
                          <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                        </span>
                      )}
                    </div>
                    <div className="font-bold text-orange-400 flex items-center gap-0.5 group-hover:translate-x-1 transition">
                      <span>Open Guide</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
