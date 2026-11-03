import React from 'react';
import { 
  Sparkles, Wrench, Search, BookOpen, PhoneCall, 
  Award, Users, BarChart3, Globe, Eye, Zap, Volume2, ShieldAlert
} from 'lucide-react';
import { Language, UI_STRINGS } from '../i18n';

interface NavProps {
  currentTab: string;
  setTab: (tab: string) => void;
  currentLang: Language;
  setLang: (lang: Language) => void;
  openA11y: () => void;
  isMock: boolean;
  onGuidedDemo: () => void;
}

export const Navbar: React.FC<NavProps> = ({
  currentTab,
  setTab,
  currentLang,
  setLang,
  openA11y,
  isMock,
  onGuidedDemo
}) => {
  const t = UI_STRINGS[currentLang];

  const navItems = [
    { id: 'landing', label: t.nav_home, icon: Sparkles },
    { id: 'capture', label: t.nav_capture, icon: Wrench },
    { id: 'search', label: t.nav_search, icon: Search },
    { id: 'learn', label: t.nav_learn, icon: BookOpen },
    { id: 'relay', label: t.nav_relay, icon: PhoneCall, badge: 'Hero' },
    { id: 'pathway', label: t.nav_pathway, icon: Award },
    { id: 'directory', label: t.nav_directory, icon: Users },
    { id: 'impact', label: t.nav_impact, icon: BarChart3 }
  ];

  return (
    <header className="sticky top-0 z-40 w-full px-4 py-3 border-b border-white/10 glass-panel">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Logo and Tagline */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setTab('landing')}>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-500 via-indigo-600 to-teal-400 p-0.5 flex items-center justify-center shadow-lg shadow-orange-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Zap className="w-5 h-5 text-orange-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg text-white tracking-tight">
                {t.app_title}
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                isMock 
                  ? 'bg-amber-500/10 text-amber-300 border-amber-500/30' 
                  : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
              }`}>
                {isMock ? t.badge_mock : t.badge_live}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/5 p-1 rounded-2xl border border-white/10" aria-label="Main Navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all min-h-[38px] ${
                  active
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[9px] bg-indigo-500/40 text-indigo-200 px-1.5 py-0.2 rounded-full font-bold ml-0.5">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Controls: Guided Demo, Language & Accessibility */}
        <div className="flex items-center gap-2">
          {/* Quick 3-Min Guided Demo Button */}
          <button
            onClick={onGuidedDemo}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-xs font-bold shadow-lg shadow-teal-500/20 hover:scale-105 active:scale-95 transition min-h-[44px]"
            title="Start automated 3-minute guided tour of all demo steps"
          >
            <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
            <span>3-Min Demo</span>
          </button>

          {/* Language Switcher */}
          <div className="flex items-center bg-white/5 rounded-xl border border-white/10 p-0.5">
            {(['hi', 'mr', 'en'] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2 py-1 rounded-lg text-xs font-bold uppercase transition min-h-[44px] min-w-[36px] ${
                  currentLang === l
                    ? 'bg-orange-500 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
                aria-label={`Switch to ${l.toUpperCase()}`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Persistent Accessibility Button */}
          <button
            onClick={openA11y}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600/30 border border-indigo-400/40 text-indigo-200 hover:bg-indigo-600/50 text-xs font-semibold transition min-h-[44px]"
            aria-label="Open accessibility options dialog"
          >
            <Eye className="w-4 h-4 text-orange-400" />
            <span className="hidden sm:inline">A11y</span>
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="lg:hidden flex items-center gap-1 overflow-x-auto pt-2 pb-1 scrollbar-none">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold whitespace-nowrap min-h-[44px] ${
                active
                  ? 'bg-orange-500 text-white'
                  : 'bg-white/5 text-slate-300'
              }`}
            >
              <Icon className="w-3 h-3" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
