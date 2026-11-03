import React from 'react';
import { Volume2, VolumeX, Eye, Activity, ShieldCheck, Sun, Moon, Type } from 'lucide-react';
import { Language, UI_STRINGS } from '../i18n';

interface A11yProps {
  isOpen: boolean;
  onClose: () => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  highContrast: boolean;
  setHighContrast: (v: boolean) => void;
  reducedMotion: boolean;
  setReducedMotion: (v: boolean) => void;
  reduceTransparency: boolean;
  setReduceTransparency: (v: boolean) => void;
  dyslexiaFont: boolean;
  setDyslexiaFont: (v: boolean) => void;
  speechRate: number;
  setSpeechRate: (r: number) => void;
  speaker: string;
  setSpeaker: (s: string) => void;
  currentLang: Language;
}

export const A11yModal: React.FC<A11yProps> = ({
  isOpen,
  onClose,
  fontSize,
  setFontSize,
  highContrast,
  setHighContrast,
  reducedMotion,
  setReducedMotion,
  reduceTransparency,
  setReduceTransparency,
  dyslexiaFont,
  setDyslexiaFont,
  speechRate,
  setSpeechRate,
  speaker,
  setSpeaker,
  currentLang
}) => {
  if (!isOpen) return null;
  const t = UI_STRINGS[currentLang];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="a11y-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
    >
      <div className="w-full max-w-lg p-6 rounded-3xl glass-panel border border-white/20 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <Eye className="w-6 h-6 text-orange-400" aria-hidden="true" />
            <h2 id="a11y-title" className="text-xl font-bold text-white">
              {t.a11y_panel_title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition"
            aria-label="Close accessibility controls"
          >
            ✕ Close
          </button>
        </div>

        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          {/* Font Size */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="flex items-center gap-2">
                <Type className="w-4 h-4 text-indigo-400" />
                {t.a11y_font_size} ({fontSize}px)
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setFontSize(Math.max(14, fontSize - 2))}
                  className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-bold min-h-[44px] min-w-[44px]"
                  aria-label="Decrease font size"
                >
                  A-
                </button>
                <button
                  onClick={() => setFontSize(16)}
                  className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold min-h-[44px]"
                >
                  Reset
                </button>
                <button
                  onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                  className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-bold min-h-[44px] min-w-[44px]"
                  aria-label="Increase font size"
                >
                  A+
                </button>
              </div>
            </div>
          </div>

          {/* High Contrast */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10">
            <div>
              <div className="font-semibold text-white">{t.a11y_high_contrast}</div>
              <div className="text-xs text-slate-400">Pure black & yellow maximum legibility</div>
            </div>
            <button
              onClick={() => setHighContrast(!highContrast)}
              className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors ${
                highContrast ? 'bg-orange-500 justify-end' : 'bg-slate-700 justify-start'
              }`}
              aria-label="Toggle high contrast theme"
            >
              <div className="w-6 h-6 rounded-full bg-white shadow-md" />
            </button>
          </div>

          {/* Reduce Transparency (Solid surfaces) */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10">
            <div>
              <div className="font-semibold text-white">{t.a11y_reduce_transparency}</div>
              <div className="text-xs text-slate-400">Replaces blur with high-opacity solid surfaces</div>
            </div>
            <button
              onClick={() => setReduceTransparency(!reduceTransparency)}
              className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors ${
                reduceTransparency ? 'bg-teal-500 justify-end' : 'bg-slate-700 justify-start'
              }`}
              aria-label="Toggle solid background panels"
            >
              <div className="w-6 h-6 rounded-full bg-white shadow-md" />
            </button>
          </div>

          {/* Reduced Motion */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10">
            <div>
              <div className="font-semibold text-white">{t.a11y_reduced_motion}</div>
              <div className="text-xs text-slate-400">Disables background mesh and card transitions</div>
            </div>
            <button
              onClick={() => setReducedMotion(!reducedMotion)}
              className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors ${
                reducedMotion ? 'bg-indigo-500 justify-end' : 'bg-slate-700 justify-start'
              }`}
              aria-label="Toggle reduced motion"
            >
              <div className="w-6 h-6 rounded-full bg-white shadow-md" />
            </button>
          </div>

          {/* Dyslexia Font */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10">
            <div>
              <div className="font-semibold text-white">{t.a11y_dyslexia_font}</div>
              <div className="text-xs text-slate-400">High-weighted letter bottoms for easy reading</div>
            </div>
            <button
              onClick={() => setDyslexiaFont(!dyslexiaFont)}
              className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors ${
                dyslexiaFont ? 'bg-orange-500 justify-end' : 'bg-slate-700 justify-start'
              }`}
              aria-label="Toggle dyslexia-friendly font"
            >
              <div className="w-6 h-6 rounded-full bg-white shadow-md" />
            </button>
          </div>

          {/* Speech Rate & Persona */}
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span>{t.a11y_speech_rate} ({speechRate.toFixed(1)}x)</span>
            </div>
            <input
              type="range"
              min="0.7"
              max="1.5"
              step="0.1"
              value={speechRate}
              onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
              className="w-full accent-orange-500"
              aria-label="Bulbul speech pace slider"
            />
            <div className="flex justify-between text-xs text-slate-400">
              <span>0.7x (Clear/Learner)</span>
              <span>1.0x (Normal)</span>
              <span>1.5x (Fast)</span>
            </div>

            <div className="pt-2 border-t border-white/10">
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {t.a11y_voice_speaker}
              </label>
              <select
                value={speaker}
                onChange={(e) => setSpeaker(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/20 text-white text-sm"
              >
                <option value="shubh_enhi_ads">Shubh (Bulbul v4 Natural Male - Warm)</option>
                <option value="simran_en_customer">Simran (Bulbul v4 Natural Female - Crisp)</option>
                <option value="aditya">Aditya (Classic Technician Tone)</option>
                <option value="priya">Priya (Empathetic Support Voice)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="pt-2 text-center text-xs text-slate-400">
          WCAG 2.2 AA Compliant • Keyboard Navigable • High Contrast Certified
        </div>
      </div>
    </div>
  );
};
