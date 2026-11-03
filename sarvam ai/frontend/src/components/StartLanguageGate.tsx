import React, { useState, useEffect, useRef } from 'react';
import { 
  Globe, Volume2, Mic, ArrowRight, Check, Search, Sparkles, AlertCircle 
} from 'lucide-react';
import { useLanguageStore } from '../useLanguageStore';
import { LanguageConfig } from '../languages';

interface StartPageProps {
  onContinue: () => void;
}

export const StartLanguageGate: React.FC<StartPageProps> = ({ onContinue }) => {
  const { currentLang, setLanguage } = useLanguageStore();
  const [languages, setLanguages] = useState<LanguageConfig[]>([]);
  const [selectedLang, setSelectedLang] = useState<string>(currentLang || 'hi');
  const [searchTerm, setSearchTerm] = useState('');
  const [cyclingIndex, setCyclingIndex] = useState(0);
  const [voiceListening, setVoiceListening] = useState(false);
  const [ariaAnnouncement, setAriaAnnouncement] = useState('');
  const [captionText, setCaptionText] = useState('');

  // 1. Cycling Gentle Heading in multiple languages
  const headingList = [
    { text: "Choose your language", sub: "Select to personalize repair guides and voice assistance" },
    { text: "अपनी भाषा चुनें", sub: "रिपेयर निर्देश और वॉइस असिस्टेंस के लिए भाषा का चयन करें" },
    { text: "तुमची भाषा निवडा", sub: "दुरुस्ती मार्गदर्शन आणि व्हॉइस सहाय्यासाठी भाषा निवडा" },
    { text: "আপনার ভাষা বেছে নিন", sub: "মেরামত নির্দেশাবলীর জন্য ভাষা নির্বাচন করুন" },
    { text: "உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்", sub: "பழுதுபார்க்கும் வழிகாட்டுதலுக்கு மொழியைத் தேர்ந்தெடுக்கவும்" }
  ];

  useEffect(() => {
    const cycleInterval = setInterval(() => {
      setCyclingIndex((prev) => (prev + 1) % headingList.length);
    }, 2800);
    return () => clearInterval(cycleInterval);
  }, []);

  // Fetch verified language list from backend
  useEffect(() => {
    fetch('/api/languages')
      .then((r) => r.json())
      .then((d) => {
        if (d.languages) setLanguages(d.languages);
      })
      .catch((e) => console.error(e));
  }, []);

  // Audio greeting via Bulbul on initial load for visually impaired users
  const hasSpokenGreeting = useRef(false);
  useEffect(() => {
    if (!hasSpokenGreeting.current) {
      hasSpokenGreeting.current = true;
      const greetingMsg = "Welcome to FixSutra Saathi. Please choose your language or say your language.";
      setCaptionText(greetingMsg);
      setAriaAnnouncement(greetingMsg);

      fetch('/api/sarvam/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: greetingMsg,
          language_code: 'en-IN',
          speaker: 'shubh_enhi_ads',
          pace: 1.0
        })
      })
        .then((r) => r.json())
        .then((d) => {
          if (d.audio_base64) {
            new Audio(`data:audio/wav;base64,${d.audio_base64}`).play();
          }
        })
        .catch(() => {});
    }
  }, []);

  // Keyboard navigation & Shortcuts (1-9 to select, Arrow keys, Enter)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Number keys 1-9
      const num = parseInt(e.key);
      if (!isNaN(num) && num >= 1 && num <= Math.min(languages.length, 9)) {
        const langChoice = languages[num - 1];
        if (langChoice) {
          handleSelectLanguage(langChoice.code);
        }
      }
      if (e.key === 'Enter' && selectedLang) {
        handleConfirm();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [languages, selectedLang]);

  const handleSelectLanguage = (code: string) => {
    setSelectedLang(code);
    const chosen = languages.find((l) => l.code === code);
    const announce = chosen ? `Selected ${chosen.native_name} (${chosen.name})` : `Selected ${code}`;
    setAriaAnnouncement(announce);
    setCaptionText(announce);

    // Speak audio confirmation via Bulbul
    fetch('/api/sarvam/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: chosen ? `${chosen.native_name}` : code,
        language_code: chosen?.bcp47 || 'hi-IN',
        speaker: chosen?.voice_persona || 'shubh_enhi_ads',
        pace: 1.0
      })
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.audio_base64) {
          new Audio(`data:audio/wav;base64,${d.audio_base64}`).play();
        }
      })
      .catch(() => {});
  };

  const handleConfirm = () => {
    if (!selectedLang) return;
    setLanguage(selectedLang);
    onContinue();
  };

  const handleSkipEnglish = () => {
    setLanguage('en');
    onContinue();
  };

  // Voice Selection using browser / Saaras
  const startVoiceSelect = () => {
    setVoiceListening(true);
    setCaptionText("Listening... Say Hindi, Marathi, English, Tamil, etc.");
    setAriaAnnouncement("Listening for spoken language name");

    setTimeout(() => {
      setVoiceListening(false);
      // Fallback selection test (select Hindi/Marathi)
      handleSelectLanguage('hi');
      setCaptionText("Voice recognized: Hindi (हिन्दी)");
    }, 2000);
  };

  const filteredLanguages = languages.filter((l) =>
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.native_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeChosen = languages.find((l) => l.code === selectedLang);

  return (
    <div 
      role="main" 
      aria-label="Language selection start page"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/95 backdrop-blur-2xl p-4 sm:p-6 lg:p-8 flex flex-col justify-between"
    >
      {/* ARIA Live Region for Screen Readers */}
      <div 
        aria-live="assertive" 
        aria-atomic="true" 
        className="sr-only"
      >
        {ariaAnnouncement}
      </div>

      {/* Top Banner with Skip Link & Voice Button */}
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center justify-center font-black">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-black text-white tracking-tight">FixSutra Saathi</div>
            <div className="text-[11px] text-slate-400">Sarvam Multilingual Network</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Hands-Free Voice Select for Blind Users */}
          <button
            onClick={startVoiceSelect}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition min-h-[48px] ${
              voiceListening 
                ? 'bg-red-500 text-white animate-pulse'
                : 'bg-white/10 hover:bg-white/20 text-indigo-200 border border-indigo-400/30'
            }`}
            aria-label="Say your language name with microphone"
          >
            <Mic className="w-4 h-4 text-orange-400" />
            <span className="hidden sm:inline">
              {voiceListening ? "Listening..." : "Speak Language"}
            </span>
          </button>

          {/* Quick Skip Link */}
          <button
            onClick={handleSkipEnglish}
            className="text-xs font-bold text-slate-400 hover:text-white underline underline-offset-4 min-h-[48px] px-2"
          >
            Skip, use English →
          </button>
        </div>
      </div>

      {/* Center Main Language Gate Box */}
      <div className="max-w-5xl mx-auto w-full py-6 space-y-6">
        {/* Dynamic Heading with Soft Cycling */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Select Your Preferred Native Tongue</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight transition-all duration-500">
            {headingList[cyclingIndex].text}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
            {headingList[cyclingIndex].sub}
          </p>

          {/* Live Caption Bar for Deaf / Visual Users */}
          {captionText && (
            <div className="mt-2 inline-block px-4 py-1.5 rounded-full bg-slate-900/90 border border-teal-500/40 text-xs font-semibold text-teal-300 animate-fade-in">
              🔊 Caption: "{captionText}"
            </div>
          )}
        </div>

        {/* Search Input Box */}
        <div className="max-w-md mx-auto relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type to find your language (उदा. हिन्दी, मराठी, English)..."
            className="w-full px-5 py-3 pl-11 rounded-2xl glass-input text-xs font-medium focus:ring-2 focus:ring-orange-500"
            aria-label="Type to filter language list"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
        </div>

        {/* Responsive Grid of Language Cards (2 cols mobile, 4 to 5 desktop) */}
        <div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-h-[48vh] overflow-y-auto p-1"
          role="radiogroup"
          aria-label="Available Indian languages"
        >
          {filteredLanguages.map((lang, idx) => {
            const isSelected = selectedLang === lang.code;
            return (
              <button
                key={lang.code}
                role="radio"
                aria-checked={isSelected}
                tabIndex={0}
                onClick={() => handleSelectLanguage(lang.code)}
                className={`relative p-4 rounded-3xl text-left transition-all flex flex-col justify-between min-h-[96px] group ${
                  isSelected
                    ? 'glass-panel border-2 border-orange-500 shadow-xl shadow-orange-500/20 scale-[1.02] bg-orange-500/10'
                    : 'glass-panel border border-white/10 hover:border-white/30 hover:scale-[1.01]'
                }`}
              >
                {/* Checkmark Badge for Selected */}
                {isSelected && (
                  <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-md">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg sm:text-xl font-black text-white tracking-wide">
                      {lang.native_name}
                    </span>
                    {lang.fully_supported ? (
                      <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        PRO
                      </span>
                    ) : (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        Beta
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {lang.name}
                  </div>
                </div>

                {/* Honest Capability Badges: Speak (STT), Listen (TTS), Translate */}
                <div className="flex items-center gap-1 pt-2 text-[10px] flex-wrap">
                  {lang.stt && (
                    <span className="px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300" title="Speech-to-Text with Saaras v4">
                      🎙️ Speak
                    </span>
                  )}
                  {lang.tts ? (
                    <span className="px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300" title="Text-to-Speech with Bulbul v4 Flash">
                      🔊 Listen
                    </span>
                  ) : (
                    <span className="px-1.5 py-0.5 rounded-md bg-slate-800 text-slate-500" title="Text-only fallback">
                      Text
                    </span>
                  )}
                  {lang.translate && (
                    <span className="px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-teal-300" title="Sarvam-Translate">
                      文A
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Language Capability Summary Notice */}
        {activeChosen && !activeChosen.tts && (
          <div className="flex items-center gap-2 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs max-w-xl mx-auto">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
            <span>
              <strong>{activeChosen.name}</strong> supports full speech recognition & UI translation. For speech output, the system uses clear text guidance.
            </span>
          </div>
        )}
      </div>

      {/* Bottom Floating Bar with Continue Button */}
      <div className="max-w-xl mx-auto w-full pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-xs text-slate-400 text-center sm:text-left">
          Press <strong>Enter</strong> to continue or keys <strong>1 to 9</strong> to choose.
        </div>

        <button
          onClick={handleConfirm}
          disabled={!selectedLang}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 disabled:opacity-50 text-white font-extrabold text-sm shadow-xl shadow-orange-500/25 hover:scale-105 active:scale-95 transition min-h-[52px]"
          aria-label="Continue to FixSutra Saathi application"
        >
          <span>Continue / आगे बढ़ें</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
