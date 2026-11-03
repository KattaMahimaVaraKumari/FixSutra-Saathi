import React, { useState, useEffect } from 'react';
import { 
  Sparkles, CheckCircle2, ArrowRight, X, Play, 
  RotateCcw, Volume2, PhoneCall, ShieldCheck 
} from 'lucide-react';
import { Language } from '../i18n';

interface GuidedDemoProps {
  isOpen: boolean;
  onClose: () => void;
  setTab: (tab: string) => void;
  currentLang: Language;
}

export const GuidedDemoModal: React.FC<GuidedDemoProps> = ({
  isOpen,
  onClose,
  setTab,
  currentLang
}) => {
  if (!isOpen) return null;

  const [currentStep, setCurrentStep] = useState(1);

  const demoSteps = [
    {
      step: 1,
      tab: 'capture',
      title: "1. Senior Technician Voice & Photo Capture",
      desc: "Watch a senior technician record a water pump humming fault in Hindi. Sarvam Saaras transcribes the code-mixed dialect, Sarvam Vision parses the motor nameplate, and Sarvam-105B outputs a structured case card with sensory landmarks.",
      actionLabel: "Go to Capture Screen"
    },
    {
      step: 2,
      tab: 'learn',
      title: "2. Accessible Blind Mode Walkthrough",
      desc: "Experience how a visually impaired learner receives hands-free spoken repair guidance from Bulbul v4 Flash with sound, touch, and temperature cues plus high-voltage warnings.",
      actionLabel: "Experience Blind Mode"
    },
    {
      step: 3,
      tab: 'learn',
      title: "3. Deaf Visual Decision Tree & Captions",
      desc: "Switch to Deaf mode to inspect visual troubleshooting flowcharts, live captions, high-contrast step illustrations, and grounded Q&A with the Sarvam-105B assistant.",
      actionLabel: "Experience Deaf Mode"
    },
    {
      step: 4,
      tab: 'relay',
      title: "4. Hero Call Relay with Live Subtitles",
      desc: "Experience a simulated incoming customer phone call. The deaf technician sees live Saaras speech captions, taps a quick-reply chip, and Sarvam-105B & Bulbul v4 respond with a natural polite voice in &lt;300ms, auto-creating a confirmed booking card.",
      actionLabel: "Launch Live Call Relay"
    },
    {
      step: 5,
      tab: 'impact',
      title: "5. Learning Loop & Impact Dashboard",
      desc: "The repair outcome is reported, dynamically updating knowledge base confidence and avoidance counters (520 kg e-waste avoided and ₹9.4 Lakhs saved).",
      actionLabel: "View Impact Dashboard"
    }
  ];

  const active = demoSteps[currentStep - 1];

  const handleStepAction = () => {
    setTab(active.tab);
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
    >
      <div className="w-full max-w-xl p-6 sm:p-8 rounded-3xl glass-panel border border-orange-500/40 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-orange-400 animate-pulse" />
            <h2 className="text-xl font-black text-white">
              FixSutra Saathi 3-Minute Live Demo Tour
            </h2>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold"
          >
            ✕ Exit Demo
          </button>
        </div>

        {/* Step Progression Indicators */}
        <div className="flex justify-between items-center gap-2">
          {demoSteps.map((s) => (
            <button
              key={s.step}
              onClick={() => setCurrentStep(s.step)}
              className={`flex-1 py-1.5 rounded-full text-xs font-bold text-center transition ${
                currentStep === s.step
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : currentStep > s.step
                  ? 'bg-emerald-500/30 text-emerald-300'
                  : 'bg-white/5 text-slate-500'
              }`}
            >
              Step {s.step}
            </button>
          ))}
        </div>

        {/* Step Card Body */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
          <div className="text-xs font-extrabold text-orange-400 uppercase tracking-wider">
            Demo Step {active.step} of 5
          </div>
          <h3 className="text-lg font-black text-white">
            {active.title}
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: active.desc }} />
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white text-xs font-bold min-h-[44px]"
          >
            ← Previous Step
          </button>

          <button
            onClick={handleStepAction}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white font-extrabold text-xs shadow-lg shadow-orange-500/20 hover:scale-105 transition min-h-[44px]"
          >
            <span>{active.actionLabel}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
