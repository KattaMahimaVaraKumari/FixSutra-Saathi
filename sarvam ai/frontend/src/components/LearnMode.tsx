import React, { useState, useEffect } from 'react';
import { 
  Eye, Volume2, VolumeX, ShieldAlert, CheckCircle2, 
  ArrowRight, ArrowLeft, RotateCcw, AlertTriangle, Sparkles, Send, MessageSquare 
} from 'lucide-react';
import { Language, UI_STRINGS } from '../i18n';
import { RepairCase, FixStep } from '../types';

interface LearnProps {
  activeCase: RepairCase;
  currentLang: Language;
  onBack: () => void;
  onReportResult: (status: string, notes?: string) => void;
  speaker: string;
  speechRate: number;
}

export const LearnMode: React.FC<LearnProps> = ({
  activeCase,
  currentLang,
  onBack,
  onReportResult,
  speaker,
  speechRate
}) => {
  const t = UI_STRINGS[currentLang];

  // 4 Modes: blind, deaf, speech, standard
  const [mode, setMode] = useState<'blind' | 'deaf' | 'speech' | 'standard'>('blind');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioLatency, setAudioLatency] = useState<number | null>(null);

  // Deaf mode Q&A
  const [qaInput, setQaInput] = useState('');
  const [qaHistory, setQaHistory] = useState<Array<{ sender: string; text: string }>>([
    { sender: 'assistant', text: 'Namaste! I am your FixSutra assistant. Ask any question about this fault or tools required.' }
  ]);
  const [isAsking, setIsAsking] = useState(false);

  // Result reporting dialog
  const [showReport, setShowReport] = useState(false);
  const [repairStatus, setRepairStatus] = useState<'worked' | 'partly' | 'failed'>('worked');
  const [repairNotes, setRepairNotes] = useState('');

  const steps = activeCase.fix_steps || [];
  const currentStep: FixStep = steps[currentStepIndex] || {
    step: 1,
    instruction: "Inspect the equipment",
    sensory_cue: "Look for visual burn marks or odor"
  };

  // Bulbul TTS execution for current step
  const speakCurrentStep = async () => {
    setIsPlayingAudio(true);
    try {
      const stepText = `Step ${currentStep.step}. ${currentStep.instruction}. Sensory cue: ${currentStep.sensory_cue}`;
      const res = await fetch('/api/sarvam/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: stepText,
          language_code: currentLang === 'en' ? 'en-IN' : currentLang === 'mr' ? 'mr-IN' : 'hi-IN',
          speaker,
          pace: speechRate
        })
      });
      const data = await res.json();
      setAudioLatency(data.latency_ms);

      if (data.audio_base64) {
        const audio = new Audio(`data:audio/wav;base64,${data.audio_base64}`);
        audio.onended = () => setIsPlayingAudio(false);
        await audio.play();
      } else {
        // Fallback Web Speech API if offline
        const u = new SpeechSynthesisUtterance(stepText);
        u.rate = speechRate;
        u.onend = () => setIsPlayingAudio(false);
        window.speechSynthesis.speak(u);
      }
    } catch (e) {
      console.error(e);
      setIsPlayingAudio(false);
    }
  };

  // In Blind mode, auto-announce the step on step change
  useEffect(() => {
    if (mode === 'blind') {
      speakCurrentStep();
    }
  }, [currentStepIndex, mode]);

  const handleNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleAskAssistant = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!qaInput.trim()) return;

    const userMsg = qaInput;
    setQaInput('');
    setQaHistory((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setIsAsking(true);

    try {
      const res = await fetch('/api/sarvam/grounded-qa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: userMsg,
          case_ids: [activeCase.id],
          language: currentLang
        })
      });
      const data = await res.json();
      setQaHistory((prev) => [...prev, { sender: 'assistant', text: data.answer }]);
    } catch (err) {
      setQaHistory((prev) => [
        ...prev,
        { sender: 'assistant', text: 'Always disconnect mains 230V AC isolator and test capacitor with 10k resistor before touching.' }
      ]);
    } finally {
      setIsAsking(false);
    }
  };

  const submitReport = () => {
    onReportResult(repairStatus, repairNotes);
    setShowReport(false);
    alert('Thank you! Repair result recorded into FixSutra learning loop.');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      {/* Top Bar with Back & Mode Segmented Control */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white px-3 py-2 rounded-xl bg-white/5 border border-white/10 w-fit min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Cases</span>
        </button>

        {/* Mode Switcher Segmented Control */}
        <div className="flex items-center p-1 rounded-2xl bg-white/5 border border-white/10 overflow-x-auto">
          {[
            { id: 'blind', label: 'Blind Mode', icon: '🦯' },
            { id: 'deaf', label: 'Deaf Mode', icon: '🧏' },
            { id: 'speech', label: 'Speech-Impaired', icon: '💬' },
            { id: 'standard', label: 'Standard', icon: '⚡' }
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id as any)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition min-h-[44px] ${
                mode === m.id
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>{m.icon}</span>
              <span>{m.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Case Header & Safety Banner */}
      <div className="p-6 rounded-3xl glass-panel space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-300 font-bold border border-orange-500/30">
            {activeCase.category_name || activeCase.category}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-bold">Confidence: {activeCase.confidence}%</span>
            {activeCase.mentor_verified && (
              <span className="px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 font-bold border border-teal-500/30">
                Mentor Verified
              </span>
            )}
          </div>
        </div>

        <h1 className="text-xl sm:text-2xl font-black text-white">
          {activeCase.title}
        </h1>
        <p className="text-xs text-slate-300">
          <strong>Symptom:</strong> {activeCase.symptom}
        </p>

        {/* Prominent High-Risk Safety Banner */}
        <div className="p-4 rounded-2xl bg-red-950/40 border border-red-500/50 flex items-start gap-3 text-xs text-red-200">
          <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-extrabold text-red-300">Mandatory Electrical Safety Banner</div>
            <div>{activeCase.safety_warnings?.join(' • ')}</div>
          </div>
        </div>
      </div>

      {/* --- MODE 1: BLIND / LOW VISION MODE (Voice & Sensory First) --- */}
      {mode === 'blind' && (
        <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-indigo-500/40 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🦯</span>
              <div>
                <h2 className="text-lg font-black text-white">Blind Hands-Free Sensory Mode</h2>
                <p className="text-xs text-slate-400">Voice-guided with touch, sound, and smell landmarks.</p>
              </div>
            </div>
            {audioLatency && (
              <span className="text-xs font-mono text-teal-400">Bulbul Latency: {audioLatency}ms</span>
            )}
          </div>

          {/* Current Step Big Card */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4 text-center sm:text-left">
            <div className="flex justify-between items-center text-xs">
              <span className="px-3 py-1 rounded-full bg-orange-500 text-white font-extrabold">
                Step {currentStep.step} of {steps.length}
              </span>
              <span className="text-slate-400 text-xs">
                Audio voice: {speaker} ({speechRate}x)
              </span>
            </div>

            <div className="text-lg sm:text-xl font-bold text-white leading-relaxed">
              {currentStep.instruction}
            </div>

            {/* Sensory Cue Spotlight */}
            <div className="p-4 rounded-2xl bg-indigo-950/50 border border-indigo-500/30 space-y-2">
              <div className="text-xs font-bold text-orange-400 uppercase tracking-wide">
                Sensory & Tactile Landmark:
              </div>
              <div className="text-sm text-indigo-100 font-medium">
                {currentStep.sensory_cue}
              </div>
              {currentStep.sound_cue && (
                <div className="text-xs text-teal-300">
                  <strong>Sound cue:</strong> {currentStep.sound_cue}
                </div>
              )}
              {currentStep.touch_cue && (
                <div className="text-xs text-amber-300">
                  <strong>Touch cue:</strong> {currentStep.touch_cue}
                </div>
              )}
            </div>
          </div>

          {/* Large Voice Navigation Controls (Min 48px touch targets) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={handlePrevStep}
              disabled={currentStepIndex === 0}
              className="p-4 rounded-2xl bg-white/10 hover:bg-white/20 disabled:opacity-40 text-white font-bold text-sm min-h-[52px]"
              aria-label="Previous step"
            >
              ← Previous
            </button>

            <button
              onClick={speakCurrentStep}
              className="p-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm flex items-center justify-center gap-2 min-h-[52px]"
              aria-label="Repeat step audio"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Repeat Voice</span>
            </button>

            <button
              onClick={() => {
                alert(`Tools needed for step: ${activeCase.tools?.join(', ')}`);
              }}
              className="p-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm min-h-[52px]"
              aria-label="What tool do I need?"
            >
              What Tool?
            </button>

            <button
              onClick={handleNextStep}
              disabled={currentStepIndex === steps.length - 1}
              className="p-4 rounded-2xl bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white font-bold text-sm flex items-center justify-center gap-1 min-h-[52px]"
              aria-label="Next step"
            >
              <span>Next Step →</span>
            </button>
          </div>
        </div>
      )}

      {/* --- MODE 2: DEAF / HARD OF HEARING MODE (Visual & Decision Tree) --- */}
      {mode === 'deaf' && (
        <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-teal-500/40 space-y-6">
          <div className="flex items-center gap-2 border-b border-white/10 pb-4">
            <span className="text-2xl">🧏</span>
            <div>
              <h2 className="text-lg font-black text-white">Deaf Visual Mode & Decision Tree</h2>
              <p className="text-xs text-slate-400">
                Decision trees, illustrated cards, and text-based interactive Q&A.
              </p>
            </div>
          </div>

          {/* Visual Troubleshooting Decision Tree */}
          {activeCase.decision_tree && (
            <div className="p-5 rounded-2xl bg-teal-950/30 border border-teal-500/30 space-y-3">
              <div className="text-xs font-bold text-teal-300 uppercase tracking-wide">
                Visual Troubleshooting Flowchart:
              </div>
              <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 text-center font-bold text-sm text-white">
                "{activeCase.decision_tree.question}"
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs">
                  <div className="font-bold text-emerald-300 mb-1">✓ YES Branch</div>
                  <div className="text-slate-200">
                    {typeof activeCase.decision_tree.yes === 'string'
                      ? activeCase.decision_tree.yes
                      : (activeCase.decision_tree.yes as any)?.question}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-xs">
                  <div className="font-bold text-rose-300 mb-1">✗ NO Branch</div>
                  <div className="text-slate-200">
                    {typeof activeCase.decision_tree.no === 'string'
                      ? activeCase.decision_tree.no
                      : (activeCase.decision_tree.no as any)?.question}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Illustrated Steps Timeline */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-400 uppercase">
              All Sequential Steps:
            </div>
            {steps.map((st, i) => (
              <div
                key={i}
                className={`p-4 rounded-2xl border transition ${
                  currentStepIndex === i
                    ? 'bg-orange-500/10 border-orange-500'
                    : 'bg-white/5 border-white/10'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-orange-400">Step {st.step}</span>
                  <span className="text-slate-400">{st.safety_level || 'Safe'}</span>
                </div>
                <div className="text-sm font-semibold text-white mt-1">{st.instruction}</div>
                <div className="mt-2 text-xs text-teal-300 font-medium">
                  <strong>Visual/Tactile Check:</strong> {st.sensory_cue}
                </div>
              </div>
            ))}
          </div>

          {/* Text Q&A with Sarvam-105B Assistant */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <MessageSquare className="w-4 h-4 text-orange-400" />
              <span>Grounded Text Q&A with Assistant</span>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
              {qaHistory.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl text-xs leading-relaxed ${
                    item.sender === 'user'
                      ? 'bg-orange-500/20 text-white ml-6 text-right'
                      : 'bg-slate-900 border border-white/10 text-slate-200 mr-6'
                  }`}
                >
                  {item.text}
                </div>
              ))}
              {isAsking && (
                <div className="text-xs text-slate-400 animate-pulse">
                  Assistant thinking with grounded case facts...
                </div>
              )}
            </div>

            <form onSubmit={handleAskAssistant} className="flex gap-2">
              <input
                type="text"
                value={qaInput}
                onChange={(e) => setQaInput(e.target.value)}
                placeholder="Type a question (e.g. 'Can I use a 40 MFD capacitor?')..."
                className="flex-1 px-4 py-2.5 rounded-xl glass-input text-xs"
              />
              <button
                type="submit"
                disabled={isAsking}
                className="px-4 py-2.5 rounded-xl bg-orange-500 text-white font-bold text-xs"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- MODE 3: SPEECH-IMPAIRED TAP & SPEAK --- */}
      {mode === 'speech' && (
        <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-amber-500/40 space-y-6">
          <div className="flex items-center gap-2 border-b border-white/10 pb-4">
            <span className="text-2xl">💬</span>
            <div>
              <h2 className="text-lg font-black text-white">Speech-Impaired Quick-Tap & Bulbul Speak</h2>
              <p className="text-xs text-slate-400">
                Tap pre-formulated queries; Bulbul speaks them aloud in your chosen persona.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-300 uppercase">
              Tap to Speak to Mentor or Customer:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "कृपया मुख्य 230V पावर बंद करें। (Please switch off 230V power)",
                "मुझे 36 MFD कैपेसिटर लाकर दीजिए। (Please fetch a 36 MFD capacitor)",
                "मल्टीमीटर से निरंतरता चेक कर रहा हूँ। (Checking continuity with multimeter)",
                "मोटर अब बिल्कुल सही चल रही है। (Motor is now running perfectly)",
                "इसका कुल रिपेयर खर्च 400 रुपये होगा। (The total repair cost is ₹400)"
              ].map((phrase, idx) => (
                <button
                  key={idx}
                  onClick={async () => {
                    const res = await fetch('/api/sarvam/tts', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        text: phrase,
                        language_code: 'hi-IN',
                        speaker,
                        pace: speechRate
                      })
                    });
                    const d = await res.json();
                    if (d.audio_base64) {
                      new Audio(`data:audio/wav;base64,${d.audio_base64}`).play();
                    }
                  }}
                  className="p-4 rounded-2xl bg-white/5 hover:bg-orange-500/20 border border-white/10 text-left text-xs font-semibold text-white flex items-center justify-between group min-h-[50px]"
                >
                  <span>{phrase}</span>
                  <Volume2 className="w-4 h-4 text-orange-400 group-hover:scale-110 transition shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- MODE 4: STANDARD MODE --- */}
      {mode === 'standard' && (
        <div className="p-6 sm:p-8 rounded-3xl glass-panel space-y-6">
          <h2 className="text-lg font-black text-white">Full Standard Diagnostic Guide</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-xs text-slate-400 font-bold uppercase">Estimated Time</span>
              <div className="text-lg font-extrabold text-white mt-1">{activeCase.estimated_time}</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-xs text-slate-400 font-bold uppercase">Estimated Cost</span>
              <div className="text-lg font-extrabold text-white mt-1">{activeCase.estimated_cost}</div>
            </div>
          </div>

          <div className="space-y-3">
            {steps.map((st, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="font-bold text-orange-400 text-xs">Step {st.step}</div>
                <div className="text-sm text-white font-medium">{st.instruction}</div>
                <div className="text-xs text-slate-400">Cue: {st.sensory_cue}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Learning Loop Result Reporting Action */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 to-indigo-950 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="font-extrabold text-white text-base">Did you perform this repair?</div>
          <div className="text-xs text-slate-400">
            Report your outcome to dynamically update knowledge base confidence & avoid e-waste.
          </div>
        </div>
        <button
          onClick={() => setShowReport(true)}
          className="px-5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 min-h-[44px]"
        >
          Report Repair Result
        </button>
      </div>

      {/* Outcome Report Modal */}
      {showReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="w-full max-w-md p-6 rounded-3xl glass-panel border border-white/20 space-y-4">
            <h3 className="text-lg font-bold text-white">Report Repair Outcome</h3>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'worked', label: 'Worked 100%' },
                { id: 'partly', label: 'Partly Fixed' },
                { id: 'failed', label: 'Failed (Review)' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setRepairStatus(opt.id as any)}
                  className={`p-2.5 rounded-xl text-xs font-bold border transition ${
                    repairStatus === opt.id
                      ? 'bg-emerald-500 text-white border-emerald-400'
                      : 'bg-white/5 text-slate-300 border-white/10'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <textarea
              value={repairNotes}
              onChange={(e) => setRepairNotes(e.target.value)}
              placeholder="Notes (optional): e.g. Used 36 MFD capacitor, motor drew 3.8 Amps..."
              rows={3}
              className="w-full p-3 rounded-xl glass-input text-xs"
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowReport(false)}
                className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={submitReport}
                className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
